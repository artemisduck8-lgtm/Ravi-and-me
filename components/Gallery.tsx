import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Trash2, Heart } from 'lucide-react';

const Gallery: React.FC = () => {
  // Mock data since we can't upload
  const [images, setImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60', caption: 'Best Day!' },
    { id: 2, url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&auto=format&fit=crop&q=60', caption: 'Miss u' },
    { id: 3, url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&auto=format&fit=crop&q=60', caption: 'Cute' },
  ]);

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto bg-poke-cream">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <div className="inline-block p-3 bg-type-electric/20 rounded-full mb-2 text-type-electric border-2 border-type-electric">
            <Camera size={32} />
        </div>
        <h2 className="text-3xl font-display font-bold text-poke-dark">Adventure Snaps</h2>
        <p className="text-stone-500 text-sm font-bold">Captured Moments</p>
      </motion.div>

      {/* Upload Simulation */}
      <button className="w-full bg-white border-2 border-dashed border-poke-blue rounded-2xl p-4 mb-8 flex items-center justify-center gap-2 text-poke-blue font-bold hover:bg-blue-50 transition-colors">
        <Upload size={20} />
        <span>Add Photo to Pokedex</span>
      </button>

      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
            <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-3 pb-8 rounded-sm shadow-md rotate-1 hover:rotate-0 transition-transform duration-300 relative border border-stone-100"
            >
                <div className="aspect-square bg-stone-100 mb-2 overflow-hidden rounded-sm">
                    <img src={img.url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="font-handwriting text-center text-poke-dark font-bold text-xs transform -rotate-2">
                    {img.caption}
                </p>
                
                {/* Decor */}
                <div className="absolute top-2 right-2 text-poke-red">
                    <Heart size={12} fill="#FF5D5D" />
                </div>
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-type-electric/50 rounded-full blur-sm"></div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;