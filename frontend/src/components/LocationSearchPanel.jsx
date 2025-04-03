import React from 'react'

const LocationSearchPanel = (props) => {

    const locations = [
        { icon: "ri-map-pin-fill", text: "69GX+VV9, Boulevard St TT Nagar, Bhopal" },
        { icon: "ri-plane-line", text: "698G+J5C, Van Vihar Rd, Prempura, Bhopal" },
        { icon: "ri-hospital-fill", text: "Kohefiza Road, Bhopal" },
        { icon: "ri-gas-station-fill", text: "49/17, Sunhari Bagh, TT Nagar, Bhopal" },
      ];
      
      return (
        
        <div onClick={()=>{props.setVehiclePanel(true), props.setPanelOpen(false)}} className="w-full flex flex-col gap-y-3">
          {locations.map((item, index) => (
            <div key={index} className="flex border border-gray-300 p-2 rounded-2xl items-center my-2 gap-4">
              <h2 className="bg-[#eee] w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                <i className={`${item.icon} text-xl`}></i>
              </h2>
              <h4 className="font-semibold flex-1">{item.text}</h4>
            </div>
          ))}
        </div>
      );
      
}

export default LocationSearchPanel