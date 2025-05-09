const mqtt = require('mqtt');

const USERNAME = "Dat_Nguyen";
const KEY = "";
const ADAFRUIT_IO_URL = "mqtt://io.adafruit.com";

// Kết nối đến Adafruit IO
const client = mqtt.connect(ADAFRUIT_IO_URL, {
    username: USERNAME,
    password: KEY
});

client.on('connect', () => {
    console.log("Kết nối thành công ...");
    client.subscribe(`${USERNAME}/feeds/light`, (err) => {
        if (!err) {
            console.log("Subscribe thành công ...");
        } else {
            console.error("Lỗi khi subscribe:", err);
        }
    });
    client.subscribe(`${USERNAME}/feeds/fan`, (err) => {
        if (!err) {
            console.log("Subscribe thành công ...");
        } else {
            console.error("Lỗi khi subscribe:", err);
        }
    });
    client.subscribe(`${USERNAME}/feeds/door`, (err) => {
        if (!err) {
            console.log("Subscribe thành công ...");
        } else {
            console.error("Lỗi khi subscribe:", err);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Nhận dữ liệu từ ${topic}:`, message.toString());
});

client.on('error', (error) => {
    console.error("Lỗi kết nối:", error);
});

client.on('close', () => {
    console.log("Ngắt kết nối ...");
});

module.exports = client;