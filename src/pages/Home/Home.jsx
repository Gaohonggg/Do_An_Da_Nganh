import React, { useState } from 'react';
import './Home.css';
import { FaLightbulb, FaFan, FaHistory } from 'react-icons/fa';
import { setFanAPI, setLightAPI } from '../../util/api';

const Home = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [fanLevel, setFanLevel] = useState(0); // Lưu trạng thái level của quạt (0: tắt, 1-3: mức độ)

  const toggleLight = async () => {
    try {
      const newStatus = !isLightOn;
      const response = await setLightAPI(1, newStatus); // Giả sử ID của đèn là 1
      if (response?.status === 200) {
        setIsLightOn(newStatus); // Cập nhật trạng thái đèn nếu thành công
      } else {
        console.error("Failed to update light status:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error while toggling light:", error);
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

      {/* Hộp nhật ký lịch sử */}
      <div className="card history-log">
        <FaHistory className="card-icon" />
        <h2>Nhật ký hoạt động</h2>
        <button>Xem lịch sử</button>
      </div>
    </div>
  );
};

export default Home;
