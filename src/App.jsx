import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Compare = lazy(() => import('./pages/Compare'));
const Login = lazy(() => import('./components/Firebase/login'));
const Register = lazy(() => import('./components/Firebase/register'));
const Profile = lazy(() => import('./components/Firebase/profile'));

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Box className="App" component="main">
      <ToastContainer />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/watchlist"
            element={user ? <Watchlist /> : <Navigate to="/login" />}
          />
          <Route path="/compare" element={<Compare />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </Box>
  );
};

export default App;
