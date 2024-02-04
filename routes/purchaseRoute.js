const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, purchaseController.purchase);

module.exports = {
    routes: router
}