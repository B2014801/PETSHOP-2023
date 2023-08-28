<template>
    <div class="mt-3 mb-4">
        <div class="text-center">
            <router-link to="/product/add"><button class="btn btn-secondary">Thêm</button></router-link>
        </div>
        <form action="" method="POST" id="formsapxepsanpham">
            <div class="float-right mb-2"></div>
        </form>
    </div>
    <ProductList :products="products" @deleteProduct="deleteProduct" />
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/product/ProductList.vue';
import ProductService from '@/services/product.service';
export default {
    data() {
        return {
            products: [],
            images: images,
        };
    },
    components: {
        ProductList,
    },
    methods: {
        async getAllProduct() {
            try {
                this.products = await ProductService.getAllProduct();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(id) {
            try {
                await ProductService.delete(id);
                this.getAllProduct();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getAllProduct();
    },
};
</script>

<style lang="scss" scoped></style>
