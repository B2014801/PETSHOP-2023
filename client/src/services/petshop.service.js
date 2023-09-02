import { createApiClient } from './api.service';
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
    async createUser(data) {
        return (await this.api.post('/auth/register', data)).data;
    }
    async login(data) {
        return (await this.api.post('/auth/login', data)).data;
    }
    async getImg(name) {
        return (await this.api.get(`/product/img/${name}`)).data;
    }
    async findByName(name) {
        return (await this.api.get(`/product/?name=${name}`)).data;
    }
    async addToCart(id, data) {
        return (await this.api.post(`/product/${id}`, data)).data;
    }

    // async getCart() {
    //     return (await this.api.get('/cart')).data;
    // }
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
}

export default new PetShopService();
