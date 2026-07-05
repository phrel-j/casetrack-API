import "dotenv/config";
//import { PrismaClient } from "@prisma/client";
import pkg from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
// Change this:
// import { PrismaClient } from "@prisma/client";

// To this:

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export { prisma };
// PrismaClient must be instantiated once.
// Using globalThis prevents accidental recursive/repeated construction
// during repeated module evaluation (common in dev / hot reload setups).
const g = globalThis;

if (!g.__prismaClient) {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  g.__prismaClient = new PrismaClient({ adapter });
}

export const prisma = g.__prismaClient;

