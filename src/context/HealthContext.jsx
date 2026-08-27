'use client';

import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PATIENT, INITIAL_DOCUMENTS, DISEASE_PREDICTIONS, PIPELINE_STEPS } from '@/src/data/mockHealthData';

const HealthContext = createContext();

export function HealthProvider({ children }) {
  const [user, setUser] = useState({
    name: "YUGIN SANTHOSH",
    email: "yuginsanthosh1263@gmail.com",
    isLoggedIn: true,
  });

  const [patient, setPatient] = useState(INITIAL_PATIENT);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [predictions, setPredictions] = useState(DISEASE_PREDICTIONS);
  const [pipelineSteps, setPipelineSteps] = useState(PIPELINE_STEPS);
  const [storagePreference, setStoragePreference] = useState('cloud'); // 'local' or 'cloud'
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const login = (email, password) => {
    setUser({
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setUser(null);
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
        patient,
        documents,
        predictions,
        pipelineSteps,
        storagePreference,
        isAnalyzing,
        setStoragePreference,
        login,
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
