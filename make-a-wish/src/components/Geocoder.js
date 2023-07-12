import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useState } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
  const [location, setLocation] = useState({ lng: 0, lat: 0 });

  const handleLocationUpdate = (lng, lat) => {
    setLocation({ lng, lat });
  };

  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);

  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    handleLocationUpdate(coords[0], coords[1]);
  });

  return null;
};

export default Geocoder;
