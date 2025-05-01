import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div className='md:w-1/2'>
        <div className='flex justify-between'>
          <h3 className=' text-2xl font-bold mb-4'>Choose a Vehicle</h3>
          <i onClick={() => {props.setVehiclePanelOpen(false)}}  className="text-2xl cursor-pointer font-bold ri-arrow-down-wide-fill"></i>
        </div>
          
        <div
        onClick={()=>{props.setConfirmRidePanel(true)
          props.setVehicleType('car')
        }}
        className='flex active:bg-gray-200 mb-4 w-full cursor-pointer border-2 border-black rounded-2xl items-center justify-between p-3'>
            <img className='h-12 ' src='/DrivOnCar.png'/>
            <div className=' w-1/2'>
              <h4 className='text-lg font-bold'><span className='text-[#FF6A00]'>D</span>riv<span className='text-[#FF6A00]'>O</span>n-GO<span className='ml-2 font-semibold'><i className="ri-user-fill font-light"></i>- 4</span></h4>
              <h5 className='font-medium mb-2 text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable Compact Price</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
        </div>


        <div
        onClick={()=>{props.setConfirmRidePanel(true)
          props.setVehicleType('moto')
        }}
        className='flex active:bg-gray-200 mb-4 w-full border-2 border-black rounded-2xl items-center justify-between p-3'>
            <img className='h-12 ' src='/DrivOnBike.webp'/>
            <div className=' w-1/2'>
              <h4 className='text-lg font-bold'><span className='text-[#FF6A00]'>D</span>riv<span className='text-[#FF6A00]'>O</span>n-Moto<span className='ml-2 font-semibold'><i className="ri-user-fill font-light"></i>- 1</span></h4>
              <h5 className='mb-2 font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable Moto Rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
        </div>


        <div
        onClick={()=>{props.setConfirmRidePanel(true)
          props.setVehicleType('auto')
        }}
        className='flex w-full active:bg-gray-200 border-2 mb-4 border-black rounded-2xl items-center justify-between p-3'>
            <img className='h-12 ' src='/DrivOnAuto.webp'/>
            <div className=' w-1/2'>
              <h4 className='text-lg font-bold'><span className='text-[#FF6A00]'>D</span>riv<span className='text-[#FF6A00]'>O</span>n-Auto<span className='ml-2 font-semibold'><i className="ri-user-fill font-light"></i>- 3</span></h4>
              <h5 className='mb-2 font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable Auto Rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel