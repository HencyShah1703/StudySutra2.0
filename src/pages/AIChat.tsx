import React, { useState, useRef, useEffect } from 'react';
    import { useMaterials } from '../context/MaterialContext';
    import EmptyState from '../components/EmptyState';
    import { motion } from 'framer-motion';
    import { Send, User, BrainCircuit, Loader2 } from 'lucide-react';

    interface Message {
      id: string;
      role: 'user' | 'ai';
      content: string;
    }

    export default function AIChat() {
      const { activeMaterial } = useMaterials();
      const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'ai', content: 'Hello! I am your study assistant. Ask me anything about the active material, and I will strictly answer based on its content.' }
      ]);
      const [input, setInput] = useState('');
      const [isTyping, setIsTyping] = useState(false);
      const messagesEndRef = useRef<HTMLDivElement>(null);

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
        scrollToBottom();
      }, [messages, isTyping]);

      if (!activeMaterial) {
        return (
          <EmptyState 
            title="No Active Material" 
            description="You need to select or upload a study material first to chat with the AI."
          />
        );
      }

      const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate strict context AI response
        setTimeout(() => {
          const lowerInput = newMsg.content.toLowerCase();
          let response = '';

          // A simple mocked "RAG" simulation logic
          if (lowerInput.includes('summary') || lowerInput.includes('what is')) {
            response = `Based on your material "${activeMaterial.title}", it covers fundamental principles and concepts. Specifically: "${activeMaterial.content.substring(0, 100)}..."`;
          } else {
            response = "This is not covered in your uploaded notes. I can only answer based on the provided material.";
          }

          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: response }]);
          setIsTyping(false);
        }, 1500);
      };

      return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold font-sans">Strict Context AI Chat</h1>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              Active Context: <span className="font-medium text-primary ml-1 truncate max-w-[300px] bg-primary/10 px-2 py-0.5 rounded-full">{activeMaterial.title}</span>
            </p>
          </div>

          <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground ml-3' 
                        : 'bg-green-500 text-white mr-3'
                    }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <BrainCircuit className="w-5 h-5" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-accent/50 text-foreground border border-border rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex flex-row">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white mr-3 flex items-center justify-center flex-shrink-0">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div className="p-4 rounded-2xl bg-accent/50 border border-border rounded-tl-none flex items-center space-x-2">
                      <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background border-t border-border">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about the material..."
                  className="w-full bg-accent/30 border border-border rounded-full pl-6 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Responses are strictly limited to provided material</span>
              </div>
            </div>
          </div>
        </div>
      );
    }