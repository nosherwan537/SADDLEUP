import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the import path as needed

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for storing error messages
    const { login } = useContext(AuthContext); // Use AuthContext to handle login
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password); // Call the login function from AuthContext
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            setError(error.response?.data.error || 'An unexpected error occurred'); // Set error message
        }
    };

    return (
        <Container maxWidth="xs" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <Typography variant="h4" component="h1" gutterBottom align="center">Login</Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default LoginForm;
