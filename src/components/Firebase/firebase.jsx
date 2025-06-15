import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkt0Beh-CN2_x_wC2QsCeiGLVZpolubW4",
  authDomain: "login-auth-5418c.firebaseapp.com",
  projectId: "login-auth-5418c",
  storageBucket: "login-auth-5418c.firebasestorage.app",
  messagingSenderId: "772980388468",
  appId: "1:772980388468:web:543f92dbc9d2f884b7d721",
  measurementId: "G-NWMMQ9MK3J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);