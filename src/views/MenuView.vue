<template>
  <div class="menu">
    <h1 class="text-center mb-4">Наше меню</h1>
    <div class="menu-grid">
      <div v-for="item in items" :key="item.id" class="card">
        <img :src="item.image" :alt="item.name" class="card-image">
        <div class="card-content">
          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-price">{{ item.price }} ₽</p>
          <button @click="addToCart(item)" class="btn btn-primary">
            <i class="fas fa-cart-plus"></i>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
  name: 'MenuView',
  data() {
    return {
      cart: useCartStore(),
      items: [
        {
          id: 1,
          name: 'Пицца "Маргарита"',
          price: 550,
          image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/8e66cfee-bd1c-493d-aa25-0b23639901ec.jpg'
        },
        {
          id: 2,
          name: 'Пицца "Пепперони"',
          price: 650,
          image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/29570023-8bae-431f-957c-50b7a834c374.jpg'
        },
        {
          id: 3,
          name: 'Пицца "4 сыра"',
          price: 750,
          image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/f8860b34-7410-4e7e-9d42-42315b5df755.jpg'
        }
      ]
    }
  },
  methods: {
    addToCart(item) {
      this.cart.addToCart(item)
      // Используем более современное уведомление
      const notification = document.createElement('div')
      notification.className = 'notification'
      notification.textContent = 'Товар добавлен в корзину!'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    }
  }
}
</script>

<style scoped>
.menu {
  padding: 2rem 0;
}

.card {
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid var(--border-color);
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--primary-color);
}

.card-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
  margin: 0.5rem 0 1rem;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--accent-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.375rem;
  box-shadow: var(--shadow-md);
  animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 1.7s;
  z-index: 1000;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style> 