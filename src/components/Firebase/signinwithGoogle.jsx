import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignInwithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google login result:", result);

      if (result.user) {
        await setDoc(doc(db, "Users", result.user.uid), {
          email: result.user.email,
          firstName: result.user.displayName,
          photo: result.user.photoURL,
          lastName: "",
        });

        toast.success("Logged in successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img
          src="/google.png"
          alt="Sign in with Google"
          style={{ width: "60%" }}
        />
      </div>
    </div>
  );
}

export default SignInwithGoogle;