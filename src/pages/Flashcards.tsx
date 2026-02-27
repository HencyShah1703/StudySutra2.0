import React, { useState } from 'react';
    import { useMaterials } from '../context/MaterialContext';
    import EmptyState from '../components/EmptyState';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Zap, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

    interface Flashcard {
      id: string;
      question: string;
      answer: string;
    }

    export default function Flashcards() {
      const { activeMaterial } = useMaterials();
      const [isGenerating, setIsGenerating] = useState(false);
      const [cards, setCards] = useState<Flashcard[]>([]);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [isFlipped, setIsFlipped] = useState(false);

      if (!activeMaterial) {
        return (
          <EmptyState 
            title="No Active Material" 
            description="You need to select or upload a study material first to generate AI flashcards."
          />
        );
      }

      const generateCards = () => {
        setIsGenerating(true);
        // Simulate API call to OpenAI
        setTimeout(() => {
          setCards([
            { id: '1', question: 'What is the main topic of this material?', answer: `The primary subject is ${activeMaterial.title}.` },
            { id: '2', question: 'Can you summarize a key point from the text?', answer: 'It discusses fundamental principles that form the basis of the subject matter covered in the notes.' },
            { id: '3', question: 'Why is this material significant?', answer: 'Because it provides foundational knowledge required to master more advanced concepts in this field.' },
          ]);
          setIsGenerating(false);
          setCurrentIndex(0);
          setIsFlipped(false);
        }, 2000);
      };

      const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 150);
      };

      const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 150);
      };

      return (
        <div className="max-w-4xl mx-auto pb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-sans mb-2">Flashcards</h1>
              <p className="text-muted-foreground flex items-center">
                Generating from: <span className="font-medium text-foreground ml-1 truncate max-w-[200px] inline-block">{activeMaterial.title}</span>
              </p>
            </div>
            {cards.length > 0 && (
              <button 
                onClick={generateCards}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center shadow-sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Regenerate
              </button>
            )}
          </div>

          {cards.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm max-w-2xl mx-auto mt-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Generate AI Flashcards</h2>
              <p className="text-muted-foreground mb-8">
                Our AI will analyze <strong>"{activeMaterial.title}"</strong> and create a custom deck of flashcards to test your knowledge.
              </p>
              <button
                onClick={generateCards}
                disabled={isGenerating}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
                    Analyzing material...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generate Flashcards
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto mt-8">
              <div className="flex justify-between text-sm font-medium text-muted-foreground mb-4 px-2">
                <span>Card {currentIndex + 1} of {cards.length}</span>
                <span>Click card to flip</span>
              </div>

              {/* Flashcard 3D Flip Container */}
              <div 
                className="relative w-full aspect-[4/3] sm:aspect-video cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateX: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front (Question) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-card border border-border rounded-2xl shadow-md flex flex-col items-center justify-center p-8 text-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-primary/50">Question</span>
                    <h3 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                      {cards[currentIndex].question}
                    </h3>
                  </div>

                  {/* Back (Answer) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-primary/5 border border-primary/20 rounded-2xl shadow-md flex flex-col items-center justify-center p-8 text-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                  >
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-primary/50">Answer</span>
                    <p className="text-lg md:text-xl text-foreground leading-relaxed">
                      {cards[currentIndex].answer}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button 
                  onClick={handlePrev}
                  className="p-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex space-x-2">
                  {cards.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-border'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleNext}
                  className="p-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }