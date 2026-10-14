import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DepartmentsPage from './pages/DepartmentsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import PlacementsPage from './pages/PlacementsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';

export function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const { isAuthenticated } = useAuth();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutPage />;
      case 'departments':
        return <DepartmentsPage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'placements':
        return <PlacementsPage />;
      case 'facilities':
        return <FacilitiesPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return isAuthenticated ? (
          <AdminDashboard />
        ) : (
          <AdminLogin onLoginSuccess={() => setActiveTab('admin')} />
        );
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
