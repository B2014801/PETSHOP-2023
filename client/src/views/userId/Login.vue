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
import PetshopService from '@/services/petshop.service';
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            isShowErrorMessage: '',
        };
    },
    methods: {
        async handleLogin(data) {
            try {
                const result = await PetshopService.login(data);
                if (result) {
                    // this.$router.push({ name: 'home' });
                }
            } catch (error) {
                this.isShowErrorMessage = error.response.data;
            }
        },
    },
};
</script>

<style scoped></style>
