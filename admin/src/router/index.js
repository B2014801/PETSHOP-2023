import { createWebHistory, createRouter } from 'vue-router';
import {
    Home,
    NotFound,
    Login,
    Register,
    Product,
    AddProduct,
    EditProduct,
    Category,
    Brand,
    AddBrand,
    EditBrand,
    Order,
} from '@/views/';
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
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/product',
        name: 'product',
        component: Product,
    },
    {
        path: '/product/add',
        name: 'product.add',
        component: AddProduct,
    },
    {
        path: '/product/:id',
        name: 'product.edit',
        component: EditProduct,
        props: true,
    },
    {
        path: '/category',
        name: 'category',
        component: Category,
        props: true,
    },
    {
        path: '/Brand',
        name: 'Brand',
        component: Brand,
        props: true,
    },
    {
        path: '/brand/add',
        name: 'brand.add',
        component: AddBrand,
    },
    {
        path: '/brand/:id',
        name: 'brand.edit',
        component: EditBrand,
        props: true,
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        // props: true,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
