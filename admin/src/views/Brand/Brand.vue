<template>
    <div class="mt-3 mb-4">
        <div class="text-center">
            <router-link to="/brand/add"><button class="btn btn-secondary">Thêm</button></router-link>
        </div>
        <h4 class="text-center my-3">Nhãn hiệu sản phẩm</h4>

        <form action="" method="POST" id="formsapxepsanpham">
            <div class="float-right mb-2"></div>
        </form>
    </div>
    <ProductList :products="brands" @deleteProduct="deleteBrand" brandorproduct="brand" />
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/Product/ProductList.vue';
import BrandService from '@/services/brand.service';
export default {
    data() {
        return {
            brands: { type: Array, default: [] },
            images: images,
        };
    },
    components: {
        ProductList,
    },
    methods: {
        async getAllBrand() {
            try {
                this.brands = await BrandService.getAllBrand();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBrand(id) {
            try {
                await BrandService.delete(id);
                this.getAllBrand();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getAllBrand();
    },
};
</script>

<style lang="scss" scoped></style>
