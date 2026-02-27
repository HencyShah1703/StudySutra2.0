import React from 'react';
    import { useMaterials } from '../context/MaterialContext';
    import { motion } from 'framer-motion';
    import { BookOpen, Layers, HelpCircle, MessageSquare, AlertCircle, ArrowRight } from 'lucide-react';
    import { Link } from 'react-router-dom';

    export default function Dashboard() {
      const { materials, activeMaterial } = useMaterials();

      const stats = [
        { label: 'Total Materials', value: materials.length, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Flashcards Sets', value: materials.length > 0 ? 1 : 0, icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Quizzes Taken', value: materials.length > 0 ? 2 : 0, icon: HelpCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { label: 'AI Chat Sessions', value: materials.length > 0 ? 3 : 0, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10' },
      ];

      return (
        <div className="space-y-8 pb-12">
          {/* Supabase Notice */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">System Notice</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                Please connect Supabase to enable the related functionality (Auth, Storage, and Real Database Sync). 
                The current interface operates with local state for demonstration purposes.
              </p>
            </div>
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold font-sans mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Here's what's happening with your studies today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-sans">Active Material</h2>
                  <Link to="/materials" className="text-sm text-primary hover:underline font-medium flex items-center">
                    View all <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                
                {activeMaterial ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-accent/50 rounded-lg border border-border/50">
                      <h3 className="font-semibold text-lg mb-2">{activeMaterial.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {activeMaterial.content}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link to="/flashcards" className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-md font-medium hover:bg-primary/20 transition-colors">
                          Generate Flashcards
                        </Link>
                        <Link to="/quiz" className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-md font-medium hover:bg-primary/20 transition-colors">
                          Take Quiz
                        </Link>
                        <Link to="/chat" className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-md font-medium hover:bg-primary/20 transition-colors">
                          Ask AI
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No active material selected.</p>
                    <Link to="/materials" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Select or Upload
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold font-sans mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Link to="/materials" className="flex items-center p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <BookOpen className="w-5 h-5 text-primary group-hover:text-current" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Upload New Material</h4>
                      <p className="text-xs text-muted-foreground">PDF or Text formats</p>
                    </div>
                  </Link>
                  <Link to="/chat" className="flex items-center p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <MessageSquare className="w-5 h-5 text-green-500 group-hover:text-current" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Start AI Chat</h4>
                      <p className="text-xs text-muted-foreground">Discuss your notes</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }