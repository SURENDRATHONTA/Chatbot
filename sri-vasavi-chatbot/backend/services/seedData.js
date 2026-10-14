import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import {
  CollegeInfo, Department, Course, Faculty, Admission, Placement,
  Facility, Scholarship, Notification, FAQ, User
} from '../models/index.js';

dotenv.config({ path: fileURLToPath(new URL('.env', import.meta.url)) });

export const seedKnowledgeBaseData = {
  collegeInfo: [
    {
      title: "Sri Vasavi Engineering College Overview",
      category: "introduction",
      content: "Sri Vasavi Engineering College (Autonomous) is located at Pedatadepalli, Tadepalligudem, West Godavari District, Andhra Pradesh. Established in 2001, Sri Vasavi Engineering College is approved by AICTE, New Delhi, permanently affiliated to JNTUK, Kakinada, and accredited by NAAC with 'A' Grade. The college offers quality engineering education with state-of-the-art infrastructure.",
      keywords: ["about", "college", "introduction", "location", "sri vasavi", "autonomous", "jntuk", "pedatadepalli", "tadepalligudem", "accredited", "naac"]
    },
    {
      title: "Vision & Mission",
      category: "vision_mission",
      content: "VISION: To be a premier technological institute striving for excellence with global perspective and commitment to nation building.\n\nMISSION:\n1. To impart quality technical education by providing conducive learning ecosystem.\n2. To encourage research, innovation and entrepreneurship for societal empowerment.\n3. To instill ethical values, leadership qualities, and professional skills.",
      keywords: ["vision", "mission", "goal", "motto", "objective", "aim", "values"]
    },
    {
      title: "Contact Information & Address",
      category: "contact",
      content: "Sri Vasavi Engineering College (Autonomous)\nPedatadepalli, Tadepalligudem - 534101\nWest Godavari District, Andhra Pradesh, India.\nPhone: 08818-284355, 284344, 284544\nEmail: principal@srivasaviengg.ac.in, sves_tpggdm@yahoo.co.in\nWebsite: https://www.srivasaviengg.ac.in",
      keywords: ["contact", "address", "phone", "email", "website", "location", "where", "reach", "call", "map", "tadepalligudem"]
    },
    {
      title: "Academic Calendar & Examination Cell",
      category: "academic_calendar",
      content: "The Autonomous Examination Cell manages semester examinations, internal evaluations, timetables, and result publications strictly adhering to JNTUK and Autonomous Academic Regulations. Semester exams are held bi-annually in November/December and April/May. Timetables are published on the college portal 2 weeks prior to exam commencement.",
      keywords: ["calendar", "exam", "examination", "timetable", "schedule", "results", "mid exam", "semester", "academic"]
    }
  ],

  departments: [
    {
      code: "CSE",
      name: "Computer Science and Engineering",
      description: "The Department of Computer Science & Engineering offers B.Tech in CSE, M.Tech in Computer Science, and specialized branches. Equipped with modern computing labs, high-speed Internet, AI/ML labs, and cloud software tools.",
      hodName: "Dr. D. Jaya Kumari",
      hodEmail: "hod_cse@srivasaviengg.ac.in",
      intakeCapacity: 240,
      laboratories: ["Advanced Programming Lab", "AI & Data Analytics Lab", "Cloud Computing & Systems Lab", "Web Technologies Lab"],
      keyHighlights: ["100% Placement assistance", "Industry certifications with Oracle, AWS, NPTEL", "High-speed 1 Gbps internet corridor"],
      contactEmail: "cse@srivasaviengg.ac.in",
      keywords: ["cse", "computer science", "coding", "software", "programming", "it", "jaya kumari"]
    },
    {
      code: "ECE",
      name: "Electronics and Communication Engineering",
      description: "The ECE Department provides deep exposure to VLSI Design, Embedded Systems, IoT, Signal Processing, and Wireless Communication. Holds NBA Accreditation and specialized R&D labs.",
      hodName: "Dr. K. N. H Srinivas",
      hodEmail: "hod_ece@srivasaviengg.ac.in",
      intakeCapacity: 180,
      laboratories: ["VLSI Design Lab", "Embedded Systems & IoT Lab", "DSP & Communication Systems Lab", "Microwave & Optical Lab"],
      keyHighlights: ["TI Innovation Center", "VLSI Research Lab with Cadence tools", "High placement percentage in core and software sectors"],
      contactEmail: "ece@srivasaviengg.ac.in",
      keywords: ["ece", "electronics", "communication", "vlsi", "embedded", "iot", "signals"]
    },
    {
      code: "EEE",
      name: "Electrical and Electronics Engineering",
      description: "Department of EEE focuses on Power Systems, Renewable Energy Solutions, Electric Vehicles, Control Systems, and Power Electronics.",
      hodName: "Dr. D. Sudha Rani",
      hodEmail: "hod_eee@srivasaviengg.ac.in",
      intakeCapacity: 90,
      laboratories: ["Electrical Machines Lab", "Power Electronics Lab", "Control Systems Lab", "Simulink & Solar PV Lab"],
      keyHighlights: ["Solar Power R&D cell", "Industrial visits to Thermal & Hydro power plants"],
      contactEmail: "eee@srivasaviengg.ac.in",
      keywords: ["eee", "electrical", "power", "energy", "solar", "circuits", "machines"]
    },
    {
      code: "ME",
      name: "Mechanical Engineering",
      description: "Department of Mechanical Engineering trains students in CAD/CAM, Robotics, Thermal Engineering, Manufacturing Technologies, and Mechatronics.",
      hodName: "Dr. M. V. Ramesh",
      hodEmail: "hod_me@srivasaviengg.ac.in",
      intakeCapacity: 60,
      laboratories: ["CAD/CAM Lab", "Thermal Engineering Lab", "Manufacturing Technology Lab", "Robotics & Automation Lab"],
      keyHighlights: ["3D Printing & Fabrication Facility", "SAE India Collegiate Club"],
      contactEmail: "me@srivasaviengg.ac.in",
      keywords: ["mechanical", "me", "machines", "cad", "cam", "robotics", "automobile", "manufacturing"]
    },
    {
      code: "CE",
      name: "Civil Engineering",
      description: "Department of Civil Engineering focuses on Structural Engineering, Geotechnical, Environmental Engineering, Transportation, and GIS Mapping.",
      hodName: "Dr. G. Radhakrishnan",
      hodEmail: "hod_ce@srivasaviengg.ac.in",
      intakeCapacity: 60,
      laboratories: ["Structural Engineering Lab", "Concrete & Highway Lab", "Surveying & GIS Lab", "Geotechnical Engineering Lab"],
      keyHighlights: ["Consultancy services provided to Govt and Private agencies", "STAAD Pro & AutoCAD training"],
      contactEmail: "ce@srivasaviengg.ac.in",
      keywords: ["civil", "ce", "building", "structures", "concrete", "surveying", "gis"]
    },
    {
      code: "AIML",
      name: "CSE - Artificial Intelligence and Machine Learning",
      description: "Specialized undergraduate program focusing on Deep Learning, Machine Learning algorithms, Natural Language Processing, Computer Vision, and AI ethics.",
      hodName: "Dr. G. Loshma",
      hodEmail: "hod_aiml@srivasaviengg.ac.in",
      intakeCapacity: 120,
      laboratories: ["Deep Learning & GPU Supercomputing Lab", "NLP & Computer Vision Lab"],
      keyHighlights: ["NVIDIA Deep Learning Institute Partnership", "Hands-on projects with real-world datasets"],
      contactEmail: "aiml@srivasaviengg.ac.in",
      keywords: ["aiml", "ai", "machine learning", "artificial intelligence", "deep learning", "nlp", "python"]
    },
    {
      code: "CSDS",
      name: "CSE - Data Science",
      description: "Undergraduate program designed to build expertise in Big Data Analytics, Statistical Modeling, Data Mining, Predictive Analytics, and Business Intelligence.",
      hodName: "Dr. G. Loshma",
      hodEmail: "hod_ds@srivasaviengg.ac.in",
      intakeCapacity: 60,
      laboratories: ["Big Data Analytics Lab", "Data Visualization & Analytics Lab"],
      keyHighlights: ["Hadoop & Spark infrastructure", "Industry mentor programs"],
      contactEmail: "ds@srivasaviengg.ac.in",
      keywords: ["data science", "ds", "aids", "big data", "analytics", "statistics", "data analyst"]
    },
    {
      code: "BSH",
      name: "Basic Sciences & Humanities",
      description: "Provides foundational training in Mathematics, Physics, Chemistry, Professional English, Communication Skills, and Environmental Studies for first-year engineering students.",
      hodName: "Mr. N. Raja Sekhar",
      hodEmail: "hod_bsh@srivasaviengg.ac.in",
      intakeCapacity: 720,
      laboratories: ["Engineering Physics Lab", "Engineering Chemistry Lab", "Advanced English Communication Skills Lab"],
      keyHighlights: ["Personality Development workshops", "Interactive multimedia language lab"],
      contactEmail: "bsh@srivasaviengg.ac.in",
      keywords: ["bsh", "basic sciences", "english", "maths", "physics", "chemistry", "humanities", "first year"]
    }
  ],

  courses: [
    {
      programType: "B.Tech",
      courseName: "B.Tech in Computer Science and Engineering (CSE)",
      departmentCode: "CSE",
      durationYears: 4,
      intakeSeats: 240,
      eligibility: "Passed 10+2 / Intermediate with Mathematics, Physics, and Chemistry (MPC) securing at least 45% marks and qualified in AP EAPCET (EAMCET).",
      description: "Full-time 4-year undergraduate degree in CSE.",
      keywords: ["btech cse", "b.tech computer science", "cse course", "btech seats"]
    },
    {
      programType: "B.Tech",
      courseName: "B.Tech in Artificial Intelligence & Machine Learning (CSE-AI&ML)",
      departmentCode: "AIML",
      durationYears: 4,
      intakeSeats: 120,
      eligibility: "Passed 10+2 / Intermediate (MPC) with 45% marks and valid AP EAPCET rank.",
      description: "Specialized 4-year B.Tech program focused on AI algorithms, Neural Networks, and ML applications.",
      keywords: ["btech aiml", "ai ml course", "btech artificial intelligence"]
    },
    {
      programType: "B.Tech",
      courseName: "B.Tech in Data Science (CSE-DS)",
      departmentCode: "CSDS",
      durationYears: 4,
      intakeSeats: 60,
      eligibility: "Passed 10+2 / Intermediate (MPC) with 45% marks and valid AP EAPCET rank.",
      description: "Specialized 4-year B.Tech in Data Science.",
      keywords: ["btech ds", "btech data science", "data science course"]
    },
    {
      programType: "B.Tech",
      courseName: "B.Tech in Electronics and Communication Engineering (ECE)",
      departmentCode: "ECE",
      durationYears: 4,
      intakeSeats: 180,
      eligibility: "Passed 10+2 (MPC) with minimum 45% and qualified AP EAPCET.",
      description: "Undergraduate degree in ECE covering microprocessors, IoT, VLSI, and communications.",
      keywords: ["btech ece", "b.tech electronics", "ece course"]
    },
    {
      programType: "B.Tech",
      courseName: "B.Tech in Electrical and Electronics Engineering (EEE)",
      departmentCode: "EEE",
      durationYears: 4,
      intakeSeats: 90,
      eligibility: "Passed 10+2 (MPC) with minimum 45% and qualified AP EAPCET.",
      description: "Undergraduate course in Electrical Power, Machines, and Electronics.",
      keywords: ["btech eee", "b.tech electrical", "eee course"]
    },
    {
      programType: "B.Tech",
      courseName: "B.Tech in Mechanical Engineering (ME)",
      departmentCode: "ME",
      durationYears: 4,
      intakeSeats: 60,
      eligibility: "Passed 10+2 (MPC) with 45% and qualified AP EAPCET.",
      description: "4-year B.Tech degree in Mechanical Systems & CAD/CAM.",
      keywords: ["btech me", "btech mechanical"]
    },
    {
      programType: "B.Tech",
      courseName: "B.Tech in Civil Engineering (CE)",
      departmentCode: "CE",
      durationYears: 4,
      intakeSeats: 60,
      eligibility: "Passed 10+2 (MPC) with 45% and qualified AP EAPCET.",
      description: "4-year B.Tech in Civil Engineering.",
      keywords: ["btech civil", "btech ce"]
    },
    {
      programType: "M.Tech",
      courseName: "M.Tech in Computer Science and Engineering",
      departmentCode: "CSE",
      durationYears: 2,
      intakeSeats: 18,
      eligibility: "Passed B.E / B.Tech in CSE/IT/equivalent with valid AP PGECET or GATE score.",
      description: "Postgraduate master's degree in Computer Science.",
      keywords: ["mtech cse", "m.tech computer science", "master of technology"]
    },
    {
      programType: "M.Tech",
      courseName: "M.Tech in VLSI & Embedded Systems",
      departmentCode: "ECE",
      durationYears: 2,
      intakeSeats: 18,
      eligibility: "Passed B.E / B.Tech in ECE/EEE/equivalent with valid GATE / AP PGECET score.",
      description: "Postgraduate master's degree in VLSI & Embedded Systems.",
      keywords: ["mtech ece", "mtech vlsi", "mtech embedded"]
    },
    {
      programType: "Diploma",
      courseName: "Diploma (Polytechnic) in CSE, ECE, EEE, ME, CE",
      departmentCode: "polytechnic",
      durationYears: 3,
      intakeSeats: 300,
      eligibility: "Passed 10th Class (SSC) with valid AP POLYCET rank.",
      description: "3-year Diploma technical programs offered at Sri Vasavi Engineering College.",
      keywords: ["diploma", "polytechnic", "polycet", "3 year diploma"]
    }
  ],

  faculty: [
    {
      name: "Dr. D. Jaya Kumari",
      departmentCode: "CSE",
      designation: "Professor & HOD",
      qualification: "Ph.D (CSE)",
      specialization: "Image Processing, Machine Learning, Soft Computing",
      experienceYears: 22,
      email: "hod_cse@srivasaviengg.ac.in",
      keywords: ["jaya kumari", "cse hod", "cse professor"]
    },
    {
      name: "Dr. K. N. H Srinivas",
      departmentCode: "ECE",
      designation: "Professor & HOD",
      qualification: "Ph.D (ECE)",
      specialization: "Signal Processing, Wireless Communications, Antennas",
      experienceYears: 24,
      email: "hod_ece@srivasaviengg.ac.in",
      keywords: ["kusuma kumari", "ece hod", "ece professor"]
    },
    {
      name: "Dr. D. Sudha Rani",
      departmentCode: "EEE",
      designation: "Professor & HOD",
      qualification: "Ph.D (EEE)",
      specialization: "Power Systems, Smart Grids",
      experienceYears: 20,
      email: "hod_eee@srivasaviengg.ac.in",
      keywords: ["sudha rani", "eee hod"]
    },
    {
      name: "Dr. M. V. Ramesh",
      departmentCode: "ME",
      designation: "Professor & HOD",
      qualification: "Ph.D (Mechanical)",
      specialization: "Thermal Engineering, Renewable Energy",
      experienceYears: 21,
      email: "hod_me@srivasaviengg.ac.in",
      keywords: ["ramesh", "me hod"]
    },
    {
      name: "Dr. G. Radhakrishnan",
      departmentCode: "CE",
      designation: "Professor & HOD",
      qualification: "Ph.D (Civil)",
      specialization: "Structural Engineering",
      experienceYears: 19,
      email: "hod_ce@srivasaviengg.ac.in",
      keywords: ["radhakrishnan", "civil hod"]
    },
    {
      name: "Dr. G. Loshma",
      departmentCode: "CSDS",
      designation: "Professor & HOD Data Science",
      qualification: "Ph.D (CSE)",
      specialization: "Cryptography, Network Security, Data Science",
      experienceYears: 23,
      email: "naresh.v@srivasaviengg.ac.in",
      keywords: ["naresh", "data science hod", "cryptography"]
    }
  ],

  admissions: [
    {
      title: "Undergraduate Admission (B.Tech)",
      program: "B.Tech (4 Years)",
      eligibilityCriteria: "Candidates must have passed 10+2 / Intermediate with Mathematics, Physics, and Chemistry (MPC) from a recognized Board with a minimum of 45% aggregate marks (40% for reserved category). Qualify in AP EAPCET / EAMCET entrance exam.",
      admissionProcedure: "70% of total seats (Category-A) are allotted through Convener Admissions based on AP EAPCET ranks via online web counseling.\n30% of seats (Category-B / Management quota) are filled by the College Management based on merit in 10+2 / JEE Main / EAPCET as per APSCHE guidelines.",
      feeDetails: "Tuition Fee: ₹43,000 to ₹70,000 per annum (as fixed by AP Higher Education Regulatory & Monitoring Commission - APHERMC). JNTUK affiliation & exam fees extra.",
      contactPerson: "Admissions Officer: +91 8818 284355 / admissions@srivasaviengg.ac.in",
      keywords: ["admission", "btech admission", "eamcet", "eapcet", "eligibility", "category a", "category b", "management seat", "how to join", "apply"]
    },
    {
      title: "Postgraduate Admission (M.Tech)",
      program: "M.Tech (2 Years)",
      eligibilityCriteria: "Candidates must hold a B.E/B.Tech degree in relevant discipline with minimum 50% marks (45% for reserved category) and qualify in GATE or AP PGECET.",
      admissionProcedure: "Seats filled through AP PGECET web counseling based on rank, and GATE scorecard merit.",
      feeDetails: "Tuition Fee: approx ₹35,000 per semester as per APHERMC norms.",
      contactPerson: "PG Admissions Desk: pg_admissions@srivasaviengg.ac.in",
      keywords: ["mtech admission", "pgecet", "gate", "postgraduate", "master degree admission"]
    },
    {
      title: "Lateral Entry Admission (B.Tech 2nd Year)",
      program: "B.Tech Lateral Entry (3 Years)",
      eligibilityCriteria: "Diploma in Engineering / Polytechnic or B.Sc (Maths) graduates with valid AP ECET rank.",
      admissionProcedure: "Allotted through AP ECET online web counseling directly into 2nd year B.Tech.",
      feeDetails: "Same tuition fee as regular B.Tech Category-A.",
      contactPerson: "ECET Admissions Coordinator",
      keywords: ["lateral entry", "ecet", "diploma to btech", "2nd year btech"]
    }
  ],

  placements: [
    {
      academicYear: "2024-2025 Placement Drive",
      overview: "Sri Vasavi Engineering College maintains an outstanding placement track record with 80%+ placement rate for eligible students across leading IT companies, product organizations, and core engineering firms. Highest salary package offered: ₹14.0 LPA, Average package: ₹4.5 LPA.",
      topRecruiters: ["TCS (Tata Consultancy Services)", "Wipro", "Infosys", "Cognizant (CTS)", "Hexaware", "Capgemini", "Virtusa", "HCL", "Accord Global Technology", "Hyundai Mobis", "Efftronics"],
      trainingActivities: "Dedicated Training & Placement Cell provides continuous training from 2nd year onwards in Data Structures, Aptitude, Soft Skills, Mock Interviews, Coding contests on HackerRank/LeetCode, and AWS/Java certifications.",
      internshipInfo: "Mandatory semester internships for 3rd and 4th year students with stipends ranging from ₹10,000 to ₹30,000/month.",
      placementOfficer: "DR.P.N.GOPALAKRISHNA",
      contactEmail: "placements@srivasaviengg.ac.in",
      keywords: ["placement", "placements", "jobs", "recruiters", "companies", "highest package", "average package", "tcs", "wipro", "infosys", "training", "internship"]
    }
  ],

  facilities: [
    {
      facilityName: "Central Library",
      category: "Library & Digital Resources",
      description: "Spacious Central Library with over 55,000 volumes, 10,000+ title titles, IEEE E-Journals subscription, DELNET, ScienceDirect, NPTEL video lectures, and a Digital Library with 50 high-speed computers.",
      inchargeName: "Dr. G CH S MADHUSUDHAN RAO",
      timingOrDetails: "Open Monday to Saturday: 8:00 AM to 8:00 PM. Book bank facility available for SC/ST students.",
      keywords: ["library", "books", "digital library", "ieee", "journals", "reading room", "study"]
    },
    {
      facilityName: "Campus Hostels (Boys & Girls)",
      category: "Accommodation",
      description: "Separate, secure on-campus hostels for Boys and Girls equipped with 24/7 solar hot water, purified RO drinking water, Wi-Fi connectivity, gym, reading room, hygienic dining hall, and 24/7 security & resident wardens.",
      inchargeName: "Hostel Warden Office",
      timingOrDetails: "Hostel fee approx ₹65,000 - ₹75,000 per academic year including mess charges.",
      keywords: ["hostel", "hostels", "boys hostel", "girls hostel", "accommodation", "stay", "room", "mess", "food"]
    },
    {
      facilityName: "College Transportation (Buses)",
      category: "Transport",
      description: "Fleet of 60+ modern buses connecting Tadepalligudem, Tanuku, Bhimavaram, Eluru, Kovvur, Nidadavole, Ganapavaram, Jangareddygudem, and surrounding towns safely.",
      inchargeName: "NAGA RAJU",
      timingOrDetails: "Bus routes and seasonal passes managed at Transport Section.",
      keywords: ["transport", "bus", "buses", "travel", "pickup", "routes", "transportation"]
    },
    {
      facilityName: "Campus Canteen & Cafeteria",
      category: "Food & Refreshment",
      description: "Hygienic campus canteen serving breakfast, South & North Indian meals, snacks, fresh fruit juices, and beverages at subsidized affordable prices.",
      inchargeName: "Canteen Supervisor",
      timingOrDetails: "Open daily from 7:30 AM to 6:00 PM.",
      keywords: ["canteen", "food", "cafeteria", "lunch", "snacks", "coffee", "breakfast"]
    },
    {
      facilityName: "Sports & Fitness Complex",
      category: "Sports & Athletics",
      description: "Spacious sports grounds for Cricket, Football, Volleyball, Basketball court, Shuttle Badminton, Table Tennis, Track & Field, and fully equipped Gymnasium.",
      inchargeName: "Physical Director: Mr. N. V. S. N. Murthy",
      timingOrDetails: "Annual Inter-Collegiate Sports Meets and JNTUK Zone tournaments hosted regularly.",
      keywords: ["sports", "gym", "cricket", "volleyball", "basketball", "fitness", "ground", "games"]
    },
    {
      facilityName: "Laboratories & Research Centers",
      category: "Academic Labs",
      description: "Over 50 state-of-the-art computer and core engineering laboratories equipped with modern hardware, IoT kits, 3D printers, MATLAB, Cadence, Xilinx, ANSYS, and High Performance Computing servers.",
      inchargeName: "Respective Department Lab Incharges",
      timingOrDetails: "Accessible during college hours and special project hours.",
      keywords: ["lab", "labs", "laboratory", "laboratories", "equipment", "computers", "hardware"]
    }
  ],

  scholarships: [
    {
      title: "Jagananna Vidya Deevena & Vasathi Deevena (AP Govt)",
      provider: "Government of Andhra Pradesh",
      eligibility: "Students admitted under Category-A (EAPCET/ECET/PGECET convener quota) belonging to SC/ST/BC/EBC/Kapu/Minority categories with family annual income less than ₹2.5 Lakhs.",
      details: "Full Tuition Fee reimbursement directly transferred to student's mother's account in 4 installments along with hostel/food allowance under Vasathi Deevena.",
      applicationProcess: "Apply through Jnanabhumi AP Portal during the start of academic year with income and caste certificates.",
      keywords: ["scholarship", "jnanabhumi", "vidya deevena", "vasathi deevena", "fee reimbursement", "govt scholarship", "stipend"]
    },
    {
      title: "Sri Vasavi Management Merit Scholarship",
      provider: "College Management",
      eligibility: "Top rankers in AP EAPCET and 10+2 top scorers securing above 95% aggregate marks.",
      details: "Fee concessions up to 50% on tuition fee for deserving merit students.",
      applicationProcess: "Submit application directly at Administrative Office during admission counseling.",
      keywords: ["management scholarship", "merit scholarship", "fee concession", "discount"]
    },
    {
      title: "National Scholarship Portal (NSP)",
      provider: "Government of India",
      eligibility: "Central Sector Scheme of Scholarships for College and University Students, PMSSS, AICTE Pragati & Saksham for Girls.",
      details: "Financial aid up to ₹50,000 per year for girl students in engineering and top national performers.",
      applicationProcess: "Online application at scholarship.gov.in verified by College Nodal Officer.",
      keywords: ["nsp", "national scholarship", "pragati scholarship", "aicte scholarship"]
    }
  ],

  notifications: [
    {
      title: "B.Tech I-Semester Regular Examination Notification Oct 2026",
      category: "Exam",
      content: "All B.Tech 1st Year students are hereby informed that the I-Semester Mid-1 and Regular Examinations will commence from October 20, 2026. Examination fee payment window opens on October 5, 2026.",
      publishDate: new Date("2026-09-25"),
      isImportant: true,
      keywords: ["notification", "exam date", "timetable", "october 2026", "mid exam", "regular exam"]
    },
    {
      title: "TCS Ninja & Digital Campus Placement Drive Registration",
      category: "Placement",
      content: "Final Year B.Tech (CSE, ECE, EEE, ME, CE) students with 60%+ throughout academics are eligible to register for TCS Campus Drive 2026 before October 10, 2026 at T&P Portal.",
      publishDate: new Date("2026-09-28"),
      isImportant: true,
      keywords: ["tcs drive", "placement registration", "campus placement", "tcs ninja"]
    },
    {
      title: "Annual Tech Fest - VASAVI INNOVEX 2026",
      category: "Event",
      content: "Sri Vasavi Engineering College presents National Level Technical Symposium VASAVI INNOVEX 2026 on November 12-13, 2026. Events include Hackathon, Paper Presentation, Robo Race, and Coding Sprint.",
      publishDate: new Date("2026-09-20"),
      isImportant: false,
      keywords: ["fest", "symposium", "tech fest", "innovex", "hackathon", "events"]
    }
  ],

  faqs: [
    {
      question: "Is Sri Vasavi Engineering College an Autonomous college?",
      answer: "Yes, Sri Vasavi Engineering College is an Autonomous Institution conferred by UGC, approved by AICTE, New Delhi, and permanently affiliated to JNTUK, Kakinada. It holds NAAC 'A' Grade accreditation.",
      category: "General",
      keywords: ["autonomous", "jntuk", "naac", "accredited", "affiliated", "ugc"]
    },
    {
      question: "What is the college code for AP EAPCET / EAMCET counseling?",
      answer: "The AP EAPCET / EAMCET counseling college code for Sri Vasavi Engineering College, Tadepalligudem is SVEC.",
      category: "Admissions",
      keywords: ["college code", "eamcet code", "eapcet code", "svec code", "counseling code"]
    },
    {
      question: "Where is the college located?",
      answer: "The college is situated at Pedatadepalli, Tadepalligudem, West Godavari District, Andhra Pradesh - 534101, along the NH-16 highway, approximately 5 km from Tadepalligudem Railway Station.",
      category: "General",
      keywords: ["where", "location", "address", "railway station", "pedatadepalli", "tadepalligudem"]
    },
    {
      question: "What courses are offered at Sri Vasavi Engineering College?",
      answer: "The college offers B.Tech programs in CSE, CSE (AI&ML), CSE (Data Science), ECE, EEE, Mechanical, and Civil Engineering; M.Tech programs in CSE and VLSI; as well as 3-year Diploma programs.",
      category: "Courses",
      keywords: ["courses offered", "what courses", "programs", "branches", "departments available"]
    },
    {
      question: "Does the college provide hostel facility?",
      answer: "Yes, Sri Vasavi Engineering College provides separate modern hostels for Boys and Girls on campus with 24/7 security, Wi-Fi, purified water, nutritious food, and sports facilities.",
      category: "Facilities",
      keywords: ["hostel facility", "hostel available", "boys hostel", "girls hostel", "stay"]
    },
    {
      question: "What is the highest salary package in placements?",
      answer: "The highest placement package at Sri Vasavi Engineering College reached ₹14.0 LPA, with average packages around ₹4.5 LPA across reputed software and core recruiters.",
      category: "Placements",
      keywords: ["highest package", "highest salary", "average package", "placement packages"]
    },
    // Copy & Paste these objects into the `faqs` array inside seedData.js:

{
  question: "What is the mandatory attendance requirement to write semester exams?",
  answer: "Students must maintain a minimum of 75% aggregate attendance in all subjects. Attendance between 65% and 75% may be condoned on valid medical grounds upon payment of a condonation fee.",
  category: "Academic Rules",
  keywords: ["attendance", "percentage", "condonation", "minimum attendance", "shortage"]
},
{
  question: "What is the college dress code and uniform policy?",
  answer: "Students are required to wear the official college uniform on prescribed days (Mondays and Thursdays) and during formal events/lab sessions. Formal, decent attire is expected on non-uniform days.",
  category: "Campus Rules",
  keywords: ["dress code", "uniform", "clothes", "what to wear", "dress policy"]
},
{
  question: "How can students access campus Wi-Fi?",
  answer: "High-speed 1 Gbps Wi-Fi is available across campus and hostels. Students can register their devices at the Central IT Helpdesk using their college ID to receive login credentials.",
  category: "Facilities",
  keywords: ["wifi", "internet", "wi-fi access", "network", "login credentials"]
},
{
  question: "What are the hostel in-time and mess rules?",
  answer: "Hostel residents must return to the hostel by 6:30 PM. Mess timings are Breakfast: 7:30 AM - 8:45 AM, Lunch: 12:30 PM - 1:45 PM, Snacks: 5:00 PM - 6:00 PM, Dinner: 7:30 PM - 9:00 PM.",
  category: "Hostel Facilities",
  keywords: ["hostel curfew", "hostel timings", "mess timings", "in time", "food hours"]
},
{
  question: "Which towns are covered by the college bus transport?",
  answer: "College buses operate across Tadepalligudem, Tanuku, Bhimavaram, Eluru, Kovvur, Nidadavole, Ganapavaram, Jangareddygudem, and surrounding rural routes.",
  category: "Transport",
  keywords: ["bus routes", "bus stops", "tanuku", "bhimavaram", "eluru", "transport routes"]
},
{
  question: "What is the autonomous grading and SGPA/CGPA evaluation system?",
  answer: "Evaluation follows the 10-point Letter Grade System (O, A+, A, B+, B, C, F) as per UGC/JNTUK Autonomous guidelines. Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) are calculated at the end of each semester.",
  category: "Examinations",
  keywords: ["grading system", "cgpa", "sgpa", "marks", "grades", "evaluation"]
},
{
  question: "How can I apply for revaluation or recounting of semester exam papers?",
  answer: "Students can apply online through the Autonomous Examination Portal within 10 days of result declaration by paying the prescribed fee per subject.",
  category: "Examinations",
  keywords: ["revaluation", "recounting", "rechecking", "paper verification", "exam results"]
},
{
  question: "Are there student clubs, NSS, and cultural activities?",
  answer: "Yes! Sri Vasavi has active NSS units, Toastmasters Club, CodeChef/HackerRank coding clubs, SAE India Automobile Club, Fine Arts & Cultural Club, and Sports Association.",
  category: "Student Life",
  keywords: ["clubs", "nss", "activities", "cultural", "codechef", "sports club", "extracurricular"]
},
{
  question: "Does the college have an Innovation & Entrepreneurship Incubation Cell?",
  answer: "Yes, the Entrepreneurship Development Cell (EDC) & Institution's Innovation Council (IIC) support student startup ideas, patent filings, prototype funding, and hackathons.",
  category: "Research & Innovation",
  keywords: ["startup", "incubation", "edc", "innovation", "entrepreneurship", "patents", "hackathon"]
},


      {
        category: "Departments",
        question: "What departments are available in Sri Vasavi Engineering College?",
        answer:
          "Sri Vasavi Engineering College offers programs including Computer Science and Engineering (CSE), Computer Science and Technology (CST), CSE with Artificial Intelligence, CSE with Data Science, Artificial Intelligence and Machine Learning (AI & ML), Electronics and Communication Engineering (ECE), Electronics and Communication Technology (ECT), Electrical and Electronics Engineering (EEE), Mechanical Engineering, Civil Engineering, Basic Sciences and Humanities, and MBA."
      },
      {
        category: "Departments",
        question: "Does the college have a Computer Science and Engineering department?",
        answer:
          "Yes. Sri Vasavi Engineering College has a Computer Science and Engineering department offering B.Tech in Computer Science and Engineering."
      },
      {
        category: "Departments",
        question: "Does the college offer CSE with Artificial Intelligence?",
        answer:
          "Yes. The college offers B.Tech in Computer Science and Engineering with Artificial Intelligence."
      },
      {
        category: "Departments",
        question: "Does the college offer CSE with Data Science?",
        answer:
          "Yes. The college offers B.Tech in Computer Science and Engineering with Data Science."
      },
      {
        category: "Departments",
        question: "Does the college have an Artificial Intelligence and Machine Learning department?",
        answer:
          "Yes. Artificial Intelligence and Machine Learning is one of the academic programs offered by the college."
      },
      {
        category: "Departments",
        question: "Does the college have an ECE department?",
        answer:
          "Yes. The Electronics and Communication Engineering department is available at Sri Vasavi Engineering College."
      },
      {
        category: "Departments",
        question: "Does the college have an ECT department?",
        answer:
          "Yes. The college has an Electronics and Communication Technology department."
      },
      {
        category: "Departments",
        question: "Does the college have an EEE department?",
        answer:
          "Yes. The college has an Electrical and Electronics Engineering department."
      },
      {
        category: "Departments",
        question: "Does the college have a Mechanical Engineering department?",
        answer:
          "Yes. Sri Vasavi Engineering College has a Mechanical Engineering department."
      },
      {
        category: "Departments",
        question: "Does the college have a Civil Engineering department?",
        answer:
          "Yes. Sri Vasavi Engineering College has a Civil Engineering department."
      },
      {
        category: "Departments",
        question: "What postgraduate programs are available?",
        answer:
          "The college offers postgraduate programs in areas including Artificial Intelligence and Machine Learning, Embedded Systems and VLSI, Power Electronics and Power Systems, and Structural Engineering."
      },
      {
        category: "Departments",
        question: "Where can I find faculty information?",
        answer:
          "Faculty information can be found through the respective department information and the college faculty directory."
      },
      {
        category: "Departments",
        question: "What facilities are available in the departments?",
        answer:
          "The departments provide facilities such as laboratories, classrooms, faculty support, academic resources, and opportunities for technical activities and research."
      },
      {
        category: "Departments",
        question: "Which department is suitable for software-related careers?",
        answer:
          "Students interested in software and computing careers can explore CSE, CST, CSE with Artificial Intelligence, CSE with Data Science, and AI & ML programs."
      },
      {
        category: "Departments",
        question: "Which department is related to electronics?",
        answer:
          "Students interested in electronics and communication can explore Electronics and Communication Engineering and Electronics and Communication Technology."
      },
      {
        category: "Departments",
        question: "Which department is related to electrical engineering?",
        answer:
          "Electrical and Electronics Engineering (EEE) is the department related to electrical engineering."
      },
      {
        category: "Departments",
        question: "Which department is related to construction and infrastructure?",
        answer:
          "Civil Engineering is the department related to construction, infrastructure, structural engineering, and related areas."
      },
      {
        category: "Departments",
        question: "Which department is related to machines and manufacturing?",
        answer:
          "Mechanical Engineering is the department related to machines, manufacturing, mechanical systems, and related areas."
      }
  ]
};

