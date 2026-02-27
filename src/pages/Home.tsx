import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  Target, 
  Zap, 
  AlertCircle, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  Globe 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { materials, activeMaterialId } = useAppContext();
  const activeMaterial = materials.find(m => m.id === activeMaterialId);

  return (
    <div className="space-y-12">
      {/* Alert Banner for Supabase Constraint */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200"
      >
        <AlertCircle size={20} className="text-blue-400" />
        <p className="text-sm">
          Please connect Supabase to enable the related functionality. Secure server APIs, Storage, and RLS will be active once connected.
        </p>
      </motion.div>

      <section className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 lg:p-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Supercharge your studies with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500 glow-text">AI Context</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Upload your course materials and let Study Sutra generate personalized flashcards, quizzes, and intelligent roadmaps instantly.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/materials" className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)] transition-all transform hover:-translate-y-0.5">
              Upload Material
            </Link>
            <Link to="/roadmap" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
              Create Roadmap
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={BookOpen} 
          title="Total Materials" 
          value={materials.length.toString()} 
          subtitle="Ready for AI processing"
          delay={0.1}
        />
        <StatCard 
          icon={Target} 
          title="Active Roadmap" 
          value="None" 
          subtitle="Generate to start tracking"
          delay={0.2}
        />
        <StatCard 
          icon={Zap} 
          title="AI Insights" 
          value={activeMaterial ? "Ready" : "Waiting"} 
          subtitle={activeMaterial ? `Context: ${activeMaterial.title}` : "Select material to begin"}
          delay={0.3}
          highlight={!!activeMaterial}
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard to="/flashcards" icon={Layers} title="Flashcards" desc="Review active notes" />
          <ActionCard to="/quiz" icon={HelpCircle} title="Take a Quiz" desc="Test your knowledge" />
          <ActionCard to="/chat" icon={MessageSquare} title="AI Tutor" desc="Ask about materials" />
          <ActionCard to="/community" icon={Globe} title="Community" desc="Explore student notes" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, delay, highlight = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`p-6 rounded-2xl border ${highlight ? 'bg-accent/5 border-accent/30 shadow-[0_0_30px_rgba(138,43,226,0.1)]' : 'bg-card border-border'} relative overflow-hidden group hover:border-white/20 transition-colors`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${highlight ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted-foreground'}`}>
          <Icon size={24} />
        </div>
      </div>
      <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
      <p className="text-sm font-medium text-gray-300">{title}</p>
      <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
    </motion.div>
  );
}

function ActionCard({ to, icon: Icon, title, desc }: any) {
  return (
    <Link to={to}>
      <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-[0_0_20px_rgba(138,43,226,0.15)] transition-all group h-full flex flex-col items-start cursor-pointer transform hover:-translate-y-1">
        <Icon size={24} className="text-muted-foreground group-hover:text-accent transition-colors mb-4" />
        <h4 className="text-base font-semibold text-white mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}