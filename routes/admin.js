const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

router.post('/login', adminController.postLogin);

router.get('/inforusers', adminController.getInfoUser)
router.get('/infortrans', adminController.getInfoTran)


router.get('/inforhotels', adminController.getInforHotel)
router.post('/deletehotel', adminController.deleteHotel)
router.post('/addhotel', adminController.addHotel)
router.post('/edithotel', adminController.editHotel)


router.get('/inforrooms', adminController.getInforRoom)
router.post('/deleteroom', adminController.deleteRoom)
router.post('/addroom', adminController.addRoom)
router.post('/editroom', adminController.editRoom)

module.exports = router