const generateQuestionVariants = (sourceFaqs, targetCount) => {
  const requestFrames = [
    'Could you answer this question for',
    'Please answer this question for',
    'Could you explain this to',
    'Please clarify this for',
    'I need this information as',
    'I am asking as',
    'From the perspective of',
    'Help me understand this as',
    'Could you share the answer with',
    'I would like to ask this as'
  ];
  const audiences = [
    'a prospective student',
    'a current student',
    'a parent or guardian',
    'a postgraduate applicant',
    'a diploma applicant',
    'a campus visitor',
    'an engineering applicant',
    'a first-year student',
    'a final-year student',
    'a student comparing colleges'
  ];
  const situations = [
    'who is researching admissions',
    'who is exploring academic programs',
    'who is learning about campus facilities',
    'who is planning their studies',
    'who is checking student services',
    'who is learning about college life',
    'who is preparing to apply',
    'who is comparing engineering options',
    'who is looking for official college information',
    'who is planning a campus visit'
  ];
  const generatedFaqs = [];
  const questions = new Set(sourceFaqs.map(({ question }) => question));

  for (const requestFrame of requestFrames) {
    for (const audience of audiences) {
      for (const situation of situations) {
        for (const faq of sourceFaqs) {
          const question = `${requestFrame} ${audience} ${situation}: ${faq.question}`;
          if (questions.has(question)) continue;

          questions.add(question);
          generatedFaqs.push({ ...faq, question });
          if (generatedFaqs.length === targetCount) return generatedFaqs;
        }
      }
    }
  }

  throw new Error(`Could only generate ${generatedFaqs.length} of ${targetCount} FAQ questions.`);
};

