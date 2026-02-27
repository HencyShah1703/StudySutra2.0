import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, FileText, CheckCircle2, MoreVertical, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Materials() {
  const { materials, addMaterial, activeMaterialId, setActiveMaterialId } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateUpload(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const simulateUpload = (file: File) => {
    addMaterial({
      title: file.name,
      fileType: file.type || 'application/octet-stream',
    });
  };

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-3">Study Materials</h1>
        <p className="text-muted-foreground">Upload PDFs, presentations, or text documents to generate AI context.</p>
      </div>

      <div 
        className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${
          isDragging 
            ? 'border-accent bg-accent/5 scale-[1.02]' 
            : 'border-border bg-card hover:border-white/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Upload size={32} className={isDragging ? 'text-accent' : 'text-muted-foreground'} />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Drag & Drop your files here</h3>
        <p className="text-sm text-muted-foreground mb-8 text-center max-w-md">
          Supports PDF, PPTX, DOCX, and TXT up to 50MB. Files are securely processed and stored in private buckets.
        </p>
        
        <label className="relative cursor-pointer">
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileSelect}
            accept=".pdf,.txt,.doc,.docx,.ppt,.pptx"
          />
          <span className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors">
            Browse Files
          </span>
        </label>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <LibraryIcon /> Your Vault
          </h3>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search materials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 w-full sm:w-64 transition-all"
            />
          </div>
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-border bg-card/50">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">No materials found. Upload one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMaterials.map((material, idx) => {
              const isActive = activeMaterialId === material.id;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={material.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col ${
                    isActive 
                      ? 'bg-accent/5 border-accent/40 shadow-[0_0_20px_rgba(138,43,226,0.1)]' 
                      : 'bg-card border-border hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 text-blue-400">
                      <File size={24} />
                    </div>
                    <button className="text-muted-foreground hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  <h4 className="text-base font-medium text-white mb-1 truncate" title={material.title}>
                    {material.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-6">
                    Uploaded on {new Date(material.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="mt-auto">
                    {isActive ? (
                      <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-accent/20 text-accent text-sm font-medium">
                        <CheckCircle2 size={16} />
                        Active Context
                      </div>
                    ) : (
                      <button 
                        onClick={() => setActiveMaterialId(material.id)}
                        className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/5"
                      >
                        Set as Active
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function LibraryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}