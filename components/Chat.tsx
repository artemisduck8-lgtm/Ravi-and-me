import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { storageService } from '../services/storageService';
import { suggestReply } from '../services/geminiService';
import { Message, User } from '../types';

const Chat: React.FC = () => {
  const [currentUser] = useState<User | null>(storageService.getUser());
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [suggesting, setSuggesting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(storageService.getMessages());
    const interval = setInterval(() => {
        setMessages(storageService.getMessages());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !currentUser) return;
    
    const newMsg: Message = {
        id: Date.now().toString(),
        sender: currentUser,
        text: input,
        timestamp: Date.now()
    };
    
    const updated = storageService.saveMessage(newMsg);
    setMessages(updated);
    setInput('');
  };

  const handleMagicReply = async () => {
    if (messages.length === 0) return;
    setSuggesting(true);
    const lastMsg = messages[messages.length - 1].text;
    const suggestion = await suggestReply(lastMsg);
    setInput(suggestion);
    setSuggesting(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-poke-cream">
        <div className="p-4 bg-white border-b-2 border-poke-red flex items-center justify-between z-10 sticky top-0 shadow-sm">
            <h2 className="text-lg font-display font-bold text-poke-dark flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-poke-red animate-pulse"></span>
               {currentUser === 'Fidel' ? 'Trainer Ravi' : 'Trainer Fidel'}
            </h2>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-stone-400 font-bold text-sm mt-10 p-6 border-2 border-dashed border-stone-300 rounded-xl">
                    <p>A wild conversation appeared!</p>
                </div>
            )}
            
            {messages.map((msg) => {
                const isMe = msg.sender === currentUser;
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm font-medium border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] ${
                            isMe 
                                ? 'bg-poke-blue text-white border-poke-blue rounded-br-none' 
                                : 'bg-white text-poke-dark border-stone-200 rounded-bl-none'
                        }`}>
                            {msg.text}
                            <div className={`text-[9px] mt-1 font-bold opacity-70 ${isMe ? 'text-blue-100' : 'text-stone-400'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>

        <div className="p-4 bg-white border-t-2 border-stone-100">
            <div className="flex gap-2">
                <button
                    onClick={handleMagicReply}
                    disabled={suggesting || messages.length === 0}
                    className="p-3 rounded-xl bg-orange-100 text-orange-500 border-2 border-orange-200 hover:bg-orange-200 transition-colors disabled:opacity-50"
                >
                    <Sparkles size={20} className={suggesting ? "animate-spin" : ""} />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-stone-50 border-2 border-stone-200 rounded-xl px-4 text-poke-dark font-medium placeholder-stone-400 focus:outline-none focus:border-poke-blue focus:bg-white transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-3 rounded-xl bg-poke-red text-white border-b-4 border-red-700 hover:border-b-2 hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-50 disabled:border-none disabled:cursor-not-allowed"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default Chat;