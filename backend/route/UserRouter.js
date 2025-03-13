const express = require("express");
const router = express.Router();
const UserController = require('../controller/UserController');

router.get('/info', UserController.getInfo);
router.post('/info', UserController.setInfo);

module.exports = router