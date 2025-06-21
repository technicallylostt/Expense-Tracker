import React, { useState } from 'react';
import { FaTag, FaDollarSign, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';
import '../styles/ExpenseForm.css';

const ExpenseForm = ({ onSubmit, onClose, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    amount: initialData.amount || '',
    category: initialData.category || '',
    date: initialData.date || new Date().toISOString().split('T')[0],
    note: initialData.note || '',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Food & Dining',
    'Transportation',
    'Housing',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Utilities',
    'Travel',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="expense-form-container">
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <div className="input-icon">
            <FaTag />
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
          </div>
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaDollarSign />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={errors.amount ? 'error' : ''}
            />
          </div>
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaTag />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaCalendarAlt />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
          </div>
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <div className="input-icon">
            <FaStickyNote />
            <textarea
              name="note"
              placeholder="Add a note (optional)"
              value={formData.note}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          {onClose && (
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          )}
          <button type="submit" className="submit-button">
            {initialData.id ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm; 