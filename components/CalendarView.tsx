import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, MapPin } from 'lucide-react';

const CalendarView: React.FC = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  const events = [
    { date: '07-23', title: "Fidel's Lvl Up", type: 'BIRTHDAY', icon: Crown, color: 'text-poke-blue' },
    { date: '12-08', title: "Ravi's Lvl Up", type: 'BIRTHDAY', icon: Crown, color: 'text-poke-yellow' },
  ];

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, currentDate.getMonth());
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto bg-poke-cream">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-block bg-white px-6 py-2 rounded-full border-2 border-stone-100 shadow-sm">
            <h2 className="text-2xl font-display font-bold text-poke-dark uppercase tracking-wide">{month} {year}</h2>
        </div>
      </motion.div>

      {/* Countdown Widget */}
      <div className="bg-poke-blue text-white rounded-3xl p-6 mb-8 relative overflow-hidden shadow-lg shadow-blue-200">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
         <div className="relative z-10 flex justify-between items-center">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Adventure Log</p>
                <h3 className="text-xl font-display font-bold">Reunion Day</h3>
            </div>
             <div className="text-right bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/30">
                <span className="block text-3xl font-display font-bold">14</span>
                <span className="text-[10px] font-bold">DAYS LEFT</span>
             </div>
         </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border-2 border-stone-100 mb-8">
        <div className="grid grid-cols-7 gap-1 mb-2">
            {['S','M','T','W','T','F','S'].map(d => (
                <div key={d} className="text-center text-[10px] text-stone-400 font-bold">{d}</div>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDate.getDate();
                const dateStr = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const event = events.find(e => e.date === dateStr);

                return (
                    <div key={day} className="aspect-square flex flex-col items-center justify-center relative">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all
                            ${isToday ? 'bg-poke-red text-white shadow-md' : 'text-stone-600 hover:bg-stone-50'}
                            ${event ? 'border-2 border-poke-yellow' : ''}
                        `}>
                            {day}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-2">Quest Log</h3>
        {events.map((e, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white border-2 border-stone-100 rounded-2xl shadow-sm">
                <div className={`w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center ${e.color}`}>
                    <e.icon size={20} />
                </div>
                <div>
                    <h4 className="text-poke-dark font-display font-bold">{e.title}</h4>
                    <p className="text-stone-400 text-xs font-bold">Special Event</p>
                </div>
                <div className="ml-auto bg-stone-100 text-stone-500 font-bold text-[10px] px-2 py-1 rounded-md">
                    {e.date.replace('-', '/')}
                </div>
            </div>
        ))}
        <div className="flex items-center gap-4 p-4 bg-white border-2 border-stone-100 rounded-2xl shadow-sm opacity-70">
             <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-type-fairy">
                    <Heart size={20} />
                </div>
                <div>
                    <h4 className="text-poke-dark font-display font-bold">Us Forever</h4>
                    <p className="text-stone-400 text-xs font-bold">Ongoing Quest</p>
                </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;