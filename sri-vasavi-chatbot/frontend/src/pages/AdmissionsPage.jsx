import React, { useEffect, useState } from 'react';
import { fetchAdmissions, fetchCourses } from '../services/api';
import { GraduationCap, CheckCircle, FileText, IndianRupee, HelpCircle } from 'lucide-react';

export const AdmissionsPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchAdmissions().then(res => setAdmissions(res.data || [])).catch(console.error);
    fetchCourses().then(res => setCourses(res.data || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <GraduationCap className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Admissions & Eligibility</h1>
        </div>
        <p className="text-blue-100 text-sm max-w-3xl">
          Complete guidelines for Category-A (AP EAPCET Convener) and Category-B (Management Quota) admissions.
        </p>
      </div>

      {/* Admission Guidelines */}
      <div className="space-y-6">
        {admissions.map((adm, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {adm.title}
              </h2>
              <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                {adm.program}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Eligibility Criteria
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  {adm.eligibilityCriteria}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <FileText className="w-4 h-4 text-blue-500" /> Admission Procedure
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 whitespace-pre-wrap">
                  {adm.admissionProcedure}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <div>
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4 text-amber-600" /> Fee Structure
                </span>
                <p className="text-slate-700 dark:text-slate-300">{adm.feeDetails}</p>
              </div>
              {adm.contactPerson && (
                <div className="text-slate-500 text-[11px] whitespace-nowrap bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800">
                  Contact: {adm.contactPerson}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Available Courses Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">Available Programs & Seat Intake</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-heading">
              <tr>
                <th className="p-3">Program / Degree</th>
                <th className="p-3">Department</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Approved Seats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {courses.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{c.courseName}</td>
                  <td className="p-3"><span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono font-bold">{c.departmentCode}</span></td>
                  <td className="p-3">{c.durationYears} Years</td>
                  <td className="p-3 font-bold text-amber-600">{c.intakeSeats} Seats</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;
