<template>
  <div class="cart">
    <h1 class="text-center mb-4">Корзина</h1>
    
    <div v-if="cart.items.length === 0" class="empty-cart">
      <i class="fas fa-shopping-cart fa-3x mb-4"></i>
      <p>В корзине пока пусто</p>
      <router-link to="/menu" class="btn btn-primary">
        <i class="fas fa-utensils"></i>
        Перейти в меню
      </router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.id" class="cart-item card">
          <img :src="item.image" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h3 class="cart-item-title">{{ item.name }}</h3>
            <p class="cart-item-price">{{ item.price }} ₽</p>
          </div>
          <button @click="removeItem(item.id)" class="btn btn-danger">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="cart-summary card">
        <h3>Итого</h3>
        <p class="total-price">{{ totalPrice }} ₽</p>
        <button @click="clearCart" class="btn btn-danger mb-2">
          <i class="fas fa-trash-alt"></i>
          Очистить корзину
        </button>
        <button class="btn btn-primary">
          <i class="fas fa-check"></i>
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartView',
  data() {
    return {
      cart: useCartStore()
    }
  },
  computed: {
    totalPrice() {
      return this.cart.items.reduce((sum, item) => sum + item.price, 0)
    }
  },
  methods: {
    removeItem(id) {
      this.cart.removeFromCart(id)
    },
    clearCart() {
      if (confirm('Вы уверены, что хотите очистить корзину?')) {
        this.cart.clearCart()
      }
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 2rem 0;
}

.empty-cart {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-color);
}

.empty-cart i {
  color: var(--accent-color);
  opacity: 0.5;
}

.empty-cart p {
  font-size: 1.25rem;
  margin: 1rem 0 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.cart-item-details {
  flex: 1;
}

.cart-item-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
  color: var(--primary-color);
}

.cart-item-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-color);
  margin: 0;
}

.cart-summary {
  padding: 1.5rem;
  align-self: start;
  position: sticky;
  top: 100px;
}

.cart-summary h3 {
  margin: 0 0 1rem;
  color: var(--primary-color);
}

.total-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
  margin: 0 0 1.5rem;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #bb2d3b;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr auto;
  }

  .cart-item-image {
    width: 80px;
    height: 80px;
  }

  .cart-summary {
    position: static;
    margin-top: 1rem;
  }
}
</style> 