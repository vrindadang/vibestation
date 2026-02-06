
import React, { useState } from 'react';
import { AppEntry } from '../types';
import { ArrowUpRight, Zap } from 'lucide-react';
import Logo from './Logo';

interface AppCardProps {
  app: AppEntry;
  index: number;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const [imageError, setImageError] = useState(false);

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (e) { return ''; }
  };

  const faviconUrl = getFaviconUrl(app.url);

  return (
    <a 
      href={app.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block bg-white border border-vibe-accent/5 rounded-[2.5rem] p-6 shadow-soft hover:shadow-xl hover:border-vibe-accent/20 transition-all duration-300 active:scale-[0.96]"
    >
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-vibe-accent/5 border border-vibe-accent/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
          {!imageError && faviconUrl ? (
            <img 
              src={faviconUrl} 
              alt={app.name} 
              className="w-10 h-10 object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-vibe-accent">
              <Logo className="w-10 h-10" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-black text-vibe-text group-hover:text-vibe-accent transition-colors truncate uppercase italic tracking-tighter">
              {app.name}
            </h3>
            <div className="p-1.5 bg-vibe-accent/5 rounded-full group-hover:bg-vibe-accent group-hover:text-white transition-colors">
              <ArrowUpRight size={16} strokeWidth={3} />
            </div>
          </div>
          <p className="text-sm text-slate-400 font-bold truncate leading-tight tracking-tight">
            {app.description || 'System Ready'}
          </p>
        </div>
      </div>
    </a>
  );
};

export default AppCard;
