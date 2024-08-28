'use client'; // Ensure this is a client component if using Next.js with the `app` directory

import React from 'react';
import { useCsvData } from '../context/csvDataContext';
import Papa from 'papaparse';

export default function CsvUpload() {
    const { csvData, setCsvData } = useCsvData();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                header: true, // If your CSV has headers
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
            {csvData && (
                <div>
                    <h2>CSV Data</h2>
                    <pre>{JSON.stringify(csvData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}