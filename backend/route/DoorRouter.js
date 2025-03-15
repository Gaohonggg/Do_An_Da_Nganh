const express = require("express");
const router = express.Router();
const DoorController = require('../controller/DoorController');

router.get('/', DoorController.getDoor);
router.post('/', DoorController.setDoor);

module.exports = router