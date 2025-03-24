const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require("express-validator");

module.exports.registerCaptain = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors){
        return res.status(400).json({error:errors.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({email});
    if(isCaptainAlreadyExists){
        return res.status(400).json({message:'Captain already Registered'});
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName:fullname.firstName,
        lastName:fullname.lastName,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
    
}