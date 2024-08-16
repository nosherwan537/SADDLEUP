import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the theme configuration
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <Router>
                <Navbar />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/" element={<ProtectedRoute element={EventList} />} />
                        <Route path="/events/add" element={<ProtectedRoute element={EventForm} />} />
                        <Route path="/events/edit/:eventId" element={<ProtectedRoute element={EventForm} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
