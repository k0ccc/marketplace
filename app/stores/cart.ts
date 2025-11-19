import { defineStore } from "pinia";
import type { Product } from "~/types/templatePrisma";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    count: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
  },
  actions: {
    addToCart(product: Product) {
      const existing = this.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
  },
});
