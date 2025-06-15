import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";

import {
  Avatar,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { toast } from "react-toastify";
import "./profile.css";

function Profile() {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          toast.error("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="profile-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-paper">
        <Avatar className="profile-avatar">
          {!user?.photoURL && <PersonIcon sx={{ fontSize: 60 }} />}
        </Avatar>

        <Typography className="profile-title">{user?.email}</Typography>

        {userDetails?.firstName && userDetails?.lastName && (
          <Typography className="profile-name">
            {userDetails.firstName} {userDetails.lastName}
          </Typography>
        )}

        <div className="profile-buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={handleHomeClick}
            startIcon={<HomeIcon />}
          >
            Return Home
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
