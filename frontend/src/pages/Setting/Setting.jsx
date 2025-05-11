import React from 'react';
import './Setting.css';
import Camera from '../Camera';

const Setting = () => {
  const handleAddFace = () => {
    alert('Đã thêm khuôn mặt vào hệ thống!');
    // Thực hiện logic xử lý thêm khuôn mặt tại đây.
  };

  return (
    <div className="setting-container">
      <div className="camera-box">
        <Camera mode="setting"></Camera>
      </div>
    </div>
  );
};

export default Setting;
