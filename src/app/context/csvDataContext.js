'use client';
import React, { createContext, useState, useContext } from 'react';

// Create Context
const CsvDataContext = createContext();

// Create a provider component
export function CsvDataProvider({ children }) {
    const [csvData, setCsvData] = useState(null);

    return (
        <CsvDataContext.Provider value={{ csvData, setCsvData }}>
            {console.log('Context Value:', csvData, setCsvData)}
            {children}
        </CsvDataContext.Provider>
    );
}

// Custom hook to use the CsvDataContext
export function useCsvData() {
    return useContext(CsvDataContext);
}