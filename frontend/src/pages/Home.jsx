import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';


const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

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


  return (
    <div className='h-screen relative'>
      
      <img src='/DrivOn.png' className='w-30 absolute left-3 top-3'/>
      <div className='w-screen h-screen'>
        <img src='/DrivOnMap.gif' className='h-full w-full object-cover'/>
      </div>

      <div className='h-screen justify-end flex flex-col absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-6 relative'>

          <h5 ref={panelCloseRef} className='absolute opacity-0 top-6 right-6 p-2 font-bold text-2xl'>
            <i onClick={() => setPanelOpen(false)}  className="ri-arrow-down-wide-fill"></i>
          </h5>

          <h4 className='text-2xl font-semibold mt-2 mb-3'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e);
          }}>
            <div className='line absolute h-15 w-1 top-[50%] left-15 bg-gray-700 rounded-full'></div>
            <div className='absolute left-14 top-[47%] h-3 w-3 bg-gray-700 rounded-full'></div>
            <div className='absolute left-14 bottom-[19%] h-3 w-3 bg-gray-700 rounded-full'></div>
            <input onClick={()=>setPanelOpen(true)} type='text' value={pickup} onChange={(e)=>{setPickup(e.target.value)}} className='bg-[#eee] text-center rounded-lg px-8 py-2 text-lg w-full mb-2 placeholder:text-center' placeholder='Add Pickup Location'/>
            <input onClick={()=>setPanelOpen(true)} type='text' value={destination} onChange={(e)=>{setDestination(e.target.value)}} className='bg-[#eee] text-center rounded-lg px-8 py-2 text-lg w-full placeholder:text-center' placeholder='Enter Your Destination'/>
          </form>
        </div>

        <div ref={panelRef} className='h-[0%] bg-white'>
          <LocationSearchPanel/>
        </div>
      </div>
    </div>
  )
}

export default Home