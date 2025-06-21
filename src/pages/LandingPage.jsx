import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const cardsRef = useRef(null);
  const featuresRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const scrollToCard = (index) => {
    setActiveCard(index);
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0].offsetWidth + 32;
      cardsRef.current.style.transform = `translate(calc(-50% - ${index * cardWidth}px), -50%)`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        setIsFeaturesVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextCard = (activeCard + 1) % 3;
      scrollToCard(nextCard);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeCard]);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ExpenseTracker</div>
        <button className="nav-toggle" onClick={toggleNav}>
          <span className="hamburger"></span>
        </button>
        <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Track. Predict. Save.</h1>
        <p>Smart expense tracking with auto-receipt parsing, budget alerts and saving challenges.</p>
        <button className="cta-button"><span>Start Tracking Now!</span></button>
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`features ${isFeaturesVisible ? 'visible' : ''}`} ref={featuresRef}>
        <div className="features-content">
          <h2>Powerful Features</h2>
          <p className="features-description">
            Our expense tracker comes packed with powerful features to help you manage your finances better and save more effectively.
          </p>
        </div>
        <div className="features-scroll">
          <div className="feature-cards" ref={cardsRef}>
            <div className="feature-card" onClick={() => scrollToCard(0)}>
              <h3>OCR Receipt Parsing</h3>
              <p>Upload receipts, we'll handle the rest. Our advanced OCR technology automatically extracts and categorizes your expenses.</p>
            </div>
            <div className="feature-card" onClick={() => scrollToCard(1)}>
              <h3>Budget Alerts</h3>
              <p>Get notified when you're approaching your budget limits. Stay on track with smart alerts and spending insights.</p>
            </div>
            <div className="feature-card" onClick={() => scrollToCard(2)}>
              <h3>Saving Challenges</h3>
              <p>Participate in fun challenges to boost your savings. Set goals, track progress, and celebrate your achievements.</p>
            </div>
          </div>
          <div className="scroll-indicator">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`scroll-dot ${activeCard === index ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How it Works?</h2>
        <div className="steps">
          <div className="step-card">
            <h3>1. Log your expenses</h3>
            <p>manually or via receipts</p>
          </div>
          <div className="step-card">
            <h3>2. Set your Budget</h3>
            <p>and track spending in real-time</p>
          </div>
          <div className="step-card">
            <h3>3. Earn Rewards</h3>
            <p>and receive predictions overtime</p>
          </div>
        </div>
      </section>

      {/* Why This App Section */}
      <section className="why-this-app">
        <h2>Why Choose Our App?</h2>
        <ul>
          <li>Smart AI-powered expense tracking that saves you time and effort</li>
          <li>Personalized insights and recommendations to help you save more</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="tech-stack">
          <h3>Built With</h3>
          <div className="tech-logos">
            <img src="/react-logo.png" alt="React" />
            <img src="/node-logo.png" alt="Node.js" />
            <img src="/mongodb-logo.png" alt="MongoDB" />
          </div>
        </div>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div className="made-with-love">
          <p>
            Made with <span className="heart"><FaHeart /></span> by Kirti
          </p>
          <div className="social-links">
            <a 
              href="https://github.com/your-github-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/your-linkedin-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 