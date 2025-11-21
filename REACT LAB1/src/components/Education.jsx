import React from 'react';

function Education() {
  const education = [
    {
      degree: 'Bachelor of Computer Science',
      year: '2020 - 2024',
      description: 'Specialized in Information Systems and Web Technologies'
    }
  ];

  return (
    <section className="education py-5" id="education">
      <div className="container">
        <h2 className="text-center mb-5">Education</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {education.map((edu, index) => (
              <div key={index} className="card mb-4">
                <div className="card-body p-4">
                  <h4 className="card-title mb-3" style={{ color: '#2d3748', fontSize: '1.5rem' }}>{edu.degree}</h4>
                  <p className="mb-3" style={{ color: '#64748b' }}>
                    <i className="far fa-calendar-alt me-2" style={{ color: '#2563eb' }}></i>
                    <span style={{ fontWeight: 500 }}>{edu.year}</span>
                  </p>
                  <p className="card-text" style={{ color: '#4a5568', lineHeight: 1.7 }}>{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
