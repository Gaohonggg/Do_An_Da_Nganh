from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import cv2
import numpy as np
import uvicorn
import os
import yaml
import torch
import mediapipe as mp
import pandas as pd
from torch import nn
from datetime import datetime
import requests
import json
import time
import cv2
import os
import numpy as np
from sklearn.preprocessing import normalize
os.environ['TF_USE_LEGACY_KERAS'] = '1'
# from keras_cv_attention_models import *
import tensorflow as tf
import faiss
from ultralytics import YOLO



# Khởi tạo ứng dụng FastAPI
model_infer = None
count = 0
imgs = []
app = FastAPI()

# Khởi tạo các biến global
device = None
model = None
hand_detector = None
LABEL_NAMES = None

def label_dict_from_config_file(relative_path):
    with open(relative_path, "r") as f:
        label_tag = yaml.full_load(f)["gestures"]
    return label_tag

class HandLandmarksDetector:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.detector = self.mp_hands.Hands(False, max_num_hands=1, min_detection_confidence=0.5)

    def detect_landmarks(self, frame):
        print('Processing frame for landmarks detection')
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

class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.flatten = nn.Flatten()
        list_label = label_dict_from_config_file("hand_gesture.yaml")
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

    def predict(self, x, threshold=0.8):
        logits = self(x)
        softmax_prob = nn.Softmax(dim=1)(logits)
        chosen_ind = torch.argmax(softmax_prob, dim=1)
        return torch.where(softmax_prob[0, chosen_ind] > threshold, chosen_ind, -1)

    def predict_with_known_class(self, x):
        logits = self(x)
        softmax_prob = nn.Softmax(dim=1)(logits)
        return torch.argmax(softmax_prob, dim=1)

    def score(self, logits):
        return -torch.amax(logits, dim=1)

def predict(frame):
    hands = hand_detector.detect_landmarks(frame)
    print(f"Detected hands: {hands}")
    if hands:
        hand = hands[0]  # Chỉ lấy bàn tay đầu tiên
        input_tensor = torch.tensor(hand, dtype=torch.float32).unsqueeze(0).to(device)
        prediction = model.predict_with_known_class(input_tensor)
        print(f"Prediction: {prediction.item()}")
        return prediction.item()
    return None  # Trả về None nếu không phát hiện bàn tay

def detect_and_crop_face(frame):
    # Resize to improve detection speed if necessary
    img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = detector.predict(img, imgsz=640, conf=0.5)  # Adjust conf threshold if needed

    if len(results[0].boxes.xyxy) == 0:
        return None

    # Assume the first detected face (can improve later)
    box = results[0].boxes.xyxy[0].cpu().numpy().astype(int)
    x1, y1, x2, y2 = box
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(frame.shape[1], x2)
    y2 = min(frame.shape[0], y2)

    face_crop = frame[y1:y2, x1:x2]
    return face_crop

@app.on_event("startup")
def startup_event():
    global device, model, hand_detector, LABEL_NAMES, model_face, model_infer, detector
    print("Starting up FastAPI server...")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    labels = label_dict_from_config_file("hand_gesture.yaml")
    LABEL_NAMES = [labels[i] for i in sorted(labels)]
    model = NeuralNetwork().to(device)
    model.load_state_dict(torch.load("./model/model_Hand_Gesture_MLP.pth", map_location=device))
    model.eval()
    hand_detector = HandLandmarksDetector()
    model_face = tf.keras.models.load_model('./model/GhostFaceNet_W1.3_S1_ArcFace.h5')
    # model_infer =  lambda imm: model((imm - 127.5) * 0.0078125).numpy()
    model_infer = lambda imm: model_face.predict(imm)
    detector = YOLO('./model/yolov11s-face.pt')
    print("Server startup completed.")

