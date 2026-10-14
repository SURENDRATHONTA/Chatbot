import React, { useEffect, useState } from 'react';
import { fetchFacilities } from '../services/api';
import { Layers, BookOpen, Home, Bus, Utensils, Dumbbell, ShieldCheck } from 'lucide-react';

const ICON_MAP = {
  'Library & Digital Resources': BookOpen,
  'Accommodation': Home,
  'Transport': Bus,
  'Food & Refreshment': Utensils,
  'Sports & Athletics': Dumbbell,
};

export const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchFacilities().then(res => setFacilities(res.data || [])).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Layers className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Campus Infrastructure & Facilities</h1>
        </div>
        <p className="text-blue-100 text-sm max-w-3xl">
          State-of-the-art learning and living amenities designed for student convenience and academic excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((fac, idx) => {
          const IconComponent = ICON_MAP[fac.category] || ShieldCheck;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-blue-500 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {fac.category}
                  </span>
                  <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    {fac.facilityName}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {fac.description}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                {fac.timingOrDetails && (
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Timings / Details:</span> {fac.timingOrDetails}
                  </div>
                )}
                {fac.inchargeName && (
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Incharge:</span> {fac.inchargeName}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesPage;
