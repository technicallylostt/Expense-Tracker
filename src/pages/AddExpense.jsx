import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';

const AddExpense = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // TODO: Implement expense submission logic
    console.log('Expense data:', formData);
    // After successful submission, navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Expense</h1>
      </div>
      <ExpenseForm onSubmit={handleSubmit} onClose={() => navigate(-1)} />
    </div>
  );
};

export default AddExpense; 