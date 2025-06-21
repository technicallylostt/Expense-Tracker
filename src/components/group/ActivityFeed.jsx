import React from 'react';
import { FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import '../../styles/ActivityFeed.css';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'expense_added':
        return <FaPlus />;
      case 'expense_deleted':
        return <FaTrash />;
      default:
        return <FaUser />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return diffInMinutes === 0 ? 'Just now' : `${diffInMinutes}m ago`;
      }
      return `${diffInHours}h ago`;
    }

    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="activity-feed">
      <h3>Activity Feed</h3>
      <div className="activities-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-text">
                <span className="user">{activity.user}</span>
                {activity.type === 'expense_added' && (
                  <> added ₹{activity.amount.toLocaleString()} for {activity.description}</>
                )}
                {activity.type === 'expense_deleted' && (
                  <> deleted an expense of ₹{activity.amount.toLocaleString()}</>
                )}
              </p>
              <span className="activity-time">
                {formatTimestamp(activity.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed; 