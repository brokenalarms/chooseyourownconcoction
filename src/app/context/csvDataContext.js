'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const csvLocalStorageKey = 'ccc_csv';
const CsvDataContext = createContext();

export function CsvDataProvider({ children }) {

    const router = useRouter();

    const [csvData, setCsvData] = useState(() => {
        let savedState = [];
        try {
            const localStorageCsv = localStorage.getItem(csvLocalStorageKey);
            savedState = JSON.parse(localStorageCsv).value

        }
        catch (e) {
            // JSON save invalid, clear out
            localStorage.setItem(csvLocalStorageKey, {});
        }
        return savedState;
    });

    useEffect(() => {
        if (!csvData || !csvData.length) {
            router.replace('/setup');
        } else {
            localStorage.setItem(csvLocalStorageKey, JSON.stringify({ value: csvData }));
        }
    }, [csvData]);

    return (
        <CsvDataContext.Provider value={{ csvData, setCsvData }}>
            {children}
        </CsvDataContext.Provider>
    );
}

// Custom hook to use the CsvDataContext
export function useCsvData() {
    return useContext(CsvDataContext);
}