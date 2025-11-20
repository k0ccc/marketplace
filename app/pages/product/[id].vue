<template>
  <div v-if="product" class="bg-white p-6 rounded shadow flex flex-col md:flex-row gap-8">
    <img :src="product.image" :alt="product.title" class="w-full md:w-1/2 rounded object-cover">
    <div class="flex-1">
      <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
      <p class="text-gray-600 text-lg mb-6">{{ product.description }}</p>
      
      <div class="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700 border-t border-b py-4">
        <div><span class="font-bold">Категория:</span> {{ product.category }}</div>
        <div><span class="font-bold">Материал:</span> {{ product.material }}</div>
        <div><span class="font-bold">Цвет:</span> {{ product.color }}</div>
      </div>

      <div class="flex items-center gap-6">
        <span class="text-3xl font-bold text-green-600 whitespace-nowrap">{{ product.price }} ₽</span>
        <button 
          class="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition cursor-pointer whitespace-nowrap"
          @click="cartStore.addToCart(product)"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-red-500">Товар не найден</div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const route = useRoute()
const cartStore = useCartStore()

const { data: product } = await useFetch(`/api/products/${route.params.id}`)
</script>