const db = require('../data/db');
const support = require('../service/support')

class FanService {
    getFan = async (data) => {
        const { id } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [status] = await db.query("SELECT status FROM control WHERE device_type = 'fan' AND device_id = ?", [id]);
                if (status.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                const [level] = await db.query('SELECT level FROM Fan WHERE Fan_id = ?', [id]);
                if (level.length == 0) {
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                resolve({ status: true, status: status[status.length - 1].status, level: level[level.length - 1].level});
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    setFan = async (data, req) => {
        const { id, status, level } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rac1] = await db.query("SELECT status FROM control WHERE device_type = 'fan' AND device_id = ?", [id]);
                if (rac1.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                const [rac2] = await db.query('SELECT level FROM fan WHERE Fan_id = ?', [id]);
                if (rac2.length == 0) {
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                const [rac3] = await db.query('UPDATE fan SET level = ? WHERE fan_id = ?', [level, id]);
                if (rac3.affectedRows == 0) {
                    resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                    return;
                }
                if (status != rac1[rac1.length - 1].status) {
                    const [rac4] = await db.query('INSERT INTO control (CCCD, device_type, device_id, status, date, hour) VALUES (?, ?, ?, ?, ?, ?)', [req.session.user.id, 'fan', id, status, support.getDay(), support.getHour()]);
                    if (rac4.affectedRows == 0) {
                        resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                        return;
                    }
                }
                resolve({ status: true, message: "Cập nhật thiết bị thành công" });
            }
            catch (error) {
                reject(error);
            } 
        });
    }
}

module.exports = new FanService