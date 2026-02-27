import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Mock generated content to simulate AI response
const MOCK_FLASHCARDS = [
  { id: 1, q: "What is the Virtual DOM in React?", a: "A lightweight JavaScript representation of the actual DOM used to optimize rendering performance." },
  { id: 2, q: "Explain the useEffect hook.", a: "A hook that lets you perform side effects in functional components, such as data fetching or subscriptions." },
  { id: 3, q: "What is Prop Drilling?", a: "The process of passing data through multiple layers of nested components, even if intermediate components don't need the data." },
  { id: 4, q: "Define Context API.", a: "A React feature that allows sharing state across the entire app (or part of it) without passing props manually down every level." },
];

export default function Flashcards() {
  const { activeMaterialId, materials } = useAppContext();
  const activeMaterial = materials.find(m => m.id === activeMaterialId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI delay
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1500);
  };

  const nextCard = () => {
    if (currentIndex < MOCK_FLASHCARDS.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  if (!activeMaterialId) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-xl">
          <Layers size={32} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">No Context Selected</h2>
        <p className="text-muted-foreground mb-8">
          You need to select an active study material before the AI can generate personalized flashcards.
        </p>
      </div>
    );
  }

  if (!hasGenerated) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Generate Flashcards</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          AI will analyze <span className="text-white font-medium">"{activeMaterial?.title}"</span> and extract key concepts into a reviewable flashcard deck.
        </p>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-8 py-4 rounded-full bg-accent text-white font-semibold text-lg hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(138,43,226,0.4)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="animate-spin" size={24} />
              Analyzing Material...
            </>
          ) : (
            <>
              <Layers size={24} />
              Generate Deck
            </>
          )}
        </button>
      </div>
    );
  }

  const currentCard = MOCK_FLASHCARDS[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Review Session</h1>
          <p className="text-sm text-accent bg-accent/10 px-3 py-1 rounded-full inline-block border border-accent/20">
            Context: {activeMaterial?.title}
          </p>
        </div>
        <div className="text-muted-foreground font-mono text-sm">
          Card {currentIndex + 1} of {MOCK_FLASHCARDS.length}
        </div>
      </div>

      <div className="relative perspective-1000 h-[400px] w-full mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '-front')}
            initial={{ opacity: 0, rotateX: isFlipped ? -90 : 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: isFlipped ? 90 : -90 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={`absolute inset-0 rounded-3xl border cursor-pointer p-10 flex flex-col items-center justify-center text-center shadow-2xl transition-colors duration-300 ${
              isFlipped 
                ? 'bg-accent border-accent text-white' 
                : 'bg-card border-border hover:border-accent/50 text-white'
            }`}
          >
            <span className="absolute top-6 left-8 text-xs font-bold uppercase tracking-widest opacity-50">
              {isFlipped ? 'Answer' : 'Question'}
            </span>
            <h3 className={`text-2xl lg:text-3xl font-medium leading-relaxed ${isFlipped ? 'text-white' : 'text-gray-100'}`}>
              {isFlipped ? currentCard.a : currentCard.q}
            </h3>
            <span className="absolute bottom-6 text-sm opacity-50">
              Click card to flip
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="p-4 rounded-full bg-card border border-border hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {MOCK_FLASHCARDS.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-accent shadow-[0_0_10px_rgba(138,43,226,0.6)]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextCard}
          disabled={currentIndex === MOCK_FLASHCARDS.length - 1}
          className="p-4 rounded-full bg-card border border-border hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}