import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaEnvelope, FaRobot, FaMoon, FaSun, FaGithub, FaEraser } from 'react-icons/fa';
import GridBackground from './GridBackground';

const FullScreenSections = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedContent, setExpandedContent] = useState(null);
  const [theme, setTheme] = useState('light');
  const [emailForm, setEmailForm] = useState({ email: '', message: '' });

  useEffect(() => {
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

  const handleCardClick = (columnId, cardId, item) => {
    setExpandedCard(`${columnId}-${cardId}`);
    setExpandedContent(item);
  };

  const handleOverlayClick = () => {
    setExpandedCard(null);
    setExpandedContent(null);
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
    return (
      <div
        key={index}
        className="card"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick(columnId, index, item);
        }}
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

  return (
    <>
      <div className="container">
        <GridBackground theme={theme} />
        
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

        <div className="nav-buttons">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            data-active={theme === 'dark'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>

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
      </div>

      {/* Modal Overlay */}
      {expandedContent && (
        <div className="modal-overlay active" onClick={handleOverlayClick}>
          <div
            className="card expanded"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="card-title">{expandedContent.title}</h3>
            <p className="card-period">{expandedContent.period}</p>
            <div className="card-content">
              <p>{expandedContent.details}</p>
              {expandedContent.tags && (
                <div className="tags">
                  {expandedContent.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              {expandedContent.github && (
                <a 
                  href={expandedContent.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                  style={{ marginTop: '1rem', display: 'inline-flex' }}
                >
                  <FaGithub /> View Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullScreenSections;
