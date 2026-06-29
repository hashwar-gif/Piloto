const express = require('express');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Listar posts
router.get('/posts', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category: { slug: category } } : {};
    const posts = await prisma.post.findMany({
      where,
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { publishedAt: 'desc' },
    });
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener post por slug
router.get('/posts/:slug', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: { category: { select: { name: true, slug: true } } },
    });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Listar categorías
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
