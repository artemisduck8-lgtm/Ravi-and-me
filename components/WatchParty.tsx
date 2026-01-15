import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tv, Play, Link, Users } from 'lucide-react';

const WatchParty: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);

  const handleWatch = () => {
    if (!url) return;
    // Simple youtube ID extractor
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        setVideoId(match[2]);
    } else {
        alert("Invalid YouTube URL, Trainer!");
    }
  };

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto bg-poke-cream flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <div className="inline-block p-3 bg-type-psychic/20 rounded-full mb-2 text-type-psychic border-2 border-type-psychic">
            <Tv size={32} />
        </div>
        <h2 className="text-3xl font-display font-bold text-poke-dark">Rotom TV</h2>
        <p className="text-stone-500 text-sm font-bold">Watch Together</p>
      </motion.div>

      {/* TV Frame */}
      <div className="flex-1 bg-poke-red rounded-3xl p-4 shadow-xl border-b-8 border-r-4 border-red-700 relative">
        {/* Antenna */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-8 bg-stone-300 rounded-t-full"></div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-stone-300 rounded-full"></div>

        <div className="bg-stone-900 rounded-2xl overflow-hidden aspect-video relative border-4 border-stone-800 shadow-inner w-full">
            {videoId ? (
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-600">
                    <div className="w-20 h-20 border-4 border-stone-700 rounded-full flex items-center justify-center mb-2 animate-bounce">
                        <Play size={40} fill="#444" />
                    </div>
                    <p className="font-mono text-xs">NO SIGNAL</p>
                </div>
            )}
            
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
        </div>

        <div className="mt-4 flex items-center justify-between px-2">
            <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                 <span className="text-[10px] font-bold text-white uppercase opacity-80 flex items-center gap-1">
                    <Users size={12} /> 2 Watching
                 </span>
            </div>
            <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-4 bg-red-900 rounded-full"></div>)}
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-sm">
        <div className="flex gap-2">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                    <Link size={16} />
                </div>
                <input 
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube Link..."
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl text-sm font-medium focus:outline-none focus:border-poke-blue"
                />
            </div>
            <button 
                onClick={handleWatch}
                className="bg-poke-blue text-white p-3 rounded-xl border-b-4 border-blue-800 active:border-b-0 active:translate-y-[4px] transition-all"
            >
                <Play size={20} fill="white" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default WatchParty;