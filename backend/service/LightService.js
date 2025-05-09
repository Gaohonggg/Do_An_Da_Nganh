const db = require('../data/db');
const support = require('../service/support')
const client = require('../data/ada');

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
                resolve({ status: true, status: status[status.length - 1].status});
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    setLight = async (data, req) => {
        const { id, status } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rac1] = await db.query("SELECT status FROM control WHERE device_type = 'light' AND device_id = ?", [id]);
                if (rac1.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                if (status != rac1[rac1.length - 1].status) {
                    const [rac2] = await db.query('INSERT INTO control (CCCD, device_type, device_id, status, date, hour) VALUES (?, ?, ?, ?, ?, ?)', [req.session.user.id, 'light', id, status, support.getDay(), support.getHour()]);
                    if (rac2.affectedRows == 0) {
                        resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                        return;
                    }
                }
                let rac;
                if (status == 'ON') rac = "1";
                else if (status == 'OFF') rac = "0";
                client.publish(`Dat_Nguyen/feeds/light`, rac);
                resolve({ status: true, message: "Cập nhật thiết bị thành công" });
            }
            catch (error) {
                reject(error);
            } 
        });
    }
}

module.exports = new LightService