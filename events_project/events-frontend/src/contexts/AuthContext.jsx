import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Check if user is authenticated on component mount
        axios.get('http://localhost:8000/check-auth/', { withCredentials: true })
            .then(response => setIsAuthenticated(response.data.authenticated))
            .catch(() => setIsAuthenticated(false));
    }, []);

    const login = (username, password) => {
        return axios.post('http://localhost:8000/login/', { username, password }, { withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    };

    const logout = () => {
        return axios.post('http://localhost:8000/logout/', {}, {
            withCredentials: true,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(() => {
            setIsAuthenticated(false);
            window.location.href = '/login'; // Redirect to login page
        })
        .catch(error => {
            console.error('Logout error:', error.response?.data || error.message);
        });
    };

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
