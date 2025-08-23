# Portfolio Website

A modern, responsive portfolio website showcasing the work and skills of Sherwin Yu, Senior Software Engineer. Built with React and TypeScript, this site features a clean design with smooth animations and system-based theme detection.

## Sections

- **Hero**: Introduction with call-to-action buttons
- **Skills**: Technical skills and expertise areas
- **Projects**: Featured projects with descriptions, technologies used, and links
- **Experience**: Professional background and career milestones
- **Contact**: Contact information and networking links

## Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: CSS3 with custom responsive design
- **Build Tool**: Create React App
- **Testing**: React Testing Library with Jest
- **Development**: Modern ES6+ features with TypeScript support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

## Available Scripts

### `npm start`
Runs the app in development mode. The page will reload automatically when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and minified for the best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App if you need full control over the build configuration.

## Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section with introduction
│   ├── Skills.tsx       # Skills showcase
│   ├── Projects.tsx     # Project portfolio
│   ├── Experience.tsx   # Professional experience
│   └── Contact.tsx      # Contact information
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── *.css                # Component-specific styles
```

## Customization

To customize this portfolio for your own use:

1. **Personal Information**: Update the Hero component with your name, title, and description
2. **Projects**: Modify the projects array in `Projects.tsx` with your own work
3. **Skills**: Update the skills list in `Skills.tsx` to match your expertise
4. **Experience**: Add your professional experience in `Experience.tsx`
5. **Contact**: Update contact information and social links in `Contact.tsx`
6. **Styling**: Customize colors, fonts, and layouts in the respective CSS files

## Deployment

This site can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Use the build folder for static hosting
- **AWS S3**: Host as a static website

Build the production version first:
```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a personal portfolio project. Feel free to fork and use as a template for your own portfolio.

## License

This project is open source and available under the MIT License.