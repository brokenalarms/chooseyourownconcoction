'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { convertCsv } from '../components/Screen';
import { usePathname } from "next/navigation";
import Papa from 'papaparse';

export const csvLocalStorageKey = 'ccc_csv';
const demoPath = '/demo';

const CsvDataContext = createContext();

export function CsvDataProvider({ children }) {

    const pathname = usePathname()
    const [csvData, setCsvData] = useState(null)
    // csv with choices string array converted to objects
    const [data, setData] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (pathname === demoPath) {
            const fetchDemoData = async () => {
                const response = await fetch('/demo/demo.csv');  // Path to file in public folder
                const csvText = await response.text()
                const results = await new Promise((resolve, reject) => Papa.parse(csvText, {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        resolve(results);
                    },
                    error: function (error) {
                        console.error("Error parsing demo CSV data:", error.message);
                        reject();
                    }
                }));
                setCsvData(results.data);
            }
            fetchDemoData()
            return;
        }
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
            if (pathname !== demoPath) {
                localStorage.setItem(csvLocalStorageKey, JSON.stringify({ value: csvData }));
            }
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