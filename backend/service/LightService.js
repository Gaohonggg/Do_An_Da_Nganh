const db = require('../data/db');
const support = require('../service/support')

class LightService {
    getLight = async (data) => {
        const { id } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [status] = await db.query("SELECT status FROM control WHERE device_type = 'light' AND device_id = ?", [id]);
                if (status.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                const [brightness] = await db.query('SELECT brightness FROM light WHERE light_id = ?', [id]);
                if (brightness.length == 0) {
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                resolve({ status: true, status: status[status.length - 1].status, brightness: brightness[brightness.length - 1].brightness});
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    setLight = async (data, req) => {
        const { id, status, brightness } = data;
        return new Promise(async (resolve, reject) => {
            try {
                if (status == "" && brightness == -1) {
                    resolve({ status: false, message: "Thiếu thông tin điều khiển" });
                    return;
                }
                const [rac1] = await db.query("SELECT status FROM control WHERE device_type = 'light' AND device_id = ?", [id]);
                if (rac1.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                if (status == "") status = rac1[rac1.length - 1].status;
                const [rac2] = await db.query('SELECT brightness FROM light WHERE light_id = ?', [id]);
                if (rac2.length == 0) {
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                if (rac2 == -1) brightness = rac2[rac2.length - 1].brightness;
                const [rac3] = await db.query('UPDATE light SET brightness = ? WHERE light_id = ?', [brightness, id]);
                if (rac3.affectedRows == 0) {
                    resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                    return;
                }
                const [rac4] = await db.query('INSERT INTO control (CCCD, device_type, device_id, status, timestamp) VALUES (?, ?, ?, ?, ?)', [req.session.user.id, 'light', id, status, support.getDate()]);
                if (rac4.affectedRows == 0) {
                    resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                    return;
                }
                resolve({ status: true, message: "Cập nhật thiết bị thành công" });
            }
            catch (error) {
                reject(error);
            } 
        });
    }
}

module.exports = new LightService