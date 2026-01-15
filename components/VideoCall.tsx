import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Disc, RefreshCw } from 'lucide-react';
import { storageService } from '../services/storageService';

const VideoCall: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [partner] = useState(storageService.getUser() === 'Fidel' ? 'Ravi' : 'Fidel');

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    if (camOn) startVideo();
    
    return () => {
        // Cleanup stream
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [camOn]);

  const toggleMic = () => setMicOn(!micOn);
  const toggleCam = () => setCamOn(!camOn);

  return (
    <div className="h-full flex flex-col bg-stone-900 relative overflow-hidden">
       {/* Main Video (Self view mock as full screen for demo) */}
       <div className="flex-1 relative">
           {hasPermission && camOn ? (
               <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transform scale-x-[-1]"
               />
           ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 bg-stone-800">
                    <VideoOff size={48} className="mb-4" />
                    <p className="font-display font-bold">Camera Off</p>
               </div>
           )}

           {/* Holocaster UI Overlay */}
           <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-white text-xs font-mono">LIVE // HOLOCASTER</span>
                </div>
                
                {/* Partner PIP (Simulated) */}
                <div className="absolute top-4 right-4 w-32 h-40 bg-stone-800 rounded-xl border-2 border-poke-blue shadow-lg overflow-hidden flex items-center justify-center">
                     <div className="flex flex-col items-center animate-pulse">
                         <div className="w-12 h-12 bg-poke-blue rounded-full flex items-center justify-center mb-2">
                             <span className="text-white font-display font-bold text-lg">{partner[0]}</span>
                         </div>
                         <p className="text-white text-[10px] font-bold">Connecting...</p>
                     </div>
                </div>
           </div>
       </div>

       {/* Controls */}
       <div className="bg-stone-900/80 backdrop-blur-xl p-6 pb-24 border-t border-white/10">
            <div className="flex justify-center items-center gap-6">
                <button 
                    onClick={toggleMic}
                    className={`p-4 rounded-full transition-all ${micOn ? 'bg-stone-700 text-white hover:bg-stone-600' : 'bg-white text-stone-900'}`}
                >
                    {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>

                <button 
                    className="p-6 rounded-full bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:bg-red-600 transition-transform hover:scale-105"
                >
                    <PhoneOff size={32} />
                </button>

                 <button 
                    onClick={toggleCam}
                    className={`p-4 rounded-full transition-all ${camOn ? 'bg-stone-700 text-white hover:bg-stone-600' : 'bg-white text-stone-900'}`}
                >
                    {camOn ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
            </div>
            <div className="text-center mt-4">
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Calling {partner}...</p>
            </div>
       </div>
    </div>
  );
};

export default VideoCall;