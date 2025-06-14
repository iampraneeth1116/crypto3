import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const verifyConfig = (config) => {
  const required = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missing = required.filter(key => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required Firebase config fields: ${missing.join(', ')}`);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyDkt0Beh-CN2_x_wC2QsCeiGLVZpolubW4",
  authDomain: "login-auth-5418c.firebaseapp.com",
  projectId: "login-auth-5418c",
  storageBucket: "login-auth-5418c.firebasestorage.app",
  messagingSenderId: "772980388468",
  appId: "1:772980388468:web:543f92dbc9d2f884b7d721",
  measurementId: "G-NWMMQ9MK3J"
};

// Verify config before initialization
verifyConfig(firebaseConfig);

// Initialize Firebase outside try-catch
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

try {
  // Add debug logging
  console.log('Firebase initialized successfully');
  auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user?.email ?? 'No user');
  });
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

// Move exports outside of try-catch
export { auth, db };
export default app;