<template>
    <section v-if="isShowProductDetail" class="mx-5">
        <section>
            <h5 v-if="isShowAddToCartSuccess" class="text-left my-2" style="color: #37e32a">
                <i class="fa-solid fa-check"></i> {{ product.name }} đã được thêm vào giỏ hàng
            </h5>
            <div class="row my-2">
                <div class="col-md-5 col-12">
                    <div class="card text-center border-0">
                        <div class="mt-2" style="text-align: left">
                            <img class="img-fluid" :src="product.img" alt="book1" style="width: 500px; height: 300px" />
                        </div>
                        <div class="card-body"></div>
                    </div>
                </div>
                <div class="col-md-7 col-12 pl-0">
                    <div class="row">
                        <!-- <form  action="pages/main/xulygiohang.php?id_sanpham=<?php echo $row['id_sanpham']; ?>" method="POST"> -->
                        <h2 class="text-uppercase">{{ product.name }}</h2>
                    </div>
                    <div class="row">
                        <h4 v-if="isDiscout" class="text-uppercase">
                            <del style="opacity: 0.5; margin-right: 6px">{{ getProductPrice }} </del
                            ><bdi class="text-danger">{{ getProductAfterDisCount() }}</bdi>
                        </h4>
                        <h4 v-else>
                            {{ getProductPrice }}
                        </h4>
                    </div>
                    <Form :validation-schema="AddCartNumberValidate" @submit="handleAddToCart">
                        <div class="mt-4">
                            <div class="d-flex">
                                <label class="d-inline" for="">Số lượng:</label>
                                <div class="Cart-UpdateOrder-Number">
                                    <button @click="minusAddCartNumber">-</button>
                                    <Field type="number" name="order_number" v-model="AddCartNumber" />
                                    <button @click="plusAddCartNumber">+</button>
                                    <ErrorMessage name="order_number" class="text-danger ms-2" />
                                </div>
                            </div>
                            <div class="mt-3">
                                <label for="" class="mb-0">Kho: <span v-html="getProductNumber"></span> </label>
                            </div>
                            <div class="mt-3">
                                <p>
                                    <b>Lưu ý</b>: Giá sản phẩm có thể thay đổi theo từng thời điểm.
                                    <span class="text-primary font-weight-bold">Kết Bạn Zalo</span> hoặc
                                    <span class="text-danger font-weight-bold">Gọi Hotline</span> để xem thêm hình
                                    ảnh/video chi tiết.
                                </p>
                            </div>
                            <div class="d-flex mt-3">
                                <!-- <?php if ($row['soluongsp'] > 0){ ?> -->
                                <button
                                    :disabled="isEnoughProductNumber"
                                    class="btn btn-lg btn-primary text-white ml-0"
                                    type="submit"
                                    name="themvaogio"
                                >
                                    Thêm vào giỏ
                                </button>
                                <!-- <?php }?> -->
                            </div>
                            <!-- </form> -->
                        </div>
                    </Form>
                </div>
            </div>
        </section>
        <section>
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button
                            class="accordion-button collapsed fs-5"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                            @click="handleCollapse1"
                        >
                            Mô tả
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        class="accordion-collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                        v-if="isShowCollapse1"
                    >
                        <div class="accordion-body">
                            <p>
                                <b>{{ product.name }} </b> {{ product.describe }}
                            </p>
                            <p class="text-center">
                                <b>Quyền lợi có được khi mua {{ product.name }} tại Pet Shop.</b>
                            </p>
                            <ol>
                                <li>Bảo hành thuần chủng trọn đời.</li>
                                <li>
                                    Bảo hành bệnh truyền nhiễm nguy hiểm ở chó là Care và Parvo 7 ngày đầu về nhà mới.
                                    Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú
                                    cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn… bởi vậy hãy chăm sóc
                                    theo hướng dẫn của PetHouse hướng dẫn nhé)
                                </li>
                                <li>Miễn phí vận chuyển toàn quốc</li>
                                <li>Giảm giá 10% cho các lần mua thú cưng tiếp theo.</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button
                            class="accordion-button collapsed fs-5"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                            @click="handleCollapse2"
                        >
                            Đánh giá
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        class="accordion-collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                        v-if="isShowCollapse2"
                    >
                        <div class="accordion-body mt-3">
                            <h5 class="text-center">Nhận xét về {{ product.name }}</h5>
                            <!-- //lis -->
                            <comment-list :comments="comments" />
                            <commentform @comment="handleAddComment" @newcomment="getComments(product._id)" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <hr />
            <h4>SẢN PHẨM TƯƠNG TỰ</h4>
            <ProductList :products="products" />
        </section>
    </section>
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/product/ProductList.vue';
import PetshopService from '@/services/petshop.service';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth.store';
import commentform from '@/components/form/CommentForm.vue';
import CommentList from '@/components/comment/CommentList.vue';
import CommentService from '@/services/comment.service';
import { cartStore } from '@/stores/main.store';
export default {
    data() {
        return {
            product: {},
            products: [],
            comments: [],
            images: images,
            isShowProductDetail: false,
            isShowCollapse1: false,
            isShowCollapse2: false,
            AddCartNumber: 1,
            AddCartNumberValidate: false,
            isShowAddToCartSuccess: false,
        };
    },
    props: { id: { type: String } },
    components: { ProductList, Form, Field, ErrorMessage, commentform, CommentList },
    methods: {
        async findById(id) {
            try {
                this.product = await PetshopService.findProductById(id);
                if (this.product) {
                    // validate because i want use product.number as max
                    this.AddCartNumberValidate = await yup.object().shape({
                        order_number: yup
                            .number()
                            .typeError('Phải là số')
                            .min(1, 'Tối thiểu là 1')
                            .max(this.product.number, 'Không đủ hàng'),
                    });
                    this.findByName();
                    this.isShowProductDetail = true;
                }
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: 'notfound',
                    params: {
                        pathMatch: this.$route.path.split('/').slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async findByName() {
            try {
                this.products = await PetshopService.findByNameExceptId(this.product.name, this.product._id);
                console.log(this.products);
            } catch (er) {}
        },
        handleCollapse1() {
            this.isShowCollapse1 = !this.isShowCollapse1;
            if (this.isShowCollapse1) {
                this.isShowCollapse2 = false; // Close the other collapse
            }
        },
        handleCollapse2() {
            this.isShowCollapse2 = !this.isShowCollapse2;
            if (this.isShowCollapse2) {
                this.isShowCollapse1 = false; // Close the other collapse
            }
        },
        plusAddCartNumber(e) {
            e.preventDefault();
            this.AddCartNumber++;
        },
        minusAddCartNumber(e) {
            e.preventDefault();
            if (this.AddCartNumber >= 2) this.AddCartNumber--;
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
        async handleAddToCart() {
            // e.preventDefault();
            const user = await this.getUser();

            const data = {
                UserId: user._id,
                ProductId: this.id,
                Amount: this.AddCartNumber,
            };
            try {
                const result = await PetshopService.addToCart(this.id, data);
                if (result) {
                    this.isShowAddToCartSuccess = true;
                    if (result.updatedExisting == false) {
                        let CartStore = cartStore();
                        CartStore.plusAmount();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },
        getProductAfterDisCount() {
            const PriceInt = this.product.price.replace(/\./g, '');
            const AfterDiscount = PriceInt - (PriceInt * this.product.discount) / 100;
            return this.formatNumberWithDot(AfterDiscount);
        },
        async getComments(product_id) {
            try {
                this.comments = await CommentService.getAll(product_id);
            } catch (error) {}
        },
        async handleAddComment(data) {
            const user = await this.getUser();
            data.user_id = user._id;
            data.product_id = this.product._id;
            const result = await CommentService.create(data);
            if (result) {
                // this.getComments(this.product._id);
            }
        },
    },
    computed: {
        getProductPrice() {
            const price = this.product.price + ' ₫';
            return price;
        },
        getProductNumber() {
            return this.product.number > 0
                ? this.product.number
                : '<span class="text-danger font-weight-bold"> Sản phẩm hiện đang hết hàng </span>';
        },
        isDiscout() {
            return this.product.discount > 0;
        },
        isEnoughProductNumber() {
            return this.product.number < 1;
        },
    },
    watch: {
        id: 'findById',
    },
    created() {
        this.findById(this.id);
        this.getComments(this.id);
    },
};
</script>

<style lang="scss" scoped>
.rating {
    display: flex;
    margin-top: -10px;
    flex-direction: row-reverse;
    margin-left: -4px;
    float: left;

    input {
        display: none;
    }
    input:checked ~ label:before {
        opacity: 1;
    }
}

.rating > label,
.start-icon {
    position: relative;
    width: 19px;
    font-size: 25px;
    color: #ff0000;
    cursor: pointer;
}

.rating > label::before,
.star-icon::before {
    content: '\2605';
    position: absolute;
    opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before,
.star-icon:before {
    opacity: 1 !important;
}

.rating:hover > input:checked ~ label:before {
    opacity: 0.4;
}
</style>
