import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (!id) throw createError({ statusCode: 400, statusMessage: "Invalid ID" });

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product)
    throw createError({ statusCode: 404, statusMessage: "Product not found" });

  return product;
});
