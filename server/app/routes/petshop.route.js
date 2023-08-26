const express = require('express');
const product = require('../controllers/Product/product.controller');
const cart = require('../controllers/cart/cart.controller');
const authController = require('../controllers/authController/auth.controller');
const authMiddleware = require('../controllers/authController/auth.middlewares');
const router = express.Router();

router.route('/').get(product.home);

router.route('/product').get(product.getAllProduct).post(product.createProduct);
router.route('/cart').get(authMiddleware.isAuth, cart.getAll);

// router.get('/profile', authMiddleware, async (req, res) => {
//     res.send(req.user);
// });
router.route('/product/:id').put(product.update).delete(product.deleteProduct).get(product.findById);

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refreshToken);

module.exports = router;
