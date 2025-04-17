import React from 'react'

const LocationSearchPanel = ({suggestions,  activeField, setPickup, setDestination}) => {

  const handleSuggestionClick = (suggestion) => {
    if(activeField === 'pickup'){
      setPickup(suggestion.description)
    }else if(activeField === 'destination'){
      setDestination(suggestion.description)
    }
  }
      return (
        
        <div className='mt-7'>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex mb-2 gap-5 border-2 p-3 py-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem.description}</h4>
                    </div>
                ))
            }
        </div>
      );
      
}

export default LocationSearchPanel