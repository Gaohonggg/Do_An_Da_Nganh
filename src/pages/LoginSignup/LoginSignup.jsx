import React, { useState } from 'react'
import './LoginSignup.css'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { assets } from '../../assets/assets'

const LoginSignup = () => {
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Đăng nhập")

  const toggleAction = () => {
    setAction(action === "Đăng nhập" ? "Đăng ký" : "Đăng nhập");
  }

  return (
    <div className='loginsignup'>
      <div className="container">
        <div className="loginheader">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="info">Tên đăng nhập</div>
          <div className="input">
            <img src={assets.person} alt="" className='logo' />
            <input type="Name" placeholder='Vui lòng nhập tên đăng nhập' />
          </div>
          <div className="info">Mật khẩu</div>
          <div className="input">
            <img src={assets.padlock} alt="" className='logo' />
            <input
              value={password}
              type={visible ? "text" : "password"}
              placeholder='Vui lòng nhập mật khẩu'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='p-2'
              onClick={() => setVisible(!visible)}
              style={{ width: '60px', height: '60px', alignItems: 'center', display: 'flex' }} >
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
          </div>

          {/* Nếu đang ở chế độ Đăng ký thì hiển thị trường Xác nhận mật khẩu */}
          {action === "Đăng ký" && (
            <>
              <div className="info">Xác nhận mật khẩu</div>
              <div className="input">
                <img src={assets.padlock} alt="" className='logo' />
                <input
                  type={visible ? "text" : "password"}
                  placeholder='Xác nhận mật khẩu'
                />
              </div>
            </>
          )}
        </div>

        {action === "Đăng nhập" && (
          <div className="forgot-password">Quên mật khẩu? <span>Bấm vào đây</span></div>
        )}

        <div className="signup">
          {action === "Đăng nhập"
            ? "Chưa có tài khoản? "
            : "Đã có tài khoản? "}
          <span onClick={toggleAction}>
            {action === "Đăng nhập" ? "Đăng ký" : "Đăng nhập"}
          </span>
        </div>
        <div className="submit-container">
          <div className="submit">{action}</div>
        </div>
      </div>
      <img src={assets.smarthome} alt="" className='img' />
    </div>
  )
}

export default LoginSignup