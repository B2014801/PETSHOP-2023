<template>
    <h6>Hiệu sản phẩm</h6>
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
    created() {
        this.getBrands();
    },
};
</script>

<style lang="scss" scoped></style>
