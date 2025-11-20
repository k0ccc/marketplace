<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Оформление заказа</h1>
    
    <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Список товаров -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold mb-4 ">Товары в корзине</h2>
        <ul>
          <li v-for="item in cartStore.items" :key="item.product.id" class="flex justify-between items-center border-b py-2">
            <div>
              <div class="font-bold">{{ item.product.title }}</div>
              <div class="text-sm text-gray-500">{{ item.product.price }} ₽ x {{ item.quantity }}</div>
            </div>
            <button class="text-red-500 text-sm cursor-pointer" @click="cartStore.removeFromCart(item.product.id)">Удалить</button>
          </li>
        </ul>
        <div class="mt-4 text-xl font-bold text-right">
          Итого: {{ cartStore.totalPrice }} ₽
        </div>
      </div>

      <!-- Форма заказа -->
      <form class="bg-white p-4 rounded shadow h-fit" @submit.prevent="submitOrder">
        <h2 class="text-xl font-bold mb-4">Данные покупателя</h2>
        
        <div class="mb-4">
          <label class="block text-sm font-bold mb-1">ФИО</label>
          <input v-model="form.name" required type="text" class="w-full border rounded p-2" >
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-bold mb-1">Email</label>
          <input v-model="form.email" required type="email" class="w-full border rounded p-2" >
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-1">Адрес</label>
          <textarea v-model="form.address" required class="w-full border rounded p-2"/>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {{ loading ? 'Оформление...' : 'Оплатить заказ' }}
        </button>
      </form>
    </div>

    <div v-else class="text-center py-10 text-xl text-gray-500">
      Ваша корзина пуста
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
const cartStore = useCartStore()

const form = reactive({ name: '', email: '', address: '' })
const loading = ref(false)

const submitOrder = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/order', {
      method: 'POST',
      body: {
        user: form,
        items: cartStore.items
      }
    })
    alert(`Заказ #${response.orderId} успешно оформлен!`)
    cartStore.clearCart()
    navigateTo('/')
  } catch (e) {
    alert(`Ошибка при оформлении заказа ${e}` )
  } finally {
    loading.value = false
  }
}
</script>