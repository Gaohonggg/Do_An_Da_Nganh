import React , {useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'
import Dropdown from './Dropdown'
import Notice from './Notice'


const Navbar = () => {
  const [openProfile,setOpenProfile] = useState(false);
  const [openNotice,setOpenNotice] = useState(false);

  return (
    <div className='navbar'>
      
      <div className="textlogo">
        <img src={assets.logo} alt="" className="logo" /> 
        BKSH
        </div>      
      <SearchBar/>

      <div className="navbar-right">
        <img src={assets.bell} alt="" className='icon' onClick={()=> setOpenNotice((prev)=>!prev)}/>
        <div className="divider"></div>
        <div className="usericon">
            <img src={assets.user} alt=""  className='icon' onClick={()=> setOpenProfile((prev)=>!prev)} />
            <div className="dot"></div>
        </div>
        {
          openProfile && <Dropdown/>
        }
        {
          openNotice && <Notice/>
        }

      </div>

    </div>
  )
}

export default Navbar
