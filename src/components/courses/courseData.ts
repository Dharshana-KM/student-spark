export type CourseStatus = "not_started" | "in_progress" | "completed";

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
  students: number;
  rating: number;
  thumbnail: string;
  status: CourseStatus;
  progress: number;
  currentModule?: string;
  category: string;
  youtubeId: string;
  courseUrl?: string;
  overview: string;
  whyItMatters: string;
  whoShouldTake: string[];
  tags: string[];
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "A comprehensive introduction to machine learning concepts, algorithms, and applications for beginners.",
    instructor: "Prof. Balaraman Ravindran",
    institute: "IIT Madras",
    source: "NPTEL",
    level: "Beginner",
    duration: "12 weeks",
    modules: 12,
    students: 45000,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    status: "in_progress",
    progress: 35,
    currentModule: "Week 4: Decision Trees",
    category: "Tech",
    youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with actual NPTEL video ID
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
    id: "2",
    title: "Programming in Python",
    description: "Learn Python programming from scratch with hands-on exercises and real-world projects.",
    instructor: "Prof. Prathap Haridoss",
    institute: "IIT Madras",
    source: "NPTEL",
    level: "Beginner",
    duration: "8 weeks",
    modules: 8,
    students: 120000,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    status: "in_progress",
    progress: 60,
    currentModule: "Week 5: Functions & Modules",
    category: "Tech",
    youtubeId: "4J2xT7Nt6co",
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
    id: "3",
    title: "Data Structures and Algorithms",
    description: "Master essential DSA concepts crucial for competitive programming and technical interviews.",
    instructor: "Prof. Naveen Garg",
    institute: "IIT Delhi",
    source: "NPTEL",
    level: "Intermediate",
    duration: "12 weeks",
    modules: 12,
    students: 85000,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
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
    id: "4",
    title: "Effective Communication",
    description: "Develop essential communication skills for academic and professional success.",
    instructor: "Prof. Binod Mishra",
    institute: "IIT Roorkee",
    source: "SWAYAM",
    level: "Beginner",
    duration: "8 weeks",
    modules: 8,
    students: 32000,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
    category: "Skills",
    youtubeId: "xLMseyPvRRs",
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
    id: "5",
    title: "Web Development Fundamentals",
    description: "Learn to build modern, responsive websites using HTML, CSS, and JavaScript.",
    instructor: "Prof. Tanmay Bakshi",
    institute: "IIT Kharagpur",
    source: "IIT YouTube",
    level: "Beginner",
    duration: "10 weeks",
    modules: 10,
    students: 56000,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
    status: "completed",
    progress: 100,
    category: "Tech",
    youtubeId: "pQN-pnXPaVg",
    courseUrl: "https://www.youtube.com/playlist?list=PLkW9FMxqUvyayjRG_ss8V6w6dLzj6sCjK",
    overview: "This course covers the complete web development fundamentals including HTML5, CSS3, JavaScript ES6+, responsive design, and basic React concepts. Build real projects as you learn.",
    whyItMatters: "Web development is one of the most in-demand skills today. Every business needs a web presence. Learning web dev opens freelancing opportunities and is essential for full-stack development careers.",
    whoShouldTake: [
      "Students who want to build their own websites or portfolios",
      "Anyone interested in frontend development careers",
      "Entrepreneurs who want to create web products",
      "Students looking for freelancing opportunities"
    ],
    tags: ["Web Dev", "HTML", "CSS", "JavaScript"]
  },
  {
    id: "6",
    title: "Database Management Systems",
    description: "Understand relational databases, SQL, and database design principles.",
    instructor: "Prof. P.P. Chakrabarti",
    institute: "IIT Kharagpur",
    source: "NPTEL",
    level: "Intermediate",
    duration: "12 weeks",
    modules: 12,
    students: 42000,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
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
    id: "7",
    title: "Entrepreneurship Essentials",
    description: "Learn the fundamentals of starting and running a successful business.",
    instructor: "Prof. Suresh Bhagavatula",
    institute: "IIM Bangalore via NPTEL",
    source: "SWAYAM",
    level: "Beginner",
    duration: "8 weeks",
    modules: 8,
    students: 28000,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
    category: "Business",
    youtubeId: "Ihs4VFZWwn4",
    courseUrl: "https://swayam.gov.in/nd2_cec20_mg13",
    overview: "This course covers entrepreneurship from ideation to execution. Learn about business models, market research, funding, team building, and startup ecosystem in India.",
    whyItMatters: "India is becoming a startup hub. Understanding entrepreneurship helps you either start your own venture or work effectively in startups. These skills make you a valuable asset anywhere.",
    whoShouldTake: [
      "Students with startup ideas",
      "Anyone curious about how businesses work",
      "Those interested in joining early-stage startups",
      "Students wanting to develop business acumen"
    ],
    tags: ["Startup", "Business", "Entrepreneurship", "Innovation"]
  },
  {
    id: "8",
    title: "Design Thinking",
    description: "A human-centered approach to problem-solving and innovation.",
    instructor: "Prof. Brijesh Kumar",
    institute: "IIT Roorkee",
    source: "NPTEL",
    level: "Beginner",
    duration: "4 weeks",
    modules: 4,
    students: 18000,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
    status: "in_progress",
    progress: 25,
    currentModule: "Week 2: Empathize & Define",
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
  }
];

export const categories = ["All", "Tech", "Business", "Design", "Skills"];
export const statusFilters = ["All", "In Progress", "Not Started", "Completed"];
