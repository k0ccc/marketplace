import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Пагинация
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 9;
  const skip = (page - 1) * limit;

  // Фильтрация
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (query.category) where.category = query.category;
  if (query.color) where.color = query.color;
  if (query.material) where.material = query.material;

  // Сортировка
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy: any = {};
  if (query.sort === "price_asc") orderBy.price = "asc";
  else if (query.sort === "price_desc") orderBy.price = "desc";
  else orderBy.id = "desc"; // По умолчанию новые

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / limit),
    },
  };
});
