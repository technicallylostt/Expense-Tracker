import React from 'react';
import { FaUsers, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import '../../styles/GroupHeader.css';

const GroupHeader = ({ group, onLeave, onDelete }) => {
  return (
    <div className="group-header">
      <div className="group-info">
        <h1>{group.name}</h1>
        <div className="group-members">
          <FaUsers className="icon" />
          <div className="member-avatars">
            {group.members.map(member => (
              <div key={member.id} className="member-avatar" title={member.email}>
                <img src={member.avatar} alt={member.name} />
              </div>
            ))}
          </div>
          <span className="member-count">{group.members.length} members</span>
        </div>
      </div>

      <div className="group-summary">
        <div className="total-spent">
          <span className="label">Total Spent</span>
          <span className="amount">₹{group.totalSpent.toLocaleString()}</span>
        </div>
      </div>

      <div className="group-actions">
        <button className="leave-group" onClick={onLeave}>
          <FaSignOutAlt /> Leave Group
        </button>
        <button className="delete-group" onClick={onDelete}>
          <FaTrash /> Delete Group
        </button>
      </div>
    </div>
  );
};

export default GroupHeader; 