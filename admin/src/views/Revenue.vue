<template>
    <v-chart v-if="dataLoaded" class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, onMounted } from 'vue';

import InvoiceService from '@/services/invoice.service';

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

provide(THEME_KEY, 'white');
let month = Array(12).fill(0);
const option = ref({
    title: {
        text: 'Doanh thu',
        left: 'center',
    },
    tooltip: {
        trigger: 'axis', // Use 'axis' trigger for bar chart
        formatter: function (params) {
            // 'params' contains information about the tooltip data
            const xAxisValue = params[0].name; // Assuming the x-axis label is used in the tooltip
            const yAxisValue = params[0].value; // Assuming there's only one series
            const formattedYAxisValue = yAxisValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Format the yAxisValue

            // Return the formatted tooltip content
            return `${xAxisValue} : ${formattedYAxisValue} ₫`;
        },
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: [...Array(12).keys()].map((i) => i + 1),
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: function (value) {
                // Use 'en-US' locale to format the value with a period as the thousands separator
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫';
            },
        },
    },
    series: [
        {
            name: 'Traffic',
            type: 'bar',
            data: month,
        },
    ],
});
const dataLoaded = ref(false);

const getRevenue = async () => {
    try {
        const revenue = await InvoiceService.getRevenue();
        let year = 2023;
        revenue.map((item) => {
            if (item._id.year == year) {
                const _month = parseInt(item._id.month);

                month[_month - 1] = parseInt(item.totalRevenue);
            }
        });
        dataLoaded.value = true;
    } catch (error) {}
};

onMounted(() => {
    getRevenue();
});
</script>

<style scoped lang="scss">
.chart {
    height: 88vh;
}
</style>
