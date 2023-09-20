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

    <div class="product-sort">
        <select name="" id="" v-model="sort">
            <option value="new">Mới nhất</option>
            <option value="price_des">Giá Cao Đến Thấp</option>
            <option value="price_asc">Giá Thấp Đến Cao</option>
        </select>
    </div>
    <ProductList :products="sortProduct" />
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
            sort: 'new',
        };
    },
    components: {
        ProductList,
    },
    methods: {
        async getAllProduct() {
            try {
                this.products = await PetshopService.getAllProductWithBrandId(this.id);
            } catch (error) {
                console.log(error);
            }
        },
    },

    computed: {
        sortProduct() {
            if (this.sort == 'new') {
                return this.products.sort((a, b) => {
                    const dateA = new Date(a.createDate);
                    const dateB = new Date(b.createDate);

                    if (dateA < dateB) return 1;
                    if (dateA > dateB) return -1;
                    return 0;
                });
            } else {
                return this.products.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(/\./g, ''));
                    const priceB = parseFloat(b.price.replace(/\./g, ''));
                    const AfterDiscountA = priceA - (priceA * a.discount) / 100;
                    const AfterDiscountB = priceB - (priceB * b.discount) / 100;
                    if (this.sort == 'price_asc') {
                        return AfterDiscountA - AfterDiscountB;
                    }
                    if (this.sort == 'price_des') {
                        return AfterDiscountB - AfterDiscountA;
                    }
                });
            }
        },
    },
    mounted() {
        this.getAllProduct();
    },
};
</script>

<style lang="scss" scoped>
.product-sort {
    text-align: end;
    margin: 10px 10px 0 0;
    select {
        height: 35px;
        border: 1px solid #ddd;
        &:focus {
            box-shadow: 0 0 3px 2px #ddd;
            outline: none;
        }
    }
}
</style>
