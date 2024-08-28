import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
// import hush from './hush_points.geojson'; // Import GeoJSON data

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5ncmtpIiwiYSI6ImNrc29yeHB2aDBieDEydXFoY240bXExcWoifQ.WS7GVtVGZb4xgHn9dleszQ';

const Mapcomponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [isEarthquakesLayerVisible, setEarthquakesLayerVisible] = useState(false);
    const [isInventoryLayerVisible, setInventoryLayerVisible] = useState(true);

    useEffect(() => {
        if (map.current) return; // Initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            zoom: 1,
            style: 'mapbox://styles/mapbox/satellite-streets-v12'
        });

        map.current.on('style.load', () => {
            map.current.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 2048
            });
            map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        });

        map.current.on('load', () => {
            // Add earthquakes layer
            map.current.addSource('earthquakes-layer', {
                'type': 'raster',
                'tiles': [
                    'http://172.18.1.55:8080/geoserver/national_boundary_final_pak/wms?service=WMS&version=1.1.0&request=GetMap&layers=datada_datada&bbox={bbox-epsg-3857}&width=768&height=558&srs=EPSG:3857&styles=&format=image/png&transparent=true'
                ],
                'tileSize': 256
            });

            map.current.addLayer({
                'id': 'earthquakes-layer',
                'type': 'raster',
                'source': 'earthquakes-layer',
                'paint': { 'raster-opacity': 1 },
                'layout': { 'visibility': 'none' } // Initially visible
            });

            // Add the inventory layer
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
                'layout': { 'visibility': 'none' } // Initially visible
            });

            // Define the bounds of the inventory layer
            // const bounds = [
            //     [9.297029209412212, 47.7158866796921], // Southwest coordinates [lng, lat]
            //     [9.309357218369737, 47.72583562850856]  // Northeast coordinates [lng, lat]
            // ];

            // map.current.fitBounds(bounds, {
            //     padding: { top: 50, bottom: 50, left: 50, right: 50 },
            //     duration: 2000 // Animation duration in milliseconds
            // });
        });
    }, []); // Empty dependency array ensures the map is initialized only once

    const toggleEarthquakesLayer = () => {
        setEarthquakesLayerVisible(prevState => !prevState);
        if (map.current) {
            map.current.setLayoutProperty(
                'earthquakes-layer',
                'visibility',
                isEarthquakesLayerVisible ? 'none' : 'visible'
            );
            if (!isEarthquakesLayerVisible) {
                map.current.flyTo({
                    center: [9.118116, 48.379829], // [longitude, latitude]
                    zoom: 16, // Adjust the zoom level as needed
                    essential: true // This ensures the animation is not skipped
                });
            }
        }
    };
// Southwest and Northeast coordinates
const sw = [9.297029209412212, 47.7158866796921]; // Southwest [lng, lat]
const ne = [9.309357218369737, 47.72583562850856]; // Northeast [lng, lat]

// Calculate the center of the bounding box
const center = [
    (sw[0] + ne[0]) / 2, // Longitude
    (sw[1] + ne[1]) / 2  // Latitude
];

// Define the bounding box
const bounds = [
    [sw[0], sw[1]], // Southwest corner
    [ne[0], ne[1]]  // Northeast corner
];

    const toggleInventoryLayer = () => {
        setInventoryLayerVisible(prevState => !prevState);
        if (map.current) {
            map.current.setLayoutProperty(
                'inventory123',
                'visibility',
                isInventoryLayerVisible ? 'none' : 'visible'
            );
            if (!isInventoryLayerVisible) {
                map.current.flyTo({
                    center: center, // [longitude, latitude]
                    zoom: 14, // Adjust the zoom level as needed
                    essential: true // This ensures the animation is not skipped
                });
            }



        }
    };

    return (
        <div style={{ position: 'relative' }}>
        <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '1000px' }} />
        <div className="button-container" style={{ position: 'absolute', bottom: '5%', left: '8%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button id="toggle-layer-btn" onClick={toggleEarthquakesLayer} style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-bell" style={{ marginRight: '8px' }}></i> Trees Point Data
            </button>
            <button id="toggle-layer-btn1" onClick={toggleInventoryLayer} style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <i className="fas fa-home" style={{ marginRight: '8px' }}></i> Plant Area
            </button>
        </div>
    </div>
    
    );
};

export default Mapcomponent;
