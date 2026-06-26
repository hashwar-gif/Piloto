const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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

  console.log('Módulos insertados correctamente');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
