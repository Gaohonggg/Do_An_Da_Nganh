import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

import Home from './pages/Home/Home';
import LoginSignup from './pages/LoginSignup/LoginSignup';
import Account from './pages/Account/Account';
import Device from './pages/Device/Device';
import Setting from './pages/Setting/Setting';
import WebHistory from './pages/WebHistory/WebHistory';

const App = () => {
  const location = useLocation();


  const pageTitles = {
    "/": "> Trang chủ",
    "/account": "> Tài khoản",
    "/device": "> Thiết bị",
    "/setting": "> Cài đặt",
    "/web-history": "> Lịch sử",
  };
  const currentTitle = pageTitles[location.pathname] || "";

  const hideLayoutPaths = ['/login'];

  const showLayout = !hideLayoutPaths.includes(location.pathname);


  return (
    <div className="app">
      {showLayout && <Navbar />}
      <div>
        {showLayout && <Sidebar />}
        
        <div
          className="main-content"
          style={{
            marginLeft: showLayout ? "21%" : "0",
            padding: showLayout ? "20px" : "0",
          }}
        >
          {showLayout && currentTitle && (
            <h1 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              {currentTitle}
            </h1>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/device" element={<Device />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/web-history" element={<WebHistory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
