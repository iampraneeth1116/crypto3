import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import SignInwithGoogle from "./signinwithGoogle";
import { Container, Typography, Box } from '@mui/material';
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/profile');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully", userCredential.user);
      
      toast.success("Logged in successfully!");
      navigate('/profile');
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <div className="login-card">
          <Typography variant="h4" className="login-title">
            Welcome Back
          </Typography>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <SignInwithGoogle />

            <div className="register-text">
              Don't have an account? {" "}
              <Link to="/register" className="register-link">
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;