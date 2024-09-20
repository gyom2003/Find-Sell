import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/loginsComponents/LoginPage.vue';
import RegisterPage from '@/components/loginsComponents/RegisterPage.vue';
import AxiosComponent from '@/components/axiosOperations/AxiosComponent.vue';

// const isRegistered = false
// const isLogged = false

const routes = [
  {
    path: '/home',
    name: 'home',
    component: AxiosComponent,
    beforeEnter: (to, from, next) => {
      const isRegistered = JSON.parse(localStorage.getItem('isRegistered'))
      const isLogged = JSON.parse(localStorage.getItem('isLogged'))
      console.log("isRegistered:", isRegistered); 
      console.log("isLogged:", isLogged);

      if (!isRegistered) {
        next({ name: 'register' });
      } else if (!isLogged) {
        next({ name: 'login' });
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage, 
    beforeEnter: (to, from, next) => {
      const isLogged = JSON.parse(localStorage.getItem('isLogged'))
      const isRegistered = JSON.parse(localStorage.getItem('isRegistered'))
      if (isLogged) {
        next({ name: "home" })
      } else if (!isRegistered) {
        next({ name: 'register' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage, 
    beforeEnter: (to, from, next) => {
      const isRegistered = JSON.parse(localStorage.getItem('isRegistered'))
      if (isRegistered) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: "/", 
    redirect: () => {
      const isRegistered = JSON.parse(localStorage.getItem('isRegistered'))
      const isLogged = JSON.parse(localStorage.getItem('isLogged'))

      if (!isRegistered) {
        return { name: 'register' }
      } else if (!isLogged) {
        return { name: 'login' }
      } else {
        return { name: 'home' }
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
