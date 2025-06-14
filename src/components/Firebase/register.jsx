import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import SignInwithGoogle from "./signinwithGoogle";
import './register.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // If you're using Firestore, you can add user details like this:
      // await setDoc(doc(db, "users", user.uid), {
      //   firstName,
      //   lastName,
      //   email
      // });
      
      toast.success("Registration successful!");
      navigate('/profile');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="name-inputs">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="password-requirements">
              Must be at least 8 characters long
            </div>
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="divider">
            <span>or register with</span>
          </div>

          <SignInwithGoogle />

          <div className="login-text">
            Already have an account? <Link to="/login" className="login-link">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;