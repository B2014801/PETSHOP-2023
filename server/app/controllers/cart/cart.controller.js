const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const ProductService = require('../../services/product.service');
const CartService = require('../../services/cart.service');

exports.getAll = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'Error when get all product'));
    }
    return res.send(documents);
};
exports.create = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        console.log('miss body');
    }
    try {
        const cartService = new CartService(MongoDB.client);
        const result = await cartService.create(req.body);
        if (result) {
            res.send(result);
        }
        // else {
        //     return next(new ApiError(404, 'Duplicate Product '));
        // }
    } catch (error) {
        console.log(error);
    }
};
