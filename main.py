import cv2
import torch
import numpy as np
import mediapipe as mp
from training import NeuralNetwork, label_dict_from_config_file

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
    # Tải nhãn từ file cấu hình
    LABEL_TAG = label_dict_from_config_file("hand_gesture.yaml")
    LABEL_NAMES = [name for _, name in LABEL_TAG.items()]

    # Tải mô hình đã huấn luyện
    model = NeuralNetwork()
    model.load_state_dict(torch.load('./models/model_Hand_Gesture_MLP.pth'))
    model.eval()

    # Khởi tạo detector bàn tay
    hand_detector = HandLandmarksDetector()

    # Mở camera
    cam = cv2.VideoCapture(0)
    cam.set(3, 1280)  # Width
    cam.set(4, 720)   # Height

    print("Press 'q' to exit.")
    while cam.isOpened():
        ret, frame = cam.read()
        if not ret:
            break

        # Phát hiện landmark bàn tay
        hands = hand_detector.detect_landmarks(frame)

        if hands:
            hand = hands[0]  # Chỉ lấy bàn tay đầu tiên
            input_tensor = torch.tensor(hand, dtype=torch.float32).unsqueeze(0)  # Chuyển đổi thành Tensor
            prediction = model.predict_with_known_class(input_tensor)

            # Hiển thị nhãn dự đoán
            label = LABEL_NAMES[prediction.item()]
            cv2.putText(frame, f"Prediction: {label}", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        cv2.imshow("Hand Gesture Recognition", frame)

        # Nhấn phím 'q' để thoát
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()