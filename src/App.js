import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddExpense from './pages/AddExpense';
import Transactions from './pages/Transactions';
import GroupExpenses from './pages/GroupExpenses';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/groups/:groupId" element={<GroupExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
