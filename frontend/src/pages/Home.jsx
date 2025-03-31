import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';


const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        padding:24
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }

    else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])


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
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[confirmRidePanel])


  return (
    <div className='h-screen relative overflow-hidden'>
      
      <img src='/DrivOnOrange.png' onClick={()=>{setVehiclePanelOpen(false), setPanelOpen(true)}} className='w-30 absolute left-3 top-3'/>
      <div className='w-screen h-screen'>
        <img src='/DrivOnMap.gif' className='h-full w-full object-cover'/>
      </div>

      <div className='h-screen justify-end flex flex-col absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-4 relative'>

          <h5 ref={panelCloseRef} className='absolute opacity-0 top-6 right-6 p-2 font-bold text-2xl'>
            <i onClick={() => setPanelOpen(false)}  className="ri-arrow-down-wide-fill"></i>
          </h5>

          <h4 className='text-2xl font-semibold mt-2 mb-3'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e);
          }}>
            <div className='line absolute h-15 w-1 top-[45%] left-15 bg-gray-700 rounded-full'></div>
            <div className='absolute left-14 top-[42%] h-3 w-3 bg-gray-700 rounded-full'></div>
            <div className='absolute left-14 bottom-[23%] h-3 w-3 bg-gray-700 rounded-full'></div>
            <input onClick={()=>setPanelOpen(true)} type='text' value={pickup} onChange={(e)=>{setPickup(e.target.value)}} className='bg-[#eee] text-center rounded-lg px-8 py-2 text-lg w-full mb-2 placeholder:text-center' placeholder='Add Pickup Location'/>
            <input onClick={()=>setPanelOpen(true)} type='text' value={destination} onChange={(e)=>{setDestination(e.target.value)}} className='bg-[#eee] text-center rounded-lg px-8 py-2 text-lg w-full placeholder:text-center' placeholder='Enter Your Destination'/>
          </form>
        </div>

        <div ref={panelRef} className='h-[0%] w-full bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanelOpen}  />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='mb-5 translate-y-full fixed w-full bg-white bottom-0 px-3 pt-12 py-5 z-10'>
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

      <div ref={confirmRidePanelRef}  className='mb-5 translate-y-full fixed w-full bg-white bottom-0 px-3 pt-12 py-3 z-10'>
          <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} />
      </div>

    </div>
  )
}

export default Home