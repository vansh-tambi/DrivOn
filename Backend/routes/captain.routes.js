const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstName').isLength({min:3}).withMessage('First Name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate n0. must be at least 3 characters'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle', 'auto']).withMessage('vehicleType must be from one of the options car, auto or motorcycle')
], captainController.registerCaptain);


router.post('/login' ,[
    body('email').isEmail().withMessage('Enter valid email'),
    body('password').isLength({min:6}).withMessage('Enter valid 6 characters password'),
] , captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;