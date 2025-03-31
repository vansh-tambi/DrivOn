import React from 'react'

const WaitingForDrivers = (props) => {
  return (
    <div>
        <div className='flex items-center justify-center -mt-9'>
            <i onClick={() => {props.setWaitingForDriver(false)}}  className=" text-2xl font-bold ri-arrow-down-wide-fill"></i>
        </div>
        
      <div className='flex justify-between'>
          
            
                <img className='h-20' src='DrivOnCar.png' />

                <div className='flex flex-col'>
                    <h2 className='text-lg font-medium'>Sarthak</h2>
                        <h4 className='text-xl font-semibold -mt-2 -mb-1'>RJ14KD2900</h4>
                        <p className='text-gray-700 text-sm'>Hero Maestro</p>
                    </div>    
            

          
        </div>

        <div className='flex gap-2 flex-col justify-between items-center'>
          <div className='w-full'>
            <div className='flex items-center gap-5  border-b-2 border-b-gray-300 p-2'>
              <i className='ri-map-pin-fill text-2xl'></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm text-gray-600'>Kankriya Talab, Bhopal</p>
              </div>
            </div>


            <div className='flex items-center gap-5 border-b-2 border-b-gray-300 p-2'>
              <i className='ri-map-pin-add-fill text-2xl'></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm text-gray-600'>Nehru Nagar, Bhopal</p>
                </div>
            </div>


            <div className='flex items-center gap-5 p-2'>
            <i className="text-2xl ri-money-rupee-circle-fill"></i>
                  <div>
                    <h3 className='text-lg font-medium'>₹193.8</h3>
                    <p className='text-sm text-gray-600'>Cash</p>
                  </div>
            </div>


          </div>
          
        </div>
    </div>
  )
}

export default WaitingForDrivers