import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div>
        <div className='flex items-center justify-start my-5 gap-2'>
            <h2 className='font-bold  bg-[#eee] w-9 h-9 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill text-xl"></i></h2>
            <h4 className='font-semibold'>24-B Near Kapoor's Cafe</h4>
        </div>
        <div className='flex items-center justify-start my-5 gap-2'>
            <h2 className='font-bold  bg-[#eee] w-9 h-9 flex items-center justify-center rounded-full'><i className="ri-plane-line text-xl"></i></h2>
            <h4 className='font-semibold'>Van Vihar National Park</h4>
        </div>
        <div className='flex items-center justify-start my-5 gap-2'>
            <h2 className='font-bold  bg-[#eee] w-9 h-9 flex items-center justify-center rounded-full'><i className="ri-hospital-fill text-xl"></i></h2>
            <h4 className='font-semibold'>Kohefiza Road, Bhopal</h4>
        </div>
        <div className='flex items-center justify-start my-5 gap-2'>
            <h2 className='font-bold  bg-[#eee] w-9 h-9 flex items-center justify-center rounded-full'><i className="ri-gas-station-fill text-xl"></i></h2>
            <h4 className='font-semibold'>Ghora Nakkas, van Vihar Road</h4>
        </div>
    </div>
  )
}

export default LocationSearchPanel