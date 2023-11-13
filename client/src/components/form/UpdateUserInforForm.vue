<template>
    <Form @submit="handleSubmit" :validation-schema="UserUpdateValidate" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-4 col-sm-12 col-12 text-center" v-if="isShowImg">
                <img
                    v-if="!imageUrl"
                    :src="user.img"
                    class="rounded-circle d-block mx-auto"
                    width="200"
                    height="200"
                    alt=""
                    style="object-fit: cover"
                />
                <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="Selected Image"
                    class="rounded-circle d-block mx-auto"
                    width="200"
                    height="200"
                    style="object-fit: cover"
                />
                <label for="img" class="text-center bg-success text-white p-2 rounded mt-2">Tải ảnh lên </label>
                <Field type="file" id="img" name="img" class="d-none" v-model="user.img" @change="displayImage" />
                <ErrorMessage class="text-danger" name="img" />
            </div>

            <div :class="{ 'col-md-8 col-12 col-sm-12': true, 'mx-auto': isShowImg == true }">
                <h6 v-show="!isuserValid" class="text-center py-1" style="background-color: #d1f4da">
                    <i class="fa fa-warning me-2" style="color: #f7c102"></i> Vui lòng cập nhật thông tin
                </h6>

                <div>
                    <h6 v-if="countUpdateTime > 0" class="text-left my-2" style="color: #37e32a">
                        <i class="fa-solid fa-check"></i> Cập nhật thành công x {{ countUpdateTime }}
                    </h6>
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
                    <Address
                        :isClickSubmit="isClickSubmit"
                        @isChosenAddress="isChosenAddress"
                        @address:data="getAddressData"
                        :user_address="user.address"
                    >
                    </Address>
                    <div class="profile-update-btn">
                        <button class="btn btn-success" type="submit">Cập nhật</button>
                        <button
                            v-if="isShowImg"
                            class="btn btn-success"
                            name="doimatkhau"
                            data-toggle="modal"
                            data-target="#modal-doimk"
                            @click.prevent="handleShowModel"
                        >
                            Đổi mật khẩu
                        </button>
                        <button v-if="isShowImg" @click.prevent="handleLogout" class="btn btn-danger">Đăng xuất</button>
                    </div>
                </div>
            </div>
        </div>
    </Form>
    <Model :showVoucherModal="showModal" @closeModel="closeModel()">
        <div class="profile-change-password-model">
            <Form @submit="handleChangePassword" :validation-schema="PasswordValidate">
                <div v-if="isShowWrongOldPass">
                    <strong class="text-danger">Mật khẩu cũ không chính xác</strong>
                </div>
                <div class="form-group">
                    <label for="">Mật khẩu cũ <strong class="text-danger">(*)</strong></label>
                    <div class="input-group border rounded">
                        <Field
                            :type="isShowPassword0 ? 'text' : 'password'"
                            class="form-control m-0 border-0"
                            name="old_password"
                            v-model="newUserData.oldpass"
                        >
                        </Field>
                        <i @click="showPassword0" class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"></i>
                    </div>
                    <ErrorMessage name="old_password" class="text-danger" />
                </div>
                <div class="form-group">
                    <label for="">Mật khẩu mới <strong class="text-danger">(*)</strong></label>
                    <div class="input-group border rounded">
                        <Field
                            :type="isShowPassword1 ? 'text' : 'password'"
                            class="form-control m-0 border-0"
                            name="password"
                        >
                        </Field>
                        <i @click="showPassword1" class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"></i>
                    </div>
                    <ErrorMessage name="password" class="text-danger" />
                </div>
                <div class="form-group">
                    <label for="">Lặp lại mật khẩu <strong class="text-danger">(*)</strong></label>
                    <div class="input-group border rounded">
                        <Field
                            :type="isShowPassword2 ? 'text' : 'password'"
                            class="form-control m-0 border-0"
                            name="password_repeat"
                            v-model="newUserData.newpass"
                        >
                        </Field>
                        <i @click="showPassword2" class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"></i>
                    </div>
                    <ErrorMessage name="password_repeat" class="text-danger" />
                </div>
                <div>
                    <button class="btn btn-success" type="submit">Cập nhật</button>
                </div>
            </Form>
        </div>
    </Model>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Address from '@/components/address/vietnamaddress.vue';
