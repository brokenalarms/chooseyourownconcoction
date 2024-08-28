'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Screen } from '../choices';

const csvLocalStorageKey = 'ccc_csv';
const CsvDataContext = createContext();

function convertChoices(choices, data) {
    if (!choices?.length) {
        return [];
    }
    return choices.map(item => {
        if (typeof item == 'String') {
            return Object.assign({}, data.find(x => x.title == item));
        }
        return item;
    })
}

export function CsvDataProvider({ children }) {

    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        if (!csvData?.length) {
            let localData = localStorage.getItem(csvLocalStorageKey);
            if (localData) {
                try {
                    setCsvData(JSON.parse(localData).value);
                } catch (e) {
                    localStorage.setItem(csvLocalStorageKey, undefined);
                }
            }

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