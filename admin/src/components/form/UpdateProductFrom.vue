<template>
    <div class="col-sm-12 col-md-6 mx-auto mt-4">
        <h4 class="text-center">{{ Add ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm' }}</h4>
        <strong v-if="isShowUpdateSuccess" class="update-success">{{
            Add ? 'Thêm thành công' : 'Cập nhật thành công'
        }}</strong>
        <Form :validation-schema="ProductAddValidate" @submit="handleSubmit">
            <table class="table table-bordered">
                <tr>
                    <td><label class="form-check-label mr-2">Tên sản phẩm</label></td>
                    <td>
                        <Field
                            class="form-control border"
                            name="product_name"
                            type="text"
                            v-model="ProductData.name"
                        /><ErrorMessage name="product_name" class="text-danger error-message" />
                    </td>
                </tr>

                <tr>
                    <td><label class="form-check-label mr-2">Giá sản phẩm (đ)</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_price"
                            type="text"
                            v-model="ProductData.price"
                        /><ErrorMessage name="product_price" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><label class="form-check-label mr-2">Số lượng</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_number"
                            type="text"
                            v-model="ProductData.number"
                        /><ErrorMessage name="product_number" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><label class="form-check-label mr-2">Giảm giá (%)</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_discount"
                            type="number"
                            v-model="ProductData.discount"
                        /><ErrorMessage name="product_discount" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><label class="form-check-label mr-2">Mô tả</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_discribe"
                            type="text"
                            v-model="ProductData.discribe"
                        /><ErrorMessage name="product_discribe" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><Label class="form-check-label mr-2">Hình ảnh</Label></td>
                    <td>
                        <Field name="product_img" type="file" /><ErrorMessage
                            name="product_img"
                            class="text-danger error-message"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Hiệu sản phẩm</td>
                    <td>
                        <select name="hieusanpham">
                            <option value=""></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Tình trạng</td>
                    <td>
                        <select name="tinhtrangsp" id="">
                            <option value="1">kích hoạt</option>
                            <option value="0">ẩn</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" class="text-left">
                        <Label class="form-check-label mr-2"></Label>
                        <button class="btn btn-secondary w-25" type="submit">{{ Add ? 'Thêm' : 'Cập nhật' }}</button>
                    </td>
                </tr>
            </table>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:create', 'submit:update'],
    props: {
        isShowUpdateSuccess: { type: Boolean, default: false },
        Add: { type: Boolean, default: false },
        Edit: { type: Boolean, default: false },
        Product: { type: Object },
    },
    data() {
        const ProductAddValidate = yup.object().shape({
            product_name: yup
                .string()
                .required('Vui lòng nhập tên')
                .min(2, 'Tên ít nhất 2 ký tự')
                .max(40, 'Tên quá dài'),
            product_price: yup.number().typeError('Giá phải là một số').required('Vui lòng nhập giá'),
            product_number: yup
                .number('Vui lòng nhập số')
                .typeError('Số lượng phải là một số')
                .required('Vui lòng nhập số lượng'),
            product_discount: yup.number().typeError('Giảm giá phải là một số'),
        });
        let ProductData = {};
        if (this.Add) {
            ProductData = {
                name: '',
                price: 0,
                discount: 0,
                discribe: '',
                number: 0,
                // img: '',
                // brand: '',
                // state: '',
            };
        } else {
            ProductData = this.Product;
        }
        return {
            ProductAddValidate,
            ProductData,
        };
    },
    methods: {
        // async create() {
        //     this.$emit('submit:create', this.ProductData);
        // },
        async handleSubmit() {
            if (this.Edit) {
                this.$emit('submit:update', this.ProductData);
            }
            if (this.Add) {
                this.$emit('submit:create', this.ProductData);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
