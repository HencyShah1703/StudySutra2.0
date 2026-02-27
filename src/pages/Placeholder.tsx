import React from 'react';
import { Settings, Wrench } from 'lucide-react';

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 mb-8 relative">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-full h-full bg-card border border-border rounded-2xl flex items-center justify-center shadow-2xl">
          <Wrench size={40} className="text-muted-foreground" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
        {title} <span className="text-accent glow-text">Coming Soon</span>
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
        This module is currently a page shell as per framework constraints. Use Meku to generate the full functional content for this page.
      </p>

      <div className="mt-10 px-6 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
        <Settings size={20} className="text-accent" />
        <span className="text-sm font-medium text-gray-300">Ready for implementation</span>
      </div>
    </div>
  );
}