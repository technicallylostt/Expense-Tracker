import React from 'react';
import { FaTrash } from 'react-icons/fa';
import '../../styles/GroupTransactions.css';

const GroupTransactions = ({ expenses, members, onDelete }) => {
  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group-transactions">
      <h3>Group Expenses</h3>
      <div className="transactions-list">
        {expenses.map(expense => (
          <div key={expense.id} className="transaction-item">
            <div className="transaction-main">
              <div className="transaction-info">
                <h4>{expense.title}</h4>
                <p className="transaction-date">{formatDate(expense.date)}</p>
                {expense.note && <p className="transaction-note">{expense.note}</p>}
              </div>
              <div className="transaction-amount">
                ₹{expense.amount.toLocaleString()}
              </div>
            </div>

            <div className="transaction-details">
              <div className="detail-item">
                <span className="label">Paid by:</span>
                <span className="value">{getMemberName(expense.paidBy)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Split between:</span>
                <span className="value">
                  {expense.splitBetween.map(id => getMemberName(id)).join(', ')}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Each person pays:</span>
                <span className="value">
                  ₹{(expense.amount / expense.splitBetween.length).toLocaleString()}
                </span>
              </div>
            </div>

            {expense.createdBy === 1 && ( // TODO: Replace with actual current user ID
              <button
                className="delete-btn"
                onClick={() => onDelete(expense.id)}
                title="Delete expense"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTransactions; 