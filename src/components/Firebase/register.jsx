import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import SignInwithGoogle from "./signinwithGoogle"
import './register.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  const validateName = (name, field) => {
    if (!name.trim()) {
      setFormErrors(prev => ({
        ...prev,
        [field]: 'This field is required'
      }));
      return false;
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setFormErrors(prev => ({
        ...prev,
        [field]: 'Only letters and spaces are allowed'
      }));
      return false;
    }
    setFormErrors(prev => ({
      ...prev,
      [field]: ''
    }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isFirstNameValid = validateName(firstName, 'firstName');
    const isLastNameValid = validateName(lastName, 'lastName');
    
    if (!isFirstNameValid || !isLastNameValid) {
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        createdAt: new Date(),
        lastLogin: new Date(),
        watchlist: [],
        preferences: {
          theme: 'light',
          currency: 'USD'
        }
      });

      toast.success('Successfully registered!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
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
                className={`form-control ${formErrors.firstName ? 'error' : ''}`}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateName(e.target.value, 'firstName');
                }}
                required
              />
              {formErrors.firstName && (
                <div className="error-message">{formErrors.firstName}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${formErrors.lastName ? 'error' : ''}`}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateName(e.target.value, 'lastName');
                }}
                required
              />
              {formErrors.lastName && (
                <div className="error-message">{formErrors.lastName}</div>
              )}
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