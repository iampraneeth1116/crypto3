import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./signinWithGoogle.css";

const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function SignInWithGoogle() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create or update user document
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: serverTimestamp(),
          updatedAt: serverTimestamp(),
          ...(!userSnap.exists() && {
            createdAt: serverTimestamp(),
            watchlist: [],
            preferences: { theme: "light", currency: "USD" },
          }),
        },
        { merge: true }
      );

      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign In Error:", error);
      const errorMessage = {
        "auth/popup-closed-by-user": "Sign in cancelled",
        "auth/network-request-failed":
          "Network error. Please check your connection",
        "auth/user-disabled": "This account has been disabled",
        "auth/operation-not-allowed": "Google sign in is not enabled",
      }[error.code] || "Failed to sign in with Google";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`google-sign-in-button ${loading ? "loading" : ""}`}
      onClick={handleGoogleSignIn}
      disabled={loading}
      aria-label="Sign in with Google"
    >
      <span className="button-content">
        {loading ? (
          <div className="loader" />
        ) : (
          <>
            <GoogleIcon />
            <span className="button-text">Continue with Google</span>
          </>
        )}
      </span>
    </button>
  );
}