seedKnowledgeBaseData.faqs.push(
  ...generateQuestionVariants([...seedKnowledgeBaseData.faqs], 10000)
);

const leadershipFaqs = [
  {
    question: "Who is the President of Sri Vasavi Engineering College?",
    answer: "Sri Grandhi Satyanarayana is the President of Sri Vasavi Engineering College. The college's official profile says he has nearly three decades of experience managing schools and colleges under GMR Educational Institutions and serves as Treasurer of the Andhra Pradesh Private Engineering Colleges Management Association (APPCMA).",
    category: "Leadership",
    keywords: ["president", "sri grandhi satyanarayana", "college leadership", "APPCMA"]
  },
  {
    question: "What is Sri Grandhi Satyanarayana's background?",
    answer: "Sri Grandhi Satyanarayana has nearly three decades of experience managing schools and colleges under GMR Educational Institutions in Andhra Pradesh. He is also Treasurer of APPCMA and works to improve access to quality education.",
    category: "Leadership",
    keywords: ["president profile", "sri grandhi satyanarayana", "GMR Educational Institutions", "APPCMA"]
  },
  {
    question: "Who was the Honorary President of Sri Vasavi Engineering College?",
    answer: "Late Sri Yerra Narayana Swamy, M.A., LL.B., former MLA of Tadepalligudem, served as the institution's Honorary President. The college credits his guidance and contributions with helping shape it into a model institution.",
    category: "Leadership",
    keywords: ["honorary president", "yerra narayana swamy", "former MLA", "institution history"]
  },
  {
    question: "Who is the Technical Director of Sri Vasavi Engineering College?",
    answer: "Sri Checka Apparao is the Technical Director of Sri Vasavi Engineering College. He took charge in 2016 and is involved in the college's day-to-day activities, policy changes, and institutional development.",
    category: "Leadership",
    keywords: ["technical director", "director", "checka apparao", "leadership"]
  },
  {
    question: "What are Technical Director Sri Checka Apparao's qualifications and experience?",
    answer: "Sri Checka Apparao holds a B.Tech in Computer Science and Systems Engineering from GITAM, Visakhapatnam, and a master's degree in Computer Science from the United States. The college profile lists eight years of U.S. IT experience in project management, architecture, systems administration, and HR, followed by nine years as an entrepreneur operating retail franchises.",
    category: "Leadership",
    keywords: ["checka apparao", "technical director qualifications", "GITAM", "computer science", "experience"]
  },
  {
    question: "How can I contact Technical Director Sri Checka Apparao?",
    answer: "Email checkaapparao@srivasaviengg.ac.in or call 08818-284355, extension 333. The Technical Director's office is in the Administrative Block.",
    category: "Leadership",
    keywords: ["checka apparao contact", "technical director email", "director phone", "extension 333"]
  },
  {
    question: "Who is the Principal of Sri Vasavi Engineering College?",
    answer: "Dr. Ch. Rambabu is the Principal of Sri Vasavi Engineering College.",
    category: "Leadership",
    keywords: ["principal", "dr ch rambabu", "college leadership"]
  },
  {
    question: "What are Principal Dr. Ch. Rambabu's qualifications and expertise?",
    answer: "Dr. Ch. Rambabu holds B.E., M.Tech., and Ph.D. qualifications. He earned his Ph.D. from JNTU Kakinada in power-systems optimization and security enhancement and completed the AICTE-QIP-PG program in Robotics and Artificial Intelligence at IIT Bhubaneswar. His research includes power systems, FACTS devices, optimization, and power quality.",
    category: "Leadership",
    keywords: ["principal qualifications", "dr ch rambabu", "PhD", "power systems", "IIT Bhubaneswar"]
  },
  {
    question: "What experience does Principal Dr. Ch. Rambabu have?",
    answer: "Dr. Ch. Rambabu has over two decades of experience in engineering education. Before becoming Principal, he served as a Professor, Head of the EEE Department, and Dean of Student Affairs. The college profile also notes his research publications and work organizing conferences, workshops, and faculty development programs.",
    category: "Leadership",
    keywords: ["principal experience", "dr ch rambabu", "EEE HOD", "Dean of Student Affairs"]
  },
  {
    question: "How can I contact Principal Dr. Ch. Rambabu?",
    answer: "Email principal@srivasaviengg.ac.in or call 08818-284355, extension 304. The Principal's office is in the Administrative Block.",
    category: "Leadership",
    keywords: ["principal contact", "dr ch rambabu email", "principal phone", "extension 304"]
  },
  {
    question: "Who are the Associate Deans at Sri Vasavi Engineering College?",
    answer: "The college lists six Associate Deans: Dr. Anilkumar Chappa for Academic Planning and Quality; Dr. M. Vishnuvardhan for Curriculum and Teaching-Learning; Dr. D. Ashok for Research, Publications and Innovation; Mr. N. Saidulu for Industry, Consultancy and IPR; Mr. P. Sita Rama Raju for Student Welfare and Discipline; and Dr. K. C. S. Vyasa Krishnaji for Student Development and Activities.",
    category: "Leadership",
    keywords: ["deans", "associate deans", "academic dean", "R&D dean", "student affairs dean"]
  },
  {
    question: "Who is the Associate Dean for Academic Planning and Quality?",
    answer: "Dr. Anilkumar Chappa is the Associate Dean for Academics (Academic Planning and Quality). He is associated with the Electrical and Electronics Engineering department and holds B.Tech., M.Tech., and Ph.D. qualifications. Email: ad.ac.academicquality@srivasaviengg.ac.in.",
    category: "Leadership",
    keywords: ["dean academics", "academic planning", "academic quality", "dr anilkumar chappa"]
  },
  {
    question: "Who is the Associate Dean for Curriculum and Teaching-Learning?",
    answer: "Dr. M. Vishnuvardhan is the Associate Dean for Academics (Curriculum and Teaching-Learning). He is associated with the Artificial Intelligence and Machine Learning department and holds B.Tech., M.Tech., and Ph.D. qualifications. Email: ad.ac.curriculum@srivasaviengg.ac.in.",
    category: "Leadership",
    keywords: ["dean curriculum", "teaching learning", "dr m vishnuvardhan", "academics"]
  },
  {
    question: "Who is the Associate Dean for Research, Publications and Innovation?",
    answer: "Dr. D. Ashok is the Associate Dean for R&D (Research, Publications and Innovation). He is associated with the Mechanical Engineering department and holds B.Tech., M.Tech., and Ph.D. qualifications. Email: ad.rd.research@srivasaviengg.ac.in.",
    category: "Leadership",
    keywords: ["dean research", "publications", "innovation", "dr d ashok", "R&D"]
  },
  {
    question: "Who is the Associate Dean for Industry, Consultancy and IPR?",
    answer: "Mr. N. Saidulu is the Associate Dean for R&D (Industry, Consultancy and IPR). He is associated with the Electronics and Communication Engineering department and holds B.Tech. and M.Tech. qualifications. Email: ad.rd.industryipr@srivasaviengg.ac.in.",
    category: "Leadership",
    keywords: ["dean industry", "consultancy", "IPR", "mr n saidulu", "R&D"]
  },
  {
    question: "Who is the Associate Dean for Student Welfare and Discipline?",
    answer: "Mr. P. Sita Rama Raju is the Associate Dean for Student Affairs (Student Welfare and Discipline). He is associated with Basic Sciences and Humanities and holds M.Sc. and M.Phil. qualifications, with a Ph.D. listed on the college page. Email: ad.sa.studentwelfare@srivasaviengg.ac.in.",
    category: "Leadership",
    keywords: ["dean student welfare", "student discipline", "mr p sita rama raju", "student affairs"]
  },
  {
    question: "Who is the Associate Dean for Student Development and Activities?",
    answer: "Dr. K. C. S. Vyasa Krishnaji is the Associate Dean for Student Affairs (Student Development and Activities). He is associated with the Mechanical Engineering department and holds B.Tech., M.Tech., and Ph.D. qualifications. Email: ad.sa.studentactivities@srivasaviengg.ac.in.",
    category: "Leadership",
    keywords: ["dean student development", "student activities", "dr k c s vyasa krishnaji", "student affairs"]
  },
  {
    question: "Who is the Chairperson of the Sri Vasavi Engineering College Board of Governors?",
    answer: "The college's Board of Governance page lists Sri O. P. Goenka, Technical Director of FFF Ltd., Tadepalligudem, as Chairperson of the Board of Governors.",
    category: "Leadership",
    keywords: ["board of governors", "chairperson", "sri o p goenka", "governance"]
  },
  {
    question: "Who is the Secretary and Correspondent of Sri Vasavi Engineering College?",
    answer: "Sri Ch. V. V. Subba Rao is the Secretary and Correspondent of Sri Vasavi Engineering College. The college profile describes his leadership in institutional development, academic excellence, modern teaching methods, industry collaboration, and research.",
    category: "Leadership",
    keywords: ["secretary", "correspondent", "sri ch v v subba rao", "society leadership"]
  },
  {
    question: "How can I contact Sri Vasavi Engineering College's Principal's office?",
    answer: "Contact the Principal's office at principal@srivasaviengg.ac.in or 08818-284355, extension 304. The office is in the Administrative Block at Pedatadepalli, Tadepalligudem.",
    category: "Leadership",
    keywords: ["principal office", "college administration contact", "principal email", "extension 304"]
  }
];

