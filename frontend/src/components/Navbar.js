import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'blog'];
      const offsets = sections.map(section => {
        const element = document.getElementById(section);
        return element ? element.offsetTop : 0;
      });

      const scrollPosition = window.pageYOffset + window.innerHeight / 2;

      for (let i = 0; i < sections.length; i++) {
        if (scrollPosition >= offsets[i] && (!offsets[i + 1] || scrollPosition < offsets[i + 1])) {
          setActiveSection(sections[i]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <ul>
        <li><a className={activeSection === 'about' ? 'active' : ''} onClick={() => handleScrollToSection('about')}>About</a></li>
        <li><a className={activeSection === 'experience' ? 'active' : ''} onClick={() => handleScrollToSection('experience')}>Experience</a></li>
        <li><a className={activeSection === 'projects' ? 'active' : ''} onClick={() => handleScrollToSection('projects')}>Projects</a></li>
        <li><a className={activeSection === 'blog' ? 'active' : ''} onClick={() => handleScrollToSection('blog')}>Blog</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
