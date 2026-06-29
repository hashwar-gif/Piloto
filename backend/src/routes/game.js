const express = require('express');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/state', authMiddleware, async (req, res) => {
  try {
    const gameState = await prisma.gameState.findUnique({
      where: { userId: req.userId },
    });
    if (!gameState) {
      return res.json({ state: null });
    }
    res.json({ state: JSON.parse(gameState.state) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/state', authMiddleware, async (req, res) => {
  try {
    const { state } = req.body;
    if (!state) {
      return res.status(400).json({ error: 'Falta el estado del juego' });
    }

    const stateStr = typeof state === 'string' ? state : JSON.stringify(state);

    await prisma.gameState.upsert({
      where: { userId: req.userId },
      update: { state: stateStr },
      create: { userId: req.userId, state: stateStr },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.delete('/state', authMiddleware, async (req, res) => {
  try {
    await prisma.gameState.deleteMany({ where: { userId: req.userId } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
