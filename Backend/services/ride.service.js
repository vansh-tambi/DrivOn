const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');




function getOTP(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10,num)).toString();
    return otp;
}

async function calculateFare( origin, destination, vehicleType){
    if(!origin || !destination || !vehicleType){
        throw new Error('Origin and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(origin, destination);
    const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
    const durationInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

    // Base fare and per km rates for different vehicle types
    const fareRates = {
        car: {
            baseFare: 20,
            perKm: 7,
            perMinute: 0.8
        },
        auto: {
            baseFare: 15,
            perKm: 6,
            perMinute: 0.5
        },
        moto: {
            baseFare: 10,
            perKm: 4,
            perMinute: 0.3
        }
    };

    if (!fareRates[vehicleType]) {
        throw new Error('Invalid vehicle type');
    }

    const rates = fareRates[vehicleType];
    const fare = rates.baseFare + 
                (distanceInKm * rates.perKm) + 
                (durationInMinutes * rates.perMinute);

    // Round to 2 decimal places
    return Math.round(fare * 100) / 100;
}


module.exports.createRide = async({user, pickup, destination, vehicleType})=>{
    if( !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }
    const fare = await calculateFare(pickup, destination, vehicleType);
    
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare,
        otp:getOTP(6)
    })

    return ride;
    
}


module.exports.calculateFare = calculateFare;
