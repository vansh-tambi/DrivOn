import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import FinishRide from '../components/FinishRide';



const CaptainRiding = () => {


    const [finishRidePanel, setfinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null)

    useGSAP(function(){
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(0)'
          })
        }
        else{
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(100%)'
          })
        }
        
      },[finishRidePanel])

  return (

    <div className='h-screen'>  
        <div className='h-4/5 '>
            <img src='/DrivOnMap.gif' className='h-full w-full object-cover relative' />
            <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full absolute right-5 top-5'><i className="ri-logout-box-r-line text-2xl"></i></Link>
        </div>

        <div onClick={()=>setfinishRidePanel(true)} className='h-1/5 py-2 px-5 flex flex-col gap-y-3 bg-yellow-300'>
        <i className="text-2xl text-center font-bold ri-arrow-up-wide-fill"></i>

            <div className='flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>4KM away</h4>
                <button className='bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
        </div>
        
        <div ref={finishRidePanelRef} className='mb-3 fixed w-full translate-y-full bg-white -bottom-3 px-3 pt-5 py-3 z-10'>
            <FinishRide setfinishRidePanel={setfinishRidePanel} />
        </div>

    </div>
  )
}

export default CaptainRiding