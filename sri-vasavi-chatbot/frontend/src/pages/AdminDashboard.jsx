import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAdminStats, adminCreateItem, adminDeleteItem, fetchDepartments, fetchCourses, fetchNotifications, fetchFAQs } from '../services/api';
import { Building2, GraduationCap, Users, Bell, MessageSquare, ThumbsUp, Plus, Trash2, ShieldCheck, Upload, Check, AlertCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('department');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // New Item Form State
  const [formData, setFormData] = useState({
    name: '', code: '', description: '', hodName: '', intakeCapacity: 60,
    title: '', question: '', answer: '', content: '', category: 'General',
    keywords: ''
  });

  const loadCategoryData = async (category) => {
    setLoading(true);
    try {
      if (category === 'department') {
        const res = await fetchDepartments();
        setItems(res.data || []);
      } else if (category === 'course') {
        const res = await fetchCourses();
        setItems(res.data || []);
      } else if (category === 'notification') {
        const res = await fetchNotifications();
        setItems(res.data || []);
      } else if (category === 'faq') {
        const res = await fetchFAQs();
        setItems(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats().then(res => setStats(res.stats)).catch(console.error);
    loadCategoryData(activeTab);
  }, [activeTab]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    try {
      const payload = { ...formData };
      if (formData.keywords) {
        payload.keywords = formData.keywords.split(',').map(k => k.trim());
      }
      const res = await adminCreateItem(activeTab, payload);
      if (res.success) {
        setStatusMsg('New item created successfully!');
        setFormData({
          name: '', code: '', description: '', hodName: '', intakeCapacity: 60,
          title: '', question: '', answer: '', content: '', category: 'General',
          keywords: ''
        });
        loadCategoryData(activeTab);
      }
    } catch (err) {
      setStatusMsg('Error creating item: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await adminDeleteItem(activeTab, id);
        loadCategoryData(activeTab);
      } catch (err) {
        alert("Error deleting item");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Authorized Admin Management Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold font-heading">Welcome, {user?.name || 'Administrator'}</h1>
          <p className="text-xs text-blue-200">Manage Sri Vasavi College database records, chatbot data, & statistics.</p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition"
        >
          Logout Admin
        </button>
      </div>

      {/* Stats Cards Row */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
              <span className="text-xs font-medium text-slate-500">Total Queries</span>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
              {stats.totalQueries}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-amber-500">
              <span className="text-xs font-medium text-slate-500">Departments</span>
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
              {stats.totalDepartments}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-indigo-500">
              <span className="text-xs font-medium text-slate-500">Active Courses</span>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
              {stats.totalCourses}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-green-500">
              <span className="text-xs font-medium text-slate-500">Satisfaction</span>
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
              {stats.satisfactionRate}%
            </div>
          </div>
        </div>
      )}

      {/* CRUD Management Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
        {/* Category Tabs */}
        <div className="flex space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: 'department', label: 'Departments' },
            { id: 'course', label: 'Courses' },
            { id: 'notification', label: 'Notifications' },
            { id: 'faq', label: 'FAQs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Form to Add New Record */}
        <form onSubmit={handleCreate} className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-blue-600" /> Add New {activeTab.toUpperCase()} Record
          </h3>

          {activeTab === 'department' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text" placeholder="Department Name (e.g. Mechanical Engg)"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                required className="p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
              <input
                type="text" placeholder="Code (e.g. ME)"
                value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})}
                required className="p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
              <input
                type="text" placeholder="HOD Name"
                value={formData.hodName} onChange={e => setFormData({...formData, hodName: e.target.value})}
                required className="p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
              <input
                type="number" placeholder="Intake Capacity (e.g. 120)"
                value={formData.intakeCapacity} onChange={e => setFormData({...formData, intakeCapacity: e.target.value})}
                required className="p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
              <textarea
                placeholder="Department Description..."
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                required className="sm:col-span-2 p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
          )}

          {activeTab === 'notification' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text" placeholder="Notification Title"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                required className="sm:col-span-2 p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
              <textarea
                placeholder="Notification Content..."
                value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
                required className="sm:col-span-2 p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <input
                type="text" placeholder="Frequently Asked Question"
                value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})}
                required className="w-full p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
              <textarea
                placeholder="Official Answer..."
                value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})}
                required className="w-full p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <input
              type="text" placeholder="Keywords (comma separated: cse, coding, hod)"
              value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})}
              className="flex-1 mr-3 p-2.5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-700"
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">
              Save Record
            </button>
          </div>
        </form>

        {/* Records Listing */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Current {activeTab.toUpperCase()} Records ({items.length})
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item, idx) => (
              <div key={item._id || idx} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {item.name || item.title || item.question || item.courseName}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {item.code || item.category || item.programType || ''}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
