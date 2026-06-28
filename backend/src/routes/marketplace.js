const express = require('express');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Listar productos del marketplace
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    if (category) where.category = category;

    const products = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Comprar producto
router.post('/buy/:productId', authMiddleware, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.productId } });
    if (!product || !product.isActive) return res.status(404).json({ error: 'Producto no disponible' });
    if (product.stock < 1) return res.status(400).json({ error: 'Producto agotado' });

    // Registrar en inventario del usuario
    await prisma.userInventory.upsert({
      where: { userId_productId: { userId: req.userId, productId: product.id } },
      update: { quantity: { increment: 1 } },
      create: { userId: req.userId, productId: product.id, quantity: 1 },
    });

    // Reducir stock
    await prisma.product.update({
      where: { id: product.id },
      data: { stock: { decrement: 1 } },
    });

    // Registrar transacción
    await prisma.transaction.create({
      data: { userId: req.userId, type: 'purchase', amount: Math.floor(product.price) },
    });

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener inventario del usuario
router.get('/inventory', authMiddleware, async (req, res) => {
  try {
    const inventory = await prisma.userInventory.findMany({
      where: { userId: req.userId },
      include: { product: true },
      orderBy: { acquiredAt: 'desc' },
    });
    res.json({ inventory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
