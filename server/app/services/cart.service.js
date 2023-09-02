const { ObjectId } = require('mongodb');
class CartService {
    constructor(client) {
        // get collection product
        this.Cart = client.db().collection('carts');
        this.Cart.createIndex({ UserId: 1, ProductId: 1 }, { unique: true });
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCartData(payload) {
        const cart = {
            ProductId: payload.ProductId,
            UserId: payload.UserId,
            Amount: payload.Amount,
        };
        // Remove undefined fields
        Object.keys(cart).forEach((key) => cart[key] === undefined && delete cart[key]);
        return cart;
    }
    // create and save cart
    async create(payload) {
        try {
            const cart = this.extractCartData(payload);
            const result = await this.Cart.findOneAndUpdate(
                cart,
                { $set: {} },
                { returnDocument: 'after', upsert: true },
            );

            // if (result.lastErrorObject.updatedExisting) {
            //     return false;
            // } else {
            return result.value;
            // }
        } catch (error) {}
    }
}
module.exports = CartService;
