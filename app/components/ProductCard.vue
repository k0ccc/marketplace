<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
    <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover" >
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold mb-1">{{ product.title }}</h3>
      <p class="text-gray-500 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
      <div class="mt-auto flex items-center justify-between">
        <span class="text-xl font-bold text-green-600">{{ product.price }} ₽</span>
        <NuxtLink :to="`/product/${product.id}`" class="text-blue-500 hover:underline">Подробнее</NuxtLink>
      </div>
      <button 
        class="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        @click="cartStore.addToCart(product)"
      >
        В корзину
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { Product } from '@prisma/client'

defineProps<{ product: Product }>()
const cartStore = useCartStore()
</script>