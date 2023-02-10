const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/register', userController.postRegUser)
router.post('/login', userController.postLoginUser)

module.exports = router;