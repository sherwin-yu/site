import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Sherwin Yu</span>
          </h1>
          <h2 className="hero-subtitle">Senior Software Engineer</h2>
          <p className="hero-description">
            I architect and develop web applications while leading strategic initiatives to drive team alignment and business outcomes.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-placeholder">
            <div className="profile-icon">👨‍💻</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

