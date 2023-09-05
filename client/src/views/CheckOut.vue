<template>
    <div v-if="isShowCheckOut" class="container row mx-auto mt-2">
        <div class="col-md-6 col-12 mb-2">
            <form>
                <h3 class="col-12 pl-0">Thông tin thanh toán</h3>
                <div class="form-inline">
                    <div class="checkout-infor-namephone">
                        <div class="form-group my-1">
                            <label for="form-check-label"><b>Tên </b>(<strong class="text-danger">*</strong>)</label>
                            <input
                                type="text"
                                name="hoten"
                                value="hoten"
                                class="form-control w-100 mt-1"
                                placeholder="Nhập tên của bạn"
                            />
                        </div>
                        <div class="form-group my-1">
                            <label for="form-check-label"
                                ><b>Số điện thoại </b> (<strong class="text-danger">*</strong>)</label
                            >
                            <input
                                type="text"
                                id="sdt"
                                name="sodienthoai"
                                value="sodienthoai"
                                class="form-control w-100 mt-1"
                                placeholder="Nhập Email của bạn"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group my-1 col-sm-12 pr-md-0 pr-sm-0 pl-0">
                    <label for="form-check-label"><b>Email </b>(<strong class="text-danger">*</strong>)</label>
                    <input
                        type="text"
                        name="email"
                        value="email"
                        class="form-control w-100 mt-1"
                        placeholder="Nhập Email của bạn"
                    />
                </div>
                <div class="form-group my-1 col-sm-12 pr-md-0 pr-sm-0 pl-0">
                    <label for="form-check-label"
                        ><b>Địa chỉ nhận hàng </b>(<strong class="text-danger">*</strong>)</label
                    >
                    <input
                        type="text"
                        id="diachi"
                        name="diachi"
                        value="diachi"
                        class="form-control w-100 mt-1"
                        placeholder="Nhập địa chỉ của bạn"
                    />
                </div>

                <div><button class="btn btn-danger mt-2" name="capnhatthongtin" type="submit">Cập nhật</button></div>
            </form>
        </div>

        <div class="col-md-6 col-12 mb-2 col" style="border: 2px solid blue">
            <Form @submit="handleCheckOut" :validation-schema="PaymentMethodValidate">
                <div style="padding: 20px">
                    <h6 v-if="isShowCheckOutSuccess" class="text-start mb-2" style="color: #37e32a">
                        <i class="fa-solid fa-check"></i> Đặt hàng thành công
                    </h6>
                    <h3 class="text-upercase">Đơn hàng của bạn</h3>
                    <table class="CheckOut-Product-table">
                        <tr>
                            <th>Sản phẩm</th>
                            <th class="text-end">Tạm tính</th>
                        </tr>

                        <tr v-for="(Product, index) in CheckOutData">
                            <td>
                                {{ Product.ProductData.name }} <b> x{{ Product.Amount }} </b>
                            </td>
                            <td class="text-end">
                                <b>{{ getTemporaryPriceOfOneProduct(Product.ProductData.price, Product.Amount) }}</b>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Tạm tính </b></td>
                            <td class="text-end">
                                <b>{{ getTemporaryPrice }}</b>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Tổng</b></td>
                            <td class="text-end">
                                <b>{{ getTemporaryPrice }}</b>
                            </td>
                        </tr>
                    </table>
                    <div class="form-inline">
                        <!-- <form> -->
                        <div class="accordion form-group col-12">
                            <div>
                                <div v-if="isShowErrorChoosePaymentMethod" class="my-1">
                                    <span name="PaymentMethod" class="text-danger"
                                        >Vui lòng chọn hình thức thanh toán</span
                                    >
                                </div>
                                <div class="form-group" id="headingOne">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="checkboxOne"
                                        name="PaymentMethods"
                                        v-model="isChooseMethodPayment"
                                    />
                                    <label class="ms-2" for="checkboxOne">Hình thức thanh toán</label>
                                </div>
                                <hr class="my-2" />
                                <div v-if="isChooseMethodPayment">
                                    <div>
                                        <div class="form-group" id="headingTwo">
                                            <Field
                                                class="form-check-input"
                                                type="radio"
                                                value="inPersion"
                                                name="PaymentMethod"
                                                id="checkboxTwo"
                                                v-model="isChooseOneMethodPayment"
                                            />
                                            <label class="form-check-label ms-2" for="checkboxTwo"
                                                >Thanh toán khi nhận hàng</label
                                            >
                                        </div>
                                    </div>
                                    <hr class="my-2" />
                                    <div>
                                        <div class="form-group">
                                            <Field
                                                class="form-check-input"
                                                type="radio"
                                                value="online"
                                                name="PaymentMethod"
                                                id="checkboxThree"
                                                v-model="isChooseOneMethodPayment"
                                            />
                                            <label class="form-check-label ms-2" for="checkboxThree"
                                                >Thanh toán online</label
                                            >
                                        </div>
                                        <div v-if="isChooseOneMethodPayment == 'online'" class="p-3 bg-light">
                                            <p>
                                                Thông tin tài khoản thụ hưởng của Pet shop. Sau khi chuyển khoản, xin
                                                vui lòng thông báo cho chúng tôi qua số điên thoại 0925 086 811 để được
                                                phục vụ nhanh nhất.
                                            </p>
                                            <p>Ngân hàng: <b>Agribank</b></p>
                                            <p>Số tài khoản: <b>076582640</b></p>
                                            <p>Tên tài khoản: <b>NGUYỄN QUỐC TRUNG</b></p>
                                            <div class="text-center">
                                                <img src="img/thanhtoan/qr.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- </form> -->
                    </div>
                    <div>
                        <button class="btn btn-danger mt-2" type="submit">Đặt hàng</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
    <div v-if="isShowEmptyCheckOut"><h6 class="text-center mt-3">Chưa có sản phẩm thanh toán!!</h6></div>
