import {
  CollegeInfo, Department, Course, Faculty, Admission, Placement,
  Facility, Scholarship, Notification, FAQ, knowledgeModels
} from '../models/index.js';
import { isMongoConnected } from '../config/db.js';
import { getMemoryCollection } from './memoryStore.js';

const FALLBACK_RESPONSE = "Sorry, I couldn't find this information in the college database. Please contact the college administration for accurate information.";

// Common stop words to exclude from keyword extraction
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'with', 'about', 'against', 'between',
  'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'from', 'up', 'down', 'of', 'off', 'over', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
  'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'what', 'which',
  'who', 'whom', 'tell', 'me', 'give', 'detail', 'details', 'information',
  'please', 'show', 'list', 'know', 'want', 'i', 'my', 'you', 'your'
]);

// Query normalization & keyword expansion
const preprocessQuery = (query) => {
  const clean = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = clean.split(/\s+/).filter(t => t.length > 1 && !STOP_WORDS.has(t));
  
  // Synonyms map
  const expansions = [];
  tokens.forEach(t => {
    expansions.push(t);
    if (t === 'eamcet') expansions.push('eapcet');
    if (t === 'eapcet') expansions.push('eamcet');
    if (t === 'hostels') expansions.push('hostel');
    if (t === 'fees' || t === 'cost' || t === 'price') expansions.push('fee');
    if (t === 'faculty' || t === 'professors' || t === 'teachers') expansions.push('professors');
    if (t === 'placements' || t === 'jobs' || t === 'package' || t === 'salary') expansions.push('placement');
    if (t === 'btech' || t === 'b.tech') expansions.push('b.tech');
    if (t === 'mtech' || t === 'm.tech') expansions.push('m.tech');
    if (t === 'location' || t === 'address' || t === 'where') expansions.push('pedatadepalli');
  });

  return Array.from(new Set(expansions));
};

// Compute similarity score between query tokens and document content/keywords
const computeScore = (queryTokens, fullText, itemKeywords = [], title = '') => {
  let score = 0;
  const lowerText = (fullText + ' ' + title + ' ' + itemKeywords.join(' ')).toLowerCase();

  queryTokens.forEach(token => {
    if (itemKeywords.some(k => k.toLowerCase() === token)) {
      score += 15; // Exact keyword match
    }
    if (title.toLowerCase().includes(token)) {
      score += 10; // Title match
    }
    if (lowerText.includes(token)) {
      score += 5; // Text content match
    }
  });

  return score;
};

// Fetch raw data either from MongoDB or in-memory seed dataset
const fetchKnowledgeBase = async () => {
  if (isMongoConnected) {
    try {
      const [
        collegeInfo, departments, courses, faculty,
        admissions, placements, facilities, scholarships,
        notifications, faqs
      ] = await Promise.all([
        CollegeInfo.find({}),
        Department.find({}),
        Course.find({}),
        Faculty.find({}),
        Admission.find({}),
        Placement.find({}),
        Facility.find({}),
        Scholarship.find({}),
        Notification.find({}),
        FAQ.find({})
      ]);

      return {
        collegeInfo, departments, courses, faculty,
        admissions, placements, facilities, scholarships,
        notifications, faqs
      };
    } catch (err) {
      console.warn('[NLP Engine] Error querying MongoDB, switching to seed memory store:', err.message);
    }
  }

  // Fallback in-memory dataset
  return Object.fromEntries(
    Object.keys(knowledgeModels).map(name => [name, getMemoryCollection(name)])
  );
};

