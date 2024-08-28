import React, { createContext, useState, useContext } from 'react';

// Create and export MapContext
export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [isEarthquakesLayerVisible, setEarthquakesLayerVisible] = useState(false);
    const [isInventoryLayerVisible, setInventoryLayerVisible] = useState(true);

    return (
        <MapContext.Provider
            value={{
                isEarthquakesLayerVisible,
                setEarthquakesLayerVisible,
                isInventoryLayerVisible,
                setInventoryLayerVisible
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => useContext(MapContext);
