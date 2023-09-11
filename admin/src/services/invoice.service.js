import { createApiClient } from './api.service';
class Invoice {
    constructor(baseUrl = '/api/petshop/invoice') {
        this.api = createApiClient(baseUrl, true);
    }
    async getAllInvoice() {
        return (await this.api.get('/all')).data;
    }
}

export default new Invoice();
