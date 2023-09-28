<template>
    <div class="container w-50 border border-primary rounded my-3 p-0">
        <h3 class="bg-success text-white p-2 text-organ text-center">Chào mừng bạn đến với shop thú cưng</h3>
        <Form @submit="submitLogin" :validation-schema="loginValidate">
            <div class="m-3">
                <strong v-if="errorLoginEmailOrPassword" class="text-danger">Email hoặc mật khẩu không hợp lệ</strong>
                <div class="form-group font-weight-bold">
                    <label for="email">Email <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            value=""
                            class="form-control"
                            placeholder="Vui lòng nhập vào email của bạn"
                            v-model="user.email"
                        />
                    </div>
                    <strong class="text-danger"><ErrorMessage name="email"></ErrorMessage></strong>
                </div>
                <div class="form-group font-weight-bold">
                    <label for="password" class="my-2">Mật khẩu <strong class="text-danger">(*)</strong></label>
                    <div class="input-group border">
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            value=""
                            class="form-control border-0"
                            placeholder="Nhập mật khẩu của bạn"
                            v-model="user.password"
                        />
                        <i
                            onclick="ShowPassword(document.querySelector('#password-input-matkhau'))"
                            class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                        ></i>
                    </div>
                    <strong class="text-danger"><ErrorMessage name="password"></ErrorMessage></strong>
                </div>
                <div class="form-group form-check my-2">
                    <Field type="checkbox" id="remember" name="nho-mat-khau" class="form-check-input" />
                    <label for="remember" class="form-check-label">Ghi nhớ tôi</label>
                </div>
                <div class="btn-login-register-container">
                    <button class="btn btn-info" type="submit">Đăng nhập</button>
                    <router-link class="btn btn-info ms-4" to="/register" role="button">Tạo tài khoản</router-link>
                </div>
                <div class="login-choice"><span>Đăng nhập với</span></div>
                <Oauth @submit:oauthdata="handleSubmitOauth" />
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';
import Oauth from '@/components/login/Oauth.vue';
export default {
    props: {
        errorLoginEmailOrPassword: { type: Boolean },
    },
    components: {
        Field,
        Form,
        ErrorMessage,
        Oauth,
    },
    data() {
        const loginValidate = yup.object().shape({
            email: yup.string().required('Vui lòng nhập email'),
            password: yup.string().required('Vui lòng nhập mật khẩu'),
        });
        return {
            loginValidate,
            user: {
                email: '',
                password: '',
            },
        };
    },
    emits: ['submit:login'],
    methods: {
        submitLogin() {
            this.$emit('submit:login', this.user);
        },
        handleSubmitOauth(data) {
            console.log(data);
            this.$emit('submit:login', data);
        },
    },
};
</script>

<style scoped>
.login-choice span {
    color: #5b6987;
    display: -ms-grid;
    display: grid;
    font-size: 16px;
    width: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    -ms-grid-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
    grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
    grid-gap: 19px;
}
.login-choice span:after,
.login-choice span:before {
    content: '';
    border-top: 1px solid #e5e8ed;
}
.btn-login-register-container {
    display: flex;
    justify-content: center;
    margin: 15px 0;
}
</style>
