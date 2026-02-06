
import React, { useState } from 'react';
import { X, Hash } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  type: 'Category' | 'Sub-Category';
  parentName?: string;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAdd, type, parentName }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-8 bg-vibe-text/10 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-sm border border-vibe-accent/5 shadow-sheet overflow-hidden animate-spring-up">
        <div className="flex justify-between items-center p-10 pb-6">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">New Hub</h2>
            {parentName && <p className="text-[10px] font-black text-vibe-mint mt-1 uppercase tracking-[0.2em]">Grouped: {parentName}</p>}
          </div>
          <button onClick={onClose} className="p-3 bg-vibe-accent/5 rounded-2xl text-vibe-accent hover:bg-vibe-accent hover:text-white transition-all">
            <X size={22} strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 pt-4">
          <div className="mb-10">
            <div className="relative">
              <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-vibe-accent/20" size={24} />
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Group Name..."
                className="w-full bg-slate-50 border border-vibe-accent/5 rounded-[1.75rem] px-16 py-6 text-vibe-text font-black focus:ring-4 focus:ring-vibe-accent/5 outline-none transition-all placeholder:text-slate-200 uppercase tracking-tight text-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 bg-vibe-accent text-white rounded-[1.75rem] font-black text-xl shadow-neon active:scale-[0.96] transition-all uppercase italic tracking-tighter"
          >
            Create Sector
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
