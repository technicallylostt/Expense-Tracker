import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import ExpenseModal from './ExpenseModal';

const TransactionHistory = ({ transactions: initialTransactions = [], onUpdate, onDelete }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    dateRange: 'all',
    amountRange: 'all'
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort transactions
  useEffect(() => {
    let filtered = [...initialTransactions];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(transaction =>
        transaction.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        switch (filters.dateRange) {
          case 'week':
            return transactionDate >= lastWeek;
          case 'month':
            return transactionDate >= lastMonth;
          default:
            return true;
        }
      });
    }

    // Apply amount range filter
    if (filters.amountRange !== 'all') {
      filtered = filtered.filter(transaction => {
        const amount = parseFloat(transaction.amount);
        switch (filters.amountRange) {
          case 'small':
            return amount < 50;
          case 'medium':
            return amount >= 50 && amount < 200;
          case 'large':
            return amount >= 200;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc'
          ? parseFloat(a.amount) - parseFloat(b.amount)
          : parseFloat(b.amount) - parseFloat(a.amount);
      }
      return 0;
    });

    setTransactions(filtered);
  }, [initialTransactions, searchQuery, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleDelete = (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(transactionId);
    }
  };

  const handleUpdate = (updatedData) => {
    onUpdate(updatedData);
    setShowEditModal(false);
    setSelectedTransaction(null);
  };

  // Pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="transaction-history">
      {/* Filters and Search */}
      <div className="transaction-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <FaFilter />
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing">Housing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Utilities">Utilities</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <FaFilter />
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          <div className="filter-group">
            <FaFilter />
            <select
              value={filters.amountRange}
              onChange={(e) => setFilters(prev => ({ ...prev, amountRange: e.target.value }))}
            >
              <option value="all">All Amounts</option>
              <option value="small">Small (&lt; $50)</option>
              <option value="medium">Medium ($50 - $200)</option>
              <option value="large">Large (&gt; $200)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('date')}>
                Date
                {sortConfig.key === 'date' && (
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th>Description</th>
              <th>Category</th>
              <th onClick={() => handleSort('amount')}>
                Amount
                {sortConfig.key === 'amount' && (
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(transaction)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <ExpenseModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleUpdate}
        initialData={selectedTransaction}
      />
    </div>
  );
};

export default TransactionHistory; 