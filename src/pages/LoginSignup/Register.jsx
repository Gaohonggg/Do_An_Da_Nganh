import React from 'react'
import { Button, Form, Input, notification } from 'antd';
import { creatUserApi } from '../../util/api';
import { useNavigate } from 'react-router-dom';

import { assets } from '../../assets/assets'


const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password, CCCD } = values;

        const res = await creatUserApi(name,email,password,CCCD);

        if (res?.status === true) {
            // Thành công
            notification.success({
                message: "Tạo người dùng thành công!",
                description: `Thông báo: ${res.message || "Thành công."}`,
            });
            navigate("/auth/login")
        } else {
            // Thất bại
            notification.error({
                message: "Tạo người dùng thất bại!",
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
                    <div className="text">Đăng Ký</div>
                    <div className="underline"></div>
                </div>
                
                <Form.Item
                    label="Họ và Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Họ Tên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="CCCD"
                    name="CCCD"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập CCCD!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <img src={assets.smarthome} alt="" className='img' />
        </div>
    )
}

export default Register
