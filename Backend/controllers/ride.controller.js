const rideService = require('../services/ride.service');
const { validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

    const { pickup, destination, vehicleType} = req.body;
    

    try{
        const ride = await rideService.createRide({user:req.user._id,pickup, destination, vehicleType});
        res.status(201).json(ride);
        
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        

        const captainsInRadius = await mapService.getCaptainsInRange(pickupCoordinates.ltd, pickupCoordinates.lng, 5, vehicleType);
        
        if (!captainsInRadius) {
            console.log('No captains found in range');
            return;
        }
        
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({_id:ride._id}).populate('user');

        captainsInRadius.map(captain => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}

module.exports.endRide = async(req, res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const {rideId} = req.body;
    try{
        const ride = await rideService.endRide({rideId, captain:req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event:'ride-ended',
            data:ride
        })
        return res.status(200).json(ride);
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports.startRide = async(req, res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const {rideId, otp} = req.query;

    try{
        const ride = await rideService.startRide({rideId,otp});
        sendMessageToSocketId(ride.user.socketId, {
            event:'ride-started',
            data:ride
        })
        return res.status(200).json(ride);
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports.calculateFare = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

    const {pickup, destination} = req.query;
    try{
        const fare = await rideService.calculateFare(pickup, destination);
        return res.status(200).json({fare});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
}


module.exports.confirmRide = async(req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const {rideId} = req.body;
    try{
        const ride = await rideService.confirmRide({rideId, captain:req.captain});
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}