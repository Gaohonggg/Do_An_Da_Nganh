import React from 'react'
import './Dropdown.css'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const Dropdown = () => {
  return (
    <div className='dropDown'>
      <ul classname = 'flex flex-col gap-4' style={{listStyle: 'none'}}>
        <li> MyAccout</li>
        <li> abc@gmail.com</li>
        <li>
          <a href="" className=""> <UserOutlined /> Quản lí tài khoản </a>
        </li>
        <li>
          <a href="" className=""> <LogoutOutlined /> Đăng xuất </a>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
