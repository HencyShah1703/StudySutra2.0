import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
      >
        <Home size={20} />
        Back to Dashboard
      </Link>
    </div>
  );
}