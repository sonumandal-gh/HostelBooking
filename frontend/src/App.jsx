import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HostelList from './pages/HostelList';
import AddHostel from './pages/AddHostel';
import HostelDetails from './pages/HostelDetails';
import Favourites from './pages/Favourites';
import Bookings from './pages/Bookings';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function AppContent() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hostels" element={<HostelList />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route 
          path="/favourites" 
          element={
            <ProtectedRoute role="guest">
              <Favourites />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute role="guest">
              <Bookings />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/add-hostel" 
          element={
            <ProtectedRoute role="host">
              <AddHostel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-hostel/:id" 
          element={
            <ProtectedRoute role="host">
              <AddHostel />
            </ProtectedRoute>
          } 
        />
      </Routes>

    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
