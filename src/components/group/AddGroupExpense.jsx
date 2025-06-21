import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../../styles/AddGroupExpense.css';

const AddGroupExpense = ({ members, onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    paidBy: '',
    splitBetween: [],
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSplitChange = (memberId) => {
    setFormData(prev => ({
      ...prev,
      splitBetween: prev.splitBetween.includes(memberId)
        ? prev.splitBetween.filter(id => id !== memberId)
        : [...prev.splitBetween, memberId]
    }));
  };

  const handleSelectAll = () => {
    setFormData(prev => ({
      ...prev,
      splitBetween: members.map(member => member.id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      paidBy: parseInt(formData.paidBy),
      splitBetween: formData.splitBetween.map(id => parseInt(id))
    });
    setShowModal(false);
    setFormData({
      title: '',
      amount: '',
      paidBy: '',
      splitBetween: [],
      note: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <>
      <button className="add-expense-btn" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Group Expense
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Group Expense</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="paidBy">Paid By</label>
                <select
                  id="paidBy"
                  name="paidBy"
                  value={formData.paidBy}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Split Between</label>
                <button
                  type="button"
                  className="select-all-btn"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <div className="split-options">
                  {members.map(member => (
                    <label key={member.id} className="split-option">
                      <input
                        type="checkbox"
                        checked={formData.splitBetween.includes(member.id)}
                        onChange={() => handleSplitChange(member.id)}
                      />
                      {member.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="note">Note (Optional)</label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddGroupExpense; 