import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {


    const location = useLocation();
    const {ride} = location.state;
    console.log(ride.captain.vehicle.vehicleType);
    const {socket} = useContext(SocketContext);
    const navigate = useNavigate();

    socket.on('ride-ended', (data) => {
        console.log(data)
        navigate('/home');
    })


  return (
    <div className='h-screen relative overflow-hidden'>

        <img src='/DrivOnOrange.png' className='absolute h-10 top-2 left-2'/>
        <Link to='/home' className='h-10 w-10 absolute bg-black flex items-center justify-center rounded-full right-2 top-2'>
            <i className="text-xl text-white font-medium ri-logout-box-r-line"></i>
        </Link>

        <div className='h-3/7'>
            <LiveTracking ride={ride}/>
        </div>

        <div className='h-4/7 mt-4 p-4'>
            
            <div className='flex justify-between mb-3'>
            
                
            <img className='h-20' src={
              ride.captain.vehicle.vehicleType === 'car' ? 'DrivOnCar.png' :
              ride.captain.vehicle.vehicleType === 'moto' ? 'DrivOnBike.webp' :
              'DrivOnAuto.webp'
            } />
            

            <div className='flex flex-col'>
                
                <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='text-gray-700 text-sm mt-1'>Hero Maestro</p>
            </div>    
        

        
            </div>

    <div className='flex gap-2 flex-col justify-between items-center'>
        <div className='w-full'>
            <h2 className='text-2xl font-semibold mb-2'>Trip Details:</h2>
        <div className='flex items-center gap-5 border-b-2 border-b-gray-300 p-2'>
            <i className='ri-map-pin-add-fill text-2xl'></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm text-gray-600'>{ride?.destination}</p>
            </div>
        </div>


        <div className='flex items-center gap-5 p-2'>
        <i className="text-2xl ri-money-rupee-circle-fill"></i>
                <div>
                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                <p className='text-sm text-gray-600'>Cash</p>
                </div>
        </div>


        </div>
        
    </div>
            <button className='w-full mt-1 bg-green-500 text-white font-semibold p-2 rounded-lg'>Pay Now</button>
        </div>

    </div>
  )
}

export default Riding