export const processUserQuery = async (queryText) => {
  if (!queryText || queryText.trim().length === 0) {
    return {
      answer: "Please enter a valid question about Sri Vasavi Engineering College.",
      found: false,
      score: 0,
      category: 'general'
    };
  }

  const queryTokens = preprocessQuery(queryText);
  const rawQuery = queryText.toLowerCase().trim();

  // Greeting checks
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|namaste)/.test(rawQuery)) {
    return {
      answer: "Hello! Welcome to Sri Vasavi Engineering College (Autonomous), Tadepalligudem. How can I help you today? You can ask me about Courses, Admissions, Departments, Placements, Fees, Hostels, or Contact Information.",
      found: true,
      score: 100,
      category: 'greeting',
      suggestedQuestions: [
        "What courses are available?",
        "What is the admission process?",
        "Tell me about CSE department.",
        "What are the placement details?",
        "Where is the college located?"
      ]
    };
  }

  const kb = await fetchKnowledgeBase();
  let bestMatch = null;
  let maxScore = 0;
  let categoryMatched = 'general';

  // 1. Check FAQs first
  kb.faqs.forEach(faq => {
    const score = computeScore(queryTokens, faq.question + ' ' + faq.answer, faq.keywords || [], faq.question);
    if (score > maxScore) {
      maxScore = score;
      bestMatch = {
        type: 'faq',
        data: faq,
        formattedAnswer: faq.answer
      };
      categoryMatched = faq.category || 'FAQ';
    }
  });

  // 2. Check Departments
  kb.departments.forEach(dept => {
    const text = `${dept.name} (${dept.code}) HOD: ${dept.hodName}. Intake: ${dept.intakeCapacity}. ${dept.description} Labs: ${dept.laboratories.join(', ')}. Highlights: ${dept.keyHighlights.join(', ')}`;
    const score = computeScore(queryTokens, text, dept.keywords || [], dept.name + ' ' + dept.code);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${dept.name} (${dept.code}) Department**\n\n- **HOD:** ${dept.hodName} (${dept.hodEmail})\n- **Annual Intake:** ${dept.intakeCapacity} seats\n- **Overview:** ${dept.description}\n- **Key Laboratories:** ${dept.laboratories.join(', ')}\n- **Highlights:** ${dept.keyHighlights.join('; ')}\n- **Contact Email:** ${dept.contactEmail || dept.hodEmail}`;
      bestMatch = { type: 'department', data: dept, formattedAnswer: formatted };
      categoryMatched = 'Department Information';
    }
  });

  // 3. Check Courses
  kb.courses.forEach(c => {
    const text = `${c.courseName} Program: ${c.programType} Duration: ${c.durationYears} years Intake: ${c.intakeSeats} seats. Eligibility: ${c.eligibility} ${c.description}`;
    const score = computeScore(queryTokens, text, c.keywords || [], c.courseName);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${c.courseName}**\n\n- **Program Type:** ${c.programType}\n- **Duration:** ${c.durationYears} Years\n- **Seat Intake:** ${c.intakeSeats} Seats\n- **Eligibility Criteria:** ${c.eligibility}\n- **Details:** ${c.description}`;
      bestMatch = { type: 'course', data: c, formattedAnswer: formatted };
      categoryMatched = 'Courses & Programs';
    }
  });

  // 4. Check Admissions
  kb.admissions.forEach(adm => {
    const text = `${adm.title} Program: ${adm.program} Eligibility: ${adm.eligibilityCriteria} Procedure: ${adm.admissionProcedure} Fees: ${adm.feeDetails}`;
    const score = computeScore(queryTokens, text, adm.keywords || [], adm.title);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${adm.title} (${adm.program})**\n\n- **Eligibility Criteria:** ${adm.eligibilityCriteria}\n- **Admission Procedure:** ${adm.admissionProcedure}\n- **Fee Details:** ${adm.feeDetails}\n- **Contact Person:** ${adm.contactPerson}`;
      bestMatch = { type: 'admission', data: adm, formattedAnswer: formatted };
      categoryMatched = 'Admissions & Fee Structure';
    }
  });

  // 5. Check Placements
  kb.placements.forEach(p => {
    const text = `${p.academicYear} ${p.overview} Recruiters: ${p.topRecruiters.join(', ')} Training: ${p.trainingActivities} Internships: ${p.internshipInfo}`;
    const score = computeScore(queryTokens, text, p.keywords || [], p.academicYear);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**Placements & Training - ${p.academicYear}**\n\n- **Overview:** ${p.overview}\n- **Top Recruiters:** ${p.topRecruiters.join(', ')}\n- **Training & Skill Development:** ${p.trainingActivities}\n- **Internship Assistance:** ${p.internshipInfo}\n- **Placement Officer:** ${p.placementOfficer} (${p.contactEmail})`;
      bestMatch = { type: 'placement', data: p, formattedAnswer: formatted };
      categoryMatched = 'Placements & Careers';
    }
  });

  // 6. Check Facilities
  kb.facilities.forEach(fac => {
    const text = `${fac.facilityName} Category: ${fac.category} Description: ${fac.description} Details: ${fac.timingOrDetails}`;
    const score = computeScore(queryTokens, text, fac.keywords || [], fac.facilityName);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${fac.facilityName} (${fac.category})**\n\n${fac.description}\n\n- **Details / Timings:** ${fac.timingOrDetails}\n- **Incharge:** ${fac.inchargeName || 'Facility Office'}`;
      bestMatch = { type: 'facility', data: fac, formattedAnswer: formatted };
      categoryMatched = 'Campus Facilities';
    }
  });

  // 7. Check Scholarships
  kb.scholarships.forEach(s => {
    const text = `${s.title} Provider: ${s.provider} Eligibility: ${s.eligibility} Details: ${s.details} Process: ${s.applicationProcess}`;
    const score = computeScore(queryTokens, text, s.keywords || [], s.title);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${s.title}**\n\n- **Provider:** ${s.provider}\n- **Eligibility:** ${s.eligibility}\n- **Scholarship Benefit:** ${s.details}\n- **Application Process:** ${s.applicationProcess}`;
      bestMatch = { type: 'scholarship', data: s, formattedAnswer: formatted };
      categoryMatched = 'Scholarships';
    }
  });

  // 8. Check Notifications
  kb.notifications.forEach(n => {
    const text = `${n.title} Category: ${n.category} Content: ${n.content}`;
    const score = computeScore(queryTokens, text, n.keywords || [], n.title);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**Notification: ${n.title}** (${n.category})\n\n${n.content}\n\n*Published Date: ${new Date(n.publishDate).toLocaleDateString()}*`;
      bestMatch = { type: 'notification', data: n, formattedAnswer: formatted };
      categoryMatched = 'Notifications & Announcements';
    }
  });

  // 9. Check College Info (Intro, Contact, Vision, etc.)
  kb.collegeInfo.forEach(info => {
    const text = `${info.title} Category: ${info.category} Content: ${info.content}`;
    const score = computeScore(queryTokens, text, info.keywords || [], info.title);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${info.title}**\n\n${info.content}`;
      bestMatch = { type: 'collegeInfo', data: info, formattedAnswer: formatted };
      categoryMatched = info.category;
    }
  });

  // 10. Check Faculty
  kb.faculty.forEach(f => {
    const text = `${f.name} Department: ${f.departmentCode} Designation: ${f.designation} Qualification: ${f.qualification} Specialization: ${f.specialization}`;
    const score = computeScore(queryTokens, text, f.keywords || [], f.name);
    if (score > maxScore) {
      maxScore = score;
      const formatted = `**${f.name}**\n\n- **Department:** ${f.departmentCode}\n- **Designation:** ${f.designation}\n- **Qualification:** ${f.qualification}\n- **Specialization:** ${f.specialization}\n- **Experience:** ${f.experienceYears || 'N/A'} Years\n- **Email:** ${f.email || 'N/A'}`;
      bestMatch = { type: 'faculty', data: f, formattedAnswer: formatted };
      categoryMatched = 'Faculty Information';
    }
  });

  // Score threshold check to avoid hallucinatory or irrelevant matches
  const MIN_SCORE_THRESHOLD = 8;

  if (bestMatch && maxScore >= MIN_SCORE_THRESHOLD) {
    return {
      answer: bestMatch.formattedAnswer,
      found: true,
      score: maxScore,
      category: categoryMatched,
      matchedTitle: bestMatch.data.title || bestMatch.data.name || bestMatch.data.courseName || bestMatch.data.facilityName || bestMatch.data.question
    };
  }

  // Strict Fallback required by prompt
  return {
    answer: FALLBACK_RESPONSE,
    found: false,
    score: maxScore,
    category: 'fallback'
  };
};
