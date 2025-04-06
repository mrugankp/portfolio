import React, { useState, useEffect, useRef } from 'react';
import { FaGamepad, FaLightbulb, FaArrowRight, FaArrowLeft, FaRobot } from 'react-icons/fa';
import PixelatedImage from './PixelatedImage';
import profileImage from './profile.jpg';

const FullScreenSections = () => {
  const [gameMode, setGameMode] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [collectibles, setCollectibles] = useState([]);
  const [score, setScore] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionsVisible, setSectionsVisible] = useState([true, false, false]);
  const [showIntro, setShowIntro] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (gameMode) {
      const newCollectibles = Array.from({ length: 10 }, () => ({
        x: Math.random() * (window.innerWidth - 20),
        y: Math.random() * (window.innerHeight - 20),
        collected: false
      }));
      setCollectibles(newCollectibles);
    }
  }, [gameMode]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameMode) return;
      
      const speed = 15;
      switch(e.key) {
        case 'ArrowUp':
          setPlayerPosition(prev => ({
            ...prev,
            y: Math.max(prev.y - speed, 0)
          }));
          break;
        case 'ArrowDown':
          setPlayerPosition(prev => ({
            ...prev,
            y: Math.min(prev.y + speed, window.innerHeight - 20)
          }));
          break;
        case 'ArrowLeft':
          setPlayerPosition(prev => ({
            ...prev,
            x: Math.max(prev.x - speed, 0)
          }));
          break;
        case 'ArrowRight':
          setPlayerPosition(prev => ({
            ...prev,
            x: Math.min(prev.x + speed, window.innerWidth - 20)
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameMode]);

  useEffect(() => {
    if (!gameMode) return;

    setCollectibles(prev => prev.map(collectible => {
      if (!collectible.collected &&
          Math.abs(collectible.x - playerPosition.x) < 30 &&
          Math.abs(collectible.y - playerPosition.y) < 30) {
        setScore(prev => prev + 1);
        return { ...collectible, collected: true };
      }
      return collectible;
    }));
  }, [playerPosition, gameMode]);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.section');
    sections[index].scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(index);
    setSectionsVisible(prev => prev.map((_, i) => i <= index));
  };

  const experiences = [
    {
      title: 'Business Analyst @ Infinite Computer Solutions',
      period: 'July 2024 - August 2024',
      details: 'Utilizing SQL and python to extract and analyze data from various databases to support project needs and client requirements. Working with clients at Fiserv to gather project artifacts and configuration requirements. Planning, coordinating projects and partnering with all key business stakeholders to ensure successful completion. Developing and maintaining dashboards and reports to provide actionable insights and track key performance indicators (KPIs). Used ServiceNow, Client360, Appian in workflows.',
      tags: ['SQL', 'Python', 'ServiceNow', 'Client360', 'Appian']
    },
    {
      title: 'Student Cybersecurity Help @ TOPS Lab',
      period: 'September 2024 - Present',
      details: 'Developing python scripts and Qualys queries to create vulnerability scans and identifying required asset patches and fixes. Self-learning for sec+ certification. Analyzing overall system safety and ensuring policy compliance in Qualys. Patch management, compliance, endpoint, and security management using BigFix.',
      tags: ['Python', 'Qualys', 'BigFix', 'Security', 'Compliance']
    },
    {
      title: 'Software Developer @ Cardinal Trading',
      period: 'February 2024 - Present',
      details: 'Building trading infrastructure for UW-Madison\'s upcoming quantitative finance graduate program with Dr. Mark Fedenia and Two Sigma Ex-CRO Dr. Senthil Sundaram. Team of 8 building strategies for the \'Forward Fund\' with $1M in portfolio. Used Big Query, Parquet, Pandas, Cron scheduling, and python to build data engineering, transformation, validation, production engineering, and research engineering components. Working to implement portfolio optimization techniques for determining asset and model weights. Conducting back-tests and live trades in Quant Connect, achieved returns of 19% paper trading. Placed #1 in QC Competition\'s first 2 quarters.',
      tags: ['Python', 'BigQuery', 'Pandas', 'Quant Connect', 'Trading']
    }
  ];

  const projects = [
    {
      title: 'ML Journaling Tool (2nd Place Hackathon)',
      period: 'February 2024',
      details: 'Led a team of 4 to develop an AI journaling tool that helps people track personal growth using emotion as a metric. Used CNNs to analyze audio and text to predict levels across emotions over a period. Used Python and libraries like pydub to transcribe text and using classification ML models. Ranked 2/120 people.',
      github: 'https://github.com/ryan-24-7/MindGrove',
      tags: ['Python', 'CNN', 'ML', 'Audio Processing', 'NLP']
    },
    {
      title: 'UFO Sightings ML Analysis',
      period: 'July 2023',
      details: 'Leading a cross-functional team to analyze global UFO sightings using ML techniques (K-NN, decision trees, logistic regression, SVM). Extracting intricate patterns in locations, timings, shapes, and durations. Maximum accuracy is attained by Decision Tree model at 0.82.',
      tags: ['Python', 'ML', 'Data Analysis', 'Decision Trees', 'SVM']
    }
  ];

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro ? (
        <PixelatedImage 
          onTransitionComplete={handleIntroComplete}
          imageUrl={profileImage}
        />
      ) : (
        <div 
          ref={containerRef}
          className={`container ${gameMode ? 'game-mode' : ''}`}
        >
          <div className="mode-toggle">
            <button 
              onClick={() => setGameMode(!gameMode)}
              className={`mode-button ${gameMode ? 'game-active' : ''}`}
            >
              {gameMode ? <FaGamepad /> : <FaLightbulb />}
              {gameMode ? ' Exit Game Mode' : ' Enter Game Mode'}
            </button>
            {gameMode && <div className="score">Score: {score}</div>}
          </div>

          {gameMode && (
            <>
              <div 
                className="player"
                style={{
                  left: playerPosition.x,
                  top: playerPosition.y,
                }}
              />
              {collectibles.map((collectible, index) => (
                !collectible.collected && (
                  <div
                    key={index}
                    className="collectible"
                    style={{
                      left: collectible.x,
                      top: collectible.y,
                    }}
                  />
                )
              ))}
            </>
          )}

          <section id="about" className={`section ${sectionsVisible[0] ? 'visible' : ''}`}>
            <div className="section-content">
              <h1 className="name-title">Mrugank Pednekar</h1>
              <h2 className="subtitle">MIT MBAn '26 | UW-Madison '25</h2>
              <p>
                Incoming Master of Business Analytics student at MIT Sloan School of Management (MBAn '26). 
                Currently completing a quadruple major in Computer Engineering, Mathematics, Data Science, 
                and Computer Science with a minor in Entrepreneurship at the University of Wisconsin-Madison.
              </p>
              <button 
                className="mode-button"
                onClick={() => scrollToSection(1)}
                style={{ marginTop: '2rem' }}
              >
                Explore My Journey <FaArrowRight />
              </button>
            </div>
          </section>

          <section id="experience" className={`section ${sectionsVisible[1] ? 'visible' : ''}`}>
            <div className="section-content">
              <h2>Experience</h2>
              <div className="grid">
                {experiences.map((exp, index) => (
                  <div key={index} className="box">
                    <h3>{exp.title}</h3>
                    <p className="period">{exp.period}</p>
                    <p>{exp.details}</p>
                    <div className="tags">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button 
                  className="mode-button"
                  onClick={() => scrollToSection(0)}
                >
                  <FaArrowLeft /> Back
                </button>
                <button 
                  className="mode-button"
                  onClick={() => scrollToSection(2)}
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          </section>

          <section id="projects" className={`section ${sectionsVisible[2] ? 'visible' : ''}`}>
            <div className="section-content">
              <h2>Projects</h2>
              <div className="grid">
                {projects.map((project, index) => (
                  <div key={index} className="box">
                    <h3>{project.title}</h3>
                    <p className="period">{project.period}</p>
                    <p>{project.details}</p>
                    <div className="tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                        View on GitHub
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <button 
                className="mode-button"
                onClick={() => scrollToSection(1)}
                style={{ marginTop: '2rem' }}
              >
                <FaArrowLeft /> Back
              </button>
            </div>
          </section>

          <div className="contact-info">
            <a href="https://www.linkedin.com/in/mrugankpednekar" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="/Pednekar_Mrugank_MIT.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
            <a href="mailto:mpednekar@wisc.edu">Email</a>
            <a href="https://mrugankpednekar.github.io" target="_blank" rel="noopener noreferrer">
              <FaRobot /> Robotics
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FullScreenSections;
