import React, { useEffect, useRef } from 'react';

const FullScreenSections = () => {
  const sections = ['about', 'experience', 'projects', 'blog'];
  const sectionRefs = useRef(sections.map(() => React.createRef()));

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    const handleScroll = () => {
      const container = document.querySelector('.container');
      let closest = sectionRefs.current[0].current;
      let closestDist = Math.abs(container.scrollTop - closest.offsetTop);

      sectionRefs.current.forEach(ref => {
        const section = ref.current;
        const distance = Math.abs(container.scrollTop - section.offsetTop);
        if (distance < closestDist) {
          closest = section;
          closestDist = distance;
        }
      });

      closest.scrollIntoView({ behavior: 'smooth' });
    };

    const container = document.querySelector('.container');
    container.addEventListener('scroll', handleScroll);

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {sections.map((section, index) => (
        <div
          className="section"
          id={section}
          key={section}
          ref={sectionRefs.current[index]}
        >
          <div className="section-content">
            <h1>{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
            <p>Details about my {section}...</p>
          </div>
          {index < sections.length - 1 && (
            <div className="arrow-container">
              <div className="arrow down" onClick={() => sectionRefs.current[index+1].current.scrollIntoView({ behavior: 'smooth' })}>&#x2193;</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FullScreenSections;
