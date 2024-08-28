// src/App.js
import React from 'react';
import { MapProvider } from './MapContext';
import Mapcomponent from './Mapcomponent';
import Sidebarcomponent from './Sidebarcomponent';
import HeaderComponent from './HeaderComponent'; // Import the HeaderComponent

function App() {
  return (
    <MapProvider>
      <HeaderComponent /> {/* Include HeaderComponent at the top */}
      <Sidebarcomponent />
     
    <Mapcomponent />
    </MapProvider>
  );
}

export default App;
