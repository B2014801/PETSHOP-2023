<template>
    <!-- <div class="mt-3 mb-4">
        <div>
            <h4>
                <router-link class="text-dark" to="/">trang chủ</router-link> /
                <router-link class="text-dark" :to="'/' + CategoryName + '/' + id">{{ CategoryName }}</router-link> /
                {{ BrandName }}
            </h4>
        </div>
    </div> -->
    <ProductList :products="products" />
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/product/ProductList.vue';
import PetshopService from '@/services/petshop.service';
export default {
    props: {
        id: { type: String },
        BrandName: { type: String },
        CategoryName: { type: String },
    },
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
                this.products = await PetshopService.getAllProduct(this.id);
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
