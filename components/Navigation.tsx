import React from 'react';
import { ViewState } from '../types';
import { Heart, Calendar as CalendarIcon, MessageCircle, Egg, Home, Image as ImageIcon, Tv, Video } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  if (currentView === ViewState.LOGIN) return null;

  const navItems = [
    { id: ViewState.HOME, icon: Home, label: 'Town' },
    { id: ViewState.SKYE, icon: Egg, label: 'Skye' },
    { id: ViewState.GALLERY, icon: ImageIcon, label: 'Snaps' },
    { id: ViewState.WATCH, icon: Tv, label: 'TV' },
    { id: ViewState.CALL, icon: Video, label: 'Call' },
    { id: ViewState.CHAT, icon: MessageCircle, label: 'Chat' },
    { id: ViewState.CALENDAR, icon: CalendarIcon, label: 'Events' },
    { id: ViewState.LOVE_NOTE, icon: Heart, label: 'Mail' },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border-2 border-poke-red/20 rounded-3xl shadow-xl shadow-poke-red/10 px-2 py-2 z-50 overflow-x-auto scrollbar-hide">
      <div className="flex justify-start md:justify-around items-center gap-2 min-w-max px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 w-14 ${
                isActive ? '-translate-y-2' : 'text-stone-400'
              }`}
            >
              <div className={`p-3 rounded-full transition-all border-2 ${
                isActive 
                  ? 'bg-gradient-to-br from-poke-red to-type-fire border-poke-red text-white shadow-lg scale-110' 
                  : 'bg-transparent border-transparent hover:bg-poke-red/10'
              }`}>
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "animate-pulse" : ""}
                />
              </div>
              {isActive && (
                <span className="absolute -bottom-5 text-[9px] font-display font-bold text-poke-red uppercase tracking-wider bg-white px-2 py-0.5 rounded-full shadow-sm border border-poke-red/20 whitespace-nowrap">
                    {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;