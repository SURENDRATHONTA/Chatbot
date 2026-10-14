import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../services/api';
import { Building2, User, Mail, Users, FlaskConical, CheckCircle2 } from 'lucide-react';

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments()
      .then(res => setDepartments(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Building2 className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Academic Departments</h1>
        </div>
        <p className="text-blue-100 text-sm max-w-3xl">
          Explore B.Tech and M.Tech departments equipped with high-tech laboratories, NBA accreditation, and expert faculty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.code || dept._id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-md">
                  {dept.code}
                </span>
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1">
                  {dept.name}
                </h2>
              </div>
              <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold border border-blue-200 dark:border-blue-800">
                Intake: {dept.intakeCapacity} Seats
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {dept.description}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="font-semibold">HOD:</span>
                <span>{dept.hodName}</span>
              </div>
              {dept.hodEmail && (
                <div className="flex items-center space-x-2 text-slate-500">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{dept.hodEmail}</span>
                </div>
              )}
            </div>

            {dept.laboratories && dept.laboratories.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider flex items-center gap-1">
                  <FlaskConical className="w-3.5 h-3.5 text-blue-500" /> Key Laboratories
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dept.laboratories.map((lab, lIdx) => (
                    <span key={lIdx} className="text-[10px] bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                      {lab}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
