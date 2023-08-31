import axios from 'axios';
import vm from '@/main';

const commonConfig = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export const createApiClient = (baseURL, withAuthToken = false) => {
    const api = axios.create({
        baseURL,
        ...commonConfig,
    });

    if (withAuthToken) {
        api.interceptors.request.use(async (config) => {
            const module = await import('@/stores/auth.store');
            const { useAuthStore } = module;
            try {
                const auth = useAuthStore();
                await auth.loadAuthState();

                const user = auth.user;
                if (user && user.accessToken) {
                    config.headers.x_authorization = `${user.accessToken}`;
                    return config;
                } else {
                    alert('bạn phải đăng nhập trước');
                    vm.$router.push({ name: 'login' });
                }
            } catch (error) {
                console.log(error);
            }
        });

        api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status == 401) {
                    // Maybe token expired, so logout
                    // auth.logout();
                    // console.log(error);
                    alert('Phiên đăng nhập đã hết hạn');
                    vm.$router.push({ name: 'login' });
                }
                return Promise.reject(error);
            },
        );
    }

    return api;
};
