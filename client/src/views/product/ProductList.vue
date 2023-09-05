<template>
    <div class="row card-group mx-3 mt-2">
        <div class="col-sm-4 col-md-3 col-lg-3 col-6 mb-3" v-for="(product, index) in products">
            <div class="product-item">
                <router-link
                    :to="{ name: 'productdetail', params: { id: product._id } }"
                    class="text-dark text-decoration-none"
                >
                    <div class="card position-relative border-0">
                        <div v-if="isDiscout(index)" class="selloff">
                            <h6 class="text-center m-1">-{{ product.discount }}%</h6>
                        </div>
                        <img :style="{ height: responseImg }" :src="product.img" class="card-img-top" alt="#" />
                        <div class="card-body text-center p-1">
                            <p class="mb-1">{{ product.name }}</p>
                            <span class="card-title" v-if="isDiscout(index)">
                                <del class="discountDel">{{ getProductPrice(index) }}</del
                                ><bdi class="text-danger fw-bold">{{ getProductAfterDisCount(index) }}</bdi>
                            </span>
                            <span v-else class="card-title">
                                <b>{{ getProductPrice(index) }}</b>
                            </span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import images from '@/assets/imgs';
import ProductService from '@/services/petshop.service';

export default {
    props: { products: { type: Array, default: [] } },
    data() {
        return {
            images: '',
            screenWidth: 0,
            // isSmallScreen: window.innerWidth <= 768,
        };
    },
    methods: {
        onScreenResize() {
            window.addEventListener('resize', () => {
                this.updateScreenWidth();
            });
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
        getProductPrice(index) {
            const priceInt = this.products[index].price + ' ₫';
            return priceInt;
        },
        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },
        getProductAfterDisCount(index) {
            const PriceInt = this.products[index].price.replace(/\./g, '');
            const AfterDiscount = PriceInt - (PriceInt * this.products[index].discount) / 100;
            return this.formatNumberWithDot(AfterDiscount);
        },
        isDiscout(index) {
            return this.products[index].discount > 0;
        },
    },
    computed: {
        responseImg() {
            return this.screenWidth <= 768 ? '100px' : '250px';
        },
    },
    mounted() {
        this.updateScreenWidth();
        this.onScreenResize();
    },
    beforeDestroy() {
        // Remove the event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style lang="scss" scoped>
.card-title {
    font-size: 14px;
}
.discountDel {
    opacity: 0.7;
    margin-right: 6px;
}
</style>
