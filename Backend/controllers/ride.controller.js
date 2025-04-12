const rideService = require('../services/ride.service');
const { validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');

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
        console.log(pickupCoordinates);

        const captainsInRadius = await mapService.getCaptainsInRange(pickupCoordinates.ltd, pickupCoordinates.lng, 5);
        
        if (!captainsInRadius) {
            console.log('No captains found in range');
            return;
        }

        ride.otp = "";
        captainsInRadius.forEach((captain) => {
            console.log('Notifying captain:', captain._id);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: ride
            });
        });
    }
    catch(error){
        return res.status(500).json({error:error.message});
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
