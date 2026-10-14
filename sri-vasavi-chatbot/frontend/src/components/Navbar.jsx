import React from 'react';
import { MessageSquare, Info, GraduationCap, Building2, Briefcase, Phone, Lock, Sparkles, LogOut, Layers } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: 'chat', label: 'AI Chatbot', icon: MessageSquare },
    { id: 'about', label: 'About College', icon: Info },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'admissions', label: 'Admissions', icon: GraduationCap },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'facilities', label: 'Facilities', icon: Layers },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Official college masthead */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3 sm:gap-5">
          <a
            href="https://www.srivasaviengg.ac.in"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
            aria-label="Sri Vasavi Engineering College official website"
          >
            <img
              src="https://www.srivasaviengg.ac.in/vasavi_logo.png"
              alt="Sri Vasavi Engineering College crest"
              className="w-14 h-14 sm:w-[72px] sm:h-[72px] object-contain"
            />
          </a>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="hidden sm:flex justify-between text-[10px] sm:text-xs font-bold uppercase text-sky-800 dark:text-sky-300">
              <span>ESTD: 2001</span>
              <span>COUNSELLING CODE: VSVT</span>
            </div>
            <h2 className="text-sm sm:text-lg md:text-xl font-extrabold leading-tight text-emerald-800 dark:text-emerald-400">
              SRI VASAVI ENGINEERING COLLEGE <span className="text-orange-700 dark:text-orange-400">(AUTONOMOUS)</span>
            </h2>
            <p className="mt-0.5 text-[10px] sm:text-xs leading-tight text-slate-600 dark:text-slate-300">
              Sponsored by Sri Vasavi Educational Society | Pedatadepalli, Tadepalligudem - 534 101, Andhra Pradesh
            </p>
            <p className="mt-0.5 text-[10px] sm:text-xs font-semibold leading-tight text-slate-700 dark:text-slate-200">
              Principal: Dr. Ch. Rambabu
            </p>
          </div>

          <div className="hidden sm:flex shrink-0 items-center gap-2">
            <img
              src="https://www.srivasaviengg.ac.in/a_logo/nba.png"
              alt="NBA accreditation"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <img
              src="https://www.srivasaviengg.ac.in/a_logo/naac.png"
              alt="NAAC A Grade accreditation"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
              Autonomous
            </span>
            <span>NAAC 'A' Grade Accredited | Permanently Affiliated to JNTUK</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Pedatadepalli, Tadepalligudem, AP</span>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.srivasaviengg.ac.in" target="_blank" rel="noreferrer" className="underline hover:text-amber-400">
              www.srivasaviengg.ac.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('chat')}
          >
            <div className="w-11 h-11 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="https://www.srivasaviengg.ac.in/vasavi_logo.png"
                alt="Sri Vasavi Engineering College logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
                  Sri Vasavi Engineering College
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  <Sparkles className="w-3 h-3 text-amber-500" /> AI Assistant
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Pedatadepalli, Tadepalligudem • College Information Chatbot
              </p>
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    activeTab === 'admin'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 border transition-all ${
                  activeTab === 'admin'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Admin Portal</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 mt-3 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-slate-800/80 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center space-x-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
