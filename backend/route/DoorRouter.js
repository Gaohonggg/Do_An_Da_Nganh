const express = require("express");
const router = express.Router();
const DoorController = require('../controller/DoorController');

router.post('/get', DoorController.getDoor);
router.post('/set', DoorController.setDoor);
router.get('/face', DoorController.getFace);
router.post('/face', DoorController.setFace);

module.exports = router