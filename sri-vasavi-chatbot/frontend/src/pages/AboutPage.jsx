import React, { useEffect, useState } from 'react';
import { fetchCollegeOverview } from '../services/api';
import { Award, Compass, Target, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';

export const AboutPage = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollegeOverview()
      .then(res => setOverviewData(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Award className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">About Sri Vasavi Engineering College</h1>
        </div>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed">
          Sri Vasavi Engineering College (Autonomous), Pedatadepalli, Tadepalligudem, AP — Premier Engineering Institute dedicated to technical excellence, research, and holistic development.
        </p>
      </div>

      {/* Grid: Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-500 font-heading font-bold text-lg">
            <Compass className="w-6 h-6" />
            <h2>College Vision</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            To be a premier technological institute striving for excellence with global perspective and commitment to nation building.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-heading font-bold text-lg">
            <Target className="w-6 h-6" />
            <h2>College Mission</h2>
          </div>
          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>To impart quality technical education by providing conducive learning ecosystem.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>To encourage research, innovation and entrepreneurship for societal empowerment.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>To instill ethical values, leadership qualities, and professional skills.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* College Info Cards */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Institutional Accreditation & Status</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block font-medium">Autonomy Status</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm">Conferred by UGC</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block font-medium">Affiliation</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm">JNTUK, Kakinada (Permanently)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block font-medium">NAAC Rating</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">'A' Grade Accredited</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
