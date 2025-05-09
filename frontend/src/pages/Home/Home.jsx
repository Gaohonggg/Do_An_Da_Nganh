import React, { useState } from 'react';
import './Home.css';
import { FaLightbulb, FaFan, FaDoorOpen  } from 'react-icons/fa';
import { setFanAPI, setLightAPI,setDoorAPI  } from '../../util/api';

const Home = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [fanLevel, setFanLevel] = useState(0); // Lưu trạng thái level của quạt (0: tắt, 1-3: mức độ)
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  const toggleLight = async () => {
    try {
      const newStatus = !isLightOn; // Đảo trạng thái đèn
      const statusString = newStatus ? "ON" : "OFF"; // Chuyển đổi thành "on" hoặc "off"
  
      const response = await setLightAPI(1, statusString); // Gửi yêu cầu API với trạng thái mới
  
      // Kiểm tra nếu response.status là true
      if (response?.status) {
        setIsLightOn(newStatus); // Cập nhật trạng thái đèn trong frontend
      } else {
        console.error("Failed to update light status:", response?.error?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error while toggling light:", error);
    }
  };

  const toggleDoor = async () => {
    try {
      const newStatus = !isDoorOpen; // Đảo trạng thái đèn
      const statusString = newStatus ? "ON" : "OFF"; // Chuyển đổi thành "on" hoặc "off"
  
      const response = await setDoorAPI(1, statusString); // Gửi yêu cầu API với trạng thái mới
  
      // Kiểm tra nếu response.status là true
      if (response?.status) {
        setIsDoorOpen(newStatus); // Cập nhật trạng thái đèn trong frontend
      } else {
        console.error("Failed to update door status:", response?.error?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error while toggling door:", error);
    }
  };

  const adjustFanLevel = async (level) => {
    try {
      const response = await setFanAPI(1, level); // Giả sử ID của quạt là 1
      if (response?.status === 200) {
        setFanLevel(level); // Cập nhật trạng thái level nếu thành công
      } else {
        console.error("Failed to update fan level:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error while setting fan level:", error);
    }
  };

  return (
    <div className='home'>
      {/* Hộp điều khiển đèn */}
      <div className={`card light ${isLightOn ? 'active' : ''}`}>
        <FaLightbulb className="card-icon" />
        <h2>Điều khiển đèn</h2>
        <button onClick={toggleLight}>
          {isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
        </button>
      </div>

      {/* Hộp điều khiển quạt */}
      <div className="card fan">
        <FaFan className="card-icon" />
        <h2>Điều khiển quạt</h2>
        <div className="fan-controls">
          <button onClick={() => adjustFanLevel(0)} className={fanLevel === 0 ? 'active' : ''}>
            Tắt Quạt
          </button>
          <button onClick={() => adjustFanLevel(1)} className={fanLevel === 1 ? 'active' : ''}>
            Mức 1
          </button>
          <button onClick={() => adjustFanLevel(2)} className={fanLevel === 2 ? 'active' : ''}>
            Mức 2
          </button>
          <button onClick={() => adjustFanLevel(3)} className={fanLevel === 3 ? 'active' : ''}>
            Mức 3
          </button>
        </div>
      </div>

      {/* Hộp cửa */}
      <div className={`card door ${isDoorOpen ? 'active' : ''}`}>
        <FaDoorOpen className="card-icon" />
        <h2>Điều khiển cửa</h2>
        <button onClick={toggleDoor}>
          {isDoorOpen ? 'Đóng Cửa' : 'Mở Cửa'}
        </button>
      </div>
    </div>
  );
};

export default Home;
