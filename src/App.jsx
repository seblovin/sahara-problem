import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, Edit2, X, User, MapPin, Briefcase, 
  Globe, Heart, Sparkles, Flame, Eye, Zap
} from 'lucide-react';

// --- Constants ---
const STATUS_OPTIONS = [
  'Talking', 'First Date', 'Second Date', 'Seeing Regularly', 
  'Exclusive', 'Casual', 'FWB', 'Ghosted', 'Ended'
];

const SKIN_COLORS = [
  '#ffe0bd', // Light 1
  '#fcdebb', // Light 2
  '#f1c27d', // Asian 1
  '#e0ac69', // Asian 2
  '#8d5524', // Dark 1
  '#3d2210'  // Dark 2
];

const INITIAL_PEOPLE = [
  {
    id: '1',
    name: 'Sebastian',
    age: '29',
    occupation: 'Game Dev',
    origin: 'Korean/German',
    city: 'Berlin',
    status: 'The one and only',
    myInterest: 10,
    theirInterest: 10,
    potential: 10,
    kinkiness: 5,
    socials: '@seblovin',
    notes: 'Very handsome and great biceps. Looks AI generated. Insanely good kisser',
    hairColor: '#0f172a',
    shirtColor: '#18181b',
    skinColor: '#f1c27d'
  }
];

// --- Components ---

const Logo = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12 md:w-14 md:h-14 drop-shadow-sm">
    <defs>
      <linearGradient id="dragon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="cat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="white" stroke="#f1f5f9" strokeWidth="2" />
    <path d="M 60 40 C 80 20, 100 40, 90 70 C 105 85, 90 100, 75 90" fill="none" stroke="url(#dragon-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 40 45 L 35 30 L 50 40 L 70 40 L 85 30 L 80 45 C 95 60, 95 85, 60 90 C 25 85, 25 60, 40 45 Z" fill="url(#cat-grad)" opacity="0.9" />
    <circle cx="50" cy="65" r="3" fill="white" />
    <circle cx="70" cy="65" r="3" fill="white" />
  </svg>
);

const DecorativeCat = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M 20 80 L 20 40 L 40 50 L 60 50 L 80 40 L 80 80 Z" fill="currentColor" opacity="0.05" />
    <circle cx="35" cy="60" r="4" fill="currentColor" opacity="0.1" />
    <circle cx="65" cy="60" r="4" fill="currentColor" opacity="0.1" />
    <path d="M 45 65 Q 50 70 55 65" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1" />
  </svg>
);

const DecorativeDragon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M 10 90 Q 30 40 60 50 Q 80 30 90 60 Q 70 80 60 60 Q 40 80 10 90" fill="currentColor" opacity="0.05" />
    <path d="M 40 40 L 50 20 L 60 40" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.1" />
    <circle cx="70" cy="55" r="3" fill="currentColor" opacity="0.1" />
  </svg>
);

const Tree = ({ className }) => (
  <svg viewBox="0 0 100 120" className={className}>
    <path d="M 45 120 L 45 60 L 55 60 L 55 120 Z" fill="#78350f" opacity="0.8" />
    <circle cx="50" cy="40" r="35" fill="#10b981" opacity="0.9" />
    <circle cx="30" cy="60" r="25" fill="#059669" opacity="0.9" />
    <circle cx="70" cy="60" r="25" fill="#059669" opacity="0.9" />
    <circle cx="50" cy="25" r="20" fill="#34d399" opacity="0.7"/>
  </svg>
);

