import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connect = async () => {
  await prisma.$connect();
  // Create test category if it doesn't exist
  await prisma.category.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Default Category',
      description: 'Default category for products'
    }
  });
};

export const disconnect = async () => {
  await prisma.$disconnect();
};

export { prisma };
