// src/Mapcomponent.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import './Mapcomponent.css'; // Import CSS for the map component
import { useMapContext } from './MapContext'; // Import useMapContext hook
import line from './line.geojson'; // Import GeoJSON data

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5ncmtpIiwiYSI6ImNrc29yeHB2aDBieDEydXFoY240bXExcWoifQ.WS7GVtVGZb4xgHn9dleszQ'; // Replace with your Mapbox access token

const Mapcomponent = () => {
  const { isLayerVisible, setIsLayerVisible } = useMapContext();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [10.4515, 51.1657], // Center map on Germany
      zoom: 5, // Default zoom level
    });

    map.current.on('load', () => {
      map.current.addSource('earthquakes1', {
        type: 'geojson',
        data: line
      });

      map.current.addLayer({
        'id': 'earthquakes-layer1',
        'type': 'line',
        'source': 'earthquakes1',
        'layout': {
          'visibility': 'none' // Initially hidden
        },
        'paint': {
          'line-color': '#ff6600',
          'line-width': 20
        }
      });

      map.current.addSource('inventory123', {
        'type': 'raster',
        'tiles': [
          'http://172.18.1.55:8080/geoserver/landslide_updated_portal/wms?service=WMS&version=1.1.0&request=GetMap&layers=Moosholz_cog&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
        ],
        'tileSize': 256
      });

      map.current.addLayer({
        'id': 'inventory123',
        'type': 'raster',
        'source': 'inventory123',
        'paint': { 'raster-opacity': 1 },
        'layout': { 'visibility': isLayerVisible ? 'visible' : 'none' }
      });

      const zoomInBounds = [
        [9.297029209412212, 47.7158866796921], // Southwest coordinates [lng, lat]
        [9.309357218369737, 47.72583562850856]  // Northeast coordinates [lng, lat]
      ];
      const defaultBounds = [
        [5, 40], // Southwest coordinates [lng, lat] (example)
        [15, 60]  // Northeast coordinates [lng, lat] (example)
      ];

      map.current.fitBounds(defaultBounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 0 // No animation for the default view
      });
    });

  }, []); // Empty dependency array ensures the map is initialized only once

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      map.current.setLayoutProperty('inventory123', 'visibility', isLayerVisible ? 'visible' : 'none');
      map.current.setLayoutProperty('earthquakes-layer1', 'visibility', isLayerVisible ? 'visible' : 'none');

      const zoomInBounds = [
        [9.297029209412212, 47.7158866796921], // Southwest coordinates [lng, lat]
        [9.309357218369737, 47.72583562850856]  // Northeast coordinates [lng, lat]
      ];
      const defaultBounds = [
        [5, 40], // Southwest coordinates [lng, lat] (example)
        [15, 60]  // Northeast coordinates [lng, lat] (example)
      ];

      if (isLayerVisible) {
        if (!isZoomedIn) {
          map.current.fitBounds(zoomInBounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            duration: 2000 // Animation duration
          });
          setIsZoomedIn(true);
        }
      } else if (isZoomedIn) {
        map.current.fitBounds(defaultBounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 2000 // Animation duration
        });
        setIsZoomedIn(false);
      }
    }
  }, [isLayerVisible, isZoomedIn]);

  const toggleLayer = () => {
    setIsLayerVisible(!isLayerVisible);
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <button id="toggle-layer-btn" onClick={toggleLayer}>
        <i className="fas fa-home"></i>
      </button>
    </div>
  );
};

export default Mapcomponent;
