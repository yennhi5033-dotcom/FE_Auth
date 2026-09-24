import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCxWE_zaHecacnaluxzegcPZmvzcylMZEo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "test-lua-1cf98.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "test-lua-1cf98",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "test-lua-1cf98.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "651633923397",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:651633923397:web:2e2103179420f392d71a2c",
};

// Khởi tạo app Firebase Client an toàn
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Khởi tạo Auth và Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Cấu hình prompt chọn tài khoản mỗi khi bấm login
googleProvider.setCustomParameters({
  prompt: "select_account",
});