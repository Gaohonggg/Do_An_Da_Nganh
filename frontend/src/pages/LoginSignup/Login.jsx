import React, { useState } from 'react';
import { Button, Form, Input, notification, Modal } from 'antd';
import { loginAPI, forgotPassword } from '../../util/api';
import { useNavigate, Link } from 'react-router-dom';
import './LoginSignup.css';
import { assets } from '../../assets/assets';

const Login = () => {
    const navigate = useNavigate();
    const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false); // Trạng thái hiển thị popup

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginAPI(email, password);

        if (res?.status === true) {
            // Thành công
            notification.success({
                message: "Đăng nhập thành công!"
            });
            navigate("/");
        } else {
            // Thất bại
            notification.error({
                message: "Đăng nhập thất bại!",
                description: `Lỗi: ${res.message || "Có lỗi xảy ra."}`,
            });
        }
    };

    const handleForgotPassword = async (values) => {
        const { email } = values;

        try {
            const res = await forgotPassword(email);
            console.log(res);
            if (res?.status === true) {
                notification.success({
                    message: "Thành công!",
                    description: "Vui lòng kiểm tra email để đặt lại mật khẩu.",
                });
                setIsForgotPasswordVisible(false); // Đóng popup
            } else {
                notification.error({
                    message: "Thất bại!",
                    description: `Lỗi: ${res.message || "Có lỗi xảy ra."}`,
                });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi!",
                description: "Không thể thực hiện yêu cầu. Vui lòng thử lại sau.",
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
                <div className="additional-links">
                    <p>
                        <span
                            className="forgot-password-link"
                            onClick={() => setIsForgotPasswordVisible(true)}
                        >
                            Quên mật khẩu?
                        </span>
                    </p>
                    <p>
                        Chưa có tài khoản? <Link to="/auth/sign_up">Đăng ký</Link>
                    </p>
                </div>

                <Form.Item className='submit-container'>
                    <Button type="primary" htmlType="submit" className='submit'>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <img src={assets.smarthome} alt="" className='img' />

            {/* Popup Quên mật khẩu */}
            <Modal
                title="Quên mật khẩu"
                visible={isForgotPasswordVisible}
                onCancel={() => setIsForgotPasswordVisible(false)}
                footer={null}
            >
                <Form
                    name="forgotPassword"
                    onFinish={handleForgotPassword}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                            {
                                type: 'email',
                                message: 'Email không hợp lệ!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Gửi yêu cầu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;