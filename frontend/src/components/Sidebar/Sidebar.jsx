import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { HomeOutlined, ApartmentOutlined, CustomerServiceOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getUserInfoAPI } from '../../util/api';

const Sidebar = ({ isLoggedIn }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfoAPI();
                if (response?.status) {
                    setUser(response); // Lưu toàn bộ response vào state
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <div className='sideBar'>
            <div className="content">
                <ul>
                    <li>
                        <Link to='/'> <HomeOutlined /> Trang chủ </Link>
                    </li>
                    <li>
                        <Link to='/device'> <ApartmentOutlined /> Điều khiển thiết bị </Link>
                    </li>
                    <li>
                        <Link to='/web_history'> <UnorderedListOutlined /> Xem lịch sử </Link>
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
                <a href="/user" className="user-info">
                    <img src={assets.user} alt="" className='userimg' />
                    <div className="details">
                        <p className="name">{user ? user.username : "My Account"}</p>
                        <p className="email">{user ? user.email : "Chưa đăng nhập"}</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Sidebar
