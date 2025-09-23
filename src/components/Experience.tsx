import React from 'react';
import './Experience.css';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'IBM',
      period: 'Nov 2022 - Present',
      description: [
        'Led a team of 5 developers in building modern web applications using React and TypeScript',
        'Improved application performance by 40% through code optimization and best practices',
        'Implemented responsive design systems and component libraries',
        'Mentored junior developers and conducted code reviews'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    },
    {
      id: 2,
      title: 'Associate Software Engineer',
      company: 'IBM',
      period: 'July 2018 - Nov 2022',
      description: [
        'Developed and maintained multiple client websites and web applications',
        'Built RESTful APIs using Node.js and Express.js',
        'Integrated third-party services and payment gateways',
        'Collaborated with designers to implement pixel-perfect UI designs'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js']
    },
    {
      id: 3,
      title: 'Junior Software Engineer',
      company: 'IBM',
      period: 'Dec 2015 - July 2018',
      description: [
        'Developed responsive web applications from scratch',
        'Implemented modern JavaScript features and ES6+ syntax',
        'Worked closely with UX/UI designers to create intuitive user interfaces',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['JavaScript', 'Angular', 'HTML', 'Git']
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">
          My professional journey and key accomplishments
        </p>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-meta">
                    <span className="company">{exp.company}</span>
                    <span className="period">{exp.period}</span>
                  </div>
                </div>
                
                <ul className="experience-description">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                
                <div className="experience-technologies">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="timeline-marker"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;