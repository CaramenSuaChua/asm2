const express = require('express');

const transactionController = require('../controllers/transaction')

const router = express.Router();

router.post('/transactions', transactionController.postTrans)

router.get('/transactions', transactionController.getTrans)

module.exports = router;