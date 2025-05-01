import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDrivers from '../components/LookingForDrivers';
import WaitingForDrivers from '../components/WaitingForDrivers';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { useContext, useEffect } from 'react';
import {UserDataContext} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState('');
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();


  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
}, [ user ])

useEffect(() => {
  if(waitingForDriver){
    setVehiclePanelOpen(false);
  }
}, [waitingForDriver])

socket.on('ride-confirmed', ride => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
});

socket.on('ride-started', ride => {
  setWaitingForDriver(false);
  navigate('/riding' , {state:{ride:ride}});
})


  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params:{input:e.target.value},
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data);
    }
    catch{
      //handle error
    }
  }


  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch(error) {
      console.error("Error fetching pickup suggestions", error);
    }
}

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  useGSAP(function () {
    if (panelOpen) {
        gsap.to(panelRef.current, {
            height: '70%',
            padding: 24
            // opacity:1
        })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
            padding: 0
            // opacity:0
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
    }
}, [ panelOpen ])


  useGSAP(function(){

    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[vehiclePanelOpen])

  useGSAP(function(){

    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)',
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(120%)',
      })
    }
    
  },[confirmRidePanel])



  useGSAP(function(){

    if(vehicleFound){
      gsap.to(lookingForDriverRef.current,{
        transform:'translateY(0%)',
      })
    }
    else{
      gsap.to(lookingForDriverRef.current,{
        transform:'translateY(150%)',
      })
    }
    
  },[vehicleFound])



  useGSAP(function(){

    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(0%)',
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(120%)',
      })
    }
    
  },[waitingForDriver])


  const findTrip = async()=>{
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/calculate-fare`, {
      params:{pickup, destination},
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setFare(response.data.fare);
  }

  async function createRide() {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

  return (
    <div className='h-screen relative overflow-hidden'>
      
      <img src='/DrivOnOrange.png' onClick={()=>{setVehiclePanelOpen(false), setPanelOpen(true)}} className='w-30 absolute left-3 top-3'/>
      <div className='w-screen h-screen'>
        <LiveTracking vehicleMode={false}/>
      </div>

      <div className='h-screen justify-end flex flex-col absolute top-0 w-full '>
        <div className='h-[30%] md:px-60 bg-white p-4 relative'>
          <h5 ref={panelCloseRef} className='absolute opacity-0 top-6 right-6 p-2 font-bold text-2xl'>
            <i onClick={() => setPanelOpen(false)}  className=" ri-arrow-down-wide-fill"></i>
          </h5>

          <h4 className='text-2xl font-semibold mt-2 mb-3'>Find a trip</h4>
          <form onSubmit={submitHandler}>
  <div className="relative flex flex-col gap-4">
    {/* Line between dots */}
    <div className="absolute left-6 top-6 bottom-6 z-10 flex items-center">
      <div className="w-1 h-full bg-gray-700 rounded-full"></div>
    </div>

    {/* Dot 1 (pickup) */}
    <div className="absolute w-3 h-3 bg-gray-700 rounded-full left-[21px] top-[16px] z-10"></div>

    {/* Dot 2 (destination) */}
    <div className="absolute w-3 h-3 bg-gray-700 rounded-full left-[21px] bottom-[16px] z-10"></div>

    {/* Inputs */}
    <input
      style={{ paddingLeft: '4rem' }}
      onClick={() => {
        setPanelOpen(true);
        setActiveField('pickup');
      }}
      type="text"
      value={pickup}
      onChange={handlePickupChange}
      className="bg-[#eee] text-center rounded-lg px-8 py-2 w-full placeholder:text-center relative z-0"
      placeholder="Add Pickup Location"
    />

    <input
      style={{ paddingLeft: '4rem' }}
      onClick={() => {
        setPanelOpen(true);
        setActiveField('destination');
      }}
      type="text"
      value={destination}
      onChange={handleDestinationChange}
      className="bg-[#eee] text-center rounded-lg px-8 py-2 w-full placeholder:text-center relative z-0"
      placeholder="Enter Your Destination"
    />
  </div>
</form>


      <div className='flex items-center w-full justify-center'>
          <button onClick={findTrip} className='bg-black w-full md:w-2/5 mt-9 mb-2 text-white px-4 py-2 rounded-lg'>Find Trip</button>
      </div>

          
        </div>

        <div ref={panelRef} className='h-[0%] p-4 w-full bg-white'>
          <LocationSearchPanel 
          suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
          setPanelOpen={setPanelOpen}
          activeField={activeField}
          setPickup={setPickup}
          setVehiclePanel={setVehiclePanelOpen}
          setDestination={setDestination}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full bg-white md:flex md:items-center md:justify-center bottom-0 px-3 pt-6 py-5 z-10 translate-y-full'>
          <VehiclePanel fare={fare} setVehicleType={setVehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

      <div ref={confirmRidePanelRef} className="fixed md:px-40 bottom-0 w-full flex flex-col items-center justify-center bg-white px-3 pt-6 pb-3 z-10 translate-y-full">
          <ConfirmedRide
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          createRide={createRide}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={lookingForDriverRef} className="fixed bottom-0 w-full flex items-center justify-center md:px-40 mb-4 px-3 bg-white pt-6 z-10 translate-y-full">
          <LookingForDrivers fare={fare} pickup={pickup} destination={destination} vehicleType={vehicleType} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full bg-white bottom-0 px-3 pt-12 py-3 z-10 translate-y-full'>
          <WaitingForDrivers
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
          />
      </div>

    </div>
  )
}

export default Home
