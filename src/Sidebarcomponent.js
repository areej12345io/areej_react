import React from 'react';
import { useMapContext } from './MapContext'; // Import useMapContext hook
import './Sidebarcomponent.css'; // Import CSS for the sidebar


const Sidebarcomponent = () => {
  const { toggleEarthquakesLayer, toggleInventoryLayer } = useMapContext();

  return (
    <div className="sidenav">
      <button>
        <img src="/main.png" alt="Icon" />
      </button>
      <hr />
      <button id="toggle-layer-btn" onClick={toggleEarthquakesLayer}>
                <i className="fas fa-bell"></i> 
            </button>
      <hr />
      <button id="toggle-layer-btn1" onClick={toggleInventoryLayer}>
                <i className="fas fa-home"></i> 
            </button>
      <hr />
      <button id="toggle-layer-btn2">
        <i className="fas fa-mountain"></i>
      </button>
      <hr />
      <button>
        <i className="fas fa-qrcode"></i>
      </button>
      <hr />
      <button>
        <i className="fas fa-map-marker-alt"></i>
      </button>
      <hr />
      <button>
        <i className="fas fa-camera"></i>
      </button>
      {/* New buttons at the bottom */}
      <div className="bottom-buttons">
        <hr />
        <button className="bottom-btn">
          <i className="fas fa-th"></i>
        </button>
        <hr />
        <button className="bottom-btn">
          <i className="fas fa-cog"></i>
        </button>
        <hr />
        <button className="bottom-btn">
          <i className="fas fa-moon"></i>
        </button>
        <hr />
        <button className="bottom-btn">
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebarcomponent;
