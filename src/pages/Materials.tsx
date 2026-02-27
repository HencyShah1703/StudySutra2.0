import React, { useState } from 'react';
    import { useMaterials } from '../context/MaterialContext';
    import { motion } from 'framer-motion';
    import { UploadCloud, FileText, CheckCircle2, Clock, Trash2, Plus } from 'lucide-react';
    import { format } from 'date-fns';
    import { toast } from 'react-toastify';

    export default function Materials() {
      const { materials, activeMaterialId, setActiveMaterialId, addMaterial } = useMaterials();
      const [isUploading, setIsUploading] = useState(false);
      const [uploadMode, setUploadMode] = useState<'file' | 'manual'>('file');
      
      const [manualTitle, setManualTitle] = useState('');
      const [manualContent, setManualContent] = useState('');

      const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Simulate text extraction and upload process
        setTimeout(() => {
          addMaterial(
            file.name,
            `Extracted content from ${file.name}. This is a simulated extraction since real backend parsing is required for actual PDF/Text files. The AI features will use this text as context.`,
            file.type.includes('pdf') ? 'pdf' : 'text'
          );
          setIsUploading(false);
          toast.success('Material uploaded successfully!');
        }, 1500);
      };

      const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualTitle.trim() || !manualContent.trim()) {
          toast.error('Please fill in both title and content.');
          return;
        }
        
        setIsUploading(true);
        setTimeout(() => {
          addMaterial(manualTitle, manualContent, 'manual');
          setManualTitle('');
          setManualContent('');
          setIsUploading(false);
          toast.success('Material added successfully!');
          setUploadMode('file');
        }, 800);
      };

      return (
        <div className="max-w-5xl mx-auto pb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-sans mb-2">My Materials</h1>
              <p className="text-muted-foreground">Upload and manage your study documents.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="flex border-b border-border">
                  <button 
                    onClick={() => setUploadMode('file')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${uploadMode === 'file' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-accent/50'}`}
                  >
                    Upload File
                  </button>
                  <button 
                    onClick={() => setUploadMode('manual')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${uploadMode === 'manual' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-accent/50'}`}
                  >
                    Paste Text
                  </button>
                </div>

                <div className="p-6">
                  {uploadMode === 'file' ? (
                    <div className="relative border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-accent/30 hover:border-primary/50 transition-colors group">
                      <input 
                        type="file" 
                        accept=".pdf,.txt"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold mb-1">Click or drag file to upload</h3>
                        <p className="text-xs text-muted-foreground mb-4">Supported formats: PDF, TXT</p>
                        <button 
                          disabled={isUploading}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium flex items-center"
                        >
                          {isUploading ? (
                            <span className="flex items-center"><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" /> Processing...</span>
                          ) : 'Browse Files'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Title</label>
                        <input 
                          type="text" 
                          value={manualTitle}
                          onChange={(e) => setManualTitle(e.target.value)}
                          placeholder="e.g., Biology Chapter 4"
                          className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          disabled={isUploading}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Content</label>
                        <textarea 
                          value={manualContent}
                          onChange={(e) => setManualContent(e.target.value)}
                          placeholder="Paste your notes here..."
                          rows={6}
                          className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          disabled={isUploading}
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isUploading}
                        className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex justify-center items-center"
                      >
                        {isUploading ? (
                          <span className="flex items-center"><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" /> Saving...</span>
                        ) : (
                          <span className="flex items-center"><Plus className="w-4 h-4 mr-2" /> Add Material</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
                <div className="p-4 border-b border-border flex justify-between items-center bg-accent/30">
                  <h2 className="font-semibold font-sans">Your Library</h2>
                  <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-full border border-border">
                    {materials.length} Items
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {materials.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <FileText className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                      <p className="text-muted-foreground">No materials uploaded yet.</p>
                    </div>
                  ) : (
                    materials.map((mat, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={mat.id}
                        onClick={() => setActiveMaterialId(mat.id)}
                        className={`flex items-start p-4 rounded-lg border transition-all cursor-pointer ${
                          mat.id === activeMaterialId 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-border hover:border-primary/50 hover:bg-accent/30'
                        }`}
                      >
                        <div className={`p-2 rounded-md mr-4 flex-shrink-0 ${mat.id === activeMaterialId ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-sm truncate pr-4">{mat.title}</h3>
                            {mat.id === activeMaterialId && (
                              <span className="flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{mat.content}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {format(mat.createdAt, 'MMM d, yyyy')}
                            <span className="mx-2">•</span>
                            <span className="uppercase">{mat.type}</span>
                          </div>
                        </div>
                        <button 
                          className="p-2 ml-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info('Delete functionality requires backend integration.');
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }