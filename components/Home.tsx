import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Star, Map, Camera, Tv, Video } from 'lucide-react';
import { ViewState, SkyeStats } from '../types';
import { storageService } from '../services/storageService';

interface HomeProps {
    setView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const [skyeStats, setSkyeStats] = useState<SkyeStats | null>(null);
  const [user, setUser] = useState(storageService.getUser());

  useEffect(() => {
    setSkyeStats(storageService.getSkyeStats());
    storageService.checkStreak();
  }, []);

  return (
    <div className="p-6 h-full flex flex-col pt-12 pb-24 relative overflow-hidden bg-poke-cream">
       {/* Decorative Elements */}
       <div className="absolute top-[-50px] right-[-50px] opacity-10 rotate-12 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="5"/>
                <path d="M 5,50 L 95,50" stroke="black" strokeWidth="5"/>
                <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="5"/>
                <circle cx="50" cy="50" r="5" fill="black"/>
            </svg>
       </div>
       <div className="absolute bottom-20 left-[-20px] w-32 h-32 bg-type-psychic/10 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
            <div className="bg-gradient-to-r from-poke-red to-type-fire text-white text-[10px] font-bold px-3 py-1 rounded-full inline-block mb-2 shadow-lg shadow-red-200">
                TRAINER CARD
            </div>
            <h1 className="text-3xl font-display font-bold text-poke-dark drop-shadow-sm">Hi, {user}!</h1>
            <p className="text-stone-500 text-xs font-bold font-sans">ID No. 07231208</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Skye Status Panel */}
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView(ViewState.SKYE)}
            className="bg-white border-2 border-type-grass rounded-3xl p-1 shadow-lg cursor-pointer group hover:shadow-green-100"
        >
            <div className="bg-gradient-to-br from-type-grass/20 to-transparent rounded-[20px] p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-md overflow-hidden relative">
                    {skyeStats?.avatarUrl ? (
                        <img src={skyeStats.avatarUrl} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-type-grass/20 flex items-center justify-center text-2xl">🥚</div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-poke-dark font-display font-bold text-lg">Skye</h3>
                        <span className="text-[10px] bg-white text-type-grass font-bold px-2 py-0.5 rounded-full border border-type-grass/20">Lvl {skyeStats?.level || 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-stone-400">HP</span>
                        <div className="flex-1 bg-white h-3 rounded-full overflow-hidden border border-stone-100">
                            <div 
                                className="bg-type-grass h-full rounded-full" 
                                style={{ width: `${skyeStats?.energy || 50}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-4 gap-3">
             {/* Chat Widget */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(ViewState.CHAT)}
                className="col-span-2 bg-gradient-to-br from-blue-50 to-white border-2 border-poke-blue/30 rounded-2xl p-4 flex flex-col items-start justify-center gap-2 shadow-sm cursor-pointer"
            >
                <div className="w-8 h-8 bg-poke-blue text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
                    <MessageCircle size={18} />
                </div>
                <span className="font-display font-bold text-poke-dark text-sm">Chat</span>
            </motion.div>

             {/* Events Widget */}
             <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(ViewState.CALENDAR)}
                className="col-span-2 bg-gradient-to-br from-yellow-50 to-white border-2 border-poke-yellow/30 rounded-2xl p-4 flex flex-col items-start justify-center gap-2 shadow-sm cursor-pointer"
            >
                <div className="w-8 h-8 bg-poke-yellow text-poke-dark rounded-lg flex items-center justify-center shadow-lg shadow-yellow-200">
                    <Star size={18} />
                </div>
                <span className="font-display font-bold text-poke-dark text-sm">Events</span>
            </motion.div>

            {/* Gallery (Snaps) */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(ViewState.GALLERY)}
                className="bg-white border-2 border-type-electric/30 rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
                <Camera size={20} className="text-type-electric" />
                <span className="text-[10px] font-bold text-stone-500">Snaps</span>
            </motion.div>

            {/* TV */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(ViewState.WATCH)}
                className="bg-white border-2 border-type-psychic/30 rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
                <Tv size={20} className="text-type-psychic" />
                <span className="text-[10px] font-bold text-stone-500">TV</span>
            </motion.div>

             {/* Call */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(ViewState.CALL)}
                className="bg-white border-2 border-poke-red/30 rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
                <Video size={20} className="text-poke-red" />
                <span className="text-[10px] font-bold text-stone-500">Call</span>
            </motion.div>

             {/* Mail */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(ViewState.LOVE_NOTE)}
                className="bg-white border-2 border-type-fairy/30 rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
                <Heart size={20} className="text-type-fairy" />
                <span className="text-[10px] font-bold text-stone-500">Mail</span>
            </motion.div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-[10px] text-stone-400 font-bold bg-white/50 inline-block px-3 py-1 rounded-full border border-stone-200">
            Adventure started in 2024
        </p>
      </div>
    </div>
  );
};

export default Home;