'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Screen, convertCsv } from '../Screen';
import { parse } from 'path';

export const csvLocalStorageKey = 'ccc_csv';

const CsvDataContext = createContext();

export function CsvDataProvider({ children }) {

    const [csvData, setCsvData] = useState(null)
    // csv with choices string array converted to objects
    const [data, setData] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        let localData = localStorage.getItem(csvLocalStorageKey);
        if (localData) {
            try {
                const parsedData = JSON.parse(localData).value;
                setCsvData(parsedData);
            } catch (e) {
                localStorage.removeItem(csvLocalStorageKey);
                setCsvData([])
            }
        } else {
            setCsvData([])
        }
    }, []);

    useEffect(() => {
        if (csvData?.length) {
            localStorage.setItem(csvLocalStorageKey, JSON.stringify({ value: csvData }));
            setData(convertCsv(csvData));
        } else if (csvData) {
            setData([])
        }

    }, [csvData]);

    useEffect(() => {
        if (data) {
            setIsInitialized(true);
        }
    }, [data]);

    return (
        <CsvDataContext.Provider value={{ setCsvData, csvData, data, isInitialized }}>
            {children}
        </CsvDataContext.Provider>
    );
}

// Custom hook to use the CsvDataContext
export function useCsvData() {
    return useContext(CsvDataContext);
}