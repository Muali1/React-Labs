import React from 'react';

function Portfolio() {
  const projects = [
    { title: 'E-Commerce Platform', description: 'Full-featured online store with payment integration and inventory management' },
    { title: 'Social Media Analytics', description: 'Data visualization dashboard for tracking social media performance metrics' },
    { title: 'Fitness Tracker App', description: 'Mobile application for workout planning and progress monitoring' },
    { title: 'Hotel Booking System', description: 'Reservation platform with calendar integration and payment processing' },
    { title: 'Food Delivery Service', description: 'Order management system with real-time tracking and delivery updates' },
    { title: 'Project Collaboration Tool', description: 'Team workspace for task management and collaborative document editing' }
  ];

  return (
    <section className="portfolio py-5" id="portfolio">
      <div className="container">
        <h2 className="text-center mb-5">Portfolio</h2>
        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
