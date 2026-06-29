const express = require('express');
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Listar paquetes disponibles
router.get('/', async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { tier: 'asc' },
    });
    const parsed = packages.map(p => ({ ...p, features: JSON.parse(p.features) }));
    res.json({ packages: parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener suscripción del usuario
router.get('/my-subscription', authMiddleware, async (req, res) => {
  try {
    const sub = await prisma.userSubscription.findFirst({
      where: { userId: req.userId, status: 'active' },
      include: { package: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ subscription: sub ? { ...sub, package: { ...sub.package, features: JSON.parse(sub.package.features) } } : null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Suscribirse a un paquete
router.post('/subscribe/:packageId', authMiddleware, async (req, res) => {
  try {
    const pkg = await prisma.package.findUnique({ where: { id: req.params.packageId } });
    if (!pkg || !pkg.isActive) return res.status(404).json({ error: 'Paquete no disponible' });

    // Cancelar suscripciones activas anteriores
    await prisma.userSubscription.updateMany({
      where: { userId: req.userId, status: 'active' },
      data: { status: 'cancelled', endDate: new Date() },
    });

    const sub = await prisma.userSubscription.create({
      data: { userId: req.userId, packageId: pkg.id },
      include: { package: true },
    });

    res.status(201).json({ subscription: { ...sub, package: { ...sub.package, features: JSON.parse(sub.package.features) } } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
