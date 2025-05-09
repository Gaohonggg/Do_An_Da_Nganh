const bcrypt = require('bcrypt');
const db = require('../data/db');
const nodemailer = require("nodemailer");
// const supportFunction = require('./support');

class AuthService {
    check = async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (req.session.user) resolve({ status: false, message: 'Người dùng đã đăng nhập' });
                else resolve({ status: true, message: 'Người dùng chưa đăng nhập' });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    getId = async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (req.session.user) resolve({ status: true, user: req.session.user });
                else resolve({ status: false, message: 'Người dùng chưa đăng nhập' });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    createUser = async (data) => {
        const { email, password, name, CCCD } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
                    resolve({ status: false, message: "Email không đúng định dạng" });
                    return;
                }

                const cccdRegex = /^[0-9]{12}$/;
                if (!cccdRegex.test(CCCD.trim())) {
                    resolve({ status: false, message: "CCCD không hợp lệ" });
                    return;
                }

                const [existingUsers] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
                if (existingUsers.length > 0) { 
                    resolve({ status: false, message: "Email đã được dùng" });
                    return;
                }
                const [existingUsersCCCD] = await db.query('SELECT * FROM user WHERE CCCD = ?', [CCCD]);
                if (existingUsersCCCD.length > 0) { 
                    resolve({ status: false, message: "Người dùng đã tạo tài khoản" });
                    return;
                }
    
                const hashedPassword = await bcrypt.hash(password, 10);
                const [result] = await db.query(
                    'INSERT INTO user (email, password, username, CCCD) VALUES (?, ?, ?, ?)', 
                    [email, hashedPassword, name, CCCD]
                );
                if (result.affectedRows === 1) {
                    resolve({
                        status: true,
                        name: name,
                        email: email,
                        CCCD: CCCD
                    });
                } 
                else resolve({ status: false, message: "Không thể tạo tài khoản" });
            }
            catch (error) {
                reject(error);
            }
        });
    }

    logout = (req) => {
        return new Promise((resolve, reject) => {
            if (req.session.user) {
                req.session.destroy((err) => {
                    if (err) reject({ status: false, message: 'Đăng xuất thất bại' });
                    else resolve({ status: true, message: 'Đăng xuất thành công' });
                });
            } 
            else resolve({ status: false, message: 'Chưa đăng nhập' });
        });
    }    

    login = async (data, req) => {
        const { email, password } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
                if (rows.length === 0) {
                    resolve({ status: false, message: "Tài khoản không tồn tại" });
                    return;
                }
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    resolve({ status: false, message: "Mật khẩu sai" });
                    return;
                }
                req.session.user = {
                    id: user.CCCD,
                    name: user.username,
                    email: user.email,
                };
                resolve({
                    status: true,
                    name: user.username,
                    email: user.email,
                });
            } 
            catch (error) {
                reject(error);
            }
        });
    }

    forgotPassword = async (body) => {
        const { email } = body
        return new Promise (async (resolve, reject) => {
            try {
                const [existingUsers] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
                if (existingUsers.length === 0) resolve({ status: false, message: "Tài khoản không tồn tại" });
                const newPassword = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updatePasswordQuery = `UPDATE user SET password = ? WHERE email = ?`;
                const [result] = await db.query(updatePasswordQuery, [hashedPassword, email]);
                if (result.affectedRows === 1) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'thinh.nguyen04@hcmut.edu.vn',
                            pass: 'gfwg onwp qvin jcyn'
                        }
                    });
                    const mailOptions = {
                        from: 'thinh.nguyen04@hcmut.edu.vn',
                        to: email,
                        subject: 'Mật khẩu mới',
                        text: 'Mật khẩu mới của bạn là ' + newPassword
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            reject({ status: false, error: error.message });
                        } else {
                            resolve({ status: true, message: 'Cập nhật mật khẩu thành công'});
                        }
                    })       
                }
                else resolve({ status: false, message: "Cập nhật mật khẩu thất bại" });
            } 
            catch (error) {
                reject(error);
            }
        });
    }

    changePassword = async (data, req) => {
        const { currentPassword, newPassword } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [req.session.user.email]);
                if (rows.length === 0) {
                    resolve({ status: false, message: "Tài khoản không tồn tại" });
                    return;
                }
                const user = rows[0];
                const isMatch = await bcrypt.compare(currentPassword, user.password);
                if (!isMatch) {
                    resolve({ status: false, message: "Mật khẩu sai" });
                    return;
                }
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updatePasswordQuery = `UPDATE user SET password = ? WHERE email = ?`;
                const [result] = await db.query(updatePasswordQuery, [hashedPassword, req.session.user.email]);
                if (result.affectedRows === 1) {
                    resolve({
                        status: true,
                        newAccount: {
                            email: req.session.user.email,
                            password: newPassword
                        }
                    });
                } else resolve({ status: false, message: "Cập nhật mật khẩu thất bại" });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    
}

module.exports = new AuthService