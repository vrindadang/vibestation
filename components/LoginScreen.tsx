
import React, { useState } from 'react';
import { ArrowRight, Lock, User, Eye, EyeOff, Zap } from 'lucide-react';
import Logo from './Logo';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (id === 'admin' && password === 'password') {
        onLogin();
      } else {
        setError('UNAUTHORIZED SIGNAL');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-vibe-bg text-vibe-text p-10 animate-fade-in relative overflow-hidden">
      {/* Background Cyber Blurs */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-vibe-accent/10 blur-[130px] rounded-full animate-float"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] bg-vibe-mint/10 blur-[160px] rounded-full"></div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full z-10">
        <div className="mb-14">
          <div className="w-24 h-24 bg-vibe-accent rounded-[2.5rem] flex items-center justify-center mb-10 shadow-neon animate-float">
            <Logo className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.8] mb-8 uppercase italic">
            THE <br/> <span className="text-vibe-accent">STATION</span>
          </h1>
          <div className="flex items-center gap-3">
             <span className="w-12 h-1 bg-vibe-mint rounded-full"></span>
             <p className="text-slate-300 font-black text-xs uppercase tracking-[0.4em] leading-none">
               VibeCoding Club Portal
             </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-vibe-accent/5 text-vibe-accent p-6 rounded-[2rem] text-xs font-black border border-vibe-accent/10 animate-fade-in uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <div className="relative group">
            <User className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-vibe-accent transition-colors z-10" size={24} />
            <input 
              type="text" value={id} onChange={e => setId(e.target.value)}
              className="w-full bg-white border border-vibe-accent/5 rounded-[2rem] py-7 pl-20 pr-6 text-vibe-text font-black placeholder:text-slate-200 shadow-soft focus:ring-4 focus:ring-vibe-accent/5 outline-none transition-all uppercase tracking-tighter text-lg relative"
              placeholder="IDENTIFIER"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-vibe-accent transition-colors z-10" size={24} />
            <input 
              type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-vibe-accent/5 rounded-[2rem] py-7 pl-20 pr-20 text-vibe-text font-black placeholder:text-slate-200 shadow-soft focus:ring-4 focus:ring-vibe-accent/5 outline-none transition-all uppercase tracking-tighter text-lg relative"
              placeholder="ACCESS CODE"
            />
            <button 
              type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-300 hover:text-vibe-accent transition-colors z-10"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center gap-5 bg-vibe-text text-white py-7 rounded-[2.25rem] font-black text-2xl active:scale-[0.96] transition-all shadow-2xl mt-10 hover:shadow-vibe-accent/20"
          >
            {isLoading ? (
              <div className="w-8 h-8 border-[5px] border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>INITIALIZE <ArrowRight size={30} strokeWidth={3} /></>
            )}
          </button>
        </form>

        <div className="mt-20 pt-10 border-t border-vibe-accent/5 text-center">
          <p className="text-[10px] font-black tracking-[0.5em] text-slate-200 uppercase">
            ROOT: admin / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