seedKnowledgeBaseData.faqs.push(...leadershipFaqs);

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Seeding Sri Vasavi Engineering College database knowledge base...');
    
    // Admin user
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        name: 'College Admin',
        role: 'admin',
        email: 'admin@srivasaviengg.ac.in'
      });
      console.log('[Seed] Admin user created (username: admin, password: admin123)');
    }

    // Seed collections if empty
    if ((await CollegeInfo.countDocuments()) === 0) {
      await CollegeInfo.insertMany(seedKnowledgeBaseData.collegeInfo);
      console.log('[Seed] CollegeInfo seeded.');
    }
    if ((await Department.countDocuments()) === 0) {
      await Department.insertMany(seedKnowledgeBaseData.departments);
      console.log('[Seed] Departments seeded.');
    }
    const eceDepartment = seedKnowledgeBaseData.departments.find(({ code }) => code === 'ECE');
    if (eceDepartment) {
      await Department.updateOne(
        { code: 'ECE' },
        { $set: { hodName: eceDepartment.hodName } }
      );
      console.log('[Seed] ECE HOD synchronized.');
    }
    const dataScienceDepartment = seedKnowledgeBaseData.departments.find(({ code }) => code === 'CSDS');
    if (dataScienceDepartment) {
      await Department.updateOne(
        { name: dataScienceDepartment.name },
        { $set: { code: dataScienceDepartment.code, hodName: dataScienceDepartment.hodName } }
      );
      console.log('[Seed] Data Science department synchronized.');
    }
    const basicSciencesDepartment = seedKnowledgeBaseData.departments.find(({ code }) => code === 'BSH');
    if (basicSciencesDepartment) {
      await Department.updateOne(
        { code: basicSciencesDepartment.code },
        { $set: { hodName: basicSciencesDepartment.hodName } }
      );
      console.log('[Seed] BSH HOD synchronized.');
    }
    if ((await Course.countDocuments()) === 0) {
      await Course.insertMany(seedKnowledgeBaseData.courses);
      console.log('[Seed] Courses seeded.');
    }
    if ((await Faculty.countDocuments()) === 0) {
      await Faculty.insertMany(seedKnowledgeBaseData.faculty);
      console.log('[Seed] Faculty seeded.');
    }
    if ((await Admission.countDocuments()) === 0) {
      await Admission.insertMany(seedKnowledgeBaseData.admissions);
      console.log('[Seed] Admissions seeded.');
    }
    await Placement.bulkWrite(seedKnowledgeBaseData.placements.map(({ placementOfficer, ...placement }) => ({
      updateOne: {
        filter: { academicYear: placement.academicYear },
        update: {
          $set: { placementOfficer },
          $setOnInsert: placement
        },
        upsert: true
      }
    })));
    console.log('[Seed] Placements synchronized.');
    if ((await Facility.countDocuments()) === 0) {
      await Facility.insertMany(seedKnowledgeBaseData.facilities);
      console.log('[Seed] Facilities seeded.');
    }
    const centralLibrary = seedKnowledgeBaseData.facilities.find(({ facilityName }) => facilityName === 'Central Library');
    if (centralLibrary) {
      await Facility.updateOne(
        { facilityName: centralLibrary.facilityName },
        { $set: { inchargeName: centralLibrary.inchargeName } }
      );
      console.log('[Seed] Central Library in-charge synchronized.');
    }
    if ((await Scholarship.countDocuments()) === 0) {
      await Scholarship.insertMany(seedKnowledgeBaseData.scholarships);
      console.log('[Seed] Scholarships seeded.');
    }
    if ((await Notification.countDocuments()) === 0) {
      await Notification.insertMany(seedKnowledgeBaseData.notifications);
      console.log('[Seed] Notifications seeded.');
    }
    const faqOperations = seedKnowledgeBaseData.faqs.map((faq) => ({
      updateOne: {
        filter: { question: faq.question },
        update: { $setOnInsert: faq },
        upsert: true
      }
    }));
    for (let index = 0; index < faqOperations.length; index += 500) {
      await FAQ.bulkWrite(faqOperations.slice(index, index + 500));
    }
    console.log(`[Seed] ${seedKnowledgeBaseData.faqs.length} FAQs synchronized.`);

    console.log('[Seed] Sri Vasavi Engineering College Knowledge Base initialization complete.');
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
};

// Standalone execution script
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sri_vasavi_college_db')
    .then(async () => {
      await seedDatabase();
      mongoose.disconnect();
      console.log('[Seed] Process finished.');
    })
    .catch((err) => console.error('[Seed Conn Error]', err));
}
