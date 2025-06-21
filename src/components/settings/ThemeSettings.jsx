import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../../styles/ThemeSettings.css';

const ThemeSettings = ({ onToggle }) => {
  const [isDark, setIsDark] = useState(true);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    onToggle(newTheme);
  };

  return (
    <div className="theme-settings">
      <h2>Theme Settings</h2>
      
      <div className="theme-options">
        <div className="theme-card">
          <div className="theme-preview dark">
            <div className="preview-header"></div>
            <div className="preview-content">
              <div className="preview-item"></div>
              <div className="preview-item"></div>
              <div className="preview-item"></div>
            </div>
          </div>
          <div className="theme-info">
            <FaMoon className="theme-icon" />
            <span>Dark Theme</span>
          </div>
        </div>

        <div className="theme-card">
          <div className="theme-preview light">
            <div className="preview-header"></div>
            <div className="preview-content">
              <div className="preview-item"></div>
              <div className="preview-item"></div>
              <div className="preview-item"></div>
            </div>
          </div>
          <div className="theme-info">
            <FaSun className="theme-icon" />
            <span>Light Theme</span>
          </div>
        </div>
      </div>

      <div className="theme-toggle">
        <span className="toggle-label">Current Theme</span>
        <button
          className={`toggle-button ${isDark ? 'dark' : 'light'}`}
          onClick={handleThemeToggle}
        >
          <div className="toggle-slider">
            {isDark ? <FaMoon /> : <FaSun />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings; 