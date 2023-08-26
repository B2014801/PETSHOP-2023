const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const ProductService = require('../../services/product.service');

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
