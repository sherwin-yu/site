import React from 'react';
import './Skills.css';

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const Skills = () => {
  const skills: Skill[] = [
    { name: 'JavaScript', icon: '🟨', category: 'Frontend' },
    { name: 'TypeScript', icon: '🔷', category: 'Frontend' },
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'HTML/CSS', icon: '🎨', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'Express', icon: '🚀', category: 'Backend' },
    { name: 'Go', icon: '🐹', category: 'Backend' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'MySQL', icon: '🗄️', category: 'Database' },
    { name: 'Git', icon: '📦', category: 'Tools' },
    { name: 'Docker', icon: '🐳', category: 'Tools' },
    { name: 'AWS', icon: '☁️', category: 'Tools' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          Technologies I use to bring ideas to life
        </p>
        
        <div className="skills-showcase">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="skill-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h4 className="skill-title">{skill.name}</h4>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;