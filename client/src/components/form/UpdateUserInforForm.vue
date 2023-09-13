<template>
    <Form @submit="handleSubmit" :validation-schema="UserUpdateValidate" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-4 col-sm-12 col-12 text-center">
                <img
                    :src="user.img"
                    class="rounded-circle d-block mx-auto"
                    width="200"
                    height="200"
                    alt=""
                    style="object-fit: cover"
                />
                <label for="img" class="text-center bg-success text-white p-2 rounded mt-2">Tải ảnh lên</label>
                <Field type="file" id="img" name="img" class="d-none" v-model="user.img" />
                <ErrorMessage class="text-danger" name="img" />
            </div>

            <div class="col-md-8 col-12 col-sm-12 mx-auto">
                <div>
                    <div class="form-group mb-2">
                        <label for="name">Họ và tên</label>
                        <Field type="text" class="form-control" name="name" id="hoten" v-model="user.name" />
                        <ErrorMessage class="text-danger" name="name" />
                    </div>
                    <div class="form-group mb-2">
                        <label for="email">Email</label>
                        <p type="text" class="form-control m-0" name="email">{{ user.email }}</p>
                    </div>
                    <div class="form-group mb-2">
                        <label for="phone">Số điện thoại</label>
                        <Field type="text" class="form-control m-0" name="phone" v-model="user.phone" />
                        <ErrorMessage class="text-danger" name="phone" />
                    </div>
                    <div class="form-group mb-2">
                        <label for="address">Địa chỉ nhận hàng</label>
                        <Field type="text" class="form-control" name="address" id="address" v-model="user.address" />
                        <ErrorMessage class="text-danger" name="address" />
                    </div>
                    <div class="profile-update-btn">
                        <button class="btn btn-success" type="submit">Cập nhật</button>
                        <button
                            class="btn btn-success"
                            name="doimatkhau"
                            data-toggle="modal"
                            data-target="#modal-doimk"
                        >
                            Đổi mật khẩu
                        </button>
                        <button @click.prevent="handleLogout" class="btn btn-danger">Đăng xuất</button>
                    </div>
                </div>

                <div id="modal-doimk" class="modal fade" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content border p-3">
                            <!-- <form action="" method="POST" @submit="ValidateDoimk"> -->
                            <div class="mb-2 form-group">
                                <label for="matkhau-moi" class="">Mật khẩu mới: </label>
                                <div class="input-group border w-100">
                                    <input
                                        id="matkhau-moi"
                                        name="matkhau-moi"
                                        type="password"
                                        class="form-control border-0"
                                    />
                                    <i
                                        @click="ShowPassword(document.querySelector('#matkhau-moi'))"
                                        class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                                    ></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="matkhau-moi-laplai" class="">Lập lại mật khẩu: </label>
                                <div class="input-group border w-100">
                                    <input
                                        id="matkhau-moi-laplai"
                                        name="matkhau-moi-laplai"
                                        type="password"
                                        class="form-control border-0"
                                    />
                                    <i
                                        @click="ShowPassword(document.querySelector('#matkhau-moi-laplai'))"
                                        class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                                    ></i>
                                </div>
                            </div>
                            <div class="display-inline mx-auto text-center mt-2">
                                <button class="btn btn-danger mr-2" name="doi-matkhau" type="submit">Gửi</button>
                                <a role="button" class="btn btn-danger" data-dismiss="modal">Huỷ</a>
                            </div>
                            <!-- </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Form>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        user: { type: Object },
    },
    data() {
        const UserUpdateValidate = yup.object().shape({
            name: yup
                .string()
                .required('Bạn chưa nhập tên')
                .min(2, 'tên phải có ít nhất 2 ký tự')
                .max(30, 'Tên ít hơn 30 ký tự'),

            // password: yup.string().required('Bạn chưa nhập mật khẩu').max(100, 'Địa chỉ tối đa 100 ký tự.'),
            // password_repeat: yup
            //     .string()
            //     .required('Mật khẩu không khớp')
            //     .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
            phone: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
            address: yup
                .string()
                .required('Bạn chưa nhập địa chỉ')
                .min(2, 'Địa chỉ phải có ít nhất 10 ký tự')
                .max(30, 'Địa chỉ ít hơn 50 ký tự'),
        });
        return {
            UserUpdateValidate,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const formData = new FormData();

                // Utility function to append object properties to FormData
                function appendIfDefined(key, value) {
                    if (value !== undefined && value !== null) {
                        formData.append(key, value);
                    }
                }
                for (const key in this.user) {
                    if (this.user.hasOwnProperty(key)) {
                        appendIfDefined(key, this.user[key]);
                    }
                }
                this.$emit('submit:update', formData);
            } catch (error) {
                console.log(error);
            }
        },
        handleLogout() {
            const auth = useAuthStore();
            auth.logout();
            this.$router.push({ name: 'login' });
        },
    },
};
</script>

<style lang="scss" scoped>
.profile-update-btn {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
