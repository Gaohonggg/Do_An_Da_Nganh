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
            <button>Mức 1</button>
            <button>Mức 2</button>
            <button>Mức 3</button>
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
            <button>Đóng cửa</button>
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
