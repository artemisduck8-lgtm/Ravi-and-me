import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSkyeAvatar, talkToSkye } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { SkyeStats, LoadingState } from '../types';
import { Zap, Heart, Utensils, Sparkles, MessageSquare, Trophy } from 'lucide-react';

const Skye: React.FC = () => {
  const [stats, setStats] = useState<SkyeStats>(storageService.getSkyeStats());
  const [chatInput, setChatInput] = useState('');
  const [skyeResponse, setSkyeResponse] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    if (!stats.avatarUrl) {
      setLoading(LoadingState.LOADING);
      generateSkyeAvatar().then(url => {
        if (url) {
          updateStats({ avatarUrl: url });
        }
        setLoading(LoadingState.SUCCESS);
      });
    }
  }, []);

  const updateStats = (updates: Partial<SkyeStats>) => {
    const newStats = { ...stats, ...updates };
    setStats(newStats);
    storageService.saveSkyeStats(newStats);
  };

  const handleAction = (type: 'FEED' | 'NAP' | 'PLAY') => {
    let updates: Partial<SkyeStats> = {};
    const xpGain = 10;

    switch (type) {
      case 'FEED':
        updates = { hunger: Math.min(100, stats.hunger + 30), xp: stats.xp + xpGain };
        break;
      case 'NAP':
        updates = { energy: Math.min(100, stats.energy + 40), xp: stats.xp + xpGain };
        break;
      case 'PLAY':
        updates = { happiness: Math.min(100, stats.happiness + 20), energy: Math.max(0, stats.energy - 10), xp: stats.xp + xpGain };
        break;
    }

    if ((stats.xp + xpGain) >= stats.level * 100) {
      updates.level = stats.level + 1;
      updates.xp = 0;
    }
    
    updates.lastInteraction = Date.now();
    updateStats(updates);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    const response = await talkToSkye(chatInput, stats);
    setSkyeResponse(response);
    setChatLoading(false);
    setChatInput('');
  };

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto bg-poke-cream">
      {/* Header */}
      <div className="bg-white border-2 border-poke-dark rounded-xl p-3 flex justify-between items-center mb-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-poke-blue"></div>
        <div>
           <h2 className="text-xl font-display font-bold text-poke-dark flex items-center gap-2">
             Skye <span className="text-xs text-stone-400 font-sans font-normal">No. 001</span>
           </h2>
           <p className="text-xs font-bold text-stone-500">Baby Pokemon Trainer</p>
        </div>
        <div className="flex items-center gap-1 bg-poke-yellow/20 px-3 py-1 rounded-full border border-poke-yellow">
           <Trophy size={14} className="text-poke-dark" />
           <span className="text-xs font-bold text-poke-dark">{stats.streak} Days</span>
        </div>
      </div>

      {/* Main View */}
      <div className="relative aspect-square w-full max-w-[280px] mx-auto mb-8">
         {/* Background Circle */}
        <div className="absolute inset-0 bg-white rounded-full border-[6px] border-poke-red/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
        
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-xl bg-type-fairy/10 flex items-center justify-center z-10"
        >
          {stats.avatarUrl ? (
            <img src={stats.avatarUrl} alt="Skye" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center">
                <Sparkles className="animate-spin text-poke-yellow mb-2" />
                <span className="text-xs font-bold text-stone-400">Hatching...</span>
            </div>
          )}
        </motion.div>
        
        {/* Chat Bubble */}
        <AnimatePresence>
            {skyeResponse && (
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 right-[-20px] bg-white text-poke-dark border-2 border-poke-dark p-3 rounded-xl rounded-tl-none shadow-[4px_4px_0px_0px_rgba(33,33,33,1)] max-w-[180px] text-xs font-bold z-20"
                >
                    {skyeResponse}
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Stats Box */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="space-y-3">
             {/* HP Bar */}
            <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold text-stone-500 uppercase">HP</span>
                <div className="flex-1 h-4 bg-stone-100 rounded-full border border-stone-200 relative overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.energy}%` }}
                        className="h-full bg-type-grass border-r-2 border-white/30"
                    />
                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30"></div>
                </div>
            </div>
             {/* Hunger Bar */}
            <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold text-stone-500 uppercase">Berry</span>
                <div className="flex-1 h-4 bg-stone-100 rounded-full border border-stone-200 relative overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.hunger}%` }}
                        className="h-full bg-type-fire border-r-2 border-white/30"
                    />
                     <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30"></div>
                </div>
            </div>
             {/* Love Bar */}
            <div className="flex items-center gap-3">
                <span className="w-12 text-[10px] font-bold text-stone-500 uppercase">EXP</span>
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.happiness}%` }}
                        className="h-full bg-poke-blue"
                    />
                </div>
            </div>
          </div>
      </div>

      {/* Control Pad */}
      <div className="grid grid-cols-3 gap-3 mb-6">
         <button 
            onClick={() => handleAction('FEED')}
            className="bg-type-fire text-white p-3 rounded-xl shadow-[0_4px_0_rgb(200,50,50)] active:shadow-none active:translate-y-[4px] transition-all flex flex-col items-center"
         >
            <Utensils size={20} className="mb-1" />
            <span className="text-[10px] font-bold">Berry</span>
         </button>
         <button 
             onClick={() => handleAction('NAP')}
             className="bg-type-water text-white p-3 rounded-xl shadow-[0_4px_0_rgb(70,110,210)] active:shadow-none active:translate-y-[4px] transition-all flex flex-col items-center"
         >
            <Zap size={20} className="mb-1" />
            <span className="text-[10px] font-bold">Heal</span>
         </button>
         <button 
             onClick={() => handleAction('PLAY')}
             className="bg-type-fairy text-white p-3 rounded-xl shadow-[0_4px_0_rgb(210,120,150)] active:shadow-none active:translate-y-[4px] transition-all flex flex-col items-center"
         >
            <Heart size={20} className="mb-1" />
            <span className="text-[10px] font-bold">Pet</span>
         </button>
      </div>

      {/* Talk Input */}
      <div className="bg-white rounded-full p-1 pl-4 flex gap-2 border-2 border-stone-200 shadow-sm">
        <input 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Talk to Skye..."
            className="flex-1 bg-transparent text-sm text-poke-dark font-medium focus:outline-none placeholder-stone-400"
        />
        <button 
            onClick={handleChat}
            disabled={chatLoading || !chatInput}
            className="bg-poke-yellow hover:bg-yellow-400 text-poke-dark p-2 rounded-full transition-colors disabled:opacity-50 border-2 border-poke-yellow"
        >
            {chatLoading ? <Sparkles size={18} className="animate-spin" /> : <MessageSquare size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Skye;