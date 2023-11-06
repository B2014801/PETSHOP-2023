<template>
    <div>
        <button @click="downloadExcel">Download Excel</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jsonData: [
                { Name: 'Chó', Age: 30, City: 'New York' },
                { Name: 'mèo', Age: 25, City: 'Los Angeles' },
                { Name: 'chó', Age: 35, City: 'Chicago' },
            ],
        };
    },
    methods: {
        jsonToExcel(data) {
            const csv = '\uFEFF' + data.map((row) => Object.values(row).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'application/csv;charset=UTF-8' });
            return URL.createObjectURL(blob);
        },

        downloadExcel() {
            const excelData = this.jsonToExcel(this.jsonData);
            const link = document.createElement('a');
            link.href = excelData;
            link.download = 'data.csv';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
};
</script>
