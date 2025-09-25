import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/ecommerce',
      imageUrl: '🛒'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['React', 'TypeScript', 'Socket.io', 'Express'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/taskapp',
      imageUrl: '📋'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather application that displays current weather conditions, forecasts, and interactive maps.',
      technologies: ['React', 'API Integration', 'CSS3', 'Chart.js'],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/weather',
      imageUrl: '🌤️'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and optimal performance.',
      technologies: ['React', 'TypeScript', 'CSS3', 'Responsive Design'],
      githubUrl: 'https://github.com/username/portfolio',
      imageUrl: '💼'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A showcase of my recent work and personal projects
        </p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-icon">{project.imageUrl}</div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      className="project-link demo-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      className="project-link github-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

