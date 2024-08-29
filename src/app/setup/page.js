'use client';

import React from 'react';
import Link from 'next/link';
import { useCsvData } from '../context/csvDataContext';
import Papa from 'papaparse';

export default function CsvUpload() {

    const { csvData, setCsvData, data } = useCsvData();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    setCsvData(results.data);
                    
                },
                error: function (error) {
                    console.error("Error parsing CSV:", error.message);
                }
            });
        }
    };

    return (
        <div>
            <h1>Upload CSV File</h1>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
            />
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/">Go to home</Link>
            {csvData && (
                <div>
                    <h2>CSV Data</h2>
                    <pre>{JSON.stringify(csvData, null, 2)}</pre>
                    <h2>Massaged Data</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>


            )}
        </div>
    );
}