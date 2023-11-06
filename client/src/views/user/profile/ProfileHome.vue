<template>
    <div class="container my-2" v-if="user != null">
        <hr />
        <h3 class="text-center text-uppercase">Thông tin cá nhân</h3>
        <UpdateUserInforForm :countUpdateTime="countUpdateTime" :user="user" @submit:update="handleUpdateUser" />
    </div>
</template>

<script>
import UserService from '@/services/user.service';
import { useAuthStore } from '@/stores/auth.store';
import UpdateUserInforForm from '@/components/form/UpdateUserInforForm.vue';

export default {
    components: {
        UpdateUserInforForm,
    },
    data() {
        return {
            user: null,
            countUpdateTime: 0,
        };
    },
    methods: {
        async getUser() {
            const auth = useAuthStore();
            await auth.loadAuthState();
            if (auth.user) {
                return auth.user.user;
            }
        },
        async getUserInfor() {
            try {
                const user = await this.getUser();

                this.user = await UserService.getUser(user._id);
                const auth = useAuthStore();
                if (auth.getExpired == true) {
                    this.$router.push({ name: 'login' });
                }
            } catch (e) {
                this.$router.push({ name: 'login' });
            }
        },
        async handleUpdateUser(data) {
            try {
                const result = await UserService.update(data);
                if (result) {
                    this.getUserInfor();
                    this.countUpdateTime++;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getUserInfor();
    },
};
</script>

<style lang="scss" scoped></style>
