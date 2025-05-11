USE SmartHome;

-- Thêm dữ liệu mẫu cho User
INSERT INTO User (CCCD, email, password, username) VALUES
('123456789', 'user1@example.com', '$2b$10$EM6AQshoec7KswVV5Y2Uw.kH/lfz6NM7X/Q3b33PYZ.xoWV1M4DUK', 'User One'),
('987654321', 'user2@example.com', '$2b$10$EM6AQshoec7KswVV5Y2Uw.kH/lfz6NM7X/Q3b33PYZ.xoWV1M4DUK', 'User Two'),
('456789123', 'user3@example.com', '$2b$10$EM6AQshoec7KswVV5Y2Uw.kH/lfz6NM7X/Q3b33PYZ.xoWV1M4DUK', 'User Three');

-- Thêm dữ liệu mẫu cho Door (2 cửa)
INSERT INTO Door (door_id, face_id, name) VALUES
(0, 'face_001', 'dat');

-- Thêm dữ liệu mẫu cho Fan (3 quạt)
INSERT INTO Fan (level) VALUES
(0), (2), (3);

-- Thêm dữ liệu mẫu vào Control (Lịch sử sử dụng và điều khiển thiết bị)
INSERT INTO Control (CCCD, device_type, device_id, status, date, hour) VALUES
('987654321', 'door', 1, 'OFF', '2025-03-11', '11:00:00'),
('987654321', 'door', 2, 'OFF', '2025-03-11', '11:05:00'),
('456789123', 'light', 1, 'OFF', '2025-03-11', '11:10:00'),
('456789123', 'light', 2, 'OFF', '2025-03-11', '11:15:00'),
('123456789', 'fan', 1, 'ON', '2025-03-11', '11:20:00'),
('123456789', 'fan', 2, 'OFF', '2025-03-11', '11:25:00'),
('123456789', 'fan', 1, 'OFF', '2025-03-11', '12:00:00'),
('456789123', 'light', 3, 'OFF', '2025-03-11', '12:05:00'),
('123456789', 'fan', 3, 'OFF', '2025-03-11', '12:10:00');

-- Thêm dữ liệu mẫu cho Notice (Thông báo từ hệ thống)
INSERT INTO Notice (timestamp, content, CCCD) VALUES
('2025-03-11 11:00:00', 'Cửa 1 mở', '987654321'),
('2025-03-11 11:05:00', 'Cửa 2 mở', '987654321'),
('2025-03-11 11:10:00', 'Đèn 1 bật', '456789123'),
('2025-03-11 11:15:00', 'Đèn 2 bật', '456789123'),
('2025-03-11 11:20:00', 'Quạt 1 bật', '123456789'),
('2025-03-11 11:25:00', 'Quạt 2 bật', '123456789'),
('2025-03-11 12:00:00', 'Quạt 1 tắt', '123456789'),
('2025-03-11 12:05:00', 'Đèn 3 mở', '456789123'),
('2025-03-11 12:10:00', 'Quạt 3 mở', '123456789');