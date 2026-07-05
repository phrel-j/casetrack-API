const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Makes sure your DATABASE_URL from .env is loaded

// 1. Create a standard PostgreSQL connection pool using your env variable
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Instantiate the Prisma PostgreSQL adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter directly into the new Prisma v7 Client constructor
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.create({
    data: { email: 'pharel@example.com', password: 'not-hashed-yet' },
  });
  console.log('Created user:', user);

  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);
}
main()
  .catch((e) => {
    console.error("Database connection failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });