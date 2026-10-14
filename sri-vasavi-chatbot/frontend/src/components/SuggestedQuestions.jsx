import React from 'react';
import { HelpCircle } from 'lucide-react';

export const SuggestedQuestions = ({ questions, onSelectQuestion }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="py-2">
      <div className="flex items-center space-x-1.5 mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
        <span>Suggested Questions:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q)}
            className="text-xs text-left px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
