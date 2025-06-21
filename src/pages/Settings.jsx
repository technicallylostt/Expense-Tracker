import React, { useState } from 'react';
import { FaUser, FaPalette, FaSignOutAlt, FaList } from 'react-icons/fa';
import ProfileSettings from '../components/settings/ProfileSettings';
import ThemeSettings from '../components/settings/ThemeSettings';
import CategorySettings from '../components/settings/CategorySettings';
import '../styles/Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/default-avatar.png'
  });

  const handleProfileUpdate = (updatedProfile) => {
    // TODO: Implement profile update logic
    console.log('Profile updated:', updatedProfile);
    setUser(prev => ({ ...prev, ...updatedProfile }));
  };

  const handleThemeToggle = (isDark) => {
    // TODO: Implement theme toggle logic
    console.log('Theme toggled:', isDark ? 'dark' : 'light');
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  const handleCategoryUpdate = (categories) => {
    // TODO: Implement category update logic
    console.log('Categories updated:', categories);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-sidebar">
          <button
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`sidebar-item ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            <FaPalette /> Theme
          </button>
          <button
            className={`sidebar-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <FaList /> Categories
          </button>
          <button className="sidebar-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <ProfileSettings user={user} onUpdate={handleProfileUpdate} />
          )}
          {activeTab === 'theme' && (
            <ThemeSettings onToggle={handleThemeToggle} />
          )}
          {activeTab === 'categories' && (
            <CategorySettings onUpdate={handleCategoryUpdate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 