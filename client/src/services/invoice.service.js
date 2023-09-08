import { createApiClient } from './api.service';
class InvoiceService {
    constructor(baseUrl = '/api/petshop/invoice') {
        this.api = createApiClient(baseUrl, true);
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async getAllInvoice(state, userid) {
        return (await this.api.get(`?state=${state}&userid=${userid}`)).data;
    }
    async cancelOrder(id) {
        return (await this.api.put(`/${id}`)).data;
    }
}
export default new InvoiceService();
