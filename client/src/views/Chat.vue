<template>
    <div>
        <button @click="exportToExcel">Export to Excel</button>
    </div>
</template>

<script>
import * as XLSX from '/node_modules/.vite/deps/xlsx.js';

export default {
    methods: {
        exportToExcel() {
            // Your JSON data
            const jsonData = [
                { Name: 'John', Age: 30, City: 'New York' },
                { Name: 'Alice', Age: 25, City: 'Los Angeles' },
                { Name: 'Bob', Age: 35, City: 'Chicago' },
            ];

            // Create a worksheet
            const ws = XLSX.utils.json_to_sheet(jsonData);

            // Create a workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Generate a Blob object containing the Excel file
            const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });

            // Create a link to trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'data.xlsx';
            link.click();
        },
    },
};
</script>
