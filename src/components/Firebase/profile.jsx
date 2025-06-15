import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";

import {
  Box,
  Avatar,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";


function Profile() {
  const { user, userDetails } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Avatar
            src={user?.photoURL}
            alt={user?.displayName || "Profile"}
            sx={{
              width: 120,
              height: 120,
              mb: 3,
              border: 3,
              borderColor: "primary.main",
              bgcolor: 'primary.main',
              fontSize: '2.5rem'
            }}
          >
            {!user?.photoURL && <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>

          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: '#1a2027',
              mb: 4
            }}
          >
            {user?.email}
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            width="100%"
            maxWidth="400px"
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              onClick={handleHomeClick}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Return Home
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}

export default Profile;