const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      orderBy: { hashBalance: 'desc' },
      take: 100,
      select: {
        id: true,
        username: true,
        hashBalance: true,
        createdAt: true,
      },
    });

    const ranking = usuarios.map((u, i) => ({
      rank: i + 1,
      username: u.username,
      hashBalance: u.hashBalance,
    }));

    res.json(ranking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
