export default {
  skills: {
    title: 'Technical Skills',
    categories: {
      programming: 'Programming Languages',
      frameworks: 'Frameworks & Libraries',
      devops: 'DevOps & Tools',
      softskills: 'Skills & Methodologies',
    },

  },
  nav: {
    about: 'About Me',
    projects: 'Projects',
    contact: 'Contact',
    skills: 'Skills',
  },
  contact: {
    title: 'Contact',
    description:
      'Want to collaborate? Have a question or proposal? Write to me or connect through my professional networks.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    form: {
      title: 'Contact Form',
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      submit: 'Send message',
    },
    success: 'Message sent successfully. Thank you!',
    error: 'Failed to send message. Please try again.',
    recaptchaError: 'Please verify you are not a robot.',
  },
  about: {
    title: "About Me",
    subtitle: "Computer Engineer - Software Engineer",
    description:
      "I am Isaac Solís Padilla, recently graduated in Computer Engineering – Software Engineering track at the University of Seville.\n\nI am driven by a genuine passion for software development and a constant desire to keep learning.\n\nI consider myself self-taught, persistent and highly committed, qualities that have helped me overcome both academic and personal challenges.",
    download: "Download CV",
  },
  projects: {
    title: "Projects",
    demo: "Live Demo",
    repo: "Repository",
    items: [
      {
        title: "EndOfLine",
        description: "EndOfLine is a printable card game where your goal is to cut off your opponent’s line. Strategy, planning, and speed are essential to win."
      },
      {
        title: "TodUS",
        description: "TodUS is my final degree project: a practical, useful, and highly customizable to-do list app designed to boost your daily productivity."
      },
      {
        title: "CARONTE",
        description: "CARONTE is a cross-platform mobile app for creating personalized memorials and sending farewell messages to loved ones, with a thoughtful and respectful approach."
      }
    ]
  },
  skills: {
    title: "Technical Skills",
    note: "⚠️ These percentages reflect <strong>my own relative level</strong> among the technologies I know.<br class='hidden sm:inline' />They do not indicate absolute mastery of each tool.",
    groups: [
      {
        title: "Programming Languages",
        skills: [
          { name: "JavaScript" },
          { name: "Python" },
          { name: "Java" },
          { name: "PHP" }
        ]
      },
      {
        title: "Frameworks & Libraries",
        skills: [
          { name: "Vue.js" },
          { name: "React" },
          { name: "React Native" },
          { name: "Laravel" },
          { name: "Spring" },
          { name: "Spring Boot" },
          { name: "Django" }
        ]
      },
      {
        title: "Databases",
        skills: [
          { name: "MySQL" },
          { name: "MariaDB" },
          { name: "SQLite" }
        ]
      },
      {
        title: "Tools & Platforms",
        skills: [
          { name: "Git" },
          { name: "GitHub" },
          { name: "GitHub Actions" },
          { name: "Postman" },
          { name: "Linux" },
          { name: "Jupyter" },
          { name: "WordPress" }
        ]
      },
      {
        title: "Others",
        skills: [
          { name: "Node.js" }
        ]
      },
      {
        title: "Soft Skills",
        skills: [
          { name: "Agile / Scrum" },
          { name: "Technical Leadership" },
          { name: "Problem Solving" }
        ]
      }
    ]
  },
  footer: {
    about: "Full-stack developer focused on UX, performance, and scalable products.",
    contact: "Contact",
    madeWith: "Made with",
    backToTop: "Back to top",
    privacy: "Privacy"
  }
}