import Model from '@/components/models/model1.vue';
import bcrypt from 'bcryptjs';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        Address,
        Model,
    },
    props: {
        user: { type: Object },
        isShowImg: { type: Boolean, default: true },
        countUpdateTime: { type: Number, default: 0 },
    },
    data() {
        const UserUpdateValidate = yup.object().shape({
            name: yup
                .string()
                .required('Bạn chưa nhập tên')
                .min(2, 'tên phải có ít nhất 2 ký tự')
                .max(30, 'Tên ít hơn 30 ký tự'),

            phone: yup
                .string()
                .required('vui lòng nhập số điện thoại')
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
        });
        const PasswordValidate = yup.object().shape({
            password: yup
                .string()
                .required('Bạn chưa nhập mật khẩu')
                .max(100, 'Mật khẩu tối đa 100 ký tự.')
                .min(8, 'Tối thiếu 8 ký tự'),
            old_password: yup
                .string()
                .required('Bạn chưa nhập mật khẩu')
                .max(100, 'Mật khẩu tối đa 100 ký tự.')
                .min(8, 'Tối thiếu 8 ký tự'),
            password_repeat: yup
                .string()
                .required('Mật khẩu không khớp')
                .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
        });
        return {
            _user: this.user,
            UserUpdateValidate,
            PasswordValidate,
            isClickSubmit: false,
            data_address: [],
            isChosenAddres: false,
            imageUrl: null,
            isuserValid: null,
            showModal: false,
            newUserData: {
                oldpass: '',
                newpass: '',
            },
            isShowWrongOldPass: false,
            isShowPassword0: false,
            isShowPassword1: false,
            isShowPassword2: false,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                this.isClickSubmit = true;
                if (this.isChosenAddres) {
                    let formData = new FormData();

                    // Utility function to append object properties to FormData
                    function appendIfDefined(key, value) {
                        if (value !== undefined && value !== null) {
                            formData.append(key, value);
                        }
                    }
                    for (const key in this._user) {
                        if (this._user.hasOwnProperty(key)) {
                            appendIfDefined(key, this._user[key]);
                        }
                    }

                    this.$emit('submit:update', formData);
                }
            } catch (error) {
                console.log(error);
            }
        },
        isChosenAddress(data) {
            this.isChosenAddres = data;
        },
        getAddressData(data) {
            this.data_address = data;
            this.user.address = data.selectedWard + ', ' + data.selectedDistrict + ', ' + data.selectedTown;
        },
        handleLogout() {
            const auth = useAuthStore();
            auth.logout();
            this.$router.push({ name: 'login' });
        },
        displayImage(event) {
            const file = event.target.files[0];

            if (file) {
                // Create a FileReader to read the image file
                const reader = new FileReader();

                // Define a callback for when the reading is completed
                reader.onload = (e) => {
                    // Set the image URL to the result of the FileReader
                    this.imageUrl = e.target.result;
                };

                // Read the image file as a data URL
                reader.readAsDataURL(file);
            } else {
                // If no file is selected, clear the image URL
                this.imageUrl = null;
            }
        },
        isShowUserNotvalid() {
            this.isUserDataValid.then((isValid) => {
                this.isuserValid = isValid;
            });
        },
        closeModel() {
            this.showModal = false;
        },
        async handleChangePassword() {
            // const hashedPassword = await bcrypt.hash(this.newpassword, saltRounds);
            try {
                const isMatch = await bcrypt.compare(this.newUserData.oldpass, this.user.password);
                if (isMatch) {
                    const saltRounds = 10; // Number of salt rounds
                    this._user.password = await bcrypt.hash(this.newUserData.newpass, saltRounds);
                    this.handleSubmit();
                    this.closeModel();
                    this.newUserData = {
                        oldpass: '',
                        newpass: '',
                    };
                    this.isShowWrongOldPass = false;
                } else {
                    this.isShowWrongOldPass = true;
                }
            } catch (error) {
                console.error('Error verifying password:', error);
            }
        },
        showPassword0() {
            this.isShowPassword0 = !this.isShowPassword0;
        },
        showPassword1() {
            this.isShowPassword1 = !this.isShowPassword1;
        },
        showPassword2() {
            this.isShowPassword2 = !this.isShowPassword2;
        },
        handleShowModel() {
            if (this.user.type) {
                if (this.user.type == 'OAuthgg') {
                    window.location.href =
                        'https://accounts.google.com/v3/signin/challenge/pwd?TL=AIBe4_Lu0JAP5yM-VnpCSsHVknsjra5NnBKt2YTacbfu6NVLXCUfKJdDwFaknzMa&cid=1&continue=https%3A%2F%2Fmyaccount.google.com%2Fsigninoptions%2Fpassword%3Fcontinue%3Dhttps%3A%2F%2Fmyaccount.google.com%2Fsecurity&flowName=GlifWebSignIn&hl=vi&ifkv=AVQVeyyB3utIrzWXhZouf_Bkm6WXT_EclQVp7B6NMBS3bz4tQ6YwRkMj8dtMqg3BxobFMImVlHGG4Q&kdi=CAM&rart=ANgoxccb4ykv_b0cfkymhrMNbfAFi_uhJzqR3k40ctj_BlHgu_7CCs3ZSpkz2jv71NFwQJKXXwQpVYkEoOja6bQvBwOO7BaM7XTH-j5SXG2wwAarPwVmyzo&rpbg=1&sarp=1&scc=1&service=accountsettings';
                }
            } else {
                this.showModal = true;
            }
        },
    },
    computed: {
        async isUserDataValid() {
            try {
                // Use the validation schema to validate the data
                const result = await this.UserUpdateValidate.isValid(this.user);
                return result;
            } catch (error) {
                return false; // Data is not valid
            }
        },
    },
    watch: {
        'user.img'(newVal) {
            console.log(newVal);
        },
        user(newVal) {
            this.isUserDataValid.then((isValid) => {
                this.$emit('isUserDataValid', isValid);
                this.isuserValid = isValid;
            });
        },
    },
    mounted() {
        // You can use this.isUserDataValid as a function here to get the result.
        this.isUserDataValid.then((isValid) => {
            this.$emit('isUserDataValid', isValid);
            this.isuserValid = isValid;
        });
    },
};
</script>

<style lang="scss" scoped>
.profile-update-btn {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
.profile-change-password-model {
    padding: 10px;
    background-color: #fff;

    div:nth-last-child(1) {
        display: flex;
        justify-content: center;
        margin-top: 6px;
    }
}
</style>
