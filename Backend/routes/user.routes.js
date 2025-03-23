const express =require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstName').isLength({min:3}).withMessage('First Name must be 3 characters long'),
    body('password').isLength({mid:6}).withMessage('password must be 6 characters long'),

], userController.registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password Length must be at least 6 characters')
], userController.loginUser);


router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout' ,authMiddleware.authUser, userController.logoutUser);


module.exports = router;