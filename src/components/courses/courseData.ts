export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  institute: string;
  source: "NPTEL" | "SWAYAM" | "IIT YouTube";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modules: number;
  thumbnail: string;
  category: string;
  youtubeId: string;
  courseUrl?: string;
  overview: string;
  whyItMatters: string;
  whoShouldTake: string[];
  tags: string[];
}

// Real SWAYAM/NPTEL/IIT YouTube courses with unique video IDs
export const courses: Course[] = [
  {
    id: "nptel-ml-iitm",
    title: "Introduction to Machine Learning",
    description: "A comprehensive introduction to machine learning concepts, algorithms, and applications from IIT Madras.",
    instructor: "Prof. Balaraman Ravindran",
    institute: "IIT Madras",
    source: "NPTEL",
    level: "Beginner",
    duration: "12 weeks",
    modules: 12,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    category: "Tech",
    youtubeId: "r4sgKrRL2Ys",
    courseUrl: "https://nptel.ac.in/courses/106106139",
    overview: "This course covers the fundamentals of machine learning including supervised learning, unsupervised learning, and reinforcement learning. You'll learn about various algorithms like linear regression, decision trees, neural networks, and clustering techniques.",
    whyItMatters: "Machine learning is transforming every industry from healthcare to finance. Understanding ML fundamentals opens doors to careers in data science, AI research, and tech companies. This knowledge is essential for any student interested in building intelligent systems.",
    whoShouldTake: [
      "Students interested in data science and AI careers",
      "Anyone with basic programming knowledge wanting to enter ML",
      "Engineering students looking to add AI skills to their profile",
      "Professionals wanting to transition into machine learning roles"
    ],
    tags: ["AI", "Machine Learning", "Data Science", "Programming"]
  },
  {
    id: "nptel-python-iitm",
    title: "Programming in Python",
    description: "Learn Python programming from scratch with hands-on exercises and real-world projects from IIT Madras.",
    instructor: "Prof. Madhavan Mukund",
    institute: "IIT Madras",
    source: "NPTEL",
    level: "Beginner",
    duration: "8 weeks",
    modules: 8,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    category: "Tech",
    youtubeId: "bPrmA1SEN2k",
    courseUrl: "https://nptel.ac.in/courses/106106182",
    overview: "This course teaches Python programming from the ground up. Starting with basic syntax and data types, you'll progress to functions, file handling, and object-oriented programming concepts.",
    whyItMatters: "Python is the most popular programming language for beginners and is widely used in web development, data science, automation, and AI. Mastering Python gives you a versatile tool for solving real-world problems.",
    whoShouldTake: [
      "Complete beginners with no programming experience",
      "Students from non-CS backgrounds wanting to learn coding",
      "Anyone looking to automate tasks or analyze data",
      "Students preparing for coding interviews"
    ],
    tags: ["Python", "Programming", "Coding", "Development"]
  },
  {
    id: "nptel-dsa-iitd",
    title: "Data Structures and Algorithms",
    description: "Master essential DSA concepts crucial for competitive programming and technical interviews from IIT Delhi.",
    instructor: "Prof. Naveen Garg",
    institute: "IIT Delhi",
    source: "NPTEL",
    level: "Intermediate",
    duration: "12 weeks",
    modules: 12,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    category: "Tech",
    youtubeId: "zWg7U0OEAoE",
    courseUrl: "https://nptel.ac.in/courses/106102064",
    overview: "This course covers fundamental data structures like arrays, linked lists, trees, graphs, and algorithms for sorting, searching, and graph traversal. You'll also learn algorithm analysis and complexity theory.",
    whyItMatters: "DSA is the backbone of efficient software. Every major tech company tests DSA in interviews. Strong DSA skills help you write optimized code and solve complex computational problems.",
    whoShouldTake: [
      "Students preparing for tech company interviews (FAANG, startups)",
      "Competitive programming enthusiasts",
      "CS/IT students wanting to strengthen fundamentals",
      "Anyone who wants to write efficient, optimized code"
    ],
    tags: ["DSA", "Algorithms", "Problem Solving", "Interviews"]
  },
  {
    id: "nptel-dbms-iitk",
    title: "Database Management Systems",
    description: "Understand relational databases, SQL, and database design principles from IIT Kharagpur.",
    instructor: "Prof. P.P. Chakrabarti",
    institute: "IIT Kharagpur",
    source: "NPTEL",
    level: "Intermediate",
    duration: "12 weeks",
    modules: 12,
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    category: "Tech",
    youtubeId: "6Iu45VZGQDk",
    courseUrl: "https://nptel.ac.in/courses/106105175",
    overview: "Learn database fundamentals including relational model, SQL, normalization, transaction management, and database design. Covers both theoretical concepts and practical SQL programming.",
    whyItMatters: "Data is everywhere and databases store it all. Understanding DBMS is crucial for backend development, data engineering, and any software development role. SQL is a must-have skill.",
    whoShouldTake: [
      "Students pursuing software development",
      "Anyone interested in backend or data engineering",
      "Those preparing for technical interviews",
      "Students wanting to understand how apps store data"
    ],
    tags: ["Database", "SQL", "Backend", "Data"]
  },
  {
    id: "nptel-coa-iitd",
    title: "Computer Organization and Architecture",
    description: "Learn how computers work at the hardware level from IIT Delhi.",
    instructor: "Prof. S. Raman",
    institute: "IIT Delhi",
    source: "NPTEL",
    level: "Intermediate",
    duration: "12 weeks",
    modules: 12,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    category: "Tech",
    youtubeId: "1R6fTGIkKbY",
    courseUrl: "https://nptel.ac.in/courses/106102062",
    overview: "This course covers computer organization, CPU design, memory hierarchy, pipelining, and instruction set architectures. Understand how software interacts with hardware.",
    whyItMatters: "Understanding computer architecture helps you write more efficient code and debug performance issues. It's fundamental knowledge for systems programming and embedded development.",
    whoShouldTake: [
      "CS/IT students wanting to understand hardware",
      "Anyone interested in systems programming",
      "Students preparing for GATE exam",
      "Those curious about how computers actually work"
    ],
    tags: ["Computer Architecture", "Hardware", "Systems", "CPU"]
  },
  {
    id: "swayam-communication",
    title: "Effective Communication Skills",
    description: "Develop essential communication skills for academic and professional success from IIT Roorkee.",
    instructor: "Prof. Binod Mishra",
    institute: "IIT Roorkee",
    source: "SWAYAM",
    level: "Beginner",
    duration: "8 weeks",
    modules: 8,
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    category: "Skills",
    youtubeId: "HAnw168huqA",
    courseUrl: "https://swayam.gov.in/nd2_cec20_hs18",
    overview: "Learn the art of effective communication including verbal, non-verbal, and written communication. This course covers presentation skills, email etiquette, group discussions, and interview techniques.",
    whyItMatters: "Communication skills are equally important as technical skills. Good communicators get better jobs, lead teams effectively, and advance faster in their careers. This is a life skill that benefits you everywhere.",
    whoShouldTake: [
      "Students preparing for placements and interviews",
      "Anyone who wants to improve public speaking",
      "Students who struggle with presentations",
      "Those looking to build leadership skills"
    ],
    tags: ["Communication", "Soft Skills", "Leadership", "Presentation"]
  },
  {
    id: "nptel-design-thinking",
    title: "Design Thinking - A Primer",
    description: "A human-centered approach to problem-solving and innovation from IIT Roorkee.",
    instructor: "Prof. D.K. Karunanithi",
    institute: "IIT Roorkee",
    source: "NPTEL",
    level: "Beginner",
    duration: "4 weeks",
    modules: 4,
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
    category: "Design",
    youtubeId: "0V5BwTrQOCs",
    courseUrl: "https://nptel.ac.in/courses/109107200",
    overview: "Learn the design thinking methodology: Empathize, Define, Ideate, Prototype, and Test. This course teaches you to solve complex problems creatively and build user-centric solutions.",
    whyItMatters: "Design thinking is used by top companies like Google, Apple, and IDEO. It helps you approach problems differently and create innovative solutions. This skill is valuable in any career.",
    whoShouldTake: [
      "Anyone interested in product design or UX",
      "Students who want to solve problems creatively",
      "Future entrepreneurs and innovators",
      "Those preparing for hackathons and case competitions"
    ],
    tags: ["Design", "Innovation", "Problem Solving", "UX"]
  },
  {
    id: "nptel-os-iitb",
    title: "Operating Systems",
    description: "Understand how operating systems manage hardware and software resources from IIT Bombay.",
    instructor: "Prof. Mythili Vutukuru",
    institute: "IIT Bombay",
    source: "NPTEL",
    level: "Intermediate",
    duration: "12 weeks",
    modules: 12,
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop",
    category: "Tech",
    youtubeId: "bkSWJJZNgf8",
    courseUrl: "https://nptel.ac.in/courses/106105171",
    overview: "Learn about processes, threads, memory management, file systems, and synchronization. Understand how Linux and other operating systems work under the hood.",
    whyItMatters: "OS knowledge is fundamental for systems programming, cloud computing, and understanding application performance. It's also a core subject for GATE and technical interviews.",
    whoShouldTake: [
      "CS/IT students studying core subjects",
      "Anyone interested in systems programming",
      "Students preparing for GATE or interviews",
      "Those wanting to understand Linux internals"
    ],
    tags: ["Operating Systems", "Linux", "Systems", "Core CS"]
  }
];

export const categories = ["All", "Tech", "Design", "Skills"];
