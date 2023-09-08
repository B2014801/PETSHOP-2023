const express = require('express');
const router = express.Router();

const product = require('../controllers/Product/product.controller');
const cart = require('../controllers/cart/cart.controller');
const invoice = require('../controllers/invoice/invoice.controller');
const authController = require('../controllers/authController/auth.controller');
const authMiddleware = require('../controllers/authController/auth.middlewares');
const category = require('../controllers/Category/category.controller');
const uploadMiddleware = require('../middlewares/multer');
const path = require('path');

router.route('/').get(product.home);

//product
router.route('/product').get(product.getAllProduct).post(uploadMiddleware.single('img'), product.create);

// router.use('/api/petshop/product/img/:id', express.static(path.join(__dirname, '../store/img')));

// router.route('/product/img/:id').get(product.getProductImg);
router
    .route('/product/:id')
    .put(uploadMiddleware.single('img'), product.update)
    .delete(product.deleteProduct)
    .get(product.findById)
    .post(cart.create);

//cart
// router.route('/cart').get(authMiddleware.isAuth, cart.getAll);
router
    .route('/cart/:id')
    .get(authMiddleware.isAuth, cart.getAllOfOneUser)
    .post(authMiddleware.isAuth, cart.updateAmount);
router.route('/cart/deleteOneProduct').delete(cart.deleteOneProduct);

// router.get('/profile', authMiddleware, async (req, res) => {
//     res.send(req.user);
// });

// auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refreshToken);

//category
router.route('/category').get(category.getAllCategory).post(category.create);

router
    .route('/category/:id')
    .get(category.findById)
    .post(category.update)
    .delete(category.deleteCategory)
    .put(category.update);

// checkout
router.route('/invoice').post(authMiddleware.isAuth, invoice.create).get(authMiddleware.isAuth, invoice.getAllInvoice);
router.route('/invoice/:id').put(authMiddleware.isAuth, invoice.cancelOrder);
// user

module.exports = router;
