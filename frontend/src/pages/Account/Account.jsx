import React, { useState, useEffect } from 'react';
import './Account.css';
import { getUserInfoAPI, setUserInfo, updatePassword } from '../../util/api';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const Account = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // State để lưu thông tin hiển thị trong Account Info
  const [displayUserInfo, setDisplayUserInfo] = useState({
    fullName: '',
    email: '',
    idCard: '',
  });

  // State để lưu thông tin trong form cập nhật
  const [userInfo, setUserInfoState] = useState({
    fullName: '',
    email: '',
    idCard: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfoAPI();
        if (response?.status) {
          const userData = {
            fullName: response.username,
            email: response.email,
            idCard: response.CCCD,
          };
          setDisplayUserInfo(userData); // Cập nhật thông tin hiển thị
          setUserInfoState(userData); // Đồng bộ thông tin vào form
        } else {
          notification.error({
            message: 'Lỗi',
            description: 'Không thể lấy thông tin người dùng.',
          });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra khi lấy thông tin người dùng.',
        });
      }
    };

    fetchUserInfo();
  }, []);

  // Xử lý cập nhật thông tin cá nhân
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await setUserInfo(userInfo.fullName, userInfo.email, userInfo.idCard);
      if (response?.status) {
        notification.success({
          message: 'Thành công',
          description: 'Thông tin cá nhân đã được cập nhật.',
        });
        setDisplayUserInfo(userInfo); // Cập nhật thông tin hiển thị sau khi cập nhật thành công
      } else {
        throw new Error(response?.message || 'Cập nhật thất bại.');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      notification.error({
        message: 'Lỗi',
        description: error?.message || 'Có lỗi xảy ra khi cập nhật thông tin.',
      });
    }
  };

  // Xử lý cập nhật mật khẩu
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      notification.error({
        message: 'Lỗi',
        description: 'Mật khẩu xác nhận không khớp.',
      });
      return;
    }

    try {
      const response = await updatePassword(
        passwordData.oldPassword,
        passwordData.newPassword,
      );
      console.log(response)
      
      if (response?.status) {
        notification.success({
          message: 'Thành công',
          description: 'Mật khẩu đã được cập nhật.',
        });
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        throw new Error(response?.message || 'Cập nhật mật khẩu thất bại.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      notification.error({
        message: 'Lỗi',
        description: error?.message || 'Có lỗi xảy ra khi cập nhật mật khẩu.',
      });
    }
  };

  return (
    <div className="account-container">
      {/* Phần hiển thị thông tin tài khoản */}
      <div className="account-info">
        <h2>Thông tin tài khoản</h2>
        <div className="info-item">
          <span className="label">Họ tên:</span>
          <span className="value">{displayUserInfo.fullName}</span>
        </div>
        <div className="info-item">
          <span className="label">Email:</span>
          <span className="value">{displayUserInfo.email}</span>
        </div>
        <div className="info-item">
          <span className="label">Căn cước công dân:</span>
          <span className="value">{displayUserInfo.idCard}</span>
        </div>
      </div>

      {/* Phần cập nhật thông tin */}
      <div className="update-info">
        <h2>Cập nhật thông tin</h2>

        {/* Bảng cập nhật thông tin cá nhân */}
        <form onSubmit={handleUpdateInfo} className="update-form">
          <h3>Cập nhật thông tin cá nhân</h3>
          <div className="form-group">
            <label>Họ tên</label>
            <input
              type="text"
              value={userInfo.fullName}
              onChange={(e) =>
                setUserInfoState({ ...userInfo, fullName: e.target.value })
              }
              placeholder="Nhập họ tên"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfoState({ ...userInfo, email: e.target.value })
              }
              placeholder="Nhập email"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Cập nhật thông tin
          </button>
        </form>

        {/* Bảng cập nhật mật khẩu */}
        <form onSubmit={handleUpdatePassword} className="update-form">
          <h3>Cập nhật mật khẩu</h3>
          <div className="form-group">
            <label>Mật khẩu cũ</label>
            <div className="password-input">
              <input
                type={oldPasswordVisible ? 'text' : 'password'}
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, oldPassword: e.target.value })
                }
                placeholder="Nhập mật khẩu cũ"
                required
              />
              <div
                className="eye-icon"
                onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
              >
                {oldPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <div className="password-input">
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                placeholder="Nhập mật khẩu mới"
                required
              />
              <div
                className="eye-icon"
                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              >
                {newPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <div className="password-input">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                placeholder="Nhập lại mật khẩu mới"
                required
              />
              <div
                className="eye-icon"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Cập nhật mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;