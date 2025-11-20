<template>
  <div class="flex flex-col md:flex-row gap-6">
    <!-- Список товаров -->
    <div class="w-full md:w-3/4">
      <div v-if="pending" class="text-center py-10">Загрузка...</div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard v-for="product in data?.data" :key="product.id" :product="product" />
        </div>
        
        <!-- Пагинация -->
        <div class="flex justify-center mt-8 gap-2">
          <button 
          class="px-4 py-2 bg-white border rounded disabled:opacity-50"
            :disabled="filters.page <= 1"
            @click="changePage(filters.page - 1)"
          >Назад</button>
          <span class="px-4 py-2">Стр. {{ filters.page }} из {{ data?.meta.last_page }}</span>
          <button 
          class="px-4 py-2 bg-white border rounded disabled:opacity-50"
            :disabled="filters.page >= (data?.meta.last_page || 1)"
            @click="changePage(filters.page + 1)"
          >Вперед</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Используем реактивные переменные для состояния фильтров
const route = useRoute()
const router = useRouter()

const filters = reactive({
  category: route.query.category || '',
  color: route.query.color || '',
  sort: route.query.sort || 'id_desc',
  page: Number(route.query.page) || 1
})

// Функция обновления URL и вызова fetch (watchEffect подхватит изменения query)
const applyFilters = () => {
  filters.page = 1 // Сброс на первую страницу при фильтрации
  updateQuery()
}

const changePage = (newPage: number) => {
  filters.page = newPage
  updateQuery()
}

const updateQuery = () => {
  router.push({
    query: {
      ...filters,
      // Удаляем пустые ключи
      category: filters.category || undefined,
      color: filters.color || undefined
    }
  })
}

// Основной запрос данных (SSR friendly)
// Используем route.query как ключ, чтобы обновлять данные при смене URL
const { data, pending } = await useFetch('/api/products', {
  query: computed(() => route.query),
  watch: [() => route.query]
})
</script>