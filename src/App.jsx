import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';


const App = () => {
  const location = useLocation();

  const pageTitles = {
    "/": "> Trang chủ",
    "/user": "> Tài khoản",
    "/device": "> Thiết bị",
    "/setting": "> Cài đặt",
    "/web_history": "> Lịch sử",
  };
  const currentTitle = pageTitles[location.pathname] || "";



  return (
    <div className="app">
      <Navbar />
      <div>
        <Sidebar />
        
        <div
          className="main-content"
          style={{
            marginLeft:  "21%",
            padding: "20px",
          }}
        >
          {currentTitle &&(
            <h1 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              {currentTitle}
            </h1>
          )}

          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default App;
