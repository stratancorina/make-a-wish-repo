import React, { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import AutoFill from "./AutoFill";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import Geocoder from "./Geocoder";
import useFormContext from "../hooks/useFormContext";
const TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

const FormLocation = () => {

  const [lng, setLng] = useState(27.6014);
  const [lat, setLat] = useState(47.1585);
  const [zoom, setZoom] = useState(12);
  const [delivery, setDelivery] = useState();

  const { data , handleChange, setData } = useFormContext();
  
  const handleMarkerDragEnd = (event) => {
    const { lngLat } = event;
    setLng(lngLat.lng);
    setLat(lngLat.lat);
    // console.log(lngLat)
  };

  const handleGeolocate = (event) => {
    const { coords } = event;
    setLng(coords.longitude);
    setLat(coords.latitude);
  };

  const handleAddressConfirm = (address) => {
    // Handle the selected address and its coordinates
    console.log('Selected Address:', address.text_en);

    const new_lat= address.geometry.coordinates[1];
    const new_lng= address.geometry.coordinates[0];

    const city = address.properties.address_level1;
    console.log(city);

    let updatedDelivery;
    if (city === "Iași") {
      console.log('cost livrare', '200 lei')
      updatedDelivery = 50;
    } else {
      updatedDelivery = 100;
    }
    

    setData((prevData) => ({
      ...prevData,
      address: address.properties.full_address,
      deliveryPrice: updatedDelivery,
    }));

    setLng(new_lng);
    setLat(new_lat);
  };

  console.log(data.address);
  console.log(data.delivery);

  const mapRef = useRef(null);
  useEffect(() => {
    if (!lng && !lat) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            setLng(longitude);
            setLat(latitude);
            mapRef.current.flyTo({
              center: [longitude, latitude],
            });
          },
          (error) => {
            console.log('Error retrieving location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
  }, []);

  return (
    <div className="inherit-width disp-fl">
      <div className="map-container">
        <ReactMapGL
        ref={mapRef}
          mapboxAccessToken={TOKEN}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: zoom,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(viewport) => {
            setLng(viewport.longitude);
            setLat(viewport.latitude);
          }}
        >
          <Marker
            latitude={lat}
            longitude={lng}
            // draggable
            onDragEnd={(e) => handleMarkerDragEnd(e)}
            style={{ zIndex: 99 }}
          ></Marker>

          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => handleGeolocate(e)}
          />
          <Geocoder/>
        </ReactMapGL>
      </div>
      <AutoFill defaultValue={data.address} onAddressConfirm={handleAddressConfirm} />

    </div>
  );
};

export default FormLocation;
