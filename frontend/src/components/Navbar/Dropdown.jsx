import React from 'react'
import './Dropdown.css'
import {Link} from 'react-router-dom'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const Dropdown = () => {
  return (
    <div className='dropDown'>
      <ul className = 'flex flex-col gap-4' style={{listStyle: 'none'}}>
        <li> MyAccout</li>
        <li> abc@gmail.com</li>
        <li>
          <Link to='/account'> 
            <UserOutlined /> Quản lí tài khoản 
          </Link>
        </li>
        <li>
          <a href="/logout" className=""> <LogoutOutlined /> Đăng xuất </a>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
