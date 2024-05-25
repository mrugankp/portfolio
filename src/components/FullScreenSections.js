import React, { useEffect, useRef, useState } from 'react';

const FullScreenSections = () => {
  const sections = ['about', 'experience', 'projects', 'blog'];
  const sectionRefs = useRef(sections.map(() => React.createRef()));
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleBoxClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const experiences = [
    {
      title: 'Capstone Product Manager/Software Developer @ Schneider',
      period: 'February 2024 - Present',
      details:
        'Leading a development team of 4 undergraduates to develop a Fitbit for truck drivers. Using Jira to manage workflow, weekly scrum sprints, and crafting user stories. Prototyping UI/UX in figma & react and conducting initial tests with truck drivers. Presenting bi-weekly demos to stakeholders and Schneider representatives.',
    },
    {
      title: 'Product Marketing Manager @ Leysi.com',
      period: 'September 2022 - March 2023',
      details:
        'PMP driving a seed stage fintech startup to market. Increasing downloads by 150% and onboarding the first 150+ users. Hiring social media managers, feedback loops with outsourced engineering teams, and making data-driven decisions.',
    },
    {
      title: 'Firmware Engineer @ Wisconsin Racing-FSAE',
      period: 'September 2021 - May 2022',
      details:
        'Debugging and converting 1000+ lines of C code to Python for previous Battery Management System versions in CCS for the TI Tiva Module on the electric Formula car. Using design and enterprise software such as Cadence, ModelSim, CAD.',
    },
    {
      title: 'Undergraduate Teaching Assistant @ UW-Madison ECE Department',
      period: 'August 2023 - February 2024',
      details:
        'Holding Office Hours and teaching students about x86 computer architecture, C/C++ programming and assembly language. Guiding students on coding challenges involving cache, memory allocation, scheduler calls, and signal handling.',
    },
    {
      title: 'Physics & Math Undergraduate Tutor @ UW-Madison',
      period: 'August 2023 - Present',
      details:
        'Mentoring diverse groups of at most 8 undergraduate students in general physics, particularly focusing on non-engineering majors. Facilitating interactive learning sessions, adapting teaching techniques to cater to individual learning styles. Developing public speaking and communication skills in a classroom setting.',
    },
  ];

  const projects = [
    {
      title: 'MadData Hackathon 2nd Place @ DotData UW-Madison',
      period: 'February 2024',
      details: 'Leading a team of 4 to develop an AI journaling tool that helps people track personal growth using emotion as a metric. Using CNNs to analyze audio and text to predict levels across emotions over a period. Using Python and libraries like pydub to transcribe text and using classification ML models. Ranked 2/120 people.',
      github: 'https://github.com/ryan-24-7/MindGrove',
    },
    {
      title: 'Unravelling UFO Sightings: Applications of ML to Study Patterns & Predict Features',
      period: 'July 2023',
      details: 'Leading a cross-functional team to analyze global UFO sightings using ML techniques (K-NN, decision trees, logistic regression, SVM). Extracting intricate patterns in locations, timings, shapes, and durations. Maximum accuracy is attained by Decision Tree model at 0.82.',
      github: '',
    },
    {
      title: 'Schneider Project',
      period: 'February 2024 - Present',
      details: 'Leading a development team of 4 undergraduates to develop a Fitbit for truck drivers. Using Jira to manage workflow, weekly scrum sprints, and crafting user stories. Prototyping UI/UX in figma & react and conducting initial tests with truck drivers. Presenting bi-weekly demos to stakeholders and Schneider representatives.',
      github: 'https://github.com/mrugankp/Schneider-1',
    },
    {
      title: 'Portfolio Website',
      period: 'Ongoing',
      details: 'Developing a personal portfolio website to showcase projects and experiences. Utilizing modern web technologies such as React and CSS for a responsive design.',
      github: 'https://github.com/mrugankp/portfolio',
    },
  ];

  return (
    <>
      <div className="contact-info">
        <a href="https://www.linkedin.com/in/mrugankpednekar" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="/Pednekar_Mrugank_New.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <a href="mailto:mpednekar@wisc.edu">Email</a>
        <a href="tel:+16083201167">Phone</a>
      </div>
      <div className="container">
        {sections.map((section, index) => (
          <div className="section" id={section} key={section} ref={sectionRefs.current[index]}>
            <div className="section-content">
              {section === 'about' ? (
                <>
                  <h1>About Me</h1>
                  <p>
                    Hello! I'm Mrugank Pednekar, a senior quadruple majoring in Computer Engineering, CS, DS & Math at the University of Wisconsin-Madison.
                    My academic journey has been enriched with a diverse array of courses, ranging from Electrical Engineering, Machine Learning to Agile
                    Development. I have a passion for blending technology with creativity to build innovative products that make a difference.
                  </p>
                  <p>
                    My interests lie in the intersection of technology, design, and business. I am always eager to learn new technologies and methodologies to
                    solve complex problems and create impactful solutions. Whether it's debugging complex systems, managing product lifecycles, or mentoring peers,
                    I thrive in dynamic environments. Outside the classroom, I engage with the community through roles like Software Developer at Cardinal Trading
                    and Physics Tutor at UW-Madison. I am currently seeking internships, Co-ops and full-time opportunities in data science, software development,
                    or product management.
                  </p>
                  <p>My journey is driven by a love for learning and a desire to add real value to people's lives.</p>
                </>
              ) : section === 'experience' ? (
                <>
                  <h1>Experience</h1>
                  <div className="grid">
                    {experiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className={`box ${expanded === `experience-${idx}` ? 'expanded' : ''}`}
                        onClick={() => handleBoxClick(`experience-${idx}`)}
                      >
                        <div>
                          <h2>{exp.title}</h2>
                          <h3>{exp.period}</h3>
                          {expanded === `experience-${idx}` && <p>{exp.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : section === 'projects' ? (
                <>
                  <h1>Projects</h1>
                  <div className="grid">
                    {projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className={`box ${expanded === `projects-${idx}` ? 'expanded' : ''}`}
                        onClick={() => handleBoxClick(`projects-${idx}`)}
                      >
                        <div>
                          <h2>{proj.title}</h2>
                          <h3>{proj.period}</h3>
                          {expanded === `projects-${idx}` && (
                            <>
                              <p>{proj.details}</p>
                              {proj.github && (
                                <a href={proj.github} target="_blank" rel="noopener noreferrer">
                                  GitHub Link
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                <div className="arrow down" onClick={() => sectionRefs.current[index + 1].current.scrollIntoView({ behavior: 'smooth' })}>
                  &#x2193;
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FullScreenSections;
