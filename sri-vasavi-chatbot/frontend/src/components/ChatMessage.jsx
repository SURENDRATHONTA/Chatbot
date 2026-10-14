import React, { useState } from 'react';
import { User, Bot, Volume2, VolumeX, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { sendFeedback } from '../services/api';

export const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null);

  // Text-to-Speech handler
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Strip markdown formatting for speech synthesis
    const cleanText = message.text.replace(/[*_#`\-]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  // Copy text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Feedback action (Helpful / Not Helpful)
  const handleFeedback = async (isHelpful) => {
    setFeedbackGiven(isHelpful ? 'helpful' : 'not_helpful');
    try {
      await sendFeedback({
        question: message.questionContext || 'General Query',
        response: message.text,
        isHelpful
      });
    } catch (err) {
      console.warn('Feedback send warning:', err.message);
    }
  };

  // Helper to format line breaks and markdown-style bold text cleanly
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Parse bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <span key={idx} className="block min-h-[1.2rem]">
          {renderedParts}
        </span>
      );
    });
  };

  return (
    <div className={`flex items-start space-x-3 my-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar Icon */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
          isUser
            ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
            : 'bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-bold'
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Message Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm border transition-all ${
        isUser
          ? 'bg-blue-600 text-white border-blue-700 rounded-tr-none'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
      }`}>
        {/* Header timestamp & category badge */}
        <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-black/5 dark:border-white/5 pb-1">
          <span className={`text-[11px] font-medium ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
            {isUser ? 'You' : 'Sri Vasavi Assistant'}
          </span>
          {message.timestamp && (
            <span className={`text-[10px] ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {renderFormattedText(message.text)}
        </div>

        {/* Action Controls for Bot Messages */}
        {!isUser && (
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSpeak}
                className={`flex items-center space-x-1 hover:text-amber-500 transition ${isPlaying ? 'text-amber-500 font-medium' : ''}`}
                title="Text to Speech"
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPlaying ? 'Stop' : 'Listen'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 hover:text-blue-500 transition"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Feedback Rating */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px]">Was this helpful?</span>
              <button
                onClick={() => handleFeedback(true)}
                disabled={feedbackGiven !== null}
                className={`p-1 rounded transition ${
                  feedbackGiven === 'helpful'
                    ? 'bg-green-100 dark:bg-green-950 text-green-600'
                    : 'hover:text-green-500'
                }`}
                title="Helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleFeedback(false)}
                disabled={feedbackGiven !== null}
                className={`p-1 rounded transition ${
                  feedbackGiven === 'not_helpful'
                    ? 'bg-red-100 dark:bg-red-950 text-red-600'
                    : 'hover:text-red-500'
                }`}
                title="Not Helpful"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
