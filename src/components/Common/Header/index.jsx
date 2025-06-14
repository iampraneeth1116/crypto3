import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import TemporaryDrawer from "./drawer";
import "./styles.css";

function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>
          CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
        </h1>
      </Link>
      <div className="links">
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
        <Link to="/login">
        <Button text="Login" outlined={true} />
      </Link>
      </div>
      <div className="drawer-component">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
