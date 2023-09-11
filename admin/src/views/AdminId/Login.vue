<template>
    <div v-if="isShowErrorMessage" class="mt-2 text-center">
        <strong class="text-danger">{{ isShowErrorMessage }}</strong>
    </div>

    <div>
        <LoginForm @submit:login="handleLogin" />
    </div>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';
// import PetshopService from '@/services/petshop.service';
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            isShowErrorMessage: '',
            loading: false,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),

        async handleLogin(user) {
            this.loading = true;

            try {
                const result = await this.login(user);
                if (result.user.role == 'admin') {
                    this.$router.push({ name: 'category' });
                } else {
                    alert('Bạn không có quyền truy cập trang web này');
                }
            } catch (error) {
                console.log(error);

                this.loading = false;
                this.message = 'Đã có lỗi xảy ra.';
            }
        },
    },
};
</script>

<style scoped></style>
