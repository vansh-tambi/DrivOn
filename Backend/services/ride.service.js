const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');




function getOTP(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10,num)).toString();
    return otp;
}

async function calculateFare( origin, destination){
    if (!origin || !destination) {
        throw new Error('Pickup and destination are required');
    }


    const distanceTime = await mapService.getDistanceTime(origin, destination);
    const baseFare = {
        auto: 18,
        car: 30,
        moto: 12
    };

    const perKmRate = {
        auto: 5,
        car: 8,
        moto: 4
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
    
}


module.exports.startRide = async({rideId, otp})=>{
    if(!rideId || !otp){
        throw new Error('Ride id and otp are required');
    }
    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status !== 'accepted'){
        throw new Error('Ride is not accepted');
    }
    if(ride.otp !== otp){
        throw new Error('Invalid otp');
    }
    
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'ongoing',
    })
    sendMessageToSocketId(ride.user.socketId, {
        event:'ride-started',
        data:ride
    })
    return ride;
}


module.exports.endRide = async({rideId, captain})=>{
    if(!rideId){
        throw new Error('Ride id is required');
    }
    const ride = await rideModel.findOne({
        _id:rideId,
        captain:captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status !== 'ongoing'){
        throw new Error('Ride is not ongoing');
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'completed'
    })
    return ride;
}

module.exports.calculateFare = calculateFare;

module.exports.createRide = async({user, pickup, destination, vehicleType})=>{
    if( !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }
    const fare = await calculateFare(pickup, destination);
    const farevehicle = fare[vehicleType]
    
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare:farevehicle,
        otp:getOTP(6)
    })

    return ride;
    
}

module.exports.confirmRide = async({rideId, captain})=>{
    if(!rideId){
        throw new error('Ride id is required');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found')
    }


    return ride;
}


module.exports.calculateFare = calculateFare;
