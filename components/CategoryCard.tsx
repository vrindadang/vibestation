
import React from 'react';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import IconDisplay from './IconDisplay';

interface CategoryCardProps {
  name: string;
  count?: number;
  onClick: () => void;
  type: 'category' | 'subcategory';
  icon?: string;
  color?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, count, onClick, icon, color }) => {
  // Use category color or default vibe-accent
  const accentColorClass = color === 'vibe-mint' ? 'text-vibe-mint' : 
                          color === 'vibe-accent' ? 'text-vibe-accent' : 
                          color === 'slate-400' ? 'text-slate-400' : 'text-vibe-accent';
  
  const bgAccentColorClass = color === 'vibe-mint' ? 'bg-vibe-mint/5' : 
                            color === 'vibe-accent' ? 'bg-vibe-accent/5' : 
                            color === 'slate-400' ? 'bg-slate-100/50' : 'bg-vibe-accent/5';

  const hoverAccentBgClass = color === 'vibe-mint' ? 'group-hover:bg-vibe-mint' : 
                            color === 'vibe-accent' ? 'group-hover:bg-vibe-accent' : 
                            color === 'slate-400' ? 'group-hover:bg-slate-500' : 'group-hover:bg-vibe-accent';

  return (
    <div 
      onClick={onClick}
      className="group relative h-40 bg-white border border-vibe-accent/5 rounded-[2.5rem] p-8 cursor-pointer shadow-soft hover:shadow-xl active:scale-95 transition-all overflow-hidden"
    >
      {/* Dynamic Glow */}
      <div className={`absolute -top-12 -right-12 w-40 h-40 ${color === 'vibe-mint' ? 'bg-vibe-mint/5' : 'bg-vibe-accent/5'} blur-3xl rounded-full transition-opacity group-hover:opacity-100`}></div>
      
      <div className="relative flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div className={`p-4 rounded-[1.25rem] ${bgAccentColorClass} ${accentColorClass} ${hoverAccentBgClass} group-hover:text-white transition-all shadow-sm`}>
            {icon ? (
              <IconDisplay name={icon} size={24} strokeWidth={3} />
            ) : (
              <LayoutGrid size={24} strokeWidth={3} />
            )}
          </div>
          {count !== undefined && (
            <span className={`text-[12px] font-black ${color === 'vibe-mint' ? 'bg-vibe-mint/10 text-vibe-mint' : 'bg-vibe-accent/10 text-vibe-accent'} px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-black/5`}>
              {count} Units
            </span>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <h3 className="text-2xl font-black tracking-tighter group-hover:text-vibe-accent transition-colors truncate pr-4 uppercase italic">
              {name}
            </h3>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">
              {name === 'SKRM' ? 'Spirituality Sector' : name === 'DEF' ? 'Academic Sector' : 'Standard Sector'}
            </span>
          </div>
          <ArrowRight size={26} className="text-vibe-accent/20 group-hover:text-vibe-accent transform -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
