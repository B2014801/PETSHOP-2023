const express = require('express');
const product = require('../controllers/Product/product.controller');
const authController = require('../controllers/authController/auth.controller');

const router = express.Router();

router.route('/').get(product.home);

router.route('/product').get(product.getAllProduct).post(product.createProduct);

router.route('/product/:id').put(product.update).delete(product.deleteProduct).get(product.findById);

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
// router.post('/refresh', authController.refreshToken);

module.exports = router;
