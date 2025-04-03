import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopups from '../components/RidePopups'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const ConfirmridePopupPanelRef = useRef(null);

  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[ridePopupPanel])



  useGSAP(function(){
    if(confirmridePopupPanel){
      gsap.to(ConfirmridePopupPanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(ConfirmridePopupPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
    
  },[confirmridePopupPanel])

  return (
    <div className='h-screen'>
        <div className='h-3/5 '>
            <img src='/DrivOnMap.gif' className='h-full w-full object-cover relative' />
            <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center justify-center rounded-full absolute right-5 top-5'><i className="ri-logout-box-r-line text-2xl"></i></Link>
        </div>

        <div><CaptainDetails/></div>
        
        <div ref={ridePopupPanelRef} className='mb-3  fixed w-full translate-y-full bg-white bottom-0 px-3 pt-5 py-3 z-10'>
            <RidePopups setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
        </div>

        <div ref={ConfirmridePopupPanelRef} className='mb-3 h-full fixed w-full translate-y-full bg-white bottom-0 px-3 pt-5 py-3 z-10'>
            <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>

    </div>
  )
}

export default CaptainHome