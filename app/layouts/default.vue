<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow mb-6">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">NuxtMarket</NuxtLink>
        <NuxtLink to="/cart" class="flex items-center gap-2 hover:text-blue-600">
          <span class="font-bold text-black">Корзина</span>
          <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {{ cartStore.count }}
          </span>
        </NuxtLink>
      </div>
    </header>
    <main class="container mx-auto px-4 pb-10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()
</script>