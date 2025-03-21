import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      {/* Hộp điều khiển đèn */}
      <div className="light">
        <h2>Điều khiển đèn</h2>
        <button>Bật/Tắt Đèn</button>
      </div>

      {/* Hộp điều khiển quạt */}
      <div className="fan">
        <h2>Điều khiển quạt</h2>
        <button>Bật/Tắt Quạt</button>
      </div>

      {/* Hộp nhật ký lịch sử */}
      <div className="history-log">
        <h2>Nhật ký hoạt động</h2>
        <button>Xem lịch sử</button>
      </div>
    </div>
  )
}

export default Home
