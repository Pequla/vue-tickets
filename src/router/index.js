import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightView from '@/views/FlightView.vue'
import FlightDetails from '@/views/FlightDetails.vue'
import DestinationView from "@/views/DestinationView.vue";
import LoginView from "@/views/action/LoginView.vue";
import SignupView from "@/views/action/SignupView.vue";
import ErrorView from "@/views/action/ErrorView.vue";
import VerifyView from "@/views/action/VerifyView.vue";
import LogoutView from "@/views/action/LogoutView.vue";

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
    path: '/flight',
    name: 'flight',
    component: FlightView,
    meta: {
      title: 'Flights'
    }
  },
  {
    path: '/flight/:id',
    name: 'details',
    component: FlightDetails,
    meta: {
      title: 'Details'
    },
    params: true
  },
  {
    path: '/destination/:dest',
    name: 'destination',
    component: DestinationView,
    meta: {
      title: 'Destination'
    },
    params: true
  },
  {
    path: '/action/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/action/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/action/error',
    name: 'error',
    component: ErrorView,
    meta: {
      title: 'Error'
    }
  },
  {
    path: '/action/verify/:token',
    name: 'verify',
    component: VerifyView,
    meta: {
      title: 'Verify'
    },
    params: true
  },
  {
    path: '/action/logout',
    name: 'logout',
    component: LogoutView,
    meta: {
      title: 'Logout'
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
