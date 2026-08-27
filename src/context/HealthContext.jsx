'use client';

import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PATIENT, INITIAL_DOCUMENTS, DISEASE_PREDICTIONS, PIPELINE_STEPS } from '@/src/data/mockHealthData';

const HealthContext = createContext();

export function HealthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  const [patient, setPatient] = useState(INITIAL_PATIENT);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [predictions, setPredictions] = useState(DISEASE_PREDICTIONS);
  const [pipelineSteps, setPipelineSteps] = useState(PIPELINE_STEPS);
  const [storagePreference, setStoragePreference] = useState('cloud'); // 'local' or 'cloud'
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load user from localStorage on client-side mount
  React.useEffect(() => {
    const stored = localStorage.getItem('ht_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        if (parsed.name) {
          setPatient((prev) => ({
            ...prev,
            name: parsed.name.toUpperCase(),
          }));
        }
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
    setAuthInitialized(true);
  }, []);

  const login = (email, password) => {
    const name = email.split('@')[0].replace(/\./g, ' ');
    const formattedName = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const newUser = {
      name: formattedName,
      email: email,
      isLoggedIn: true,
    };
    setUser(newUser);
    localStorage.setItem('ht_user', JSON.stringify(newUser));
    setPatient((prev) => ({
      ...prev,
      name: formattedName.toUpperCase(),
    }));
  };

  const loginWithGoogle = (googleUser) => {
    const newUser = {
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
      isLoggedIn: true,
    };
    setUser(newUser);
    localStorage.setItem('ht_user', JSON.stringify(newUser));
    setPatient((prev) => ({
      ...prev,
      name: googleUser.name.toUpperCase(),
    }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ht_user');
  };

  const addDocument = (newDoc) => {
    const docObj = {
      id: `DOC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newDoc.name,
      date: new Date().toISOString().split('T')[0],
      type: newDoc.type || 'PDF',
      category: newDoc.category || 'General Health',
      provider: newDoc.provider || 'Uploaded Record',
      storageLocation: storagePreference === 'local' ? 'Local Device Storage' : 'Remote Cloud Vault (Encrypted AES-256)',
      status: 'Processing',
      summary: 'Analyzing document text with Medical LLM & extracting structured entities...',
      extractedJSON: {
        demographics: { name: patient.name, age: patient.age },
        diagnoses: ["Processing..."],
        medications: [],
        vitals: {},
        labResults: {},
        procedures: [],
      },
      abnormalities: [],
    };

    setDocuments((prev) => [docObj, ...prev]);

    // Simulate AI Pipeline processing
    setIsAnalyzing(true);
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === docObj.id
            ? {
                ...d,
                status: 'Processed',
                summary: `Successfully parsed and indexed ${d.name}. Clinical entities linked to patient timeline.`,
                abnormalities: ['Analyzed — All values within expected reference ranges.'],
              }
            : d
        )
      );
      setIsAnalyzing(false);
    }, 2500);
  };

  const deleteDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <HealthContext.Provider
      value={{
        user,
        authInitialized,
        patient,
        documents,
        predictions,
        pipelineSteps,
        storagePreference,
        isAnalyzing,
        setStoragePreference,
        login,
        loginWithGoogle,
        logout,
        addDocument,
        deleteDocument,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
