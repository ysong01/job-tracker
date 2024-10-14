// frontend/src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthProvider, { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const { auth } = React.useContext(AuthContext);
  return auth.token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
