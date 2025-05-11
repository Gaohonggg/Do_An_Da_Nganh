const express = require("express");
const router = express.Router();
const FanController = require('../controller/FanController');

router.post('/get', FanController.getFan);
router.post('/set', FanController.setFan);

module.exports = router