const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, name, lastName, email, password, confirmPassword, knowledgeLevel } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const kl = parseInt(knowledgeLevel) || 1;
    if (kl < 1 || kl > 5) {
      return res.status(400).json({ error: 'El nivel de conocimiento debe ser entre 1 y 5' });
    }

    const existente = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existente) {
      return res.status(400).json({ error: 'El email o username ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, name: name || '', lastName: lastName || '', email, password: hashedPassword, knowledgeLevel: kl },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, name: user.name, lastName: user.lastName, email: user.email, hashBalance: user.hashBalance, knowledgeLevel: user.knowledgeLevel },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, username: user.username, name: user.name, lastName: user.lastName, email: user.email, hashBalance: user.hashBalance, knowledgeLevel: user.knowledgeLevel },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, name: true, lastName: true, email: true, hashBalance: true, knowledgeLevel: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId },
      include: { module: true },
    });

    res.json({ user, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.patch('/hash', authMiddleware, async (req, res) => {
  try {
    const { hashBalance } = req.body;
    if (typeof hashBalance !== 'number' || hashBalance < 0) {
      return res.status(400).json({ error: 'hashBalance debe ser un número positivo' });
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { hashBalance: Math.floor(hashBalance) },
    });

    res.json({ hashBalance: user.hashBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
