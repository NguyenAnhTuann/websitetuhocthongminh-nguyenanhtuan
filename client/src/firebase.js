// firebase.js - cấu hình Firebase cho dự án React

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase của bạn (copy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDaHShRPs_Sd-Q81bnbIghf86skbFuZwGU",
  authDomain: "websitetuhocthongminh.firebaseapp.com",
  projectId: "websitetuhocthongminh",
  storageBucket: "websitetuhocthongminh.firebasestorage.app",
  messagingSenderId: "474673935870",
  appId: "1:474673935870:web:c9ef0fc2ab88a9aa377caf",
  measurementId: "G-4LL4TGRP08"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Các dịch vụ sẽ dùng trong web
export const auth = getAuth(app);           // Đăng nhập
export const storage = getStorage(app);     // Lưu PDF, ảnh, video
export const db = getFirestore(app);        // Lưu dữ liệu metadata

export default app;
