const express = require("express");
const router = express.Router();
const LightController = require('../controller/LightController');

router.post('/get', LightController.getLight);
router.post('/set', LightController.setLight);

module.exports = router