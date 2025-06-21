import React from 'react';
import { FaTimes } from 'react-icons/fa';
import ExpenseForm from './ExpenseForm';

const ExpenseModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData?.id ? 'Edit Expense' : 'Add New Expense'}</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <ExpenseForm
          onSubmit={onSubmit}
          onClose={onClose}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default ExpenseModal; 