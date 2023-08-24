import createApiClient from './api.service';
class PetShopService {
    constructor(baseUrl = '/api/petshop') {
        this.api = createApiClient(baseUrl);
    }
    async getAllProduct() {
        return (await this.api.get('/product')).data;
    }
    async findProductById(id) {
        return (await this.api.get(`/product/${id}`)).data;
    }
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
}

export default new PetShopService();
