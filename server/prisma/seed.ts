import appconfig from "../dotenv";
import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: appconfig.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: adapter,
});

const userData: Prisma.UserCreateInput[] = [
  { email: "aryan@gmail.com", name: "Aryan", username: "Aryan-202" },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({
      data: u,
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
