import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Reduced offset for tighter spacing
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>Sherwin Yu</h2>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><button onClick={() => scrollToSection('hero')} className="nav-link">Home</button></li>
            <li><button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button></li>
            <li><button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;