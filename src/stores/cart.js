import { defineStore } from 'pinia'

// Функции для работы с localStorage
const CART_KEY = 'cart'

const saveToStorage = (items) => {
  try {
    console.log('Сохраняем в localStorage:', items)
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    console.log('Проверяем что сохранилось:', localStorage.getItem(CART_KEY))
  } catch (e) {
    console.error('Ошибка при сохранении:', e)
  }
}

const loadFromStorage = () => {
  try {
    console.log('Загружаем из localStorage...')
    const saved = localStorage.getItem(CART_KEY)
    console.log('Прочитали из localStorage:', saved)
    const items = saved ? JSON.parse(saved) : []
    console.log('Распарсили в объект:', items)
    return items
  } catch (e) {
    console.error('Ошибка при загрузке:', e)
    return []
  }
}

// Создаем store
export const useCartStore = defineStore('cart', {
  state: () => {
    // При создании store пытаемся получить сохранённую корзину
    const savedCart = localStorage.getItem('cart')
    const items = savedCart ? JSON.parse(savedCart) : []
    return { items }
  },

  actions: {
    addToCart(item) {
      // Добавляем товар
      this.items.push(item)
      // Сохраняем в localStorage
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    removeFromCart(itemId) {
      // Удаляем товар
      this.items = this.items.filter(item => item.id !== itemId)
      // Сохраняем в localStorage
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    clearCart() {
      // Очищаем корзину
      this.items = []
      // Очищаем localStorage
      localStorage.setItem('cart', JSON.stringify([]))
    }
  },

  getters: {
    // Общая сумма
    total() {
      return this.items.reduce((sum, item) => sum + item.price, 0)
    },
    
    // Количество товаров
    count() {
      return this.items.length
    }
  }
}) 