import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const { user, updateUser } = useAuth();
    const [theme, setTheme] = useState(user?.themePreference || 'dark');

    useEffect(() => {
        if (user?.themePreference) {
            setTheme(user.themePreference);
            document.documentElement.setAttribute('data-theme', user.themePreference);
        }
    }, [user]);

    const toggleTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        try {
            if (user) {
                await updateUser({ ...user, themePreference: newTheme });
            }
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    };

    const value = {
        theme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 