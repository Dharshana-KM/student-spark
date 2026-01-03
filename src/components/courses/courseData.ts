export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  thumbnail: string;
  category: string;
  youtubeId: string;
  videoCount: number;
  estimatedHours: number;
  tags: string[];
}

// Diverse YouTube courses from reputable channels
export const courses: Course[] = [
  // WEB DEVELOPMENT
  {
    id: "web-react-crash",
    title: "React JS Crash Course",
    description: "Build modern web apps with React. Learn components, hooks, state management, and real-world projects.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Web Development",
    youtubeId: "w7ejDZ8SWv8",
    videoCount: 12,
    estimatedHours: 6,
    tags: ["React", "JavaScript", "Frontend", "Web Development"]
  },
  {
    id: "web-node-complete",
    title: "Node.js Complete Course",
    description: "Master backend development with Node.js. Build REST APIs, work with databases, and deploy applications.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    category: "Web Development",
    youtubeId: "Oe421EPjeBE",
    videoCount: 18,
    estimatedHours: 8,
    tags: ["Node.js", "Backend", "JavaScript", "APIs"]
  },
  {
    id: "web-nextjs-full",
    title: "Next.js Full Course",
    description: "Learn full-stack React development with Next.js. Server-side rendering, API routes, and deployment.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=300&fit=crop",
    category: "Web Development",
    youtubeId: "mTz0GXj8NN0",
    videoCount: 24,
    estimatedHours: 10,
    tags: ["Next.js", "React", "Full Stack", "Web Development"]
  },
  {
    id: "web-tailwind-mastery",
    title: "Tailwind CSS Mastery",
    description: "Build beautiful, responsive UIs faster with Tailwind CSS. Utility-first approach explained.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    category: "Web Development",
    youtubeId: "dFgzHOX84xQ",
    videoCount: 8,
    estimatedHours: 4,
    tags: ["Tailwind CSS", "CSS", "UI Design", "Frontend"]
  },
  {
    id: "web-typescript-deep",
    title: "TypeScript Deep Dive",
    description: "Master TypeScript for safer, more maintainable JavaScript. Types, generics, and best practices.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    category: "Web Development",
    youtubeId: "30LWjhZzg50",
    videoCount: 15,
    estimatedHours: 7,
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"]
  },
  
  // PYTHON & DATA SCIENCE
  {
    id: "python-beginners",
    title: "Python for Beginners",
    description: "Start coding with Python from scratch. Variables, loops, functions, and your first programs.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    category: "Python",
    youtubeId: "rfscVS0vtbw",
    videoCount: 20,
    estimatedHours: 8,
    tags: ["Python", "Programming", "Beginners", "Coding"]
  },
  {
    id: "python-data-analysis",
    title: "Python Data Analysis",
    description: "Analyze data with Pandas, NumPy, and Matplotlib. Real-world datasets and visualization.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    category: "Data Science",
    youtubeId: "vmEHCJofslg",
    videoCount: 16,
    estimatedHours: 7,
    tags: ["Python", "Data Analysis", "Pandas", "Data Science"]
  },
  {
    id: "python-django-web",
    title: "Django Web Development",
    description: "Build production-ready web applications with Django. Authentication, databases, and deployment.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    category: "Web Development",
    youtubeId: "PtQiiknWUcI",
    videoCount: 22,
    estimatedHours: 10,
    tags: ["Django", "Python", "Backend", "Web Development"]
  },
  
  // MACHINE LEARNING & AI
  {
    id: "ml-beginners",
    title: "Machine Learning for Beginners",
    description: "Understand ML fundamentals. Supervised learning, classification, regression explained simply.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    category: "AI & ML",
    youtubeId: "i_LwzRVP7bg",
    videoCount: 14,
    estimatedHours: 6,
    tags: ["Machine Learning", "AI", "Data Science", "Python"]
  },
  {
    id: "ml-tensorflow",
    title: "TensorFlow Complete Guide",
    description: "Build neural networks with TensorFlow. Deep learning, image classification, and NLP projects.",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    category: "AI & ML",
    youtubeId: "tPYj3fFJGjk",
    videoCount: 25,
    estimatedHours: 12,
    tags: ["TensorFlow", "Deep Learning", "Neural Networks", "AI"]
  },
  {
    id: "ml-pytorch-intro",
    title: "PyTorch for Deep Learning",
    description: "Master PyTorch for research and production. Build CNNs, RNNs, and transformer models.",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop",
    category: "AI & ML",
    youtubeId: "V_xro1bcAuA",
    videoCount: 20,
    estimatedHours: 10,
    tags: ["PyTorch", "Deep Learning", "AI", "Neural Networks"]
  },
  {
    id: "ml-nlp-basics",
    title: "Natural Language Processing",
    description: "Text processing, sentiment analysis, and language models. Build chatbots and text classifiers.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop",
    category: "AI & ML",
    youtubeId: "fNxaJsNG3-s",
    videoCount: 12,
    estimatedHours: 5,
    tags: ["NLP", "AI", "Python", "Text Processing"]
  },
  
  // MOBILE DEVELOPMENT
  {
    id: "mobile-react-native",
    title: "React Native Complete",
    description: "Build iOS and Android apps with React Native. Navigation, APIs, and app store deployment.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    category: "Mobile Dev",
    youtubeId: "0-S5a0eXPoc",
    videoCount: 28,
    estimatedHours: 14,
    tags: ["React Native", "Mobile", "iOS", "Android"]
  },
  {
    id: "mobile-flutter-full",
    title: "Flutter Complete Course",
    description: "Cross-platform mobile development with Flutter and Dart. Beautiful UI and native performance.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    category: "Mobile Dev",
    youtubeId: "VPvVD8t02U8",
    videoCount: 30,
    estimatedHours: 15,
    tags: ["Flutter", "Dart", "Mobile", "Cross-platform"]
  },
  
  // DEVOPS & CLOUD
  {
    id: "devops-docker",
    title: "Docker Fundamentals",
    description: "Containerize applications with Docker. Images, containers, Docker Compose, and best practices.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop",
    category: "DevOps",
    youtubeId: "fqMOX6JJhGo",
    videoCount: 10,
    estimatedHours: 4,
    tags: ["Docker", "DevOps", "Containers", "Deployment"]
  },
  {
    id: "devops-kubernetes",
    title: "Kubernetes Complete Guide",
    description: "Orchestrate containers at scale with Kubernetes. Pods, services, deployments explained.",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
    category: "DevOps",
    youtubeId: "X48VuDVv0do",
    videoCount: 20,
    estimatedHours: 10,
    tags: ["Kubernetes", "DevOps", "Cloud", "Orchestration"]
  },
  {
    id: "devops-aws-cloud",
    title: "AWS Cloud Practitioner",
    description: "Master AWS fundamentals. EC2, S3, Lambda, and cloud architecture essentials.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    category: "DevOps",
    youtubeId: "SOTamWNgDKc",
    videoCount: 15,
    estimatedHours: 7,
    tags: ["AWS", "Cloud", "DevOps", "Infrastructure"]
  },
  
  // DATA STRUCTURES & ALGORITHMS
  {
    id: "dsa-complete",
    title: "DSA Complete Course",
    description: "Master data structures and algorithms for coding interviews. Arrays, trees, graphs, and DP.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
    category: "DSA",
    youtubeId: "8hly31xKli0",
    videoCount: 40,
    estimatedHours: 20,
    tags: ["DSA", "Algorithms", "Interview Prep", "Coding"]
  },
  {
    id: "dsa-leetcode",
    title: "LeetCode Problem Solving",
    description: "Crack coding interviews with systematic problem solving. Patterns and strategies explained.",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    category: "DSA",
    youtubeId: "oBt53YbR9Kk",
    videoCount: 30,
    estimatedHours: 15,
    tags: ["LeetCode", "Interview", "Problem Solving", "DSA"]
  },
  
  // UI/UX DESIGN
  {
    id: "design-figma-complete",
    title: "Figma Complete Course",
    description: "Design professional UI/UX with Figma. Components, prototyping, and design systems.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    category: "Design",
    youtubeId: "FTFaQWZBqQ8",
    videoCount: 16,
    estimatedHours: 8,
    tags: ["Figma", "UI Design", "UX", "Prototyping"]
  },
  {
    id: "design-ui-principles",
    title: "UI Design Principles",
    description: "Learn timeless design principles. Color theory, typography, layout, and visual hierarchy.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
    category: "Design",
    youtubeId: "wIuVvCuiJhU",
    videoCount: 10,
    estimatedHours: 4,
    tags: ["UI Design", "Design Principles", "Visual Design", "UX"]
  },
  
  // BLOCKCHAIN & WEB3
  {
    id: "blockchain-solidity",
    title: "Solidity & Smart Contracts",
    description: "Build decentralized apps with Solidity. Smart contracts, Ethereum, and DeFi basics.",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    category: "Blockchain",
    youtubeId: "gyMwXuJrbJQ",
    videoCount: 32,
    estimatedHours: 16,
    tags: ["Solidity", "Blockchain", "Web3", "Ethereum"]
  },
  
  // GIT & VERSION CONTROL
  {
    id: "git-complete",
    title: "Git & GitHub Complete",
    description: "Master version control with Git. Branches, merging, pull requests, and collaboration.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
    category: "Tools",
    youtubeId: "RGOj5yH7evk",
    videoCount: 12,
    estimatedHours: 5,
    tags: ["Git", "GitHub", "Version Control", "Collaboration"]
  },
  
  // SYSTEM DESIGN
  {
    id: "system-design-basics",
    title: "System Design Fundamentals",
    description: "Design scalable systems. Load balancing, caching, databases, and architecture patterns.",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    category: "System Design",
    youtubeId: "0163cssUxLA",
    videoCount: 20,
    estimatedHours: 10,
    tags: ["System Design", "Architecture", "Scalability", "Backend"]
  },
  
  // CYBERSECURITY
  {
    id: "security-ethical-hacking",
    title: "Ethical Hacking Basics",
    description: "Learn cybersecurity fundamentals. Penetration testing, vulnerability assessment, and security tools.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    category: "Security",
    youtubeId: "3Kq1MIfTWCE",
    videoCount: 22,
    estimatedHours: 11,
    tags: ["Cybersecurity", "Ethical Hacking", "Security", "Pentesting"]
  },
  
  // DATABASE
  {
    id: "database-sql-complete",
    title: "SQL Complete Course",
    description: "Master SQL from basics to advanced. Queries, joins, indexing, and database design.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    category: "Database",
    youtubeId: "HXV3zeQKqGY",
    videoCount: 18,
    estimatedHours: 8,
    tags: ["SQL", "Database", "MySQL", "PostgreSQL"]
  },
  {
    id: "database-mongodb",
    title: "MongoDB Complete Guide",
    description: "NoSQL database mastery with MongoDB. CRUD operations, aggregation, and schema design.",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    category: "Database",
    youtubeId: "c2M-rlkkT5o",
    videoCount: 14,
    estimatedHours: 6,
    tags: ["MongoDB", "NoSQL", "Database", "Backend"]
  },
  
  // SOFT SKILLS
  {
    id: "softskills-communication",
    title: "Communication Skills",
    description: "Improve your communication for interviews and teamwork. Presentations and email etiquette.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    category: "Soft Skills",
    youtubeId: "HAnw168huqA",
    videoCount: 8,
    estimatedHours: 3,
    tags: ["Communication", "Soft Skills", "Career", "Interviews"]
  },
  {
    id: "softskills-productivity",
    title: "Productivity for Developers",
    description: "Work smarter, not harder. Time management, focus techniques, and developer workflows.",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
    category: "Soft Skills",
    youtubeId: "Ll1kCWiE9Zo",
    videoCount: 6,
    estimatedHours: 2,
    tags: ["Productivity", "Time Management", "Developer Life", "Focus"]
  }
];

export const categories = ["All", "Web Development", "Python", "AI & ML", "Mobile Dev", "DevOps", "DSA", "Design", "Blockchain", "Database", "Security", "System Design", "Tools", "Soft Skills"];
