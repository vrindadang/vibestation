
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, LogOut, ChevronRight, Home, LayoutGrid, Zap, Settings, ArrowRight } from 'lucide-react';
import { AppEntry, Category } from './types';
import { STORAGE_KEY, CATEGORIES_STORAGE_KEY } from './constants';
import AppCard from './components/AppCard';
import CategoryCard from './components/CategoryCard';
import AddAppModal from './components/AddAppModal';
import AddCategoryModal from './components/AddCategoryModal';
import LoginScreen from './components/LoginScreen';
import Logo from './components/Logo';
import { generateAppDetails } from './services/geminiService';

type ViewState = 
  | { type: 'HOME' }
  | { type: 'CATEGORY'; categoryId: string }
  | { type: 'SUBCATEGORY'; categoryId: string; subCategoryId: string }
  | { type: 'SEARCH' };

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [viewState, setViewState] = useState<ViewState>({ type: 'HOME' });
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authSession = localStorage.getItem('vibe_auth_session');
    if (authSession === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const savedApps = localStorage.getItem(STORAGE_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    
    if (savedCategories) {
      try { 
        const parsed = JSON.parse(savedCategories);
        // Migration to ensure icons exist if missing in storage
        const migrated = parsed.map((cat: Category) => {
          if (cat.name === 'SKRM' && !cat.icon) return { ...cat, icon: 'Sparkles', color: 'vibe-accent' };
          if (cat.name === 'DEF' && !cat.icon) return { ...cat, icon: 'GraduationCap', color: 'vibe-mint' };
          return cat;
        });
        setCategories(migrated); 
      } catch (e) { console.error(e); }
    } else {
      const defaults: Category[] = [
        { id: 'cat-skrm', name: 'SKRM', subCategories: [], icon: 'Sparkles', color: 'vibe-accent' },
        { id: 'cat-def', name: 'DEF', subCategories: [], icon: 'GraduationCap', color: 'vibe-mint' },
        { id: 'cat-others', name: 'Others', subCategories: [], icon: 'LayoutGrid', color: 'slate-400' }
      ];
      setCategories(defaults);
    }

    if (savedApps) {
      try { setApps(JSON.parse(savedApps)); } catch (e) { console.error(e); }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    }
  }, [apps, categories, isLoading]);

  const handleLogin = () => {
    localStorage.setItem('vibe_auth_session', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('vibe_auth_session');
    setIsAuthenticated(false);
  };

  const handleAddApp = async (appData: Omit<AppEntry, 'id' | 'createdAt'>) => {
    let finalDescription = appData.description;
    if (!finalDescription) {
      try {
        const details = await generateAppDetails(appData.name, appData.url);
        if (details) finalDescription = details.description;
      } catch (err) { console.error(err); }
    }
    const newApp: AppEntry = { ...appData, description: finalDescription || '', id: Date.now().toString(), createdAt: Date.now() };
    setApps(prev => [...prev, newApp]);
  };

  const filteredApps = useMemo(() => {
    let result = apps;
    if (viewState.type === 'CATEGORY') {
      result = result.filter(app => app.categoryId === viewState.categoryId);
    } else if (viewState.type === 'SUBCATEGORY') {
      result = result.filter(app => app.categoryId === viewState.categoryId && app.subCategoryId === viewState.subCategoryId);
    }
    if (searchTerm && (viewState.type === 'SEARCH' || searchTerm.length > 0)) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(app => app.name.toLowerCase().includes(lower) || app.description.toLowerCase().includes(lower));
    }
    return result;
  }, [apps, viewState, searchTerm]);

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="flex flex-col min-h-screen text-vibe-text font-sans selection:bg-vibe-accent/20 selection:text-vibe-accent pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 pt-6 pb-4 glass border-b border-vibe-accent/5">
        <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setViewState({ type: 'HOME' })}>
            <div className="bg-vibe-accent text-white p-2.5 rounded-2xl shadow-neon group-hover:rotate-12 transition-transform">
              <Logo className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">VIBE station</h1>
          </div>
          <button 
            onClick={() => setViewState({ type: 'SEARCH' })}
            className={`p-2.5 rounded-2xl transition-all ${viewState.type === 'SEARCH' ? 'bg-vibe-accent text-white shadow-neon' : 'bg-slate-100/50 text-slate-400'}`}
          >
            <Search size={22} />
          </button>
        </div>
      </header>

      {/* Main Context */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-8 animate-fade-in">
        
        {/* Search Mode */}
        {viewState.type === 'SEARCH' && (
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-vibe-accent/30" size={24} />
              <input 
                autoFocus
                type="text"
                placeholder="Jump to any app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-vibe-accent/10 rounded-[2rem] px-16 py-6 text-xl shadow-soft focus:ring-4 focus:ring-vibe-accent/5 outline-none transition-all placeholder:text-slate-300 font-bold"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4">
              {filteredApps.length > 0 ? (
                filteredApps.map((app, i) => <AppCard key={app.id} app={app} index={i} />)
              ) : searchTerm ? (
                <div className="text-center py-20">
                  <p className="text-slate-300 font-black text-xl tracking-tighter uppercase italic">Nothing found</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Home/Category Mode */}
        {viewState.type !== 'SEARCH' && (
          <div className="space-y-10">
            {/* Context Nav */}
            <div className="flex items-center gap-2 text-slate-300 text-xs font-black uppercase tracking-[0.2em]">
              <span className="cursor-pointer hover:text-vibe-accent transition-colors" onClick={() => setViewState({ type: 'HOME' })}>Hub</span>
              {viewState.type !== 'HOME' && (
                <>
                  <ChevronRight size={14} className="text-vibe-accent/20" />
                  <span className="text-vibe-text">
                    {categories.find(c => c.id === viewState.categoryId)?.name}
                  </span>
                </>
              )}
            </div>

            {/* Content Heading */}
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">
                  {viewState.type === 'HOME' ? 'Launchpad' : categories.find(c => c.id === viewState.categoryId)?.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-8 h-1 bg-vibe-accent rounded-full"></span>
                  <p className="text-vibe-mint font-black uppercase text-[10px] tracking-[0.3em]">
                    {viewState.type === 'HOME' ? `${apps.length} active units` : `${filteredApps.length} in section`}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAppModalOpen(true)}
                className="bg-vibe-accent text-white p-5 rounded-3xl shadow-neon active:scale-90 transition-transform hover:scale-105"
              >
                <Plus size={28} strokeWidth={3} />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {viewState.type === 'HOME' ? (
                categories.map(cat => (
                  <CategoryCard 
                    key={cat.id} 
                    name={cat.name} 
                    type="category" 
                    icon={cat.icon}
                    color={cat.color}
                    count={apps.filter(a => a.categoryId === cat.id).length}
                    onClick={() => setViewState({ type: 'CATEGORY', categoryId: cat.id })} 
                  />
                ))
              ) : (
                filteredApps.map((app, i) => <AppCard key={app.id} app={app} index={i} />)
              )}
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-vibe-accent/5 pb-safe rounded-t-[2.5rem]">
        <div className="max-w-2xl mx-auto flex items-center justify-around py-6 px-4">
          <button 
            onClick={() => setViewState({ type: 'HOME' })}
            className={`flex flex-col items-center gap-2 transition-all ${viewState.type === 'HOME' ? 'text-vibe-accent scale-110' : 'text-slate-300 hover:text-vibe-accent/60'}`}
          >
            <Home size={26} strokeWidth={viewState.type === 'HOME' ? 3 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Home</span>
          </button>
          <button 
            onClick={() => setViewState({ type: 'SEARCH' })}
            className={`flex flex-col items-center gap-2 transition-all ${viewState.type === 'SEARCH' ? 'text-vibe-accent scale-110' : 'text-slate-300 hover:text-vibe-accent/60'}`}
          >
            <Search size={26} strokeWidth={viewState.type === 'SEARCH' ? 3 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Jump</span>
          </button>
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex flex-col items-center gap-2 text-slate-300 active:text-vibe-accent transition-colors"
          >
            <LayoutGrid size={26} />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Grid</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center gap-2 text-slate-300 hover:text-vibe-accent transition-colors"
          >
            <LogOut size={26} />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Out</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <AddAppModal 
        isOpen={isAppModalOpen} 
        onClose={() => setIsAppModalOpen(false)} 
        onAdd={handleAddApp} 
        categories={categories} 
        initialCategoryId={viewState.type === 'CATEGORY' ? viewState.categoryId : undefined}
      />
      <AddCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
        onAdd={(name) => setCategories([...categories, { id: `cat-${Date.now()}`, name, subCategories: [], icon: 'LayoutGrid', color: 'slate-400' }])} 
        type="Category" 
      />
    </div>
  );
};

export default App;