</template>

<script>
import CartService from '@/services/cart.service';
import { useAuthStore } from '@/stores/auth.store';
import InvoiceService from '@/services/invoice.service';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            CheckOutData: [],
            isShowCheckOut: false,
            isChooseMethodPayment: false,
            isChooseOneMethodPayment: null,
            isShowCheckOutSuccess: false,
            isShowErrorChoosePaymentMethod: false,
            isShowEmptyCheckOut: false,
        };
    },
    methods: {
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
        async getCheckOutData() {
            try {
                const user = await this.getUser();
                this.CheckOutData = await CartService.getCarts(user._id);
                if (this.CheckOutData.length != 0) {
                    this.isShowCheckOut = true;
                } else {
                    // this.isShowEmptyCart = true;
                    this.isShowCheckOut = false;
                    this.isShowEmptyCheckOut = true;
                }
            } catch (error) {
                // alert('vui lòng đăng nhập trước');
                // this.$router.push({ name: 'login' });
                console.log(error);
            }
        },
        formatNumberWithDot(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
        },
        getTemporaryPriceOfOneProduct(price, amount) {
            const priceInt = price.replace(/\./g, ''); //1.000.000 to 1000000

            const priceFinal = this.formatNumberWithDot(priceInt * amount);
            return priceFinal;
        },
        async getDetail() {
            let Detail = [];
            await this.CheckOutData.map((item, index) =>
                Detail.push({ _id: item.ProductData._id, amount: item.Amount }),
            );
            return Detail;
        },
        async handleCheckOut() {
            try {
                if (this.isChooseOneMethodPayment) {
                    const user = await this.getUser();
                    const Detail = await this.getDetail();
                    let data = await {
                        UserId: user._id,
                        PaymentMethod: this.isChooseOneMethodPayment,
                        Detail: Detail,
                    };
                    const result = await InvoiceService.create(data);
                    if (result) {
                        this.isShowCheckOutSuccess = true;
                    }
                } else {
                    this.isShowErrorChoosePaymentMethod = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
        toggleDisplayError() {
            // if (this.isChooseOnethodPayment) {
            this.isShowErrorChoosePaymentMethod = false;
            // }
        },
    },
    computed: {
        getTemporaryPrice() {
            if (this.CheckOutData.length != 0) {
                const temporary_price = this.CheckOutData.reduce(
                    (total, item) => total + item.Amount * item.ProductData.price.replace(/\./g, ''),
                    0,
                );
                if (temporary_price) {
                    return this.formatNumberWithDot(temporary_price);
                }
            }
        },
    },
    watch: {
        isChooseOneMethodPayment: 'toggleDisplayError',
    },
    created() {
        this.getCheckOutData();
    },
};
</script>

<style lang="scss" scoped>
.checkout-infor-namephone {
    display: flex;
    justify-content: space-between;
    div {
        width: 48% !important;
    }
}
.CheckOut-Product-table {
    width: 100%;
    border: 2px dashed #a48c8ca8;
    border-collapse: collapse;
    margin-bottom: 6px;
    th,
    td {
        border: 2px dashed #a48c8ca8;
        padding: 10px;
    }
}
</style>