@app.post("/light")
async def process_frame(
    file: UploadFile = File(...),
    sessionId: str = Form(...)  # 👈 nhận sessionId từ formData
    ):
    try:
        print("Received request at /light endpoint")
        # Đọc dữ liệu hình ảnh
        image_data = await file.read()
        np_arr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        image = cv2.resize(image, (1280, 720))
        print(f"Image shape: {image.shape}")

        # Kiểm tra ảnh hợp lệ
        if image is None:
            raise ValueError("Không thể đọc ảnh")

        label = predict(image)
        
        print("Received session ID:", sessionId)  # Kiểm tra xem có nhận được sessionId hay không

        
        if label is not None:
            target_url = "http://localhost:3001/fan/set"
            data = {
                "id": 1,
                "level": label,
                "status": 1,
                "uid": sessionId
            }
            print(data)

            response = requests.post(target_url, json=data)
            return {"label": LABEL_NAMES[label]}
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/setting")
async def process_face(
    file: UploadFile = File(...),
    sessionId: str = Form(...),  # 👈 nhận sessionId từ formData
    faceName: str = Form(...)
    ):
    try:
        global count, imgs
        if count < 3:
            print("Received request at /light endpoint")
            # Đọc dữ liệu hình ảnh
            image_data = await file.read()
            np_arr = np.frombuffer(image_data, np.uint8)
            image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
            image = detect_and_crop_face(image)
            imgs.append(image)
            count += 1
        if count == 3:
            embs = []
            for img in imgs:
                img = cv2.resize(img, (112, 112), interpolation=cv2.INTER_AREA)
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = np.expand_dims(img, axis=0)
                img = img.astype("float32")
                img = (img - 127.5) * 0.0078125
                emb = model_infer(img)
                # print(emb)
                emb = normalize(np.array(emb).astype("float32"))[0]
                embs.append(emb)

                # print(embs)

            representative_embedding = normalize([np.sum(embs, 0)])[0]
            representative_embedding = np.array([representative_embedding])
            print(representative_embedding)
            representative_embedding = ",".join(map(str, representative_embedding.flatten()))

            print("Received session ID:", sessionId)  # Kiểm tra xem có nhận được sessionId hay không
            target_url = "http://localhost:3001/door/face"
            data = {
                "face_id": representative_embedding,
                "name": faceName
            }
            print(data)

            imgs = []
            count = 0

            response = requests.post(target_url, json=data)
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/checkin")
async def process_face(
    file: UploadFile = File(...),
    sessionId: str = Form(...),
    faceId: str = Form(None)):

    try:
        # print(file)
        # print(sessionId)
        # print(type(faceId))
        # Bước 1: Parse từ string -> Python list
        parsed_face_id_list = json.loads(faceId)
        # print(parsed_face_id_list)

        # Bước 2: Chuyển thành list of vector
        vectors = []
        for item in parsed_face_id_list:
            face_id_str = item["face_id"]
            vector = [float(x) for x in face_id_str.split(',') if x.strip() != ""]
            vectors.append(vector)
            print(len(vector))
        # Bước 3: Convert thành numpy array
        vector_np = np.array(vectors, dtype=np.float32)
        print(vector_np)
        print(vector_np.shape)

        # Đọc dữ liệu hình ảnh
        image_data = await file.read()
        np_arr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        image = detect_and_crop_face(image)
        img = cv2.resize(image, (112, 112), interpolation=cv2.INTER_AREA)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = np.expand_dims(img, axis=0)
        img = img.astype("float32")
        img = (img - 127.5) * 0.0078125
        emb = model_infer(img)
        emb = normalize(np.array(emb).astype("float32"))[0]
        
        
        # Create FAISS index
        index = faiss.IndexFlatIP(512)
        index.add(vector_np.astype(np.float32))
        
        # Search for the nearest neighbor
        k = 1
        target_representation = np.array(emb, dtype='f')
        target_representation = np.expand_dims(target_representation, axis=0)
        distances, neighbors = index.search(target_representation, k)
        
        # Check if the distance is less than threshold
        # we will  send the data to the server
        if distances[0][0] > 0.5:
            status = 'ON'
        else:
            status = 'OFF'
        
        print("Received session ID:", sessionId)  # Kiểm tra xem có nhận được sessionId hay không
        print(distances[0][0])
        print(neighbors[0][0])
        print(status)
        if status == 'ON':
            target_url = "http://localhost:3001/door/set"
            data = {
                "id": sessionId,
                "status": status,
                "door_id": str(neighbors[0][0] + 2)
            }
            
            response = requests.post(target_url, json=data)
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    print("Running FastAPI server from main...")
    uvicorn.run(app, host="0.0.0.0", port=8000)