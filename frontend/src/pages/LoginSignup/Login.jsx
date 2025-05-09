import React from 'react'
import { Button, Form, Input, notification } from 'antd';
import { loginAPI } from '../../util/api';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'

import { assets } from '../../assets/assets'



const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginAPI(email,password);

        if (res?.status === true) {
            // Thành công
            notification.success({
                message: "Đăng nhập thành công!"
            });
            navigate("/")
        } else {
            // Thất bại
            notification.error({
                message: "Đăng nhập thất bại!",
                description: `Lỗi: ${res.message || "Có lỗi xảy ra."}`,
            });
        }

    };

    return (
        <div className='loginsignup'>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
                className='container'
            >
                <div className="loginheader">
                    <div className="text">Đăng Nhập</div>
                    <div className="underline"></div>
                </div>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[

                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className='submit-container'>
                    <Button type="primary" htmlType="submit" className='submit'>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <img src={assets.smarthome} alt="" className='img' />
        </div>
    )
}

export default Login
