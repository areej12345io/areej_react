// src/HeaderComponent.js
import React from 'react';
import './HeaderComponent.css'; // Import CSS file for the header

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header-container">
        <button className="get-back-btn">
          <i className="fas fa-arrow-left"></i> Get Back
        </button>
        <div className="header-buttons">
          <button className="settings-btn">
            <i className="fas fa-cog"></i> Settings
          </button>
          <button className="mm-btn">MM</button>
          <button className="invite-btn">
            <i className="fas fa-user-plus"></i> Invite
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
