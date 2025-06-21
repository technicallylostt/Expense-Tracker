import React, { useState } from 'react';
import TransactionHistory from '../components/TransactionHistory';
import '../styles/TransactionHistory.css';

const Transactions = () => {
  // Mock data - replace with actual data from your backend
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Shopping', amount: 120, category: 'Food & Dining', date: '2024-03-15' },
    { id: 2, description: 'Netflix Subscription', amount: 15, category: 'Entertainment', date: '2024-03-14' },
    { id: 3, description: 'Uber Ride', amount: 25, category: 'Transportation', date: '2024-03-13' },
    { id: 4, description: 'Electric Bill', amount: 85, category: 'Utilities', date: '2024-03-12' },
    { id: 5, description: 'Restaurant Dinner', amount: 65, category: 'Food & Dining', date: '2024-03-11' },
    { id: 6, description: 'Movie Tickets', amount: 30, category: 'Entertainment', date: '2024-03-10' },
    { id: 7, description: 'Gas Station', amount: 45, category: 'Transportation', date: '2024-03-09' },
    { id: 8, description: 'Amazon Purchase', amount: 150, category: 'Shopping', date: '2024-03-08' },
    { id: 9, description: 'Doctor Visit', amount: 200, category: 'Healthcare', date: '2024-03-07' },
    { id: 10, description: 'Gym Membership', amount: 50, category: 'Health & Fitness', date: '2024-03-06' },
  ]);

  const handleUpdate = (updatedTransaction) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  const handleDelete = (transactionId) => {
    setTransactions(prev =>
      prev.filter(transaction => transaction.id !== transactionId)
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Transaction History</h1>
      </div>
      <TransactionHistory
        transactions={transactions}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Transactions; 