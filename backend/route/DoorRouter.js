const express = require("express");
const router = express.Router();
const DoorController = require('../controller/DoorController');

router.get('/', DoorController.getDoor);
router.post('/', DoorController.setDoor);
router.get('/a', DoorController.runPythonMain);

module.exports = router