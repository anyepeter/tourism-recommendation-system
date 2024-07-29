"use client";
import React, { useState } from 'react';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';

interface Marker {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  image: string;
}

interface ServiceProps {
  position: {
    lat: number;
    lng: number;
  };
}

const containerStyle = {
  width: '320px',
  height: '300px'
};

const markers: Marker[] = [
  { id: 1, position: { lat: -37.9136, lng: 144.9631 }, title: "Marker 1", image: "image1.jpg" },
  { id: 2, position: { lat: -37.1036, lng: 144.9631 }, title: "Marker 2", image: "image2.jpg" },
  { id: 3, position: { lat: -37.5936, lng: 144.9631 }, title: "Marker 3", image: "image3.jpg" },
  { id: 4, position: { lat: -37.2836, lng: -37.8136 }, title: "Marker 4", image: "image4.jpg" }
];

function GooglesDetails({ service }: { service: ServiceProps }): JSX.Element {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAFMbjca_jtUOeaQoeBZIiDbXmdyrN0Di0"
  });


 

  

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={service.position}
      zoom={9}
    >
    
        <MarkerF
         
          position={service.position}
         
        />
    
    
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(GooglesDetails);
