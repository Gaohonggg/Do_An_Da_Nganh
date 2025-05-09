const db = require('../data/db');
const support = require('../service/support')
const client = require('../data/ada');

class DoorService {
    getDoor = async (data) => {
        const { id } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [status] = await db.query("SELECT status FROM control WHERE device_type = 'door' AND device_id = ?", [id]);
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

    setDoor = async (data) => {
        const { id, status, door_id } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rac1] = await db.query("SELECT status FROM control WHERE device_type = 'door' AND device_id = ?", [door_id]);
                if (rac1.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                if (rac1[rac1.length - 1].status == status) {
                    resolve({ status: false, message: "Thiết bị đã cập nhật" });
                    return;
                }
                const [rac2] = await db.query('INSERT INTO control (CCCD, device_type, device_id, status, date, hour) VALUES (?, ?, ?, ?, ?, ?)', [id, 'door', door_id, status, support.getDay(), support.getHour()]);
                if (rac2.affectedRows == 0) {
                    resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                    return;
                }
                let rac;
                if (status == 'ON') rac = "1";
                else if (status == 'OFF') rac = "0";
                client.publish(`Dat_Nguyen/feeds/door`, rac);
                resolve({ status: true, message: "Cập nhật thiết bị thành công" });
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    getFace = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [racs] = await db.query("SELECT face_id FROM door");
                if (racs.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                resolve({ status: true, face_id: racs});
            }
            catch (error) {
                reject(error);
            } 
        });
    }

    setFace = async (data, req) => {
        const { face_id, name } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rac2] = await db.query('INSERT INTO door (face_id, name) VALUES (?, ?)', [face_id, name]);
                if (rac2.affectedRows == 0) {
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

module.exports = new DoorService