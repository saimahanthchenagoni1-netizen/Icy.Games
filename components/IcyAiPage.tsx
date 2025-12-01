import React, { useState, useRef, useEffect } from 'react';
import { getGenAiInstance, sendMessageToIcy } from '../services/geminiService';
import { ChatMessage } from '../types';
import { LiveServerMessage, Modality } from '@google/genai';
import { createBlob, base64ToBytes, decodeAudioData } from '../services/audioUtils';

const IcyAiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text');
  
  // Standard Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to the ICY mainframe! I'm Icy, your frozen assistant. You can chat with me, upload images for me to analyze, or switch to Voice Mode to talk to me in real-time!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live Voice State
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const liveClientRef = useRef<any>(null); // To hold the live session
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // --- Standard Chat Logic ---

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && !selectedImage) || isTyping) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const responseText = await sendMessageToIcy(newUserMsg.text || "", newUserMsg.image);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  // --- Live Voice Logic ---

  const startLiveSession = async () => {
    try {
      const ai = getGenAiInstance();
      
      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      
      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are Icy, a cool and energetic AI assistant for a game site called ICY. Keep your responses concise, fun, and helpful.',
        },
        callbacks: {
          onopen: () => {
            console.log("Live Session Connected");
            setIsLiveConnected(true);
            
            // Setup Input Streaming
            if (!audioContextRef.current) return;
            const ctx = audioContextRef.current;
            inputSourceRef.current = ctx.createMediaStreamSource(stream);
            processorRef.current = ctx.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Visualize Volume
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) sum += Math.abs(inputData[i]);
              setVolumeLevel(Math.min(100, (sum / inputData.length) * 500));

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            inputSourceRef.current.connect(processorRef.current);
            processorRef.current.connect(ctx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputContextRef.current) {
              const ctx = outputContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBytes = base64ToBytes(base64Audio);
              const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                  audioQueueRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              audioQueueRef.current.add(source);
            }

            // Handle Interruption
            if (msg.serverContent?.interrupted) {
              audioQueueRef.current.forEach(source => source.stop());
              audioQueueRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log("Live Session Closed");
            setIsLiveConnected(false);
          },
          onerror: (err) => {
            console.error("Live Session Error:", err);
            setIsLiveConnected(false);
          }
        }
      });
      
      liveClientRef.current = sessionPromise;

    } catch (error) {
      console.error("Failed to start live session:", error);
      alert("Could not access microphone or connect to servers.");
    }
  };

  const stopLiveSession = async () => {
    if (liveClientRef.current) {
      // There isn't a direct disconnect on the promise wrapper in some versions, 
      // but usually the session object has a close method or we just close contexts.
      // Based on docs provided, we need to handle cleanup manually mostly.
      // Assuming sessionPromise resolves to session which has close() isn't explicitly in the example for `ai.live.connect` return type,
      // but standard WebSocket closure is needed.
      // We will refresh the page state mainly.
    }

    // Cleanup Audio
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
    }
    if (inputSourceRef.current) inputSourceRef.current.disconnect();
    if (audioContextRef.current) await audioContextRef.current.close();
    if (outputContextRef.current) await outputContextRef.current.close();
    
    // Stop all tracks
    const stream = inputSourceRef.current?.mediaStream; 
    // Note: MediaStreamAudioSourceNode doesn't have mediaStream prop directly in TS standard sometimes, need reference to original stream
    // Simpler: reload page logic or just reset state is cleaner for this demo
    
    setIsLiveConnected(false);
    setVolumeLevel(0);
    window.location.reload(); // Hard reset to ensure all audio resources are freed perfectly for this demo
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isLiveConnected) {
        stopLiveSession();
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-140px)] flex flex-col">
      {/* Header / Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-full inline-flex border border-slate-700">
          <button 
            onClick={() => setActiveTab('text')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'text' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Chat & Files
          </button>
          <button 
            onClick={() => setActiveTab('voice')}
            className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'voice' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Voice Assistant
          </button>
        </div>
      </div>

      {/* TEXT MODE */}
      {activeTab === 'text' && (
        <div className="flex-1 bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-md">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                  {msg.image && (
                    <img src={msg.image} alt="User upload" className="max-w-full h-auto rounded-lg mb-3 border border-white/20" />
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className="text-[10px] opacity-50 mt-2 text-right">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center border border-slate-700">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-950 border-t border-slate-800">
             {selectedImage && (
               <div className="mb-2 relative inline-block">
                 <img src={selectedImage} alt="Preview" className="h-20 rounded-lg border border-cyan-500/50" />
                 <button 
                   onClick={() => setSelectedImage(null)}
                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                 >
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
               </div>
             )}
             <div className="flex gap-3">
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-full transition-colors"
                 title="Add Image"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
               </button>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept="image/*"
                 onChange={handleFileSelect}
               />
               
               <input
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                 placeholder="Type a message or describe an image..."
                 className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
               />
               
               <button 
                 onClick={handleSendMessage}
                 disabled={isTyping}
                 className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Send
               </button>
             </div>
          </div>
        </div>
      )}

      {/* VOICE MODE */}
      {activeTab === 'voice' && (
        <div className="flex-1 flex flex-col items-center justify-center relative bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md p-8">
           
           {/* Visualizer Circle */}
           <div className="relative w-64 h-64 flex items-center justify-center mb-12">
              {/* Outer Glow */}
              <div 
                className={`absolute inset-0 rounded-full bg-cyan-500 blur-3xl transition-opacity duration-100`}
                style={{ opacity: isLiveConnected ? 0.2 + (volumeLevel / 200) : 0 }}
              ></div>
              
              {/* Main Circle */}
              <div 
                className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-100 bg-slate-950 z-10 ${isLiveConnected ? 'border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.5)]' : 'border-slate-700'}`}
                style={{ transform: `scale(${isLiveConnected ? 1 + (volumeLevel / 500) : 1})` }}
              >
                 {isLiveConnected ? (
                   <div className="flex gap-1 h-12 items-center">
                     {[...Array(5)].map((_, i) => (
                       <div 
                          key={i} 
                          className="w-2 bg-cyan-400 rounded-full animate-[bounce_1s_infinite]"
                          style={{ 
                            height: `${Math.max(10, Math.random() * volumeLevel + 10)}%`,
                            animationDelay: `${i * 0.1}s` 
                          }}
                       ></div>
                     ))}
                   </div>
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                   </svg>
                 )}
              </div>
           </div>

           <h2 className="text-3xl font-bold text-white mb-4">
             {isLiveConnected ? "Listening..." : "ICY Voice Assistant"}
           </h2>
           <p className="text-slate-400 mb-12 text-center max-w-md">
             {isLiveConnected 
               ? "Go ahead, ask me anything! I'm listening in real-time."
               : "Connect to start a low-latency voice conversation with Icy. Powered by Gemini Live."}
           </p>

           {!isLiveConnected ? (
             <button 
               onClick={startLiveSession}
               className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 flex items-center gap-3"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
               START LIVE SESSION
             </button>
           ) : (
             <button 
               onClick={stopLiveSession}
               className="px-8 py-4 bg-red-500 hover:bg-red-400 text-white font-bold rounded-full text-lg shadow-lg transition-all flex items-center gap-3"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
               END SESSION
             </button>
           )}
        </div>
      )}
    </div>
  );
};

export default IcyAiPage;