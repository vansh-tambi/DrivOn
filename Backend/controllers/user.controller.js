const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");


module.exports.registerUser = async(req, res, next)=>{
    const error = validationResult(req);
    if(!error){
        return res.status(400).json({error:error.array()});
    }

    const {fullname, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({email});
    if(isUserAlreadyExists){
        return res.status(400).json({message:'User already Registered'});
    }

    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstName: fullname.firstName,
        lastName: fullname.lastName,
        email,
        password:hashPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({token,user});

    
}

module.exports.loginUser = async(req, res, next)=>{
    const error = validationResult(req);
    if(!error){
        return res.status(400).json({ error: error.array()});
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.cookie('token' ,token);
    return res.status(200).json({token, user});
}

module.exports.getUserProfile = async(req, res, next)=>{
    return res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next)=>{

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'token not found'});
    }
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    return res.status(200).json({message:'logged out successfully'});     
}