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

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="contact-info">
        <a href="https://www.linkedin.com/in/mrugankpednekar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="../../../images/Pednekar_Mrugank_New.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        <a href="mailto:mpednekar@wisc.edu">Email</a>
        <a href="tel:+16083201167">Phone</a>
      </div>
      <div className="container">
        {sections.map((section, index) => (
          <div
            className="section"
            id={section}
            key={section}
            ref={sectionRefs.current[index]}
          >
            <div className="section-content">
              {section === 'about' ? (
                <>
                <h1>About Me</h1>
                <p>
                  Hello! I'm Mrugank Pednekar, a senior quadruple majoring in Computer Engineering, CS, DS & Math at the University of Wisconsin-Madison.
                  My academic journey has been enriched with a diverse array of courses, ranging from Electrical Engineering, Machine Learning to Agile Development.
                  I have a passion for blending technology with creativity to build innovative products that make a difference.
                </p>
                <p>
                  My interests lie in the intersection of technology, design, and business. I am always eager to learn new technologies and methodologies to solve 
                  complex problems and create impactful solutions. Whether it's debugging complex systems, managing product lifecycles, or mentoring peers, I thrive
                  in dynamic environments. Outside the classroom, I engage with the community through roles like Software Developer at Cardinal Trading
                  and Physics Tutor at UW-Madison. I am currently seeking internships, Co-ops and full-time opportunities in data science, software development, or product management. 
                </p>
                <p>
                  My journey is driven by a love for learning and a desire to add value to real people's lives. Feel free to reach out to me at mrugankpednekar@gmail.com or connect with me on LinkedIn.
                </p>
                </>
              ) : (
                <>
                  <h1>{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
                  <p>Details about my {section}...</p>
                </>
              )}
            </div>
            {index < sections.length - 1 && (
              <div className="arrow-container">
                <div className="arrow down" onClick={() => sectionRefs.current[index + 1].current.scrollIntoView({ behavior: 'smooth' })}>&#x2193;</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FullScreenSections;

