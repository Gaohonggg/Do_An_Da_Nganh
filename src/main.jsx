import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import Device from './pages/Device/Device.jsx';
import Account from './pages/Account/Account.jsx';
import Setting from './pages/Setting/Setting.jsx';
import WebHistory from './pages/WebHistory/WebHistory.jsx';
import Register from './pages/LoginSignup/Register.jsx';
import Login from './pages/LoginSignup/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
      <App/>
    </div>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
          path: "device",
          element: <Device/>
      },
      {
        path: "user",
        element: <Account/>
      },
      {
        path: "web_history",
        element: <WebHistory/>
      },
      {
        path: "setting",
        element: <Setting/>
      },

    ]
  },
  {
    path: "/auth/sign_up",
    element: <Register/>
  },
  {
    path: "/auth/log_in",
    element: <Login/>
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} /> 
  </React.StrictMode>
)
