import React, { useEffect, useState } from 'react';
import './Dropdown.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { logoutAPI, getUserInfoAPI, checkLogin } from '../../util/api';
import { notification } from 'antd';

const Dropdown = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutAPI(); // Gọi API đăng xuất
      if (response.status === true) {
        notification.success({
          message: 'Đăng xuất thành công',
          description: 'Bạn đã đăng xuất khỏi hệ thống.',
        });
        setIsLoggedIn(false);
        setUser(null);
        navigate('/auth/log_in'); // Điều hướng về trang đăng nhập
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
    const initializeUser = async () => {
      try {
        // Kiểm tra trạng thái đăng nhập trước tiên
        const loginCheckResponse = await checkLogin();
        if (loginCheckResponse?.message === 'Người dùng đã đăng nhập') {
          // Nếu đã đăng nhập, lấy thông tin người dùng
          const userInfoResponse = await getUserInfoAPI();
          if (userInfoResponse?.status) {
            setUser(userInfoResponse); // Lưu thông tin người dùng vào state
            setIsLoggedIn(true); // Đánh dấu người dùng đã đăng nhập
          } else {
            setIsLoggedIn(false); // Người dùng chưa đăng nhập
          }
        } else {
          setIsLoggedIn(false); // Người dùng chưa đăng nhập
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        setIsLoggedIn(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <div className='dropDown'>
      <ul className='flex flex-col gap-4' style={{ listStyle: 'none' }}>
        {isLoggedIn ? (
          <>
            <li>{user ? user.username : 'My Account'}</li>
            <li>{user ? user.email : 'Chưa đăng nhập'}</li>
            <li>
              <Link to='/user'>
                <UserOutlined /> Quản lí tài khoản
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className='logout-button'>
                <LogoutOutlined /> Đăng xuất
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => navigate('/auth/log_in')}
              className='login-button'
            >
              <LoginOutlined /> Đăng nhập
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;