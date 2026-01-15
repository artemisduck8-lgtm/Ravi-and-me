import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Login from './components/Login';
import { ViewState, User } from './types';
import { storageService } from './services/storageService';

// Static Imports to prevent dynamic import errors
import Home from './components/Home';
import CalendarView from './components/CalendarView';
import Skye from './components/Skye';
import Chat from './components/Chat';
import LoveNote from './components/LoveNote';
import Gallery from './components/Gallery';
import WatchParty from './components/WatchParty';
import VideoCall from './components/VideoCall';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = storageService.getUser();
    if (storedUser) {
      setUser(storedUser);
      setCurrentView(ViewState.HOME);
    }
  }, []);

  const handleLogin = (selectedUser: User) => {
    setUser(selectedUser);
    setCurrentView(ViewState.HOME);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.LOGIN:
        return <Login onLogin={handleLogin} />;
      case ViewState.HOME:
        return <Home setView={setCurrentView} />;
      case ViewState.CALENDAR:
        return <CalendarView />;
      case ViewState.SKYE:
        return <Skye />;
      case ViewState.CHAT:
        return <Chat />;
      case ViewState.LOVE_NOTE:
        return <LoveNote />;
      case ViewState.GALLERY:
        return <Gallery />;
      case ViewState.WATCH:
        return <WatchParty />;
      case ViewState.CALL:
        return <VideoCall />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-poke-cream text-poke-dark font-sans overflow-hidden">
      <main className="min-h-screen pb-[80px] max-w-md mx-auto shadow-2xl bg-white/50 relative border-x-4 border-stone-100/50"> 
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      {currentView !== ViewState.LOGIN && (
        <div className="max-w-md mx-auto relative">
           <Navigation currentView={currentView} setView={setCurrentView} />
        </div>
      )}
    </div>
  );
};

export default App;