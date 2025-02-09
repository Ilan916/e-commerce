import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Création d'un admin
  const hashedPassword = await bcrypt.hash('adminpassword', 10);
  await prisma.user.create({
    data: {
      firstname: "Admin",
      lastname: "Dashboard",
      email: "admin@drive-market.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
