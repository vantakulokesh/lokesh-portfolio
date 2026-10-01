export const profile = {
  name: 'Vantaku Lokesh',
  role: 'Frontend Developer & UI/UX Designer',
  tagline: 'Designing clean interfaces and building user-friendly web experiences.',
  intro: 'B.Tech Computer Science graduate passionate about crafting clean, user-friendly digital experiences. I bridge the gap between design and development — turning ideas into responsive, accessible web applications.',
  email: 'vantakulokesh908@email.com',
  phone: '+91 8074630326',
  github: 'https://github.com/lokesh-vantaku',
  linkedin: 'https://linkedin.com/in/lokesh-vantaku',
  resume: '/resume.pdf',
};

export const about = {
  description:
    'I am a B.Tech Computer Science Engineering graduate from Vignan\u2019s Institute of Information Technology, Visakhapatnam. I enjoy creating clean, user-friendly digital experiences that blend thoughtful design with solid engineering. My focus is frontend development and UI/UX design \u2014 building interfaces that are not only functional but also a pleasure to use.',
  highlights: [
    'Frontend Development with React & modern JavaScript',
    'UI/UX Design using Figma \u2014 wireframes to prototypes',
    'Responsive, mobile-first web applications',
    'Clean, maintainable, component-driven code',
  ],
};

export const skillCategories = [
  {
    name: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 88 },
      { name: 'JavaScript', level: 82 },
      { name: 'React', level: 78 },
    ],
  },
  {
    name: 'Programming',
    icon: 'Code2',
    skills: [
      { name: 'Python', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'C', level: 72 },
    ],
  },
  {
    name: 'UI/UX',
    icon: 'PenTool',
    skills: [
      { name: 'Figma', level: 80 },
      { name: 'Wireframing', level: 78 },
      { name: 'Prototyping', level: 75 },
      { name: 'Responsive Design', level: 85 },
    ],
  },
  {
    name: 'Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 82 },
      { name: 'VS Code', level: 90 },
    ],
  },
  {
    name: 'Core',
    icon: 'Database',
    skills: [
      { name: 'DBMS', level: 72 },
      { name: 'OOP', level: 75 },
    ],
  },
];

export const projects = [
  {
    id: 'p1',
    name: 'ServiceGo',
    category: 'Web App',
    description:
      'A local service marketplace that connects customers with service professionals \u2014 electricians, plumbers, AC technicians, carpenters, painters, cleaners and mechanics. Features customer and worker roles, worker search, profiles, booking, status tracking, messaging, reviews, worker earnings and an admin dashboard.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://github.com/lokesh-vantaku/servicego',
    demo: 'https://servicego-demo.netlify.app',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop',
  },
  {
    id: 'p2',
    name: 'ResuTrack',
    category: 'Full Stack',
    description:
      'A job tracking web application that helps users organize and track job applications. Add applications, track status, store company information, view a tracking dashboard, and search/filter through applications.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Git'],
    github: 'https://github.com/lokesh-vantaku/resutrack',
    demo: 'https://resutrack-demo.netlify.app',
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&h=500&fit=crop',
  },
  {
    id: 'p3',
    name: 'Spotify UI Clone',
    category: 'UI/UX',
    description:
      'A music streaming interface recreated as a UI/UX practice project. Focused on pixel-level detail, component structure, and interactive playback controls to study modern interface design patterns.',
    tech: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/lokesh-vantaku/spotify-clone',
    demo: 'https://spotify-clone-demo.netlify.app',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480a0fe70?w=800&h=500&fit=crop',
  },
];

export const experience = [
  {
    role: 'MERN Stack Intern',
    company: 'Council for Skills and Competencies / CSC India under APSCHE',
    period: '2026',
    points: [
      'Worked with HTML, CSS, JavaScript and React',
      'Learned Node.js and Express for backend development',
      'Worked with MongoDB for data persistence',
      'Applied JWT authentication concepts',
      'Used Git and GitHub for version control',
      'Contributed to building ResuTrack \u2014 a job application tracker',
    ],
  },
];

export const education = [
  {
    degree: 'B.Tech \u2013 Computer Science Engineering',
    institution: 'Vignan\u2019s Institute of Information Technology (VIIT)',
    location: 'Visakhapatnam',
    period: '2022 \u2013 2026',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
