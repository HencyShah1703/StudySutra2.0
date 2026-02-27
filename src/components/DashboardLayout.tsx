import React, { useState } from 'react';
    import { Outlet } from 'react-router-dom';
    import Sidebar from './Sidebar';
    import Topbar from './Topbar';
    import { motion, AnimatePresence } from 'framer-motion';
    import { X } from 'lucide-react';

    const DashboardLayout = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      return (
        <div className="flex h-screen bg-background overflow-hidden">
          <Sidebar />

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  className="fixed inset-y-0 left-0 w-64 bg-sidebar z-50 lg:hidden shadow-2xl flex flex-col"
                >
                  <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                    <span className="font-sans font-bold text-lg text-sidebar-foreground">Study Sutra</span>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Clone of sidebar nav for mobile simplicity */}
                  <div className="flex-1 overflow-y-auto" onClick={() => setIsMobileMenuOpen(false)}>
                    <Sidebar />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-7xl mx-auto h-full">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      );
    };

    export default DashboardLayout;