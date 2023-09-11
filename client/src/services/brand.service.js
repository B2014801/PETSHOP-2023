import { createApiClient } from './api.service';
class BrandService {
    constructor(baseUrl = '/api/petshop') {
        this.api = createApiClient(baseUrl);
    }
    async getAllBrandWithCategoryId(id) {
        return (await this.api.get(`/brand?categoryId=${id}`)).data;
    }
}
export default new BrandService();
