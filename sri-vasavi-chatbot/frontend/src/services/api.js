import axios from 'axios';

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('svec_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const askChatbot = async (question, sessionId) => {
  try {
    const res = await axios.post(`${API_BASE}/chat/ask`, { question, sessionId });
    return res.data;
  } catch (err) {
    return {
      success: false,
      answer: "Sorry, I couldn't find this information in the college database. Please contact the college administration for accurate information.",
      found: false
    };
  }
};

export const fetchCollegeOverview = async () => {
  const res = await axios.get(`${API_BASE}/info/overview`);
  return res.data;
};

export const fetchDepartments = async () => {
  const res = await axios.get(`${API_BASE}/info/departments`);
  return res.data;
};

export const fetchCourses = async () => {
  const res = await axios.get(`${API_BASE}/info/courses`);
  return res.data;
};

export const fetchFaculty = async () => {
  const res = await axios.get(`${API_BASE}/info/faculty`);
  return res.data;
};

export const fetchAdmissions = async () => {
  const res = await axios.get(`${API_BASE}/info/admissions`);
  return res.data;
};

export const fetchPlacements = async () => {
  const res = await axios.get(`${API_BASE}/info/placements`);
  return res.data;
};

export const fetchFacilities = async () => {
  const res = await axios.get(`${API_BASE}/info/facilities`);
  return res.data;
};

export const fetchScholarships = async () => {
  const res = await axios.get(`${API_BASE}/info/scholarships`);
  return res.data;
};

export const fetchNotifications = async () => {
  const res = await axios.get(`${API_BASE}/info/notifications`);
  return res.data;
};

export const fetchFAQs = async () => {
  const res = await axios.get(`${API_BASE}/info/faqs`);
  return res.data;
};

export const sendFeedback = async (feedbackData) => {
  const res = await axios.post(`${API_BASE}/feedback/submit`, feedbackData);
  return res.data;
};

export const adminLogin = async (username, password) => {
  const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
  return res.data;
};

export const fetchAdminStats = async () => {
  const res = await axios.get(`${API_BASE}/admin/stats`, { headers: getAuthHeaders() });
  return res.data;
};

export const adminCreateItem = async (category, payload) => {
  const res = await axios.post(`${API_BASE}/admin/manage/${category}`, payload, { headers: getAuthHeaders() });
  return res.data;
};

export const adminDeleteItem = async (category, id) => {
  const res = await axios.delete(`${API_BASE}/admin/manage/${category}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};
