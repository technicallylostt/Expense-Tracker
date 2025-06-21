import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Expense Tracker</h3>
            <p className="text-sm">Track your expenses, manage your budget, and achieve your financial goals.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              <li><Link to="/transactions" className="hover:text-primary">Transactions</Link></li>
              <li><Link to="/settings" className="hover:text-primary">Settings</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-primary">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="hover:text-primary">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="hover:text-primary">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-base-300 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
