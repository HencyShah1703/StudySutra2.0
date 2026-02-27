import React from 'react';
    import { Link } from 'react-router-dom';
    import { FileQuestion, ArrowRight } from 'lucide-react';
    import { motion } from 'framer-motion';

    interface EmptyStateProps {
      title: string;
      description: string;
    }

    const EmptyState = ({ title, description }: EmptyStateProps) => {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-[60vh] text-center px-4"
        >
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 text-primary shadow-sm border border-border">
            <FileQuestion className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-sans mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
            {description}
          </p>
          <Link 
            to="/materials"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Upload Material
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      );
    };

    export default EmptyState;