import { createApiClient } from './api.service';
class UserService {
    constructor(baseUrl = '/api/petshop/user') {
        this.api = createApiClient(baseUrl, true);
    }
    async getUser(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        return await this.api.put('/update', data);
    }
}
export default new UserService();
