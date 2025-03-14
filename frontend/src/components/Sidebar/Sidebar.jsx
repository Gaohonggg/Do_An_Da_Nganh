import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { HomeOutlined , UserOutlined, ApartmentOutlined, CustomerServiceOutlined, SettingOutlined, UnorderedListOutlined} from '@ant-design/icons';


const Sidebar = () => {
  return (
    <div className='sideBar'>
        <div className="content">
            <ul>
                <li>
                    <a href="" className=""> <HomeOutlined/> Trang chủ </a>
                </li>
                <li>
                    <a href="" className=""> <ApartmentOutlined /> Điều khiển thiết bị</a>
                </li>
                <li>
                    <a href="" className=""> <UnorderedListOutlined /> Xem lịch sử</a>
                </li>
                <li>
                    <a href="" className=""><CustomerServiceOutlined /> Hỗ trợ</a>
                </li>
                <li>
                    <a href="" className=""><SettingOutlined /> Cài đặt</a>
                </li>
            </ul>
        </div>
        <div className="botbox">
            <a href="" className="user-info"> 
                <img src={assets.user} alt="" className='userimg'/>
                <div className="details">
                    <p className="name">Username</p>
                    <p className="email">abc@example.com</p>
                </div>
            </a>
        </div>
    </div>
  )
}

export default Sidebar
