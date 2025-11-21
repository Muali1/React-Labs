import React from 'react';

function Hero() {
  return (
    <section className="hero text-white text-center">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">Muhammed Ali</h1>
        <p className="lead mb-4">Full-Stack Developer</p>
        
        {/* Social Media Icons */}
        <div className="social-links mt-5">
          <a href="https://facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://linkedin.com" className="text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="https://github.com" className="text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
