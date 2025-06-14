import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  IconButton,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./profile.css";

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
      await userService.logout();
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
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
    <Container maxWidth="md">
      <Box sx={{ position: "relative", mt: 2 }}>
        <Tooltip title="Back to Dashboard">
          <IconButton
            onClick={handleBack}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              color: "primary.main",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={userDetails?.firstName || "Profile"}
          sx={{
            width: 120,
            height: 120,
            mb: 3,
            border: 3,
            borderColor: "primary.main",
          }}
        >
          {!user?.photoURL && <PersonIcon sx={{ fontSize: 60 }} />}
        </Avatar>

        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          {userDetails?.firstName} {userDetails?.lastName}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          {user?.email}
        </Typography>

        <Divider sx={{ width: "100%", my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                First Name
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {userDetails?.firstName || "Not set"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Name
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {userDetails?.lastName || "Not set"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Account Created
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {userDetails?.createdAt?.toDate().toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Login
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {userDetails?.lastLogin?.toDate().toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ flex: 1 }}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ flex: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;