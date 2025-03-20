import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { HomeOutlined , ApartmentOutlined, CustomerServiceOutlined, SettingOutlined, UnorderedListOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Sidebar = ({isLoggedIn}) => {
  return (
    <div className='sideBar'>
        <div className="content">
            <ul>
                <li>
                    <Link to='/'> <HomeOutlined/> Trang chủ </Link>
                </li>
                <li>
                    <Link to='/device'> <ApartmentOutlined /> Điều khiển thiết bị </Link>
                </li>
                <li>
                    <Link to='/web-history'> <UnorderedListOutlined /> Xem lịch sử </Link>
                </li>
                <li>
                    <a href="" className=""><CustomerServiceOutlined /> Hỗ trợ</a>
                </li>
                <li>
                    <Link to='/setting'> <SettingOutlined /> Cài đặt</Link>
                </li>
            </ul>
        </div>
        <div className="botbox">
            <a href="/account" className="user-info"> 
                <img src={assets.user} alt="" className='userimg'/>
                <div className="details">
                    <p className="name">{isLoggedIn ? "Username" : "Chưa đăng nhập"}</p>
                    <p className="email">{isLoggedIn ? "abc@example.com" : "Bấm để đăng nhập"}</p>
                </div>
            </a>
        </div>
    </div>
  )
}

export default Sidebar
