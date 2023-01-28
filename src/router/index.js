import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import FlightList from '@/views/FlightList.vue'
import FlightDetails from '@/views/FlightDetails.vue'
import SearchView from "@/views/SearchView.vue";
import LoginView from "@/views/action/LoginView.vue";
import SignupView from "@/views/action/SignupView.vue";
import ErrorView from "@/views/action/ErrorView.vue";
import VerifyView from "@/views/action/VerifyView.vue";
import LogoutView from "@/views/action/LogoutView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import NewView from "@/views/user/ticket/NewView.vue";
import TicketView from "@/views/user/ticket/TicketView.vue";
import BarcodeView from "@/views/user/ticket/BarcodeView.vue";
import TicketList from "@/views/user/ticket/TicketList.vue";
import UsedTickets from "@/views/user/ticket/UsedTickets.vue";
import ResetPassword from "@/views/user/ResetPassword.vue";

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
        component: FlightList,
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
        path: '/search/:dest',
        name: 'search',
        component: SearchView,
        meta: {
            title: 'Search'
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
    },
    {
        path: '/user/profile',
        name: 'profile',
        component: ProfileView,
        meta: {
            title: 'Profile'
        }
    },
    {
        path: '/user/password',
        name: 'password',
        component: ResetPassword,
        meta: {
            title: 'Change Password'
        }
    },
    {
        path: '/user/ticket/new/:id',
        name: 'book',
        component: NewView,
        meta: {
            title: 'New Ticket'
        },
        params: true
    },
    {
        path: '/user/ticket/:id',
        name: 'ticket',
        component: TicketView,
        meta: {
            title: 'Ticket'
        },
        params: true
    },
    {
        path: '/user/ticket/:id/barcode',
        name: 'barcode',
        component: BarcodeView,
        meta: {
            title: 'Barcode'
        },
        params: true
    },
    {
        path: '/user/ticket',
        name: 'tickets',
        component: TicketList,
        meta: {
            title: 'Tickets'
        }
    },
    {
        path: '/user/ticket/used',
        name: 'used',
        component: UsedTickets,
        meta: {
            title: 'Used Tickets'
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
