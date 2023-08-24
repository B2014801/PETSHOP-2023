const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const ProductService = require('../../services/product.service');

exports.home = async (req, res, next) => {
    res.send('wheo come home');
};

exports.createProduct = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the product' + error));
    }
};

exports.getAllProduct = async (req, res, next) => {
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

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({ message: 'Product was updated successfully' });
    } catch (error) {
        return next(new ApiError(500, `Error updating Product with id=${req.params.id} ${error}`));
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.deleteProduct(req.params.id);
        if (document) {
            res.send('delete success');
        } else {
            return next(new ApiError(404, 'Product not found'));
        }
    } catch (error) {
        console.log(error);
    }
};
exports.findById = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Product not found '));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving Product with id = ${req.params.id}`));
    }
};
