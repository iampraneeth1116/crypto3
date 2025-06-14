import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link-btn" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p className={`link ${isActive('/') ? 'active' : ''}`}>Home</p>
          </Link>
          <Link to="/compare" style={{ textDecoration: 'none' }}>
            <p className={`link ${isActive('/compare') ? 'active' : ''}`}>Compare</p>
          </Link>
          <Link to="/watchlist" style={{ textDecoration: 'none' }}>
            <p className={`link ${isActive('/watchlist') ? 'active' : ''}`}>Watchlist</p>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <p className={`link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</p>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
