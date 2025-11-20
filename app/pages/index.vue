<template>
  <div class="flex flex-col md:flex-row gap-6">
    <!-- Сайдбар с фильтрами -->
    <aside class="w-full md:w-1/4 bg-white p-4 rounded shadow h-fit">
      <h2 class="text-xl font-bold mb-4">Фильтры</h2>
      
      <!-- Фильтр категории -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Категория</label>
        <select v-model="filters.category" class="w-full border rounded p-2">
          <option value="">Все</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
      </div>

      <!-- Фильтр Цвета -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Цвет</label>
        <select v-model="filters.color" class="w-full border rounded p-2">
          <option value="">Все</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
        </select>
      </div>

      <!-- Сортировка -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Сортировка</label>
        <select v-model="filters.sort" class="w-full border rounded p-2">
          <option value="id_desc">Новые</option>
          <option value="price_asc">Цена (низкая -> высокая)</option>
          <option value="price_desc">Цена (высокая -> низкая)</option>
        </select>
      </div>

      <button  class="w-full bg-gray-800 text-white py-2 rounded" @click="applyFilters">Применить</button>
    </aside>

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
  filters.page = 1
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
      category: filters.category || undefined,
      color: filters.color || undefined
    }
  })
}

const { data, pending } = await useFetch('/api/products', {
  query: computed(() => route.query),
  watch: [() => route.query]
})
</script>