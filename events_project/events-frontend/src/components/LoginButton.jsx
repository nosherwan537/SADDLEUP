import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = () => {
        axios.post('http://localhost:8000/logout/')
            .then(response => {
                console.log('Logout successful:', response.data);
            })
            .catch(error => {
                console.error('Logout error:', error.response.data);
            });
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
