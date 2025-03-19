const express = require("express");
const router = express.Router();
const UserController = require('../controller/UserController');

router.get('/info', UserController.getInfo);
router.post('/info', UserController.setInfo);
router.get('/history', UserController.getHistory);
router.get('/notice', UserController.getNotice);

module.exports = router