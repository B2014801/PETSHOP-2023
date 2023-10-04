import { createApiClient } from './api.service';
class Comment {
    constructor(baseUrl = '/api/petshop/comments') {
        this.api = createApiClient(baseUrl, false);
        this.apiWithAuth = createApiClient(baseUrl, true);
    }
    async getAll(product_id) {
        return (await this.api.get(`?pi=${product_id} `)).data;
    }
    async create(data) {
        return await this.api.post('/add', data);
    }
}
export default new Comment();
