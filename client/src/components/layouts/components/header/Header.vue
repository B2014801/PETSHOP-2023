<template>
    <nav class="navbar navbar-expand-lg p-1">
        <div class="container-fluid position-relative p-0 mx-2">
            <button class="navbar-toggler" type="button" @click="toggleCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <router-link to="/" class="mr-2">
                <img :src="images.logo" class="" alt="" width="130" height="70" />
            </router-link>
            <div class="collapse navbar-collapse justify-content-between mr-3">
                <Category :Categorys="Categorys" />
                <div class="header-search">
                    <Search
                        @value="getProductWithName"
                        :products="products"
                        :LoadingSearch="LoadingSearch"
                        :isEmptyProduct="isEmptyProduct"
                        :isSearch="isSearch"
                    ></Search>
                    <div>
                        <Microphone></Microphone>
                    </div>
                </div>
            </div>

            <div class="d-inline">
                <router-link to="/cart" class="text-white">
                    <toprightamout v-if="initCartAmout"><i class="fa-solid fa-cart-shopping mx-3"></i></toprightamout>
                </router-link>

                <span v-if="!isUserLogin">
                    <router-link to="/login" class="text-white text-decoration-none"
                        ><i class="fa-solid fa-user"></i> |
                    </router-link>
                    <router-link to="/register" class="text-white text-decoration-none"
                        ><i class="fa-solid fa-user-plus"></i
                    ></router-link>
                </span>
                <span v-else>
                    <router-link to="/user/profile">
                        <i class="fa-solid fa-user mr-3 ml-2"></i>
                    </router-link>
                </span>
            </div>
        </div>
    </nav>
    <CollapseContent :isCollapsed="isCollapsed" :Categorys="Categorys">
        <Search
            @value="getProductWithName"
            :products="products"
            :LoadingSearch="LoadingSearch"
            :isEmptyProduct="isEmptyProduct"
            :isSearch="isSearch"
        ></Search>
    </CollapseContent>
</template>
<script>
import { useAuthStore } from '@/stores/auth.store';
import { cartStore } from '@/stores/main.store';
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
import Microphone from '@/components/search/Microphone.vue';
import CollapseContent from './CollapseContent.vue';
import Category from './Category.vue';
import toprightamout from '@/components/toprightamout.vue';

import CategoryService from '@/services/category.service';
import PetshopService from '@/services/petshop.service';
import Cartservice from '@/services/cart.service';
// import ButtonCollapse from '@/components/button/ButtonCollapse.vue';
export default {
    data() {
        return {
            images: images,
            isCollapsed: false,
            Categorys: [],
            products: [],

            LoadingSearch: false,
            isEmptyProduct: false,
            isSearch: null,
            initCartAmout: false,
        };
    },
    components: {
        Search,
        CollapseContent,
        Category,
        // ButtonCollapse,
        Microphone,
        toprightamout,
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        async getCategorys() {
            try {
                this.Categorys = await CategoryService.getAll();
            } catch (er) {
                console.log(er);
            }
        },
        async getProductWithName(name) {
            try {
                this.isEmptyProduct = false;
                if (!name.startsWith('?') && name.trim() != '') {
                    this.LoadingSearch = true;
                    let documents = null;
                    setTimeout(async () => {
                        documents = await PetshopService.findByName(name);
                        if (documents.length != 0) {
                            this.products = documents;
                            this.isEmptyProduct = false;
                        } else {
                            this.products = [];
                            this.isEmptyProduct = true;
                        }
                        this.isSearch = true;
                        this.LoadingSearch = false;
                    }, 1500);
                } else {
                    this.LoadingSearch = false;
                    this.isEmptyProduct = true;
                }
            } catch (error) {}
        },
        async getUser() {
            const auth = useAuthStore();
            await auth.loadAuthState();
            if (auth.user) {
                return auth.user.user;
            } else {
                alert('Bạn phải đăng nhập trước');
                this.$router.push({ name: 'login' });
            }
        },
        async getCart() {
            try {
                const user = await this.getUser();
                let cart = await Cartservice.getCarts(user._id);

                let CartStore = cartStore();
                CartStore.setAmount(cart.length);
                this.initCartAmout = true;
            } catch (error) {
                // alert('vui lòng đăng nhập trước');
                // this.$router.push({ name: 'login' });
                console.log(error);
            }
        },
    },
    computed: {
        isUserLogin() {
            try {
                const auth = useAuthStore();
                auth.loadAuthState();
                return auth.isUserLoggedIn;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getCategorys();
        this.getCart();
    },
    mounted() {},
};
</script>
<style scoped lang="scss">
.header-search {
    display: flex;
    align-items: center;
}
</style>
