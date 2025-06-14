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
} from "@mui/material";
import { toast } from "react-toastify";
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
          alt={user?.displayName || "Profile"}
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

        <Typography variant="h4" gutterBottom>
          {userDetails?.firstName} {userDetails?.lastName}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          {user?.email}
        </Typography>

        <Divider sx={{ width: "100%", my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Account Created
            </Typography>
            <Typography variant="body1">
              {userDetails?.createdAt?.toDate().toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Login
            </Typography>
            <Typography variant="body1">
              {userDetails?.lastLogin?.toDate().toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, width: "100%" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;