const express = require("express");
const router = express.Router();
const FanController = require('../controller/FanController');

router.get('/', FanController.getFan);
router.post('/', FanController.setFan);

module.exports = router