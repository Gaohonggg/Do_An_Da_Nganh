import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { notification } from 'antd';
import { getId, getFaceId } from '../util/api';
import './Camera.css'; // Import your CSS file for styling

const Camera = ({ mode }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const intervalRef = useRef(null); // Fixed: Use const for intervalRef
    const [session, setSession] = useState(null);
    const [currentName, setCurrentName] = useState(""); // Tên hiện tại
    const [curfaceId, setFace] = useState("");

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
                console.log("Camera started, isCameraOn set to true");
            } else {
                console.error("videoRef.current is null");
            }
        } catch (err) {
            console.error("Error accessing webcam: ", err);
            notification.error({
                message: 'Lỗi Camera',
                description: 'Không thể truy cập webcam.',
            });
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            setIsCameraOn(false);
            clearInterval(intervalRef.current);
            console.log("Camera stopped, interval cleared");
        }
    };

    const getSession = async () => {
        try {
            const response = await getId();
            // console.log("Raw response from getId:", response);
            if (response?.status) {
                console.log("Setting session:", response);
                setSession(response);
                if (!response?.user?.id) {
                    console.error("Session response missing user.id:", response);
                    notification.error({
                        message: 'Lỗi',
                        description: 'API không trả về user ID.',
                    });
                }
                return response;
            } else {
                console.error("Invalid response from getId:", response);
                notification.error({
                    message: 'Lỗi lấy session1',
                    description: response?.message || 'Có lỗi xảy ra khi lấy session.',
                });
                return null;
            }
        } catch (error) {
            console.error("Error in getSession:", error);
            notification.error({
                message: 'Lỗi lấy session2',
                description: error?.message || 'Có lỗi xảy ra khi lấy session.',
            });
            return null;
        }
    };

    const getFace = async () => {
        try {
            // Gọi API getFaceId để lấy thông tin phiên hiện tại
            const response = await getFaceId(); 
            // console.log("Raw response từ getFaceId:", response);
    
            if (response?.status) {
                // Nếu API trả về thành công, thiết lập session
                // console.log("Thiết lập face:", response);
                setFace(response);
    
                // Kiểm tra xem user ID có tồn tại trong phản hồi hay không
                if (!response?.face_id) {
                    console.error("Phản hồi từ API thiếu user.id:", response);
                    notification.error({
                        message: 'Lỗi',
                        description: 'API không trả về face.',
                    });
                }
                return response; // Trả về dữ liệu phiên
            } else {
                // Trường hợp API trả về phản hồi không hợp lệ
                console.error("Phản hồi không hợp lệ từ getFaceId:", response);
                notification.error({
                    message: 'Lỗi lấy face',
                    description: response?.message || 'Có lỗi xảy ra khi lấy face.',
                });
                return null; // Không thể thiết lập session
            }
        } catch (error) {
            // Xử lý lỗi nếu xảy ra vấn đề trong quá trình gọi API
            console.error("Lỗi trong getface:", error);
            notification.error({
                message: 'Lỗi lấy face',
                description: error?.message || 'Có lỗi xảy ra khi lấy face.',
            });
            return null; // Trả về null nếu có lỗi
        }
    };
    

    const sendFrameToServer = async () => {
        if (!curfaceId) {
            console.log("Skipping frame send: faceId is missing", { curfaceId });
            return;
        }

        if (!session || !session.user || !session.user.id) {
            console.log("Skipping frame send: session or session.user.id is missing", { session });
            return;
        }
    
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("file", blob, "frame.jpg");
                formData.append("sessionId", session.user.id);

                // 🔥 Chọn endpoint theo mode
                let endpoint = "http://localhost:8000/light";
                if (mode === "setting"){
                    formData.append("faceName", currentName);
                    endpoint = "http://localhost:8000/setting";
                }
                else if (mode === "door"){
                    // console.log(`Sending frame to ${endpoint} with faceID:`, (JSON.stringify(curfaceId.face_id)));
                    formData.append("faceId", JSON.stringify(curfaceId.face_id));
                    endpoint = "http://localhost:8000/checkin";
                    // console.log(formData)
                }

                // console.log(`Sending frame to ${endpoint} with sessionId:`, session.user.id);
                // console.log(`Sending frame to ${endpoint} with faceID:`, curfaceId);

                try {
                    await axios.post(endpoint, formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                    console.log("Frame sent to server");
                } catch (error) {
                    console.error("Error sending frame: ", error);
                }
            }, "image/jpeg");
        }
    };
    

    const startSendingFrames = () => {
        console.log("Starting interval for sending frames");
    
        let frameCount = 0;
    
        intervalRef.current = setInterval(() => {
            sendFrameToServer();
    
            if (mode === "setting") {
                frameCount++;
                if (frameCount >= 3) {
                    clearInterval(intervalRef.current);
                    stopCamera(); // tự tắt camera sau 3 frame
                    console.log("Sent 3 frames in setting mode, stopping camera");
                }
            }
    
        }, 3000);
    };    

    const handleStartCamera = async () => {
        try {
            await startCamera();
            console.log("Camera started successfully");
            const sessionData = await getSession();
            const curFaceTest = await getFace();
            // console.log("Session data received:", sessionData);
            if (!sessionData || !sessionData.user || !sessionData.user.id) {
                console.error("No valid session user ID received");
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể lấy session user ID.',
                });
            }
            
            // console.log("Face data received:", curFaceTest);
            // if (!curfaceId) {
            //     console.error("No valid session user faceID");
            //     notification.error({
            //         message: 'Lỗi',
            //         description: 'Không thể lấy Face ID.',
            //     });
            // }

        } catch (error) {
            console.error("Error in handleStartCamera:", error);
        }
    };

    useEffect(() => {
        console.log("Session state updated:", session);
    }, [session]);

    useEffect(() => {
        console.log("Face ID state updated:", curfaceId);
    }, [curfaceId]);

    useEffect(() => {
        console.log("useEffect triggered with:", { isCameraOn, session, curfaceId });
        if (isCameraOn && session && session.user && session.user.id && curfaceId) {
            console.log("Starting frame sending with session and curfaceId:", { session, curfaceId });
            startSendingFrames();
        }
        return () => {
            clearInterval(intervalRef.current);
            console.log("Cleaned up interval");
        };
    }, [isCameraOn, session, curfaceId]);

    const renderModeContent = () => {
        switch (mode) {
            case "setting":
                return (
                    <div className="setting-mode">
                        <h2>Thêm Khuôn Mặt</h2>
                        <p>Nhập tên người dùng muốn thêm khuôn mặt vào và Bật Camera để bắt đầu.</p>
                        <div className="input-group">
                            <input
                                type="text"
                                value={currentName}
                                onChange={(e) => setCurrentName(e.target.value)}
                                placeholder="Nhập tên..."
                                className="name-input"
                            />
                            <button
                                onClick={isCameraOn ? stopCamera : handleStartCamera}
                                className="camera-button"
                            >
                                {isCameraOn ? "Tắt Camera" : "Bật Camera"}
                            </button>
                        </div>
                    </div>
                );
            case "door":
                return (
                    <div>
                        <h2>Nhận Diện Khuôn Mặt</h2>
                        <p>Nhận diện khuôn mặt để mở/đóng cửa.</p>
                        <button onClick={isCameraOn ? stopCamera : handleStartCamera}>
                            {isCameraOn ? "Tắt Camera" : "Bật Camera"}
                        </button>
                    </div>
                );
            case "fan":
                return (
                    <div>
                        <h2>Điều Khiển Quạt</h2>
                        <p>Sử dụng cử chỉ tay để điều khiển quạt.</p>
                        <button onClick={isCameraOn ? stopCamera : handleStartCamera}>
                            {isCameraOn ? "Tắt Camera" : "Bật Camera"}
                        </button>
                    </div>
                );
            default:
                return <p>Chọn một chế độ để bắt đầu.</p>;
        }
    };

    return (
    <div className="camera-container">
        <div className={`camera-view ${isCameraOn ? "active" : "inactive"}`}>
            <video
                ref={videoRef}
                autoPlay
                width="640"
                height="480"
                className={`camera-video ${isCameraOn ? "active" : "inactive"}`}
            ></video>
            <canvas ref={canvasRef} width="640" height="480" hidden></canvas>
        </div>
        <div className="camera-controls">
            {renderModeContent()}
        </div>
    </div>
    );
}

export default Camera;