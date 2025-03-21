const db = require('../data/db');
const support = require('../service/support')
const { spawn } = require('child_process');
const path = require('path');

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

    setDoor = async (data, req) => {
        const { id, status } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rac1] = await db.query("SELECT status FROM control WHERE device_type = 'door' AND device_id = ?", [id]);
                if (rac1.length == 0) { 
                    resolve({ status: false, message: "Không tìm thấy thiết bị" });
                    return;
                }
                const [rac2] = await db.query('INSERT INTO control (CCCD, device_type, device_id, status, date, hour) VALUES (?, ?, ?, ?, ?, ?)', [req.session.user.id, 'door', id, status, support.getDay(), support.getHour()]);
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

    runPythonMain() {
        console.log("Đang gọi hàm main từ Python...");
    
        // Đường dẫn tuyệt đối đến main.py
        const pythonScriptPath = path.join(__dirname, '../../AI/main.py');
    
        const pythonProcess = spawn('python', [pythonScriptPath]);
    
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Output từ Python: ${data.toString()}`);
        });
    
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Lỗi từ Python: ${data.toString()}`);
        });
    
        pythonProcess.on('close', (code) => {
            console.log(`Python kết thúc với mã: ${code}`);
        });
    }
}

module.exports = new DoorService