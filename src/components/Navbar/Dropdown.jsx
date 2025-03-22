import React, { useEffect, useState } from 'react'
import './Dropdown.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { logoutAPI , getUserInfoAPI} from '../../util/api';


const Dropdown = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutAPI(); // Gọi API đăng xuất
      if (response.status === true) {
        notification.success({
          message: 'Đăng xuất thành công',
          description: 'Bạn đã đăng xuất khỏi hệ thống.',
        });
        navigate('/auth/login'); // Điều hướng về trang đăng nhập
      } else {
        throw new Error(response.message || 'Không thể đăng xuất');
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi đăng xuất',
        description: error?.message || 'Có lỗi xảy ra khi đăng xuất.',
      });
    }
  };

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
    <div className='dropDown'>
      <ul className = 'flex flex-col gap-4' style={{listStyle: 'none'}}>
        <li>{user ? user.username : "My Account"}</li>
        <li>{user ? user.email : "Chưa đăng nhập"}</li>
        <li>
          <Link to='/user'> 
            <UserOutlined /> Quản lí tài khoản 
          </Link>
        </li> 
        <li>
          <button onClick={handleLogout} className="logout-button">
            <LogoutOutlined /> Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
