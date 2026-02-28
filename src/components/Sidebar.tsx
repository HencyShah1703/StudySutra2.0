import React from 'react';
    import { NavLink } from 'react-router-dom';
    import { LayoutDashboard, BookOpen, Layers, HelpCircle, MessageSquare, BrainCircuit } from 'lucide-react';

    const Sidebar = () => {
      const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/materials', label: 'My Materials', icon: BookOpen },
        { path: '/flashcards', label: 'Flashcards', icon: Layers },
        { path: '/quiz', label: 'Quiz', icon: HelpCircle },
        { path: '/chat', label: 'AI Chat', icon: MessageSquare },
        { path: '/comm', label: 'Sudent Community', icon: MessageSquare },
      ];

      return (
        <aside className="w-64 hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
          <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
            <BrainCircuit className="w-6 h-6 text-primary mr-3" />
            <span className="font-sans font-bold text-lg text-sidebar-foreground tracking-tight">
              Study Sutra AI
            </span>
          </div>
          
          <nav className="flex-1 py-6 px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="bg-sidebar-accent rounded-lg p-4 text-xs text-sidebar-foreground">
              <p className="font-semibold mb-1">Need help?</p>
              <p className="text-muted-foreground mb-3">Check out our documentation or contact support.</p>
              <button className="w-full py-2 bg-background border border-border rounded-md hover:bg-accent transition-colors font-medium">
                Documentation
              </button>
            </div>
          </div>
        </aside>
      );
    };

    export default Sidebar;