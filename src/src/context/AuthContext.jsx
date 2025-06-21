import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await api.get(`/api/users/${userId}`);
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/users/login', { email, password });
            const { token, id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', id);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchUser();
            navigate('/dashboard');
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/api/users/register', userData);
            const { token, id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', id);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchUser();
            navigate('/dashboard');
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        navigate('/');
    };

    const updateUser = async (userData) => {
        try {
            const response = await api.put(`/api/users/${user.id}`, userData);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Update user error:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 