import React, { useState } from 'react';
import { FaPlus, FaUpload, FaCog, FaSearch, FaFilter } from 'react-icons/fa';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ExpenseModal from '../components/ExpenseModal';
import TransactionHistory from '../components/TransactionHistory';
import '../styles/Dashboard.css';
import '../styles/TransactionHistory.css';

const Dashboard = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with actual data from your backend
  const userData = {
    name: 'John Doe',
    avatar: '/default-avatar.png',
    monthlyBudget: 5000,
    totalExpenses: 3200,
    savings: 1800,
  };

  const categoryData = [
    { name: 'Food', value: 800 },
    { name: 'Rent', value: 1500 },
    { name: 'Transport', value: 400 },
    { name: 'Entertainment', value: 300 },
    { name: 'Others', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const spendingTrends = [
    { month: 'Jan', amount: 3000 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 2800 },
    { month: 'Apr', amount: 3500 },
    { month: 'May', amount: 3200 },
  ];

  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Shopping', amount: 120, category: 'Food & Dining', date: '2024-03-15' },
    { id: 2, description: 'Netflix Subscription', amount: 15, category: 'Entertainment', date: '2024-03-14' },
    { id: 3, description: 'Uber Ride', amount: 25, category: 'Transportation', date: '2024-03-13' },
    { id: 4, description: 'Electric Bill', amount: 85, category: 'Utilities', date: '2024-03-12' },
    { id: 5, description: 'Restaurant Dinner', amount: 65, category: 'Food & Dining', date: '2024-03-11' },
  ]);

  const savingsGoals = [
    { name: 'Vacation Fund', target: 2000, current: 1500 },
    { name: 'New Laptop', target: 1500, current: 800 },
  ];

  const handleAddExpense = (formData) => {
    // TODO: Implement expense submission logic
    console.log('New expense:', formData);
    setShowAddExpense(false);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions(prev =>
      prev.filter(transaction => transaction.id !== transactionId)
    );
  };

  return (
    <div className="dashboard">
      {/* Profile Overview Section */}
      <section className="profile-overview">
        <div className="profile-header">
          <img src={userData.avatar} alt={userData.name} className="avatar" />
          <div className="profile-info">
            <h2>Welcome back, {userData.name}!</h2>
            <p>Here's your financial overview</p>
          </div>
        </div>
        <div className="financial-summary">
          <div className="summary-card">
            <h3>Monthly Budget</h3>
            <p>${userData.monthlyBudget}</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>${userData.totalExpenses}</p>
          </div>
          <div className="summary-card">
            <h3>Savings</h3>
            <p>${userData.savings}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <button className="add-expense-btn" onClick={() => setShowAddExpense(true)}>
          <FaPlus /> Add Expense
        </button>
        <button className="upload-receipt-btn">
          <FaUpload /> Upload Receipt
        </button>
      </section>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Category-wise Expenses */}
        <section className="category-expenses">
          <h3>Category-wise Expenses</h3>
          <div className="chart-container">
            <PieChart width={300} height={300}>
              <Pie
                data={categoryData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </section>

        {/* Spending Trends */}
        <section className="spending-trends">
          <h3>Spending Trends</h3>
          <div className="chart-container">
            <LineChart width={500} height={300} data={spendingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </div>
        </section>

        {/* Savings Goals */}
        <section className="savings-goals">
          <h3>Savings Goals</h3>
          <div className="goals-list">
            {savingsGoals.map((goal, index) => (
              <div key={index} className="goal-item">
                <div className="goal-info">
                  <h4>{goal.name}</h4>
                  <p>${goal.current} / ${goal.target}</p>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="recent-transactions">
          <h3>Recent Transactions</h3>
          <TransactionHistory
            transactions={transactions}
            onUpdate={handleUpdateTransaction}
            onDelete={handleDeleteTransaction}
          />
        </section>
      </div>

      {/* Settings Button */}
      <button className="settings-btn">
        <FaCog />
      </button>

      {/* Add Expense Modal */}
      <ExpenseModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

export default Dashboard; 