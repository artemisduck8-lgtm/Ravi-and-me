import { Message, SkyeStats, User } from '../types';

const KEYS = {
  MESSAGES: 'love_app_messages',
  SKYE: 'love_app_skye',
  USER: 'love_app_user',
  STREAK: 'love_app_last_login'
};

export const storageService = {
  // User Session
  saveUser: (user: User) => localStorage.setItem(KEYS.USER, user),
  getUser: (): User | null => localStorage.getItem(KEYS.USER) as User | null,
  logout: () => localStorage.removeItem(KEYS.USER),

  // Chat
  getMessages: (): Message[] => {
    const data = localStorage.getItem(KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  },
  saveMessage: (msg: Message) => {
    const current = storageService.getMessages();
    const updated = [...current, msg];
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(updated));
    return updated;
  },

  // Skye (Virtual Baby)
  getSkyeStats: (): SkyeStats => {
    const data = localStorage.getItem(KEYS.SKYE);
    if (data) return JSON.parse(data);
    
    // Default Skye
    return {
      hunger: 80,
      energy: 80,
      happiness: 80,
      level: 1,
      xp: 0,
      streak: 1,
      lastInteraction: Date.now()
    };
  },
  saveSkyeStats: (stats: SkyeStats) => {
    localStorage.setItem(KEYS.SKYE, JSON.stringify(stats));
  },
  
  // Streak Logic
  checkStreak: () => {
    const lastLogin = localStorage.getItem(KEYS.STREAK);
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      localStorage.setItem(KEYS.STREAK, today);
      // Logic to increment streak could go here in a real backend
      // For now we trust the SkyeStats streak
    }
  }
};