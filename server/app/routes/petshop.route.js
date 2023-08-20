const express = require('express');
const pet = require('../controllers/petshop.controller');

const router = express.Router();

router.route('/').get(pet.welcome);

module.exports = router;
