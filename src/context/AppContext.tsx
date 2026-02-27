import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Material = {
  id: string;
  title: string;
  fileType: string;
  createdAt: string;
};

interface AppContextType {
  materials: Material[];
  addMaterial: (material: Omit<Material, 'id' | 'createdAt'>) => void;
  activeMaterialId: string | null;
  setActiveMaterialId: (id: string | null) => void;
  activeRoadmapId: string | null;
  setActiveRoadmapId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'Advanced React Patterns.pdf',
      fileType: 'application/pdf',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [activeMaterialId, setActiveMaterialId] = useState<string | null>('1');
  const [activeRoadmapId, setActiveRoadmapId] = useState<string | null>(null);

  const addMaterial = (material: Omit<Material, 'id' | 'createdAt'>) => {
    const newMaterial = {
      ...material,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setMaterials((prev) => [newMaterial, ...prev]);
    if (!activeMaterialId) setActiveMaterialId(newMaterial.id);
  };

  return (
    <AppContext.Provider
      value={{
        materials,
        addMaterial,
        activeMaterialId,
        setActiveMaterialId,
        activeRoadmapId,
        setActiveRoadmapId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}