import React,{useState} from 'react'
import './LoginSignup.css'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { assets } from '../../assets/assets'

const LoginSignup = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true)

  const [action, setAction] = useState("Log in")

  return (
    <div className='loginsignup'>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="info">Tên đăng nhập</div>
          <div className="input">
            <img src={assets.person} alt="" className='logo'/>
            <input type="Name" placeholder='Vui lòng nhập tên đăng nhập' />
          </div>
          <div className="info">Mật khẩu</div>
          <div className="input">
            <img src={assets.padlock} alt="" className='logo'/>
            <input 
            value={password}
            type={visible ? "text": "password"}
            placeholder='Vui lòng nhập mật khẩu'
            onChange = {(e) =>setPassword(e.target.value)}
            />
            <div className='p-2' 
            onClick={() => setVisible(!visible)}
            style={{ width: '60px', height: '60px',alignItems: 'center', display:'flex' }} >
              {visible ? <EyeOutlined/>: <EyeInvisibleOutlined />}
            </div>
          </div>
        </div>
        <div className="forgot-password">Quên mật khẩu? <span>Bấm vào đây</span></div>
        <div className="signup">Chưa có tài khoản? <span>Đăng ký</span></div>
        <div className="submit-container">
          <div className="submit">Đăng Nhập</div>
        </div>
      </div>

      <img src={assets.smarthome} alt="" className='img'/>
    </div>


  )
}

export default LoginSignup
