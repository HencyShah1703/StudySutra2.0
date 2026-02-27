import React, { useState } from 'react';
    import { useMaterials } from '../context/MaterialContext';
    import { ChevronDown, FileText, Menu, Search, User } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    interface TopbarProps {
      onMenuClick: () => void;
    }

    const Topbar = ({ onMenuClick }: TopbarProps) => {
      const { materials, activeMaterialId, setActiveMaterialId } = useMaterials();
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

      const activeMaterial = materials.find(m => m.id === activeMaterialId);

      return (
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 mr-2 text-muted-foreground hover:text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden md:flex relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-full text-sm outline-none transition-all w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Active Material Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-accent/50 hover:bg-accent border border-border rounded-lg text-sm font-medium transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span className="max-w-[120px] md:max-w-[200px] truncate">
                  {activeMaterial ? activeMaterial.title : 'Select Material'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Active Material
                      </p>
                      {materials.length === 0 ? (
                        <p className="px-2 py-3 text-sm text-muted-foreground text-center">No materials found.</p>
                      ) : (
                        <div className="max-h-64 overflow-y-auto">
                          {materials.map(mat => (
                            <button
                              key={mat.id}
                              onClick={() => {
                                setActiveMaterialId(mat.id);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center space-x-2 transition-colors ${
                                mat.id === activeMaterialId 
                                  ? 'bg-primary/10 text-primary font-medium' 
                                  : 'hover:bg-accent text-foreground'
                              }`}
                            >
                              <FileText className="w-4 h-4 flex-shrink-0 opacity-70" />
                              <span className="truncate">{mat.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white shadow-sm border-2 border-background cursor-pointer hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>
      );
    };

    export default Topbar;