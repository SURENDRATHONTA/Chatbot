import React from 'react';
import ChatWindow from '../components/ChatWindow';
import { Sparkles, GraduationCap, Building2, Briefcase, BookOpen, Award } from 'lucide-react';

export const HomePage = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sri Vasavi Engineering College (Autonomous)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight">
            AI-Powered College Information Chatbot
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Instant natural-language answers about B.Tech/M.Tech Courses, Admissions, Departments, Placements, Fee Structure, Hostels, and Campus Facilities.
          </p>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-center">
          <div className="bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <div className="text-xl sm:text-2xl font-bold font-heading text-amber-400">2001</div>
            <div className="text-[11px] text-blue-200">Established Year</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <div className="text-xl sm:text-2xl font-bold font-heading text-amber-400">NAAC 'A'</div>
            <div className="text-[11px] text-blue-200">Accredited Grade</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <div className="text-xl sm:text-2xl font-bold font-heading text-amber-400">14.0 LPA</div>
            <div className="text-[11px] text-blue-200">Highest Salary Package</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            <div className="text-xl sm:text-2xl font-bold font-heading text-amber-400">80%+</div>
            <div className="text-[11px] text-blue-200">Placement Assistance</div>
          </div>
        </div>
      </div>

      {/* Embedded Main Chatbot Interface */}
      <ChatWindow />
    </div>
  );
};

export default HomePage;
