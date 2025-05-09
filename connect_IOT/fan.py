import sys
import time
from Adafruit_IO import MQTTClient
import yaml

import cv2
import torch
from torch import nn
import numpy as np
import mediapipe as mp


# def connected(client):   #Kết nối
#     print("Kết nối thành công ...")
#     client.subscribe( feed_id )  #Đăng kí nhận dữ liệu từ feed_id

# def subscribe(client, userdata, mid, granted_qos):
#     print("Subcribe thành công ...")

# def disconnected(client):
#     print("Ngắt kết nối ...")
#     sys.exit(1)

# def message(client, id_feed, payload):   #Tin nhắn khi gửi dữ liệu lên feed
#     print("Nhận dữ liệu fan: ", payload)

def label_dict_from_config_file(relative_path):
    with open(relative_path, "r") as f:
       label_tag = yaml.full_load(f)["gestures"]
    return label_tag

class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.flatten = nn.Flatten()
        list_label = label_dict_from_config_file("D:/Do_An_Da_Nganh/web/connect_IOT/hand_gesture.yaml")
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(63, 128),
            nn.ReLU(), nn.BatchNorm1d(128),
            nn.Linear(128, 128),
            nn.ReLU(), nn.Dropout(0.4),
            nn.Linear(128, 128),
            nn.ReLU(), nn.Dropout(0.4),
            nn.Linear(128, 128),
            nn.ReLU(), nn.Dropout(0.6),
            nn.Linear(128, len(list_label))
        )

    def forward(self, x):
        x = self.flatten(x)
        x = self.linear_relu_stack(x)
        return x

    def predict_with_known_class(self, x):
        logits = self(x)
        softmax_prob = nn.Softmax(dim=1)(logits)
        return torch.argmax(softmax_prob, dim=1)

class HandLandmarksDetector:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.detector = self.mp_hands.Hands(False, max_num_hands=1, min_detection_confidence=0.5)

    def detect_landmarks(self, frame):
        frame = cv2.flip(frame, 1)
        results = self.detector.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        landmarks = []

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                hand = []
                for landmark in hand_landmarks.landmark:
                    hand.extend([landmark.x, landmark.y, landmark.z])
                landmarks.append(hand)
        return landmarks

def main():
    # Kiểm tra CUDA và thiết lập thiết bị
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    # print("Using device:", device)

    # Tải nhãn từ file cấu hình
    LABEL_TAG = label_dict_from_config_file("D:/Do_An_Da_Nganh/web/connect_IOT/hand_gesture.yaml")
    LABEL_NAMES = [name for _, name in LABEL_TAG.items()]

    # Tải mô hình đã huấn luyện và chuyển sang thiết bị đã chọn
    model = NeuralNetwork().to(device)
    model.load_state_dict(torch.load('D:/Do_An_Da_Nganh/web/connect_IOT/model/model_Hand_Gesture_MLP.pth', map_location=device))
    model.eval()

    # Khởi tạo detector bàn tay
    hand_detector = HandLandmarksDetector()

    # Mở camera
    cam = cv2.VideoCapture(0)
    cam.set(3, 1280)  # Width
    cam.set(4, 720)   # Height

    # print("Press 'q' to exit.")

    old_predict = None
    while cam.isOpened():
        ret, frame = cam.read()
        if not ret:
            break

        # Phát hiện landmark bàn tay
        hands = hand_detector.detect_landmarks(frame)
        if hands:
            hand = hands[0]  # Chỉ lấy bàn tay đầu tiên
            # Chuyển input thành tensor và sang thiết bị đã chọn
            input_tensor = torch.tensor(hand, dtype=torch.float32).unsqueeze(0).to(device)
            prediction = model.predict_with_known_class(input_tensor)

            # Hiển thị nhãn dự đoán
            label = LABEL_NAMES[prediction.item()]

            predict = prediction.item()

            if (old_predict == None or predict != old_predict) and predict != 4:
                print(predict)
                old_predict = predict

            cv2.putText(frame, f"Prediction: {label}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.imshow("Hand Gesture Recognition", frame)

        # Nhấn phím 'q' để thoát
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":

    # feed_id = "fan"
    # username = "Dat_Nguyen"
    

    # client = MQTTClient(username, key)
    # client.on_connect = connected
    # client.on_disconnect = disconnected
    # client.on_message = message
    # client.on_subscribe = subscribe
    # client.connect()
    # client.loop_background()

    main()