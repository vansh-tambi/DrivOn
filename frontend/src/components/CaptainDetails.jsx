import React from 'react'

const CaptainDetails = () => {
  return (
    <div className='h-2/5 p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-start gap-4'>
                <img src='/DrivOnDriver.jpeg' className='h-20 object-cover w-20 rounded-full' />
                <h4 className='text-lg font-medium'>Harsh Patel</h4>
              </div>

              <div>
                <h4 className='text-xl font-semibold'>₹295.2</h4>
                <p className='text-sm font-medium text-gray-700'>Earned</p>
              </div>

            </div>

            <div className='flex p-4 justify-center bg-gray-100 mt-6 rounded-xl gap-5 items-start'>
              <div className='text-center'>
                <i className="text-3xl opacity-35 mb-2 font-thin ri-time-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-700'>Hours Online</p>
              </div>
              
              <div className='text-center'>
                <i className="text-3xl opacity-35 mb-2 font-thin ri-speed-up-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-700'>Hours Online</p>
              </div>

              <div className='text-center'>
                <i className="text-3xl opacity-35 mb-2 font-thin ri-file-list-3-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-700'>Hours Online</p>
              </div>

              
            </div>
        </div>
  )
}

export default CaptainDetails