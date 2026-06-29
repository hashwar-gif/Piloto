const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Módulos de academia
  const modules = [
    { name: 'Blockchain', key: 'blockchain', hashReward: 500, totalQuestions: 6, orderIndex: 0 },
    { name: 'Criptomonedas', key: 'cryptocurrency', hashReward: 500, totalQuestions: 6, orderIndex: 1 },
    { name: 'Minería Bitcoin', key: 'mining', hashReward: 500, totalQuestions: 6, orderIndex: 2 },
    { name: 'Compra USDT', key: 'usdt', hashReward: 500, totalQuestions: 6, orderIndex: 3 },
    { name: 'Evitar Estafas', key: 'scams', hashReward: 500, totalQuestions: 6, orderIndex: 4 },
    { name: 'Pirámides', key: 'pyramids', hashReward: 500, totalQuestions: 6, orderIndex: 5 },
  ];

  for (const mod of modules) {
    await prisma.module.upsert({
      where: { key: mod.key },
      update: {},
      create: mod,
    });
  }

  // Categorías del blog
  for (const cat of [{ name: 'Noticias', slug: 'noticias' }, { name: 'Estrategias', slug: 'estrategias' }, { name: 'Tecnología', slug: 'tecnologia' }]) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }

  // Posts del blog
  const noticiasId = (await prisma.category.findUnique({ where: { slug: 'noticias' } })).id;
  const estrategiasId = (await prisma.category.findUnique({ where: { slug: 'estrategias' } })).id;

  const posts = [
    { title: 'Gran Final del Torneo HASHWAR', slug: 'gran-final-torneo-hashwar', summary: 'La gran final del torneo HASHWAR se celebró con una alta participación de la comunidad minera.', content: 'La gran final del torneo HASHWAR reunió a los mejores mineros de la plataforma. Con más de 500 participantes, la competencia fue reñida hasta el último bloque. Felicitamos a todos los ganadores y agradecemos a la comunidad por su apoyo.', categoryId: noticiasId, publishedAt: new Date('2026-06-15') },
    { title: 'Dominando el Terreno 3D', slug: 'dominando-terreno-3d', summary: 'Aprende las mejores estrategias para dominar el terreno tridimensional en HASHWAR.', content: 'El terreno tridimensional ofrece nuevas oportunidades estratégicas. En esta guía cubriremos posicionamiento de edificios, rutas de ataque óptimas y cómo aprovechar las elevaciones para defender tu base.', categoryId: estrategiasId, publishedAt: new Date('2026-06-10') },
  ];

  for (const post of posts) {
    await prisma.post.upsert({ where: { slug: post.slug }, update: {}, create: post });
  }

  // Paquetes (usar deleteMany + create para evitar duplicados en re-seed)
  await prisma.userSubscription.deleteMany();
  await prisma.package.deleteMany();
  const packages = [
    { name: 'Novato', tier: 1, price: 0, features: JSON.stringify(['Acceso a Academia', 'Juego básico', 'Soporte estándar']), isActive: true },
    { name: 'Avanzado', tier: 2, price: 15.99, features: JSON.stringify(['Todo lo de Novato', 'Minado avanzado', 'NFTs exclusivos', 'Soporte prioritario']), isActive: true },
    { name: 'Experto', tier: 3, price: 27.99, features: JSON.stringify(['Todo lo de Avanzado', 'Minado en pool privado', 'Acceso anticipado', 'Soporte VIP 24/7']), isActive: true },
  ];
  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }

  // Productos del Marketplace
  await prisma.userInventory.deleteMany();
  await prisma.product.deleteMany();
  const products = [
    { name: 'Poster HASHWAR', category: 'merch', description: 'Poster oficial de HASHWAR edición limitada', price: 14.99, priceType: 'USD', stock: 100 },
    { name: 'Camiseta HASHWAR', category: 'merch', description: 'Camiseta oficial con diseño cyberpunk', price: 29.99, priceType: 'USD', stock: 50 },
    { name: 'Hoodie HASHWAR', category: 'merch', description: 'Hoodie premium edición minero', price: 39.99, priceType: 'USD', stock: 30 },
    { name: 'Combo HASHWAR', category: 'merch', description: 'Pack completo: poster + camiseta + hoodie', price: 79.99, priceType: 'USD', stock: 20 },
    { name: 'Minero Legendario', category: 'nft', description: 'NFT de minero legendario con boost de minería', price: 0.05, priceType: 'ETH', stock: 10 },
    { name: 'GPU Épica', category: 'nft', description: 'NFT de GPU épica para mejorar tu hashrate', price: 0.03, priceType: 'ETH', stock: 10 },
    { name: 'Hash Boost Raro', category: 'nft', description: 'NFT de hash boost para multiplicar ganancias', price: 0.01, priceType: 'ETH', stock: 10 },
    { name: 'Hash Boost Pro', category: 'nft', description: 'NFT de hash boost profesional edición limitada', price: 0.02, priceType: 'ETH', stock: 10 },
    { name: 'GPU RTX 3060 Ti', category: 'equipment', description: 'Tarjeta gráfica para minería de alto rendimiento', price: 549.99, priceType: 'USD', stock: 15 },
    { name: 'Rig Profesional 6x', category: 'equipment', description: 'Rig de minería profesional con 6 GPUs', price: 3200, priceType: 'USD', stock: 5 },
    { name: 'Antminer S19 Pro', category: 'equipment', description: 'ASIC miner de última generación', price: 2450, priceType: 'USD', stock: 8 },
    { name: 'Hydro Cooling', category: 'equipment', description: 'Sistema de refrigeración líquida para rigs', price: 899.99, priceType: 'USD', stock: 10 },
  ];
  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  // Hitos del roadmap
  await prisma.roadmapMilestone.deleteMany();
  const milestones = [
    { date: 'ABRIL 2026', title: 'Lanzamiento', description: 'Plataforma, Academia, Gameplay, Paquetes Gratis', status: 'completed', orderIndex: 0 },
    { date: 'JULIO 2026', title: 'Beta', description: 'RTS 3D, Torneos, App Móvil, Multi-chain', status: 'in_progress', orderIndex: 1 },
    { date: 'ENERO 2027', title: 'Final', description: 'Cross-platform, DAO Governance, Hardware Oficial, Esports', status: 'future', orderIndex: 2 },
  ];
  for (const ms of milestones) {
    await prisma.roadmapMilestone.create({ data: ms });
  }

  console.log('Seed completado: módulos, blog, paquetes, productos, roadmap');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
