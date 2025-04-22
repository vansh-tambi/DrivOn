import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import gsap from 'gsap';

const LiveTracking = (props) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);

  const getIconPath = (vehicleType) => {
    switch (vehicleType) {
      case 'car':
        return '/DrivOnCar.png';
      case 'moto':
        return '/DrivOnBike.webp';
      case 'auto':
        return '/DrivOnAuto.webp';
      default:
        return '/marker_round.png';
    }
  };

  const createCustomMarkerContent = (iconUrl) => {
    const img = document.createElement('img');
    img.src = iconUrl;
    img.style.width = '30px';
    img.style.height = '30px';
    img.style.objectFit = 'contain';
    return img;
  };

  const animateMapTo = (target) => {
    if (!mapInstance.current) return;

    const currentCenter = mapInstance.current.getCenter();
    const obj = {
      lat: currentCenter.lat(),
      lng: currentCenter.lng(),
    };

    gsap.to(obj, {
      duration: 1.2,
      lat: target.lat,
      lng: target.lng,
      ease: 'power2.out',
      onUpdate: () => {
        mapInstance.current.panTo(obj);
      },
    });
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
      version: 'weekly',
      libraries: ['marker'],
    });

    loader.load().then(() => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const initialPos = { lat: coords.latitude, lng: coords.longitude };
          setPosition(initialPos);

          mapInstance.current = new google.maps.Map(mapRef.current, {
            center: initialPos,
            zoom: 16,
            mapId: 'DEMO_MAP_ID',
            gestureHandling: 'greedy',
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          });

          const iconPath = getIconPath(props?.ride?.captain?.vehicle?.vehicleType);
          const markerContent = createCustomMarkerContent(iconPath);

          markerRef.current = new google.maps.marker.AdvancedMarkerElement({
            map: mapInstance.current,
            position: initialPos,
            content: markerContent,
          });

          animateMapTo(initialPos);

          const intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
              ({ coords }) => {
                const newPos = { lat: coords.latitude, lng: coords.longitude };
                console.log('📍 Updated Position:', newPos);
                setPosition(newPos);
                animateMapTo(newPos);

                if (markerRef.current) {
                  markerRef.current.position = new google.maps.LatLng(
                    newPos.lat,
                    newPos.lng
                  );
                }
              },
              (err) => console.error('Geolocation error:', err),
              { enableHighAccuracy: true, timeout: 5000 }
            );
          }, 10000);

          // Cleanup on unmount
          return () => clearInterval(intervalId);
        },
        (err) => {
          console.error('Initial geolocation fetch failed:', err);
          alert('Location access is required to load the map.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }, [props.vehicleType]);

  return (
    <div className="h-full w-full object-cover relative">
      <div ref={mapRef} className="w-full h-full" />

      {position && (
        <div className="absolute bottom-0 w-3/5 flex items-center rounded-sm justify-center bg-green-100 left-1/2 transform -translate-x-1/2 backdrop-blur-sm px-1 py-1 text-sm font-semibold text-gray-700 animate-fade-in">
          📍 Tracking your live location
        </div>
      )}
    </div>
  );
};

export default LiveTracking;
