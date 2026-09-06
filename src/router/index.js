import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../Views/LoginView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView, alias: '/login' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
