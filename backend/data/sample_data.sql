USE SmartHome;

-- Thêm dữ liệu mẫu cho User
INSERT INTO User (CCCD, email, password, username) VALUES
('123456789', 'user1@example.com', 'password123', 'User One'),
('987654321', 'user2@example.com', 'password456', 'User Two'),
('456789123', 'user3@example.com', 'password789', 'User Three');

-- Thêm dữ liệu mẫu cho Door (2 cửa)
INSERT INTO Door (face_id) VALUES
('face_001'), ('face_002');

-- Thêm dữ liệu mẫu cho Light (10 đèn)
INSERT INTO Light (distance) VALUES
(3.5), (2.0), (4.0), (2.5), (3.0), (4.5), (1.5), (2.8), (3.3), (3.7);

-- Thêm dữ liệu mẫu cho Fan (3 quạt)
INSERT INTO Fan (gesture) VALUES
('wave'), ('clap'), ('double tap');

-- Thêm dữ liệu mẫu vào Control (Lịch sử sử dụng và điều khiển thiết bị)
INSERT INTO Control (CCCD, device_type, device_id, status, command, timestamp) VALUES
('987654321', 'door', 1, 'ON', 'Mở cửa', '2025-03-11 11:00:00'),
('987654321', 'door', 2, 'ON', 'Mở cửa', '2025-03-11 11:05:00'),
('456789123', 'light', 1, 'ON', 'Bật đèn', '2025-03-11 11:10:00'),
('456789123', 'light', 2, 'ON', 'Bật đèn', '2025-03-11 11:15:00'),
('123456789', 'fan', 1, 'ON', 'Bật quạt', '2025-03-11 11:20:00'),
('123456789', 'fan', 2, 'ON', 'Bật quạt', '2025-03-11 11:25:00'),
('123456789', 'fan', 1, 'OFF', 'Tắt quạt', '2025-03-11 12:00:00'),
('456789123', 'light', 3, 'ON', 'Bật đèn', '2025-03-11 12:05:00'),
('123456789', 'fan', 3, 'ON', 'Bật quạt', '2025-03-11 12:10:00');

-- Thêm dữ liệu mẫu cho Notice (Thông báo từ hệ thống)
INSERT INTO Notice (date, hour, content, CCCD) VALUES
('2025-03-11', '12:00:00', 'Quạt 1 tắt', '123456789'),
('2025-03-11', '11:50:00', 'Quạt 1 bật', '123456789'),
('2025-03-11', '11:10:00', 'Đèn 1 bật', '456789123'),
('2025-03-11', '11:05:00', 'Cửa 2 mở', '987654321'),
('2025-03-11', '11:00:00', 'Cửa 1 mở', '987654321');