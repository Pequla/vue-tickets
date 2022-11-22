import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FlightView from '../views/FlightView.vue'
import RasaView from '../views/RasaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About'
    }
  },
  {
    path: '/flights',
    name: 'flights',
    component: FlightView,
    meta: {
      title: 'Flights'
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: RasaView,
    meta: {
      title: 'Bot Chat'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = `${to.meta.title} :: VueTickets`;
  next();
})

export default router
