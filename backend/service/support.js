const client = require('../data/ada');
const { spawn } = require('child_process');
const path = require('path');
const db = require('../data/db');

class Support {
    getDate() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const year = now.getFullYear();
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    getDay() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const year = now.getFullYear();
    
        return `${year}-${month}-${day}`;
    }

    getHour() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        return `${hours}:${minutes}:${seconds}`;
    }

    groupDataByDate(dataset) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
    
        const groupedData = {};
    
        dataset.forEach(({ device_type, device_id, status, date, hour }) => {
            const dateObj = new Date(date);
            const dateOnly = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    
            let timeLabel = "";
            if (dateOnly.getTime() === today.getTime()) timeLabel = "Hôm nay";
            else if (dateOnly.getTime() === yesterday.getTime()) timeLabel = "Hôm qua";
            else {
                const day = dateObj.getDate();
                const month = dateObj.getMonth() + 1;
                timeLabel = `${day} / ${month}`;
            }

            let device = "";
            if (device_type === "door") device = "Cửa";
            else if (device_type === "light") device = "Đèn";
            else if (device_type === "fan") device = "Quạt";
    
            const action = `${hour.slice(0, 5)}: ${device} ${device_id} ${status === "ON" ? "bật" : "tắt"}`;
    
            if (!groupedData[timeLabel]) {
                groupedData[timeLabel] = [];
            }
    
            groupedData[timeLabel].push(action);
        });
    
        return groupedData;
    }

    runPythonMain(id) {
        console.log("Đang gọi hàm main từ Python...");
    
        // Đường dẫn tuyệt đối đến main.py
        const pythonScriptPath = path.join(__dirname, '../../connect_IOT/api.py');
    
        const pythonProcess = spawn('python', [pythonScriptPath]);
    
        pythonProcess.stdout.on('data', async (data) => {
            console.log(`Output từ Python: ${data.toString()}`);
            var status = "";
            if (data == 0) status = "OFF";
            else if (data > 0) status = "ON";
            const [rac1] = await db.query("SELECT status FROM control WHERE device_type = 'fan' AND device_id = ?", [id]);
            if (rac1.length == 0) { 
                resolve({ status: false, message: "Không tìm thấy thiết bị" });
                return;
            }
            const [rac2] = await db.query('UPDATE fan SET level = ? WHERE fan_id = ?', [data.level, data.id]);
            if (rac2.affectedRows == 0) {
                resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                return;
            }
            if (status != rac1[rac1.length - 1].status) {
                const [rac3] = await db.query('INSERT INTO control (CCCD, device_type, device_id, status, date, hour) VALUES (?, ?, ?, ?, ?, ?)', [req.session.user.id, 'fan', data.id, status, support.getDay(), support.getHour()]);
                if (rac3.affectedRows == 0) {
                    resolve({ status: false, message: "Cập nhật thiết bị thất bại" });
                    return;
                }
            }
            client.publish(`Dat_Nguyen/feeds/fan`, data)
        });
    
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Lỗi từ Python: ${data.toString()}`);
        });
    
        pythonProcess.on('close', (code) => {
            console.log(`Python kết thúc với mã: ${code}`);
        });
    }
    
}
module.exports = new Support;