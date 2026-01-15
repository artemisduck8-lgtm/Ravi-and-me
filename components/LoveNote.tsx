import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Mail, Heart } from 'lucide-react';
import { generateLoveNote } from '../services/geminiService';
import { LoadingState } from '../types';

const LoveNote: React.FC = () => {
  const [from, setFrom] = useState('Fidel');
  const [to, setTo] = useState('Ravi');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Cute');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setStatus(LoadingState.LOADING);
    const result = await generateLoveNote(from, to, topic, tone);
    setNote(result);
    setStatus(LoadingState.SUCCESS);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleUsers = () => {
    setFrom(prev => prev === 'Fidel' ? 'Ravi' : 'Fidel');
    setTo(prev => prev === 'Ravi' ? 'Fidel' : 'Ravi');
  };

  return (
    <div className="p-6 pb-24 max-w-md mx-auto flex flex-col h-full bg-poke-cream">
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-block p-3 bg-type-fairy/10 rounded-full mb-2 text-type-fairy">
             <Mail size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold text-poke-dark">Mystery Mail</h2>
          <p className="text-stone-500 text-sm font-bold">Deliver a sweet message</p>
        </motion.div>

        <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between bg-stone-50 rounded-xl p-1 border border-stone-200">
            <button 
              className="flex-1 text-center py-2 text-sm text-poke-dark font-bold"
            >
              {from}
            </button>
            <button 
              onClick={toggleUsers}
              className="px-3 py-1 bg-white rounded-lg text-xs text-stone-400 border border-stone-200 shadow-sm"
            >
              ↔
            </button>
            <button 
               className="flex-1 text-center py-2 text-sm text-poke-dark font-bold"
            >
              {to}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-stone-400 font-bold uppercase tracking-wider">Subject</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Missing you, Good luck..."
              className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl p-3 text-poke-dark placeholder-stone-400 font-medium focus:outline-none focus:border-type-fairy focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-stone-400 font-bold uppercase tracking-wider">Mood</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['Cute', 'Funny', 'Cheesy', 'Deep'].map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all ${
                    tone === t 
                      ? 'bg-type-fairy text-white border-type-fairy' 
                      : 'bg-white border-stone-200 text-stone-500 hover:border-type-fairy/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic || status === LoadingState.LOADING}
            className="w-full bg-poke-blue text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 border-b-4 border-blue-800 active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === LoadingState.LOADING ? 'Writing Mail...' : <><Send size={16} /> Send Pidgey</>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {note && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8 relative"
          >
            {/* Mail Visual */}
            <div className="bg-white border-4 border-type-fairy rounded-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Heart size={100} className="text-type-fairy" />
                </div>
                
                <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-bold text-type-fairy uppercase border border-type-fairy px-2 py-0.5 rounded">Mail</span>
                     <button 
                        onClick={handleCopy}
                        className="text-stone-400 hover:text-poke-dark transition-colors"
                        >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                </div>
                
                <p className="font-display font-medium text-lg text-poke-dark leading-relaxed text-center relative z-10">
                    "{note}"
                </p>

                <div className="mt-4 pt-4 border-t-2 border-stone-100 flex justify-end">
                    <span className="text-xs font-display font-bold text-stone-400">- {from}</span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoveNote;