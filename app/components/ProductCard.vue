<template>
    <img :src="product.image" :alt="product.title">
      <p >{{ product.title }}</p>
      <p >{{ product.description }}</p>
      <span >{{ product.price }} ₽</span>
      <NuxtLink :to="`/product/${product.id}`" class="text-blue-500 hover:underline">Подробнее</NuxtLink>
      <button 
        @click="cartStore.addToCart(product)"
      >
        В корзину
      </button>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import type { Product } from '@prisma/client'

defineProps<{ product: Product }>()
const cartStore = useCartStore()
</script>