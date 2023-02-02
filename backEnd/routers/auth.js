const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login',[
    check('username')
        .not()
        .isEmpty(),
    check('password')
        .not()
        .isEmpty(),
    ], authController.authorizeUser);

router.get('/logout', authController.logoutUser);

module.exports = router;