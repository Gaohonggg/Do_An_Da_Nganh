import React, { useState } from 'react';
import './Device.css';
import { BulbOutlined } from '@ant-design/icons';
import Camera from '../Camera';

const Device = () => {
  const [activeTab, setActiveTab] = useState('fan');

  const renderControls = () => {
    switch (activeTab) {
      case 'fan':
        return (
          <div className="controls">
            
          </div>
        );
      case 'door':
        return (
          <div className="controls">
            
          </div>
        );
      default:
        return null;
    }
  };

  

  return (
    <div className="device-container">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('fan')} className={activeTab === 'fan' ? 'active' : ''}>
          Quạt
        </button>
        <button onClick={() => setActiveTab('door')} className={activeTab === 'door' ? 'active' : ''}>
          Cửa
        </button>
      </div>
      {activeTab === 'fan' && (
        <div className="camera-box">
          <Camera mode="fan" />
        </div>
      )}

      {activeTab === 'door' && (
        <div className="camera-box">
          <Camera mode="door" />
        </div>
      )}

      {activeTab !== 'fan' && activeTab !== 'door' && (
        <div className="icon-box">
          <BulbOutlined style={{ fontSize: '100px', color: '#ffcc00' }} />
        </div>
      )}
      {renderControls()}
    </div>
  );
};

export default Device;
