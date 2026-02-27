import React, { createContext, useContext, useState, ReactNode } from 'react';

    export interface Material {
      id: string;
      title: string;
      content: string;
      createdAt: Date;
      type: 'text' | 'pdf' | 'manual';
    }

    interface MaterialContextType {
      materials: Material[];
      activeMaterialId: string | null;
      activeMaterial: Material | null;
      addMaterial: (title: string, content: string, type: 'text' | 'pdf' | 'manual') => void;
      setActiveMaterialId: (id: string | null) => void;
    }

    const MaterialContext = createContext<MaterialContextType | undefined>(undefined);

    export const MaterialProvider = ({ children }: { children: ReactNode }) => {
      const [materials, setMaterials] = useState<Material[]>([
        {
          id: 'demo-1',
          title: 'Introduction to Quantum Mechanics',
          content: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
          createdAt: new Date(),
          type: 'manual'
        }
      ]);
      const [activeMaterialId, setActiveMaterialId] = useState<string | null>('demo-1');

      const addMaterial = (title: string, content: string, type: 'text' | 'pdf' | 'manual') => {
        const newMaterial: Material = {
          id: Math.random().toString(36).substring(2, 9),
          title,
          content,
          createdAt: new Date(),
          type
        };
        setMaterials(prev => [newMaterial, ...prev]);
        setActiveMaterialId(newMaterial.id);
      };

      const activeMaterial = materials.find(m => m.id === activeMaterialId) || null;

      return (
        <MaterialContext.Provider value={{
          materials,
          activeMaterialId,
          activeMaterial,
          addMaterial,
          setActiveMaterialId
        }}>
          {children}
        </MaterialContext.Provider>
      );
    };

    export const useMaterials = () => {
      const context = useContext(MaterialContext);
      if (context === undefined) {
        throw new Error('useMaterials must be used within a MaterialProvider');
      }
      return context;
    };