import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopups from '../components/RidePopups'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useEffect, useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'



const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const ConfirmridePopupPanelRef = useRef(null);
  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
    })
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

              console.log({
                userId: captain._id,
                location: {
                    ltd: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => clearInterval(locationInterval)
}, [])

socket.on('new-ride',(data)=>{
  setRide(data);
  setRidePopupPanel(true);
})


async function confirmRide(){
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
    rideId:ride._id,
    captainId:captain._id,
    
  }, {
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  setRidePopupPanel(false);
  setConfirmRidePopupPanel(true);
}
  

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
        transform:'translateY(0%)',

      })
    }
    else{
      gsap.to(ConfirmridePopupPanelRef.current,{
        transform:'translateY(120%)',

      })
    }
    
  },[confirmridePopupPanel])

  return (
    <div className='h-screen'>
        <div className='h-3/5 '>
            <LiveTracking vehicleMode={false}/>
            <Link to='/captain-login' className='h-10 w-10 bg-white flex items-center cursor-pointer justify-center rounded-full absolute right-5 top-5'><i className="ri-logout-box-r-line text-2xl"></i></Link>
        </div>

        <div><CaptainDetails/></div>
        
        <div ref={ridePopupPanelRef} className='mb-2 flex items-center justify-center fixed w-full translate-y-full bg-white -bottom-3 pb-4 pt-4 px-3 z-10'>
            <RidePopups
            ride={ride}
            confirmRide={confirmRide}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel} />
        </div>

        <div ref={ConfirmridePopupPanelRef} className='mb-3 flex items-center justify-center fixed w-full translate-y-full bg-white bottom-0 px-3 pt-5 py-3 z-10'>
            <ConfirmRidePopup
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}/>
        </div>

    </div>
  )
}

export default CaptainHome