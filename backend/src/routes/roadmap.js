const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// Listar hitos del roadmap
router.get('/', async (req, res) => {
  try {
    const milestones = await prisma.roadmapMilestone.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    res.json({ milestones });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
