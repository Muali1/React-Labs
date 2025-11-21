import React from 'react';

function Contact() {
  return (
    <footer className="contact bg-dark text-white py-4" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Information</h4>
            <p>
              <i className="fas fa-envelope me-2"></i>
              muhammed.ali@example.com
            </p>
            <p>
              <i className="fas fa-phone me-2"></i>
              +20 1234567890
            </p>
            <p>
              <i className="fas fa-map-marker-alt me-2"></i>
              Cairo, Egypt
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <h4>Follow Me</h4>
            <div className="social-links mt-3">
              <a href="https://facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://linkedin.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://github.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center mb-0">&copy; 2025 Muhammed Ali. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Contact;
