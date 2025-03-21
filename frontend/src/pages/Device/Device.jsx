import React, { useState } from 'react';
import './Device.css';

const Device = () => {
  const [activeTab, setActiveTab] = useState('fan');

  const renderControls = () => {
    switch (activeTab) {
      case 'fan':
        return (
          <div className="controls">
            <button>Quạt Mức 1</button>
            <button>Quạt Mức 2</button>
            <button>Quạt Mức 3</button>
            <button>Tắt</button>
          </div>
        );
      case 'light':
        return (
          <div className="controls">
            <button>Bật đèn</button>
            <button>Tắt đèn</button>
          </div>
        );
      case 'door':
        return (
          <div className="controls">
            <button>Mở cửa</button>
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
        <button onClick={() => setActiveTab('light')} className={activeTab === 'light' ? 'active' : ''}>
          Đèn
        </button>
        <button onClick={() => setActiveTab('door')} className={activeTab === 'door' ? 'active' : ''}>
          Cửa
        </button>
      </div>
      <div className="camera-box">
        <p>Camera đang hoạt động...</p>
      </div>
      {renderControls()}
    </div>
  );
};

export default Device;
