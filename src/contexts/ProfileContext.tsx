import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileContextType {
  selectedProfile: string | null;
  setSelectedProfile: (profile: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProfile, setSelectedProfileState] = useState<string | null>(null);

  useEffect(() => {
    // Load selected profile from localStorage on mount
    const saved = localStorage.getItem('selectedProfile');
    if (saved) {
      setSelectedProfileState(saved);
    }
  }, []);

  const setSelectedProfile = (profile: string) => {
    setSelectedProfileState(profile);
    localStorage.setItem('selectedProfile', profile);
  };

  return (
    <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};