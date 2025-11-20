export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Имитация обработки
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!body.items || body.items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Cart is empty" });
  }

  return { success: true, orderId: Date.now() };
});
