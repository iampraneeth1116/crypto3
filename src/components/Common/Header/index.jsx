import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from "../Button";
import "./styles.css";
import TemporaryDrawer from "./drawer";

function Header() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>
          CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
        </h1>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="links-desktop">
        <Link to="/">
          <p className={`link ${isActive('/') ? 'active' : ''}`}>Home</p>
        </Link>
        <Link to="/compare">
          <p className={`link ${isActive('/compare') ? 'active' : ''}`}>Compare</p>
        </Link>
        
          <Link to="/watchlist">
            <p className={`link ${isActive('/watchlist') ? 'active' : ''}`}>Watchlist</p>
          </Link>

        <Link to="/dashboard">
          <Button text="Dashboard" />
        </Link>
        
        {!user ? (
          <Link to="/login">
            <Button text="Login" outlined={true} />
          </Link>
        ) : (
          <Link to="/profile">
            <Button 
              text={user.displayName?.split(' ')[0] || 'Profile'} 
              outlined={true}
            />
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-drawer">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
