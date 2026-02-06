
import React, { useState, useEffect } from 'react';
import { X, Link2, Type, Layout } from 'lucide-react';
import { AppEntry, Category } from '../types';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Omit<AppEntry, 'id' | 'createdAt'>) => void;
  categories: Category[];
  initialCategoryId?: string;
}

const AddAppModal: React.FC<AddAppModalProps> = ({ 
  isOpen, onClose, onAdd, categories, initialCategoryId 
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedCategoryId(initialCategoryId || '');
      setName('');
      setUrl('');
      setDescription('');
    }
  }, [isOpen, initialCategoryId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) return;
    onAdd({
      name,
      url: url.startsWith('http') ? url : `https://${url}`,
      description,
      categoryId: selectedCategoryId,
      subCategoryId: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-vibe-text/20 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white border-t border-vibe-accent/5 rounded-t-[3.5rem] shadow-sheet p-12 animate-spring-up overflow-y-auto max-h-[94vh]"
      >
        <div className="w-16 h-2 bg-slate-100 rounded-full mx-auto mb-10"></div>
        
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Mount Tool</h2>
          <button onClick={onClose} className="p-4 bg-vibe-accent/5 rounded-[1.5rem] text-vibe-accent hover:bg-vibe-accent hover:text-white transition-all">
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-3">
            <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-300 ml-2">App Name</label>
            <div className="relative">
              <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-vibe-accent/20 z-10" size={24} />
              <input
                required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-slate-50 border border-vibe-accent/5 rounded-[2rem] py-6 pl-20 pr-6 text-vibe-text font-black focus:ring-4 focus:ring-vibe-accent/5 focus:bg-white outline-none transition-all placeholder:text-slate-200 text-lg uppercase tracking-tight relative"
                placeholder="e.g. Photoshop"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-300 ml-2">Access Link</label>
            <div className="relative">
              <Link2 className="absolute left-6 top-1/2 -translate-y-1/2 text-vibe-accent/20 z-10" size={24} />
              <input
                required value={url} onChange={e => setUrl(e.target.value)}
                className="w-full bg-slate-50 border border-vibe-accent/5 rounded-[2rem] py-6 pl-20 pr-6 text-vibe-text font-black focus:ring-4 focus:ring-vibe-accent/5 focus:bg-white outline-none transition-all placeholder:text-slate-200 text-lg relative"
                placeholder="vercel.app/..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-300 ml-2">Launch Sector</label>
            <div className="relative">
              <Layout className="absolute left-6 top-1/2 -translate-y-1/2 text-vibe-accent/20 z-10" size={24} />
              <select
                value={selectedCategoryId}
                onChange={e => setSelectedCategoryId(e.target.value)}
                className="w-full bg-slate-50 border border-vibe-accent/5 rounded-[2rem] py-6 pl-20 pr-12 text-vibe-text font-black focus:ring-4 focus:ring-vibe-accent/5 focus:bg-white outline-none appearance-none transition-all text-lg uppercase tracking-tight relative"
              >
                <option value="">Select sector</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-7 bg-vibe-accent text-white rounded-[2.25rem] font-black text-2xl shadow-neon active:scale-[0.97] transition-all mt-6 uppercase italic tracking-tighter"
          >
            Confirm Launch
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppModal;
