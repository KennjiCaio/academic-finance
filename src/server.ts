import app from './app';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log(`Prisma runnig`);
  } catch (error) {
    console.log(`Error: ${error}`)
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server running port - ${PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(async () => {
      await prisma.$disconnect();
      console.log(`Prisma down`)
      process.exit(0);
    })
  });
}

main().catch((err) => {
  console.error('Error starting server: ', err);
  process.exit(1);
});

