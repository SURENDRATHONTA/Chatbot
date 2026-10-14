import React from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Building2 } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Phone className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Contact Information</h1>
        </div>
        <p className="text-blue-100 text-sm max-w-3xl">
          Get in touch with Sri Vasavi Engineering College administration, admissions cell, or department offices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Details Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Campus Address & Location
          </h2>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">College Address</span>
                <p className="mt-1 leading-relaxed">
                  Sri Vasavi Engineering College (Autonomous)<br />
                  Pedatadepalli, Tadepalligudem - 534101<br />
                  West Godavari District, Andhra Pradesh, India.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">Phone Numbers</span>
                <p className="mt-1">08818-284355, 284344, 284544</p>
                <p className="text-slate-400">Principal Office Fax: 08818-284355</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">Official Email Address</span>
                <p className="mt-1">principal@srivasaviengg.ac.in</p>
                <p className="text-slate-400">sves_tpggdm@yahoo.co.in</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">College Website</span>
                <a
                  href="https://www.srivasaviengg.ac.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline font-medium"
                >
                  https://www.srivasaviengg.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours & Directions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Administrative Hours & Transport
          </h2>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                <Clock className="w-4 h-4 text-amber-500" /> Office Working Hours
              </span>
              <p>Monday – Saturday: 9:00 AM to 5:00 PM</p>
              <p className="text-slate-400">Closed on Sundays & Public Holidays</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                <Building2 className="w-4 h-4 text-blue-500" /> How to Reach
              </span>
              <p className="leading-relaxed">
                Situated along the NH-16 Highway at Pedatadepalli. 5 km away from Tadepalligudem Railway Station & Bus Complex with convenient RTC bus connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
