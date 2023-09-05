import { createApiClient } from './api.service';
class CartService {
    constructor(baseUrl = '/api/petshop/checkout') {
        this.api = createApiClient(baseUrl, true);
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
}
export default new CartService();
