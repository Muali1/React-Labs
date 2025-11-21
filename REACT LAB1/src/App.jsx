import React from 'react';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Education from './components/Education';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <Bio />
      <Education />
      <Skills />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App
