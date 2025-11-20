import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = ["Electronics", "Clothing", "Home"];
const colors = ["Black", "White", "Red", "Blue"];
const materials = ["Plastic", "Cotton", "Metal", "Wood"];

async function main() {
  // Очистка
  await prisma.$connect();
  await prisma.product.deleteMany();

  const products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      title: `Product ${i}`,
      description: `This is a detailed description for product ${i}. High quality and durable.`,
      price: Math.floor(Math.random() * 10000) + 500, // 500 - 10500
      image: `https://placehold.co/400x300?text=Product+${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      material: materials[Math.floor(Math.random() * materials.length)],
    });
  }

  await prisma.product.createMany({ data: products });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
