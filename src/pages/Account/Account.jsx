import React, { useState } from 'react';
import './Account.css';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Account = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="account-container">
      {/* Ô hiển thị thông tin tài khoản */}
      <div className="account-info">
        <h2>Thông tin tài khoản</h2>
        <div className="info-item">
          <span className="label">Họ tên:</span>
          <span className="value">Nguyễn Văn A</span>
        </div>
        <div className="info-item">
          <span className="label">Email:</span>
          <span className="value">nguyenvana@example.com</span>
        </div>
        <div className="info-item">
          <span className="label">Căn cước công dân:</span>
          <span className="value">0123456789</span>
        </div>
      </div>

      {/* Ô đổi mật khẩu */}
      <div className="change-password">
        <h2>Đổi mật khẩu</h2>
        <form>
          <div className="form-group">
            <label>Mật khẩu cũ</label>
            <div className="password-input">
              <input
                type={oldPasswordVisible ? "text" : "password"}
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
                type={newPasswordVisible ? "text" : "password"}
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
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Nhập lại mật khẩu mới"
                required
              />
              <div
                className="eye-icon"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">Đổi mật khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default Account;
