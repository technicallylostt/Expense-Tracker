import React, { useState } from 'react';
import GroupHeader from '../components/group/GroupHeader';
import AddGroupExpense from '../components/group/AddGroupExpense';
import GroupTransactions from '../components/group/GroupTransactions';
import SplitSummary from '../components/group/SplitSummary';
import ActivityFeed from '../components/group/ActivityFeed';
import ChatBox from '../components/group/ChatBox';
import '../styles/GroupExpenses.css';

const GroupExpenses = () => {
  // Mock data - replace with actual data from your backend
  const [groupData, setGroupData] = useState({
    id: 1,
    name: 'Trip to Goa',
    members: [
      { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/default-avatar.png' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/default-avatar.png' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: '/default-avatar.png' },
    ],
    totalSpent: 15000,
    expenses: [
      {
        id: 1,
        title: 'Hotel Booking',
        amount: 8000,
        paidBy: 1,
        splitBetween: [1, 2, 3],
        date: '2024-03-15',
        note: '3 nights at Beach Resort',
        createdBy: 1,
      },
      {
        id: 2,
        title: 'Dinner',
        amount: 4000,
        paidBy: 2,
        splitBetween: [1, 2, 3],
        date: '2024-03-16',
        note: 'Seafood dinner',
        createdBy: 2,
      },
    ],
    activities: [
      { id: 1, type: 'expense_added', user: 'John Doe', amount: 8000, description: 'Hotel Booking', timestamp: '2024-03-15T10:00:00' },
      { id: 2, type: 'expense_added', user: 'Jane Smith', amount: 4000, description: 'Dinner', timestamp: '2024-03-16T20:00:00' },
    ],
    messages: [
      { id: 1, user: 'John Doe', message: 'Let\'s split the hotel cost equally', timestamp: '2024-03-15T10:05:00' },
      { id: 2, user: 'Jane Smith', message: 'Sounds good!', timestamp: '2024-03-15T10:10:00' },
    ],
  });

  const handleAddExpense = (expenseData) => {
    // TODO: Implement expense submission logic
    console.log('New group expense:', expenseData);
  };

  const handleDeleteExpense = (expenseId) => {
    // TODO: Implement expense deletion logic
    console.log('Delete expense:', expenseId);
  };

  const handleLeaveGroup = () => {
    // TODO: Implement leave group logic
    console.log('Leave group');
  };

  const handleDeleteGroup = () => {
    // TODO: Implement delete group logic
    console.log('Delete group');
  };

  const handleSendMessage = (message) => {
    // TODO: Implement message sending logic
    console.log('New message:', message);
  };

  return (
    <div className="group-expenses">
      <div className="group-main">
        <GroupHeader
          group={groupData}
          onLeave={handleLeaveGroup}
          onDelete={handleDeleteGroup}
        />
        
        <div className="group-content">
          <div className="group-left">
            <AddGroupExpense
              members={groupData.members}
              onSubmit={handleAddExpense}
            />
            
            <GroupTransactions
              expenses={groupData.expenses}
              members={groupData.members}
              onDelete={handleDeleteExpense}
            />
            
            <SplitSummary
              expenses={groupData.expenses}
              members={groupData.members}
              currentUserId={1} // TODO: Get from auth context
            />
          </div>
          
          <div className="group-right">
            <ActivityFeed activities={groupData.activities} />
            <ChatBox
              messages={groupData.messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupExpenses; 