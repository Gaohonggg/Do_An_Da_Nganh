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
      <h2>Nhận diện khuôn mặt</h2>
      <div className="camera-box">
        <Camera mode="setting"></Camera>
      </div>
      <button className="add-face-btn" onClick={handleAddFace}>
        Thêm khuôn mặt
      </button>
    </div>
  );
};

export default Setting;
