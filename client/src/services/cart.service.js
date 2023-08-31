import { createApiClient } from './api.service';
class CartService {
    constructor(baseUrl = '/api/petshop/cart') {
        this.api = createApiClient(baseUrl, true);
    }

    async getCarts() {
        try {
            return (await this.api.get('/')).data;
        } catch (error) {}
    }

    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
}

export default new CartService();
