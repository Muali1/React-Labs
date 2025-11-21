import React from 'react';

function Skills() {
  const skills = [
    'PHP',
    'Laravel',
    'Node.js',
    'JavaScript',
    'MySQL',
    'MongoDB'
  ];

  return (
    <section className="skills py-5" id="skills">
      <div className="container">
        <h2 className="text-center mb-5">Skills</h2>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-point">
                  <div className="skill-point-icon"></div>
                  <span className="skill-point-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
