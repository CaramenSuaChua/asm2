const express = require('express');

const hotelController = require('../controllers/hotel')

const router = express.Router();

router.get('/hotel', hotelController.getHotel)

router.get('/hotel/:hotelId', hotelController.getHotelId)

router.post('/search', hotelController.postSearchHotel)

module.exports = router;