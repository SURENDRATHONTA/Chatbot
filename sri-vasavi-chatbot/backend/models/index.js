import mongoose from 'mongoose';

const flexibleSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true,
  minimize: false
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, default: 'College Admin' },
  email: { type: String, default: '' },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

const model = (name, schema = flexibleSchema) =>
  mongoose.models[name] || mongoose.model(name, schema);

export const CollegeInfo = model('CollegeInfo');
export const Department = model('Department');
export const Course = model('Course');
export const Faculty = model('Faculty');
export const Admission = model('Admission');
export const Placement = model('Placement');
export const Facility = model('Facility');
export const Scholarship = model('Scholarship');
export const Notification = model('Notification');
export const FAQ = model('FAQ');
export const User = model('User', userSchema);
export const ChatLog = model('ChatLog');
export const Feedback = model('Feedback');

export const knowledgeModels = {
  collegeInfo: CollegeInfo,
  departments: Department,
  courses: Course,
  faculty: Faculty,
  admissions: Admission,
  placements: Placement,
  facilities: Facility,
  scholarships: Scholarship,
  notifications: Notification,
  faqs: FAQ
};

export const adminModels = {
  department: Department,
  course: Course,
  notification: Notification,
  faq: FAQ
};
