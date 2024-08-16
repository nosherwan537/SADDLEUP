import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the path

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
            <h1 className="text-lg font-bold">Event Manager</h1>
            <div className="space-x-4">
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/events/add">Add Event</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
