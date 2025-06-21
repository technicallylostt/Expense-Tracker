import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 z-50 p-4">
      <button
        className="text-white bg-blue-600 p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
          <a href="#hero" className="block px-4 py-2 hover:bg-gray-100">Home</a>
          <a href="#features" className="block px-4 py-2 hover:bg-gray-100">Features</a>
          <a href="#how-it-works" className="block px-4 py-2 hover:bg-gray-100">How it Works</a>
          <a href="#why-this-app" className="block px-4 py-2 hover:bg-gray-100">Why This App</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;