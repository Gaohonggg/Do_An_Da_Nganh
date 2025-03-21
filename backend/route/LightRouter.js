const express = require("express");
const router = express.Router();
const LightController = require('../controller/LightController');

router.get('/', LightController.getLight);
router.post('/', LightController.setLight);

module.exports = router