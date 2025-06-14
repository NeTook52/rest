import { createRouter, createWebHistory } from 'vue-router'
import MenuView from './views/MenuView.vue'
import CartView from './views/CartView.vue'

const routes = [
  { path: '/', component: MenuView },
  { path: '/menu', component: MenuView },
  { path: '/cart', component: CartView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router