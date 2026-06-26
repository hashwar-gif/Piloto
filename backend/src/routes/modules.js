const express = require('express');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { orderIndex: 'asc' },
    });

    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId },
    });

    const progressMap = {};
    progress.forEach(p => { progressMap[p.moduleId] = p; });

    const result = modules.map(m => ({
      ...m,
      progress: progressMap[m.id] || null,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/:key/answer', authMiddleware, async (req, res) => {
  try {
    const { key } = req.params;
    const { questionIndex, isCorrect } = req.body;

    const module = await prisma.module.findUnique({ where: { key } });
    if (!module) return res.status(404).json({ error: 'Módulo no encontrado' });

    let progress = await prisma.userProgress.findUnique({
      where: { userId_moduleId: { userId: req.userId, moduleId: module.id } },
    });

    if (!progress) {
      progress = await prisma.userProgress.create({
        data: { userId: req.userId, moduleId: module.id },
      });
    }

    let pointsEarned = JSON.parse(progress.pointsEarned || '[]');

    if (isCorrect && !pointsEarned.includes(questionIndex)) {
      pointsEarned.push(questionIndex);
      const newScore = progress.score + 1;

      await prisma.$transaction([
        prisma.userProgress.update({
          where: { id: progress.id },
          data: { score: newScore, pointsEarned: JSON.stringify(pointsEarned) },
        }),
        prisma.user.update({
          where: { id: req.userId },
          data: { hashBalance: { increment: module.hashReward } },
        }),
        prisma.transaction.create({
          data: {
            userId: req.userId,
            type: 'recompensa_modulo',
            amount: module.hashReward,
          },
        }),
      ]);

      const user = await prisma.user.findUnique({ where: { id: req.userId } });

      return res.json({ correct: true, reward: module.hashReward, hashBalance: user.hashBalance });
    }

    return res.json({ correct: false, reward: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/:key/complete', authMiddleware, async (req, res) => {
  try {
    const { key } = req.params;

    const module = await prisma.module.findUnique({ where: { key } });
    if (!module) return res.status(404).json({ error: 'Módulo no encontrado' });

    const progress = await prisma.userProgress.findUnique({
      where: { userId_moduleId: { userId: req.userId, moduleId: module.id } },
    });

    if (!progress) return res.status(400).json({ error: 'No hay progreso en este módulo' });

    await prisma.userProgress.update({
      where: { id: progress.id },
      data: { status: 'COMPLETADO', completedAt: new Date() },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
