import { createWebHistory, createRouter } from 'vue-router';
import {
    Home,
    About,
    Product,
    Cart,
    NotFound,
    Login,
    CreateAccount,
    ProductDetail,
    Contact,
    CheckOut,
    Search,
    UserHome,
    State,
    AllPurchase,
    ProfileHome,
} from '@/views/';
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
        props: (route) => ({ keySearch: route.query.keySearch }),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/product/',
        name: 'product',
        component: Product,
    },
    {
        path: '/product/detail/:id',
        name: 'productdetail',
        component: () => ProductDetail,
        props: true,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
    },
    {
        path: '/register',
        name: 'register',
        component: CreateAccount,
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact,
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckOut,
    },
    {
        path: '/user',
        name: 'user',
        component: UserHome,
        children: [
            {
                path: '/user/purchase',
                name: 'state',
                component: State,
                props: (route) => ({ state: route.query.state }),
            },
            {
                path: '/user/all',
                component: AllPurchase,
            },

            {
                path: '/user/profile',
                component: ProfileHome,
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
