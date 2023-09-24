<template>
    <div class="mt-3 mb-4">
        <!-- <h1 class="text-center">{{ CategoryName }}</h1> -->
        <!-- <h4><router-link class="text-dark" to="/">trang chủ</router-link> / {{ CategoryName }}</h4> -->
    </div>
    <div>
        <ProductList :products="Brands" :CategoryName="CategoryName" />
    </div>
</template>

<script>
import ProductList from '@/views/product/ProductList.vue';
import BrandService from '@/services/brand.service';
export default {
    props: { CategoryName: { String }, CategoryId: { String } },
    components: {
        ProductList,
    },
    data() {
        return {
            Brands: [],
        };
    },
    methods: {
        async getBrands() {
            try {
                this.Brands = await BrandService.getAllBrandWithCategoryId(this.CategoryId);
            } catch (error) {
                console.log(error);
            }
        },
    },
    watch: {
        CategoryId(nv) {
            this.getBrands();
        },
    },
    created() {
        this.getBrands();
        document.title = 'Brand';
    },
};
</script>

<style lang="scss" scoped></style>
