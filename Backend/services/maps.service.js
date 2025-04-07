const axios = require('axios');

module.exports.getAddressCoordinates = async(address)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location;
            return{
                ltd:location.lat,
                lng:location.lng
            };
    }
    else{
        throw new Error('Unable to fetch coordinates');
    }
}
catch(error){
    console.log(error);
    throw error;
}
}

module.exports.getDistanceTime = async(origin, destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

    try{
        const response = await axios.get(url);


        if(response.data.status === 'OK'){

            const duration = response.data.routes[0].legs[0].duration;
            const distance = response.data.routes[0].legs[0].distance;   
            return{
                duration,
                distance
            };
        }
        else{
            throw new Error('Unable to fetch distance and time');
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }

}


module.exports.getSuggestions = async(input)=>{
    if(!input){
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch suggestions');
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
