import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, Sparkles, RefreshCw, MessageSquarePlus } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import VoiceInput from './VoiceInput';
import { askChatbot } from '../services/api';

const DEFAULT_WELCOME = {
  id: 'welcome_msg',
  sender: 'bot',
  text: "Welcome to **Sri Vasavi Engineering College (Autonomous)** Information Chatbot!\n\nI am your dedicated college guide. Ask me anything about **B.Tech/M.Tech Courses, Admissions, Department details, Fee structure, Hostels, Placements, FAQs, or Campus Facilities**.",
  timestamp: new Date().toISOString()
};

const INITIAL_SUGGESTIONS = [
  "What courses are available at Sri Vasavi?",
  "What is the admission procedure for B.Tech?",
  "Tell me about the CSE department.",
  "What are the placement opportunities & highest package?",
  "Where is Sri Vasavi Engineering College located?",
  "What campus & hostel facilities are available?",
  "What scholarships can students apply for?"
];

export const ChatWindow = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('svec_chat_history');
    return saved ? JSON.parse(saved) : [DEFAULT_WELCOME];
  });
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('svec_chat_history', JSON.stringify(messages));
  }, [messages, loading]);

  // Send question handler
  const handleSend = async (queryText = inputQuery) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    const userMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await askChatbot(textToSend, sessionId);
      const botMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'bot',
        text: response.answer,
        questionContext: textToSend,
        category: response.category,
        timestamp: response.timestamp || new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: 'msg_err_' + Date.now(),
          sender: 'bot',
          text: "Sorry, I couldn't find this information in the college database. Please contact the college administration for accurate information.",
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear Chat History
  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      setMessages([DEFAULT_WELCOME]);
      localStorage.removeItem('svec_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[550px] max-w-5xl mx-auto my-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
      
      {/* Top Chat Bar Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-6 py-3.5 flex items-center justify-between text-white border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-sm sm:text-base leading-tight">
              Sri Vasavi AI Knowledge Desk
            </h2>
            <p className="text-[11px] text-blue-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Official Database Connected • Autonomous Portal
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-blue-100 flex items-center space-x-1.5 transition border border-white/10"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-300" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Messages Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing Loading Indicator */}
        {loading && (
          <div className="flex items-center space-x-3 my-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
              </div>
              <span>Searching Sri Vasavi College database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Section (when starting or after bot responses) */}
      <div className="px-4 sm:px-6 pt-2 pb-1 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60">
        <SuggestedQuestions questions={INITIAL_SUGGESTIONS} onSelectQuestion={(q) => handleSend(q)} />
      </div>

      {/* Input Control Toolbar */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <VoiceInput onSpeechResult={(text) => handleSend(text)} />

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask any question about Sri Vasavi Engineering College..."
              className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm flex items-center space-x-2 shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
          Responses generated strictly using official Sri Vasavi Engineering College database records.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
