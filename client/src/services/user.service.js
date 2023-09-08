import { createApiClient } from './api.service';
class CartService {
    constructor(baseUrl = '/api/petshop/user') {
        this.api = createApiClient(baseUrl, true);
    }
}
