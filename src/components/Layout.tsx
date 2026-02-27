import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Library, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  Map, 
  Globe,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/materials', label: 'My Materials', icon: Library },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/quiz', label: 'Quiz', icon: HelpCircle },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/community', label: 'Students Community', icon: Globe },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { materials, activeMaterialId, setActiveMaterialId } = useAppContext();
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center px-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.5)]">
              <Layers size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Study Sutra <span className="text-accent">AI</span>
            </h1>
          </div>
          <button 
            className="ml-auto lg:hidden text-muted-foreground hover:text-white"
            onClick={closeMobileMenu}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-accent/10 text-accent font-medium' 
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon 
                  size={20} 
                  className={isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-white transition-colors'} 
                />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-blue-500 flex items-center justify-center text-white font-medium shadow-lg">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Student</p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between px-6 lg:px-12 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-white/5 lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-medium text-white hidden sm:block">
              {NAV_ITEMS.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex items-center gap-3 bg-card border border-border rounded-full py-2 pl-4 pr-3 hover:border-accent/50 transition-colors">
              <FileText size={16} className="text-muted-foreground" />
              <select 
                value={activeMaterialId || ''}
                onChange={(e) => setActiveMaterialId(e.target.value || null)}
                className="bg-transparent text-sm text-white focus:outline-none appearance-none pr-6 cursor-pointer max-w-[150px] sm:max-w-[200px] truncate"
              >
                <option value="" className="bg-card text-muted-foreground">Select Active Material</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id} className="bg-card text-white">
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}