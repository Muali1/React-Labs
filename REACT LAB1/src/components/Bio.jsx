import React from "react";

function Bio() {
  return (
    <section className="bio py-5" id="about">
      <div className="container">
        <h2 className="text-center mb-5">About Me</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="lead text-center">
              I'm a dedicated full-stack developer passionate about building innovative
              digital solutions. My expertise spans modern web technologies, and I enjoy
              transforming complex ideas into elegant, user-friendly applications. I'm
              constantly learning and adapting to new technologies to stay at the forefront
              of software development.
            </p>
            <div className="text-center mt-5">
              <a href="/assets/Muhammed%20Ali%20Resume%20.pdf" className="btn btn-primary btn-lg" download="Muhammed_Ali_CV.pdf">
                <i className="fas fa-download me-2"></i>Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bio;
