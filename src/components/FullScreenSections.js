import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaEnvelope, FaRobot, FaMoon, FaSun, FaGamepad } from 'react-icons/fa';

const PADDLE_SPEED = 20;
const PADDLE_WIDTH = 180;
const BALL_SIZE = 25;
const INITIAL_BALL_SPEED = 8;
const SPEED_INCREMENT = 0.2;
const MAX_SPEED = 15;

const FullScreenSections = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [theme, setTheme] = useState('light');
  const [emailForm, setEmailForm] = useState({ email: '', message: '' });
  const [gameMode, setGameMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gameLoopRef = useRef(null);
  const paddleRef = useRef(null);
  const ballRef = useRef(null);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [ballVelocity, setBallVelocity] = useState({ x: 3, y: 5 });
  const [paddleX, setPaddleX] = useState(0);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleCardClick = (columnId, cardId, e) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === `${columnId}-${cardId}` ? null : `${columnId}-${cardId}`);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setExpandedCard(null);
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Collaboration Idea');
    const body = encodeURIComponent(emailForm.message);
    window.location.href = `mailto:mrugank@mit.edu?subject=${subject}&body=${body}`;
    setEmailForm({ email: '', message: '' });
  };

  const education = [
    {
      title: 'MIT Sloan School of Management',
      period: '2026',
      details: 'Master of Business Analytics (MBAn)',
    },
    {
      title: 'University of Wisconsin-Madison',
      period: '2025',
      details: 'Studying Computer Engineering, Mathematics, Data Science, and Computer Science with a minor in Entrepreneurship. Passionate about using technology and data to solve real-world problems.',
    }
  ];

  const experiences = [
    {
      title: 'Business Analyst @ Infinite Computer Solutions',
      period: 'July 2024 - August 2024',
      details: 'Utilizing SQL and python to extract and analyze data from various databases to support project needs and client requirements. Working with clients at Fiserv to gather project artifacts and configuration requirements. Planning, coordinating projects and partnering with all key business stakeholders to ensure successful completion.',
      tags: ['SQL', 'Python', 'ServiceNow', 'Client360', 'Appian']
    },
    {
      title: 'Student Cybersecurity Help @ TOPS Lab',
      period: 'September 2024 - Present',
      details: 'Developing python scripts and Qualys queries to create vulnerability scans and identifying required asset patches and fixes. Self-learning for sec+ certification. Analyzing overall system safety and ensuring policy compliance in Qualys.',
      tags: ['Python', 'Qualys', 'BigFix', 'Security', 'Compliance']
    },
    {
      title: 'Software Developer @ Cardinal Trading',
      period: 'February 2024 - Present',
      details: 'Building trading infrastructure for UW-Madison\'s upcoming quantitative finance graduate program. Team of 8 building strategies for the \'Forward Fund\' with $1M in portfolio. Used Big Query, Parquet, Pandas, Cron scheduling for data engineering and research components.',
      tags: ['Python', 'BigQuery', 'Pandas', 'Quant Connect', 'Trading']
    }
  ];

  const projects = [
    {
      title: 'ML Journaling Tool',
      period: 'February 2024',
      details: 'Led a team of 4 to develop an AI journaling tool that helps people track personal growth using emotion as a metric. Used CNNs to analyze audio and text to predict levels across emotions over a period. Ranked 2/120 people.',
      github: 'https://github.com/ryan-24-7/MindGrove',
      tags: ['Python', 'CNN', 'ML', 'Audio Processing', 'NLP']
    },
    {
      title: 'UFO Sightings ML Analysis',
      period: 'July 2023',
      details: 'Leading a cross-functional team to analyze global UFO sightings using ML techniques (K-NN, decision trees, logistic regression, SVM). Maximum accuracy is attained by Decision Tree model at 0.82.',
      tags: ['Python', 'ML', 'Data Analysis', 'Decision Trees', 'SVM']
    }
  ];

  const renderCard = (item, index, columnId) => {
    const isExpanded = expandedCard === `${columnId}-${index}`;
    
    if (isExpanded) {
      return (
        <div className="expanded-card-container" onClick={handleOverlayClick}>
          <div
            className={`card expanded`}
            onClick={handleContentClick}
          >
            <h3 className="card-title">{item.title}</h3>
            <p className="card-period">{item.period}</p>
            <div className="card-content">
              <p>{item.details}</p>
              {item.tags && (
                <div className="tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              {item.github && (
                <a 
                  href={item.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FaGithub /> View Project
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        className="card"
        onClick={(e) => handleCardClick(columnId, index, e)}
      >
        <h3 className="card-title">{item.title}</h3>
        <p className="card-period">{item.period}</p>
        <div className="card-content">
          <p>{item.details}</p>
          {item.tags && (
            <div className="tags">
              {item.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const resetBall = () => {
    // Place ball right above the paddle initially
    const paddleY = window.innerHeight - 65; // 50px from bottom + 15px paddle height
    setBallPosition({ 
      x: paddleX + PADDLE_WIDTH / 2 - 7.5, // Center above paddle
      y: paddleY - 20 // 20px above paddle
    });
    
    setBallVelocity({ x: 0, y: 0 }); // No initial velocity
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    
    // Set initial paddle position
    const initialPaddleX = Math.max(0, (window.innerWidth - PADDLE_WIDTH) / 2);
    setPaddleX(initialPaddleX);
    
    // Start ball from center of screen
    const centerX = window.innerWidth / 2 - BALL_SIZE / 2;
    const centerY = window.innerHeight / 2 - BALL_SIZE / 2;
    setBallPosition({ x: centerX, y: centerY });
    
    // Initial direction (always start downward at a random angle)
    const angle = (Math.random() * Math.PI / 2) - Math.PI / 4; // Random angle between -45 and 45 degrees
    setBallVelocity({
      x: INITIAL_BALL_SPEED * Math.sin(angle),
      y: Math.abs(INITIAL_BALL_SPEED * Math.cos(angle)) // Ensure initial y velocity is positive (downward)
    });
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(updateGame, 16);
  };

  const updateGame = () => {
    if (!ballRef.current || !paddleRef.current) return;

    setBallPosition(prevPos => {
      const newX = prevPos.x + ballVelocity.x;
      const newY = prevPos.y + ballVelocity.y;

      const ballRect = ballRef.current.getBoundingClientRect();
      const paddleRect = paddleRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Ball collision with walls (perfect reflection)
      if (newX <= 0 || newX + BALL_SIZE >= windowWidth) {
        setBallVelocity(prev => ({
          x: -prev.x, // Simply reverse x velocity
          y: prev.y   // Maintain y velocity
        }));
        return {
          x: newX <= 0 ? 0 : windowWidth - BALL_SIZE,
          y: newY
        };
      }

      // Ball collision with ceiling (perfect reflection)
      if (newY <= 0) {
        setBallVelocity(prev => ({
          x: prev.x,   // Maintain x velocity
          y: -prev.y   // Simply reverse y velocity
        }));
        return {
          x: newX,
          y: 0
        };
      }

      // Ball collision with paddle
      if (
        newY + BALL_SIZE >= paddleRect.top &&
        newY + BALL_SIZE <= paddleRect.bottom &&
        newX + BALL_SIZE >= paddleRect.left &&
        newX <= paddleRect.right
      ) {
        // Calculate where on the paddle the ball hit (0 = left edge, 1 = right edge)
        const hitPosition = (newX + BALL_SIZE / 2 - paddleRect.left) / paddleRect.width;
        
        // Get current ball speed (magnitude of velocity)
        const speed = Math.sqrt(ballVelocity.x * ballVelocity.x + ballVelocity.y * ballVelocity.y);
        
        // Angle between -75 and 75 degrees based on hit position
        const angle = (hitPosition - 0.5) * (Math.PI / 1.2); // Using PI/1.2 for ±75° range
        
        setBallVelocity({
          x: speed * Math.sin(angle),
          y: -Math.abs(speed * Math.cos(angle)) // Always bounce up
        });
        
        setScore(prev => prev + 1);
        return {
          x: newX,
          y: paddleRect.top - BALL_SIZE // Ensure ball doesn't get stuck in paddle
        };
      }

      // Game over if ball goes below paddle
      if (newY + BALL_SIZE >= windowHeight) {
        endGame();
        return prevPos;
      }

      return { x: newX, y: newY };
    });
  };

  const handleMouseMove = (e) => {
    if (!isPlaying) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    // Smooth paddle movement with boundaries
    const targetX = Math.max(20, Math.min(window.innerWidth - PADDLE_WIDTH - 20, mouseX - PADDLE_WIDTH / 2));
    setPaddleX(targetX);
  };

  useEffect(() => {
    if (isPlaying) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isPlaying]);

  const endGame = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const quitGame = () => {
    setGameMode(false);
    setIsPlaying(false);
    setGameOver(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const restartGame = () => {
    setGameOver(false);
    startGame();
  };

  const toggleGameMode = () => {
    if (gameMode) {
      quitGame();
    } else {
      setGameMode(true);
      // Start game after animation completes
      setTimeout(() => {
        startGame();
      }, 1500); // Reduced from 2000ms to 1500ms for better responsiveness
    }
  };

  useEffect(() => {
    if (gameMode) {
      document.body.classList.add('game-active');
    } else {
      document.body.classList.remove('game-active');
    }
    return () => {
      document.body.classList.remove('game-active');
    };
  }, [gameMode]);

  return (
    <div className={`container ${gameMode ? 'game-mode' : ''}`}>
      <div className="nav-buttons">
        <button 
          className="game-toggle" 
          onClick={toggleGameMode}
          data-active={gameMode}
          aria-label="Toggle game mode"
        >
          <FaGamepad size={24} />
        </button>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          data-active={theme === 'dark'}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>
      </div>

      {gameMode && isPlaying && (
        <div 
          className="game-container"
          onMouseMove={handleMouseMove}
        >
          <div className="pong-score">
            {score}
          </div>
          <div 
            ref={paddleRef}
            className="pong-paddle bottom"
            style={{ left: `${paddleX}px` }}
          />
          <div 
            ref={ballRef}
            className="pong-ball"
            style={{ 
              left: `${ballPosition.x}px`,
              top: `${ballPosition.y}px`
            }}
          />
          <div className="game-controls-hint">
            Use mouse to move paddle
          </div>
          {gameOver && (
            <div className="game-over">
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <div className="game-buttons">
                <button className="game-button" onClick={restartGame}>
                  Play Again
                </button>
                <button className="game-button secondary" onClick={quitGame}>
                  Quit
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <header className="header">
        <h1 className="name">Mrugank Pednekar</h1>
        <p className="title">
          Hey! I'm an incoming Master's student at MIT Sloan, passionate about the intersection of technology, data, and business. 
          Currently at UW-Madison, I'm exploring various fields from computer engineering to mathematics, 
          always seeking ways to blend technical skills with real-world applications.
        </p>
      </header>

      <div className="kanban">
        <div className="column">
          <h2 className="column-header">Education</h2>
          {education.map((item, index) => renderCard(item, index, 'edu'))}
        </div>

        <div className="column">
          <h2 className="column-header">Experience</h2>
          {experiences.map((item, index) => renderCard(item, index, 'exp'))}
        </div>

        <div className="column">
          <h2 className="column-header">Projects</h2>
          {projects.map((item, index) => renderCard(item, index, 'proj'))}
        </div>
      </div>

      <div className="email-contact">
        <h2>Let's Build Something Together</h2>
        <p>Have an interesting idea or project in mind? I'm always excited to collaborate on innovative solutions that make a difference.</p>
        <form className="email-form" onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={emailForm.email}
            onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <textarea
            placeholder="Tell me about your idea..."
            value={emailForm.message}
            onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-bar">
        <a href="https://www.linkedin.com/in/mrugankpednekar" target="_blank" rel="noopener noreferrer" className="contact-link">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="./Pednekar_Mrugank_MIT.pdf" target="_blank" rel="noopener noreferrer" className="contact-link">
          Resume
        </a>
        <a href="mailto:mrugank@mit.edu" className="contact-link">
          <FaEnvelope /> Email
        </a>
        <a href="https://mrugankpednekar.github.io" target="_blank" rel="noopener noreferrer" className="contact-link">
          <FaRobot /> Robotics
        </a>
      </div>

      <div 
        className={`overlay ${expandedCard ? 'active' : ''}`} 
        onClick={handleOverlayClick}
      />
    </div>
  );
};

export default FullScreenSections;
