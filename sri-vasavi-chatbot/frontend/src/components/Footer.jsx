import React from 'react';
import { MapPin, Phone, Mail, Globe, GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: College Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-amber-400" />
              <h3 className="font-heading font-bold text-white text-base">Sri Vasavi Engineering College</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous Institution permanently affiliated to JNTUK, Kakinada. Approved by AICTE & Accredited by NAAC with 'A' Grade.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1 text-[11px] bg-blue-950 text-blue-300 px-2.5 py-1 rounded-md border border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Pedatadepalli, Tadepalligudem</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('chat')} className="hover:text-amber-400 transition">
                  AI Chatbot Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition">
                  About SVEC & Vision
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('departments')} className="hover:text-amber-400 transition">
                  Academic Departments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admissions')} className="hover:text-amber-400 transition">
                  B.Tech / M.Tech Admissions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('placements')} className="hover:text-amber-400 transition">
                  Placement Cell & Recruiters
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs Offered */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-3">Engineering Branches</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Computer Science & Engg (CSE)</li>
              <li>CSE - Artificial Intelligence & ML</li>
              <li>CSE - Data Science</li>
              <li>Electronics & Comm Engg (ECE)</li>
              <li>Electrical & Electronics Engg (EEE)</li>
              <li>Mechanical & Civil Engineering</li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-3">Contact Information</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Pedatadepalli, Tadepalligudem - 534101, W.G.Dist, AP, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>08818-284355, 284344</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>principal@srivasaviengg.ac.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="https://www.srivasaviengg.ac.in" target="_blank" rel="noreferrer" className="underline hover:text-white">
                  www.srivasaviengg.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Sri Vasavi Engineering College (Autonomous). All rights reserved.</p>
          <p className="text-slate-400">Sri Vasavi Engineering College – College Information Chatbot</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
