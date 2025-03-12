const express = require("express");
const router = express.Router();
const AuthController = require('../controller/AuthController');

router.post('/sign_up', AuthController.createUser)
router.post('/log_out', AuthController.logout);
router.post('/log_in', AuthController.login);
router.post('/forgot_password', AuthController.forgotPassword);
router.post('/change_password', AuthController.changePassword);
router.get('/check', AuthController.check);

module.exports = router