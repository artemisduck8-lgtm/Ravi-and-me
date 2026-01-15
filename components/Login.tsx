import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { storageService } from '../services/storageService';
import { Disc, Zap } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleSelect = (user: User) => {
    storageService.saveUser(user);
    onLogin(user);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-poke-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-poke-yellow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-type-water/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="inline-block bg-poke-red text-white px-6 py-2 rounded-full font-display font-bold text-lg mb-4 shadow-lg border-2 border-white transform -rotate-2">
            WELCOME TO LOVE REGION
        </div>
        <h1 className="text-4xl font-display font-bold text-poke-dark mb-2">Who are you?</h1>
        <p className="text-stone-500 font-sans">Choose your trainer card to begin!</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-xs relative z-10">
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('Fidel')}
          className="bg-white border-4 border-poke-blue rounded-3xl p-4 flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-poke-blue/10 flex items-center justify-center border-2 border-poke-blue text-poke-blue group-hover:bg-poke-blue group-hover:text-white transition-colors">
            <Zap size={32} />
          </div>
          <div className="text-left">
            <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest">Trainer</span>
            <span className="text-2xl font-display font-bold text-poke-dark">Fidel</span>
          </div>
           <div className="absolute -right-6 -bottom-6 text-poke-blue/5 rotate-12">
            <Disc size={100} />
           </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('Ravi')}
          className="bg-white border-4 border-poke-yellow rounded-3xl p-4 flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-poke-yellow/10 flex items-center justify-center border-2 border-poke-yellow text-poke-yellow group-hover:bg-poke-yellow group-hover:text-white transition-colors">
             <Disc size={32} />
          </div>
          <div className="text-left">
            <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest">Trainer</span>
            <span className="text-2xl font-display font-bold text-poke-dark">Ravi</span>
          </div>
           <div className="absolute -right-6 -bottom-6 text-poke-yellow/5 rotate-12">
            <Zap size={100} />
           </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Login;