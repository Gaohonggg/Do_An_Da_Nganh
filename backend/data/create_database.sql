-- Xóa database nếu đã tồn tại
DROP DATABASE IF EXISTS SmartHome;
CREATE DATABASE SmartHome;
USE SmartHome;

-- Bảng User
CREATE TABLE User (
    CCCD VARCHAR(20) PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL
);

-- Bảng Door
CREATE TABLE Door (
    door_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    face_id VARCHAR(16000) NOT NULL
    
);

-- Bảng Fan
CREATE TABLE Fan (
    fan_id INT AUTO_INCREMENT PRIMARY KEY,
    level INT NOT NULL CHECK (level BETWEEN 0 AND 3)
);

-- Bảng Control (Lịch sử sử dụng)
CREATE TABLE Control (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    CCCD VARCHAR(20) NOT NULL,
    device_type ENUM('door', 'light', 'fan') NOT NULL,
    device_id INT NOT NULL,
    status ENUM('ON', 'OFF') NOT NULL,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    FOREIGN KEY (CCCD) REFERENCES User(CCCD) ON DELETE CASCADE
);

-- Bảng Notice (Thông báo)
CREATE TABLE Notice (
    notice_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    CCCD VARCHAR(20) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CCCD) REFERENCES User(CCCD) ON DELETE CASCADE
);