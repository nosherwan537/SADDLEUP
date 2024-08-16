import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Adjust import path as needed

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
