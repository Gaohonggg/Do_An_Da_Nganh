const db = require('../data/db');
const support = require('./support');

class UserService {
    getInfo = async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [user] = await db.query('SELECT email, CCCD, username FROM user WHERE email = ?', [req.session.user.email]);
                if (user.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy tài khoản" });
                    return;
                }
                resolve({ 
                    status: true, 
                    CCCD: user[0].CCCD,
                    username: user[0].username,
                    email: user[0].email
                });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    setInfo = async (data, req) => {
        const { email, CCCD, username } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [existingEmail] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
                if (existingEmail.length > 0 && existingEmail[0].email != req.session.user.email) { 
                    resolve({ status: false, message: "Email đã được đăng ký" });
                    return;
                }
                const [existingCCCD] = await db.query('SELECT * FROM user WHERE CCCD = ?', [CCCD]);
                if (existingCCCD.length > 0 && existingCCCD[0].CCCD != req.session.user.id) { 
                    resolve({ status: false, message: "CCCD đã được đăng ký" });
                    return;
                }
                const [result] = await db.query(
                    'UPDATE user SET email = ?, username = ?, CCCD = ? WHERE CCCD = ?', 
                    [email, username, CCCD, req.session.user.id]
                );
                if (result.affectedRows === 1) {
                    req.session.user.id = CCCD;
                    req.session.user.email = email;
                    req.session.user.username = username;
                    resolve({
                        status: true,
                        name: username,
                        email: email,
                        CCCD: CCCD
                    });
                } 
                else resolve({ status: false, message: "Không thể thay đổi thông tin" });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    getHistory = async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [dataset] = await db.query('SELECT * FROM control WHERE CCCD = ?', [req.session.user.id]);
                if (dataset.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy tài khoản" });
                    return;
                }

                resolve({ 
                    status: true, 
                    result: support.groupDataByDate(dataset)
                });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    getNotice = async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [dataset] = await db.query('SELECT content, timestamp FROM notice WHERE CCCD = ?', [req.session.user.id]);
                if (dataset.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy tài khoản" });
                    return;
                }

                dataset.forEach((data) => {
                    const date = new Date(data.timestamp);
                    data.timestamp = date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", "").replace(" a.m.", "");
                })

                resolve({ 
                    status: true, 
                    result: dataset
                });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

}

module.exports = new UserService