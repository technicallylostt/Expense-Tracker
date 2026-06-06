import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-base-200 text-base-content">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-8 text-lg text-base-content/70">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary btn-lg shadow-md">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
