import React, { useEffect, useState } from 'react';
import { fetchPlacements } from '../services/api';
import { Briefcase, Award, TrendingUp, Building, CheckCircle2, Mail, User } from 'lucide-react';

export const PlacementsPage = () => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    fetchPlacements().then(res => setPlacements(res.data || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Briefcase className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Training & Placement Cell</h1>
        </div>
        <p className="text-blue-100 text-sm max-w-3xl">
          Empowering Sri Vasavi graduates with industry certifications, soft skills, aptitude training, and corporate placement drives.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">₹14.0 LPA</div>
            <div className="text-xs text-slate-500">Highest Salary Offered</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">₹4.5 LPA</div>
            <div className="text-xs text-slate-500">Average Salary Package</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950 text-green-600 flex items-center justify-center font-bold">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">50+</div>
            <div className="text-xs text-slate-500">Annual Recruiting Companies</div>
          </div>
        </div>
      </div>

      {/* Placement Details */}
      {placements.map((p, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">{p.academicYear}</h2>
            <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
              Officer: {p.placementOfficer}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {p.overview}
          </p>

          {/* Top Recruiters Badges */}
          {p.topRecruiters && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white block uppercase tracking-wider">
                Top Recruiters & Hiring Partners
              </span>
              <div className="flex flex-wrap gap-2">
                {p.topRecruiters.map((rec, rIdx) => (
                  <span
                    key={rIdx}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Training & Internships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Training Activities</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{p.trainingActivities}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Internship Assistance</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{p.internshipInfo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacementsPage;
