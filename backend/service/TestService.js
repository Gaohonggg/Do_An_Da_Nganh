const db = require('../data/db');
const { spawn } = require('child_process');
const path = require('path');

class TestService {
    runPythonMain() {
        console.log("Đang gọi hàm main từ Python...");
    
        // Đường dẫn tuyệt đối đến main.py
        const pythonScriptPath = path.join(__dirname, '../../connect_IOT/light.py');
    
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

module.exports = new TestService