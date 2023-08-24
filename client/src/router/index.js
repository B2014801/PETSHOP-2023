import { createWebHistory, createRouter } from 'vue-router';
import { Home, About, Product, Cart, NotFound, Login, CreateAccount, ProductDetail, Test } from '@/views/';
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
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
    },
    {
        path: '/create_account',
        name: 'create_account',
        component: CreateAccount,
    },
    {
        path: '/test/detail',
        name: 'test',
        component: Test,
        // props: true,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