const Grass = ({ className }) => (
  <svg viewBox="0 0 50 30" className={className}>
    <path d="M 10 30 Q 15 15 5 5" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <path d="M 25 30 Q 25 10 25 0" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
    <path d="M 40 30 Q 35 15 45 5" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const EmptyStateIcon = () => (
  <svg viewBox="0 0 200 120" className="w-48 h-32 mb-6 opacity-40">
    {/* Cat */}
    <path d="M 60 90 C 40 90, 30 80, 30 65 C 30 50, 45 40, 60 40 C 75 40, 90 50, 90 65 C 90 80, 80 90, 60 90 Z" fill="#cbd5e1" />
    <path d="M 40 45 L 35 30 L 50 42" fill="#cbd5e1" strokeLinejoin="round" />
    <path d="M 80 45 L 85 30 L 70 42" fill="#cbd5e1" strokeLinejoin="round" />
    <circle cx="50" cy="65" r="3" fill="#94a3b8" />
    <circle cx="70" cy="65" r="3" fill="#94a3b8" />
    {/* Dragon wrapped around */}
    <path d="M 120 40 C 150 40, 170 60, 160 90 C 130 110, 80 110, 50 105" fill="none" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
    <path d="M 155 60 L 175 50 L 165 75" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="160" cy="50" r="2" fill="#cbd5e1" />
    {/* Zzz */}
    <text x="85" y="30" fontSize="16" fill="#94a3b8" fontWeight="bold">Z</text>
    <text x="100" y="20" fontSize="12" fill="#94a3b8" fontWeight="bold">z</text>
  </svg>
);

const Avatar = ({ person, isDragging, isShaking, isMoving }) => {
  const nameLower = person.name.toLowerCase();
  const isSeb = nameLower === 'seb' || nameLower === 'sebastian';
  const [justLanded, setJustLanded] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setJustLanded(true);
      const timer = setTimeout(() => setJustLanded(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isDragging]);
  
  return (
    <div className={`relative w-24 h-32 flex items-center justify-center select-none group`}>
      <style>{`
        @keyframes walk-squash-stretch {
          0%, 100% { transform: translateY(0) scale(1.05, 0.95); }
          50% { transform: translateY(-12px) scale(0.95, 1.05); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px) rotate(-5deg); }
          75% { transform: translateX(6px) rotate(5deg); }
        }
        .animate-walk { animation: walk-squash-stretch 0.5s infinite alternate ease-in-out; }
        .animate-shake { animation: shake 0.2s infinite ease-in-out; }
        .state-dragging {
          transform: translateY(-15px) scale(0.85, 1.15);
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .state-landing {
          transform: translateY(5px) scale(1.15, 0.85);
          transition: transform 0.15s ease-out;
        }
        .state-idle {
          transform: translateY(0) scale(1, 1);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .animate-sway {
          animation: sway 2s infinite alternate ease-in-out;
          transform-origin: bottom center;
        }
        @keyframes sway {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(5deg); }
        }
      `}</style>
      
      <div className={`w-full h-full transform-origin-bottom
        ${isShaking ? 'animate-shake' : ''}
        ${isDragging ? 'state-dragging' : justLanded ? 'state-landing' : isMoving ? 'animate-walk' : 'state-idle'}
      `}>
        <svg viewBox="0 0 100 140" className={`w-full h-full drop-shadow-xl overflow-visible`}>
          <g stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            
            {/* Body */}
            {isSeb ? (
              <path d="M 12 70 C 12 60, 88 60, 88 70 C 88 80, 75 125, 65 125 L 35 125 C 25 125, 12 80, 12 70 Z" fill={person.shirtColor} />
            ) : (
              <rect x="26" y="65" width="48" height="60" rx="20" fill={person.shirtColor} />
            )}

            {/* Head */}
            <circle cx="50" cy="42" r="24" fill={person.skinColor || SKIN_COLORS[0]} stroke="none" />
            <circle cx="50" cy="42" r="24" fill="#ffffff" opacity="0.15" stroke="none" />
            <circle cx="50" cy="42" r="24" />

            {/* Hair */}
            <path d="M 26 42 C 26 15, 74 15, 74 42 C 74 30, 50 20, 26 42 Z" fill={person.hairColor} stroke="none" />
            <path d="M 26 42 C 26 15, 74 15, 74 42" stroke={person.hairColor} strokeWidth="6" />

            {/* Glasses for Seb */}
            {isSeb && (
              <g fill="#0f172a" stroke="none">
                <rect x="30" y="36" width="16" height="10" rx="3" />
                <rect x="54" y="36" width="16" height="10" rx="3" />
                <path d="M 44 40 L 56 40" stroke="#0f172a" strokeWidth="3" />
                <path d="M 32 38 L 40 38 M 56 38 L 64 38" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              </g>
            )}
          </g>
        </svg>

        {/* Pancake the Cat following Seb */}
        {isSeb && (
          <div className={`absolute -bottom-2 -left-10 w-14 h-14 pointer-events-none transition-transform duration-300 ${isMoving ? 'animate-bounce' : 'translate-y-1'}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Pancake's Tail */}
              <path d="M 80 80 Q 95 80 90 50" fill="none" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
              {/* Pancake's Body */}
              <path d="M 20 90 Q 20 50 50 50 Q 80 50 80 90 Z" fill="#f97316" />
              {/* Pancake's Ears */}
              <path d="M 20 55 L 25 25 L 45 45 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 80 55 L 75 25 L 55 45 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
              {/* Pancake's Face */}
              <circle cx="35" cy="70" r="3.5" fill="#333" />
              <circle cx="65" cy="70" r="3.5" fill="#333" />
              <path d="M 45 75 Q 50 82 55 75" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="50" cy="76" r="1.5" fill="#fca5a5" />
            </svg>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black text-orange-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-orange-100">
              Pancake
            </div>
          </div>
        )}
      </div>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-sm border border-slate-200/60 px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-slate-200/50 flex items-center gap-1.5 z-20">
        {person.name} {isSeb && <Sparkles size={12} className="text-orange-500" />}
      </div>
    </div>
  );
};

const PersonEntity = ({ person }) => {
  const [pos, setPos] = useState({ x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 });
  const [target, setTarget] = useState(pos);
  const [isDragging, setIsDragging] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPos = useRef(pos);
  const shakeTimeout = useRef(null);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setTarget({
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70
      });
    }, 4000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) return;
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0.5) {
      setIsMoving(true);
      const move = setTimeout(() => {
        setPos(prev => ({
          x: prev.x + dx * 0.02,
          y: prev.y + dy * 0.02
        }));
      }, 30);
      return () => clearTimeout(move);
    } else {
      setIsMoving(false);
    }
  }, [target, pos, isDragging]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    const rect = document.getElementById('playground-area').getBoundingClientRect();
    const clientX = e.clientX || e.touches?.[0].clientX;
    const clientY = e.clientY || e.touches?.[0].clientY;
    
    const clickX = ((clientX - rect.left) / rect.width) * 100;
    const clickY = ((clientY - rect.top) / rect.height) * 100;
    
    dragOffset.current = { x: clickX - pos.x, y: clickY - pos.y };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      const parent = document.getElementById('playground-area').getBoundingClientRect();
      const clientX = e.clientX || e.touches?.[0].clientX;
      const clientY = e.clientY || e.touches?.[0].clientY;

      const newX = ((clientX - parent.left) / parent.width) * 100 - dragOffset.current.x;
      const newY = ((clientY - parent.top) / parent.height) * 100 - dragOffset.current.y;

      const moveDist = Math.sqrt(Math.pow(newX - lastPos.current.x, 2) + Math.pow(newY - lastPos.current.y, 2));
      if (moveDist > 6) {
        setIsShaking(true);
        if (shakeTimeout.current) clearTimeout(shakeTimeout.current);
        shakeTimeout.current = setTimeout(() => setIsShaking(false), 400);
      }

      setPos({ x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) });
      lastPos.current = { x: newX, y: newY };
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`absolute touch-none`}
      style={{ 
        left: `${pos.x}%`, 
        top: `${pos.y}%`, 
        transform: `translate(-50%, -50%)`,
        zIndex: isDragging ? 100 : Math.round(pos.y),
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onPointerDown={handlePointerDown}
    >
      <Avatar 
        person={person} 
        isDragging={isDragging} 
        isShaking={isShaking} 
        isMoving={isMoving}
      />
    </div>
  );
};

export default function App() {
  // Load initial state from Local Storage or default to INITIAL_PEOPLE
  const [people, setPeople] = useState(() => {
    try {
      const savedData = localStorage.getItem('sahara-people-data');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
    return INITIAL_PEOPLE;
  });

  // Save to local storage whenever `people` state changes
  useEffect(() => {
    localStorage.setItem('sahara-people-data', JSON.stringify(people));
  }, [people]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', age: '', occupation: '', origin: '', city: '', status: 'Talking', 
    myInterest: 5, theirInterest: 5, potential: 5, kinkiness: 1, 
    socials: '', notes: '', hairColor: '#0f172a', shirtColor: '#f43f5e', skinColor: SKIN_COLORS[0]
  });

  const isNameSeb = formData.name.toLowerCase() === 'seb' || formData.name.toLowerCase() === 'sebastian';
  const currentStatusOptions = isNameSeb 
    ? [...STATUS_OPTIONS, 'The one and only'] 
    : STATUS_OPTIONS;

  const openModal = (candidate = null) => {
    if (candidate) {
      setFormData(candidate);
      setEditingId(candidate.id);
    } else {
      setFormData({
        name: '', age: '', occupation: '', origin: '', city: '', status: 'Talking', 
        myInterest: 5, theirInterest: 5, potential: 5, kinkiness: 1, 
        socials: '', notes: '', hairColor: '#0f172a', shirtColor: '#f97316', skinColor: SKIN_COLORS[0]
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    // Safety check: if user changes name AWAY from Seb, remove "The one and only"
    let finalStatus = formData.status;
    if (!isNameSeb && finalStatus === 'The one and only') {
      finalStatus = 'Talking';
    }

    const payload = { ...formData, status: finalStatus };

    if (editingId) {
      setPeople(people.map(p => p.id === editingId ? { ...payload, id: editingId } : p));
    } else {
      setPeople([...people, { ...payload, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const deleteCandidate = (id) => {
    setPeople(people.filter(p => p.id !== id));
  };

  const ENVIRONMENTS = {
    'Park': { bg: 'bg-emerald-50/90', dot: '#10b981', label: 'text-emerald-700', badge: 'bg-white/80' },
    'Bar': { bg: 'bg-amber-950/95', dot: '#fbbf24', label: 'text-amber-200', badge: 'bg-black/40' },
    'Bedroom': { bg: 'bg-purple-50/90', dot: '#a855f7', label: 'text-purple-700', badge: 'bg-white/80' },
    'Nightclub': { bg: 'bg-slate-950/95', dot: '#ec4899', label: 'text-pink-400', badge: 'bg-black/40' }
  };
  const [environment, setEnvironment] = useState('Park');

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-slate-800 p-4 md:p-8 selection:bg-orange-200">
      
      {/* Background ambient accents */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[40rem] h-[40rem] bg-pink-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[40rem] h-[40rem] bg-orange-100/40 rounded-full blur-3xl translate-x-[80%] translate-y-1/2"></div>
        <DecorativeCat className="absolute bottom-10 left-10 w-64 h-64 text-pink-300 opacity-60 animate-float-slow" />
        <DecorativeDragon className="absolute top-20 right-10 w-80 h-80 text-orange-300 opacity-60 animate-float-slower" />
        <DecorativeCat className="absolute top-1/4 left-1/4 w-32 h-32 text-pink-200 opacity-40 animate-float-slower" />
        <DecorativeDragon className="absolute bottom-1/4 right-1/4 w-40 h-40 text-orange-200 opacity-40 animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-white">
          <div className="flex items-center gap-5">
            <Logo />
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Sahara Problem</h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-500 mt-1">Dragon rider's favorite</p>
            </div>
          </div>
          <button 
            onClick={() => openModal()}
            className="group relative bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-slate-900/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Plus size={20} className="relative z-10" /> 
            <span className="relative z-10">Add Candidate</span>
          </button>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Playground Area */}
          <section className="xl:col-span-8 flex flex-col gap-6">
            <div 
              id="playground-area"
              className="bg-emerald-50/80 backdrop-blur-md rounded-[3rem] p-6 shadow-sm border border-white relative overflow-hidden h-[500px] md:h-[650px] flex-grow"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
              
              {/* Scenery */}
              <Tree className="absolute top-12 right-24 w-32 h-40 opacity-50 pointer-events-none" />
              <Tree className="absolute bottom-24 left-12 w-48 h-56 opacity-40 pointer-events-none" />
              <Tree className="absolute top-1/3 left-1/3 w-24 h-32 opacity-30 pointer-events-none" />
              
              <Grass className="absolute bottom-1/4 right-1/4 w-12 h-8 opacity-60 pointer-events-none" />
              <Grass className="absolute top-1/4 left-1/4 w-10 h-6 opacity-50 pointer-events-none" />
              <Grass className="absolute bottom-12 right-1/3 w-16 h-10 opacity-70 pointer-events-none" />
              <Grass className="absolute top-1/2 right-12 w-8 h-5 opacity-40 pointer-events-none" />

              <div className="absolute top-8 left-8 flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-100 shadow-sm z-20">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Active Territory</h2>
              </div>
              
              <div className="w-full h-full relative z-10">
                {people.map(person => (
                  <PersonEntity key={person.id} person={person} />
                ))}
                
                {people.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12">
                    <EmptyStateIcon />
                    <p className="text-xl font-bold text-slate-700">The field is empty</p>
                    <p className="text-sm text-slate-400 mt-2 max-w-xs leading-relaxed">Add a candidate to watch them roam the territory. Drag to interact.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* List Section */}
          <section className="xl:col-span-4 flex flex-col gap-6">
            
            {/* Body Count Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-orange-500/20 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
               <DecorativeDragon className="absolute -right-4 bottom-0 w-32 h-32 text-white opacity-10 group-hover:opacity-20 transition-opacity" />
               
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 relative z-10 flex items-center gap-2">
                 <Flame size={14} className="text-orange-500" /> Body Count
               </h3>
               <p className="text-7xl font-black relative z-10">{people.length}</p>
            </div>

            <div className="flex-grow space-y-4 max-h-[500px] xl:max-h-[calc(650px-160px)] overflow-y-auto pr-2 custom-scrollbar">
              {people.map(person => (
                <div 
                  key={person.id} 
                  className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <DecorativeCat className="absolute -bottom-4 -right-4 w-24 h-24 text-pink-100 opacity-50 pointer-events-none transform -rotate-12 group-hover:scale-110 transition-transform" />
                  <DecorativeDragon className="absolute -top-4 -right-4 w-24 h-24 text-orange-100 opacity-50 pointer-events-none transform rotate-12 group-hover:scale-110 transition-transform" />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner" style={{ backgroundColor: person.shirtColor + '15' }}>
                        <User size={20} style={{ color: person.shirtColor }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                          {person.name}
                          {(person.name.toLowerCase() === 'seb' || person.name.toLowerCase() === 'sebastian') && <Sparkles size={14} className="text-orange-500" />}
                        </h3>
                        <div className="flex gap-2 items-center mt-1.5">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${person.status === 'The one and only' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}>{person.status}</span>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 uppercase tracking-widest">{person.age || '??'}y</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(person)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><Edit2 size={16} className="text-slate-400 hover:text-slate-700" /></button>
                      <button onClick={() => deleteCandidate(person.id)} className="p-2 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} className="text-slate-300 hover:text-red-500" /></button>
                    </div>
                  </div>
                  
                  {/* Metric Summary Grid (Expanded) */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[11px] font-medium text-slate-500">
                      <div className="flex items-center gap-2 truncate bg-slate-50/80 px-2.5 py-1.5 rounded-lg"><MapPin size={12} className="text-slate-400" /> {person.city || 'Undisclosed'}</div>
                      <div className="flex items-center gap-2 truncate bg-slate-50/80 px-2.5 py-1.5 rounded-lg"><Briefcase size={12} className="text-slate-400" /> {person.occupation || 'N/A'}</div>
                      <div className="flex items-center gap-2 truncate bg-slate-50/80 px-2.5 py-1.5 rounded-lg"><Globe size={12} className="text-slate-400" /> {person.origin || 'N/A'}</div>
                      <div className="flex items-center gap-2 truncate bg-purple-50 px-2.5 py-1.5 rounded-lg text-purple-700"><Flame size={12} className="text-purple-400" /> {(person.name.toLowerCase() === 'seb' || person.name.toLowerCase() === 'sebastian') ? "Kink: Oh my god <3" : `Kink: ${person.kinkiness}/10`}</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
                      <div className="bg-pink-50 text-pink-700 py-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[8px] uppercase tracking-widest text-pink-400 mb-0.5">My Interest</span>
                        {person.myInterest}/10
                      </div>
                      <div className="bg-orange-50 text-orange-700 py-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[8px] uppercase tracking-widest text-orange-400 mb-0.5">Their Interest</span>
                        {person.theirInterest}/10
                      </div>
                      <div className="bg-amber-50 text-amber-700 py-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[8px] uppercase tracking-widest text-amber-400 mb-0.5">Potential</span>
                        {person.potential}/10
                      </div>
                    </div>

                    {person.notes && (
                      <div className="mt-2 text-[11px] text-slate-500 italic bg-slate-50/80 p-3 rounded-xl border border-slate-100 line-clamp-3">
                        "{person.notes}"
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[95vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl px-8 md:px-10 py-6 border-b border-slate-100 z-20 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingId ? 'Edit Profile' : 'New Candidate'}</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Update the tracking data for this candidate.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
              
              {/* Visual Configurator */}
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <DecorativeCat className="absolute bottom-2 right-2 w-20 h-20 text-slate-300 pointer-events-none" />
                
                <div className="shrink-0 scale-110 drop-shadow-xl bg-white p-6 rounded-3xl border border-slate-100 relative z-10">
                  <Avatar person={formData} isMoving={false} />
                </div>
                
                <div className="flex-1 space-y-5 relative z-10">
                  {/* Skin Tone Selector */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Skin Tone</label>
                    <div className="flex gap-2">
                      {SKIN_COLORS.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData({...formData, skinColor: color})}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.skinColor === color ? 'border-slate-800 scale-110' : 'border-transparent hover:scale-105 shadow-sm'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 w-full pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Hair Tone</label>
                      <div className="p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <input 
                          type="color" value={formData.hairColor} 
                          onChange={e => setFormData({...formData, hairColor: e.target.value})}
                          className="w-full h-10 rounded-xl cursor-pointer border-0 p-0 appearance-none bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Shirt Fabric</label>
                      <div className="p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <input 
                          type="color" value={formData.shirtColor} 
                          onChange={e => setFormData({...formData, shirtColor: e.target.value})}
                          className="w-full h-10 rounded-xl cursor-pointer border-0 p-0 appearance-none bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Candidate Name *</label>
                  <input 
                    required placeholder="E.g. Alex"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all outline-none font-bold text-slate-800"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Current Phase</label>
                  <select 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all outline-none font-bold text-slate-800 appearance-none"
                    value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    {currentStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Age', key: 'age', type: 'number', ph: '25' },
                  { label: 'City', key: 'city', type: 'text', ph: 'New York' },
                  { label: 'Work', key: 'occupation', type: 'text', ph: 'Designer' },
                  { label: 'Origin', key: 'origin', type: 'text', ph: 'Italian' }
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                    <input 
                      type={field.type} placeholder={field.ph}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-50 font-medium text-sm outline-none transition-all"
                      value={formData[field.key]} onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                    />
                  </div>
                ))}
              </div>

              {/* Metrics (Sliders) */}
              <div className="bg-slate-900 p-8 rounded-[2rem] grid grid-cols-1 md:grid-cols-2 gap-8 shadow-inner relative overflow-hidden">
                <DecorativeDragon className="absolute top-2 right-2 w-24 h-24 text-white opacity-5 pointer-events-none" />
                {[
                  { label: 'My Interest', key: 'myInterest' },
                  { label: 'Their Interest', key: 'theirInterest' },
                  { label: 'Potential', key: 'potential' },
                  { label: 'Kinkiness', key: 'kinkiness' }
                ].map(f => (
                  <div key={f.key} className="relative z-10">
                    <div className="flex justify-between font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                      <span>{f.label}</span>
                      <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{formData[f.key]} / 10</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-orange-500"
                      value={formData[f.key]} onChange={e => setFormData({...formData, [f.key]: parseInt(e.target.value)})}
                    />
                  </div>
                ))}
              </div>

              {/* Extras */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Social Handle</label>
                  <input 
                    placeholder="@username" 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all outline-none font-medium"
                    value={formData.socials} onChange={e => setFormData({...formData, socials: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Case Notes</label>
                  <textarea 
                    rows="3" placeholder="Met at a coffee shop. Good vibes..."
                    className="w-full px-6 py-5 rounded-2xl bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all outline-none font-medium resize-none leading-relaxed"
                    value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {editingId ? 'Save Changes' : 'Confirm Entry'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]::-webkit-color-swatch { border: none; border-radius: 8px; }

        @keyframes float-sway {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-slow { animation: float-sway 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-sway 12s ease-in-out infinite reverse; }
      `}</style>
    </div>
  );
}