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
                    // const $cookies = inject('$cookies');
                    // this.$router.push({ name: 'home' });

                    // this.$cookies.set('accessToken', result.accessToken);
                    // console.log($cookies);
                    this.$store.commit('setAccessToken', result.accessToken);
                    console.log(result.accessToken);
                }
            } catch (error) {
                // this.isShowErrorMessage = error.response.data;
                console.log(this.$store);
            }
        },
    },
};
</script>

<style scoped></style>
