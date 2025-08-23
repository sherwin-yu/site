import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>Sherwin Yu</h2>
        </div>
        <nav className="nav">
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