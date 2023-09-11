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
                <Search></Search>
            </div>

            <div class="d-inline text-white">
                <router-link to="/cart" class="text-white mr-3"
                    ><i class="fa-solid fa-cart-shopping mx-3"></i
                ></router-link>

                <!-- '<a href="'.(isset($_SESSION['tendangnhapadmin']) ? 'admincp' : 'index.php?quanly=taikhoan').'">
                    <i class="fa-solid fa-user mr-3 ml-2"></i
                ></a> -->
                <!-- <a
                    class="text-decoration-none text-white"
                    style="position: absolute; top: 0; right: 0"
                    data-toggle="modal"
                    data-target="#modal-logout"
                    ><i class="fa-solid fa-arrow-right-from-bracket mr-3"></i>Thoát</a
                > -->
                <!-- <div id="modal-logout" class="modal fade" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content border">
                            <h4 class="text-center text-warning">Bạn có chắc muốn thoát không</h4>
                            <div class="display-inline mx-auto">
                                <a href="index.php?action=dangxuat" role="button" class="btn btn-danger mr-2">Có</a>
                                <a role="button" class="btn btn-danger" data-dismiss="modal">Không</a>
                            </div>
                        </div>
                    </div>
                </div> -->
                <span v-if="!isUserLogin">
                    <router-link to="/login" class="text-white text-decoration-none"
                        ><i class="fa-solid fa-user"></i> |
                    </router-link>
                    <router-link to="/register" class="text-white text-decoration-none"
                        ><i class="fa-solid fa-user-plus"></i
                    ></router-link>
                </span>
                <span v-else>
                    <router-link to="/user">
                        <i class="fa-solid fa-user mr-3 ml-2"></i>
                    </router-link>
                </span>
            </div>
        </div>
    </nav>
    <CollapseContent :isCollapsed="isCollapsed" />
</template>
<script>
import { useAuthStore } from '@/stores/auth.store';
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
import CollapseContent from './CollapseContent.vue';
import Category from './Category.vue';

import CategoryService from '@/services/category.service';
// import ButtonCollapse from '@/components/button/ButtonCollapse.vue';
export default {
    data() {
        return {
            images: images,
            isCollapsed: false,
            Categorys: [],
        };
    },
    components: {
        Search,
        CollapseContent,
        Category,
        // ButtonCollapse,
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
    },
    mounted() {},
};
</script>
<style></style>
