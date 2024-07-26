<template>
  <div class="w-full p-2">
    <div class="p-2 rounded border flex flex-col sm:flex-row justify-between items-center gap-2 bg-white">
        <div class="flex items-center gap-2 justify-between w-full md:w-fit">
            <site-input v-model="filterdate.start_date" type="date" />
            <site-input v-model="filterdate.end_date" type="date" />
        </div>
        <site-btn customColor class="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400 w-full sm:w-fit" size="small">Скачать отчет</site-btn>
    </div>
    
    <div class="mt-4 p-2 rounded border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white">
        <site-btn @click="getItems({start_date:'2024-01-01',end_date:'2024-07-26'})" customColor class="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 15 дней</site-btn>
        <site-btn customColor class="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 1 месяц</site-btn>
        <site-btn customColor class="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 6 месяцев</site-btn>
        <site-btn customColor class="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 1 год</site-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import P from 'papaparse'
import * as XLSX from 'xlsx'
import type { IReport } from '~/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { getRange } = useReports()

const items = ref<IReport[]>()
const loading = ref(false)
const filterdate = ref({
    start_date: '',
    end_date: '',
})

const getItems = async (params: {start_date: string, end_date: string}) => {
    try {
        loading.value = true
        const data = await getRange(params)
        items.value = data.reports
        exportToExcel(data)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const flattenData = (data: any) => {
    const reports = data.reports.map((report: IReport) => {
    return {
        report_id: report.id,
        report_date: report.date,
        report_total_profit: report.total_profit,
        report_total_consumption: report.total_consumption,
        report_net_profit: report.net_profit,
        profits: report.profits.map(profit => ({
            profit_id: profit.id,
            appointment_id: (profit.appointment as any).id,
            doctor: (profit.appointment as any).doctor?.first_name,
            patient: (profit.appointment as any).patient?.first_name,
            service: (profit.appointment as any).service?.name_ru,
            profit_amount: profit.amount,
            profit_created_at: profit.created_at,
            profit_updated_at: profit.updated_at
        })),
        consumptions: report.consumptions.map(consumption => ({
            consumption_id: consumption.id,
            title: consumption.title,
            description: consumption.description,
            consumption_amount: consumption.amount,
            consumption_created_at: consumption.created_at,
            consumption_updated_at: consumption.updated_at
        }))
    };
    });

    return reports.flatMap((report: IReport) => {
    return report.profits.map(profit => ({
        ...report,
        ...profit
    })).concat(report.consumptions.map(consumption => ({
        ...report,
        ...consumption
    })) as any);
    });
}

const convertToCSV = (data: any) => {
    const flattenedData = flattenData(data);
    const csv = P.unparse(flattenedData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'output.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// const convertToExcel = (data: any) => {
//     const flattenedData = flattenData(data);
//     console.table(flattenedData);
    

//     // Create a workbook and add a worksheet
//     const ws = xlsx.utils.json_to_sheet(flattenedData);
//     const wb = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(wb, ws, 'Reports');

//     // Generate a file and trigger a download
//     xlsx.writeFile(wb, 'output.xlsx');
// }

const exportToExcel = (data: any) => {
    const wb = XLSX.utils.book_new();

    // Aggregate Totals
    const aggregateData = [
    ["total_profit", "total_consumption", "net_profit"],
    [data.aggregated_totals.total_profit, data.aggregated_totals.total_consumption, data.aggregated_totals.net_profit]
    ];
    const wsAggregate = XLSX.utils.aoa_to_sheet(aggregateData);
    XLSX.utils.book_append_sheet(wb, wsAggregate, 'Aggregated Totals');

    // Reports
    data.reports.forEach((report: any) => {
    const reportData = [
        ["id", "date", "total_profit", "total_consumption", "net_profit", "created_at", "updated_at"],
        [report.id, report.date, report.total_profit, report.total_consumption, report.net_profit, report.created_at, report.updated_at]
    ];
    const wsReport = XLSX.utils.aoa_to_sheet(reportData);
    XLSX.utils.book_append_sheet(wb, wsReport, `Report ${report.id}`);

    // Profits
    const profitData = [
        ["report_id", "profit_id", "appointment_id", "doctor", "patient", "service", "price", "status", "start_time", "end_time", "appointment_date", "appointment_created_at", "appointment_updated_at", "amount", "profit_created_at", "profit_updated_at"]
    ];
    report.profits.forEach((profit: any) => {
        const appointment = profit.appointment;
        profitData.push([
        report.id, profit.id, appointment.id, appointment.doctor, appointment.patient, appointment.service, appointment.price, appointment.status, appointment.start_time, appointment.end_time, appointment.date, appointment.created_at, appointment.updated_at, profit.amount, profit.created_at, profit.updated_at
        ]);
    });
    const wsProfits = XLSX.utils.aoa_to_sheet(profitData);
    XLSX.utils.book_append_sheet(wb, wsProfits, `Report ${report.id} - Profits`);

    // Consumptions
    const consumptionData = [
        ["report_id", "consumption_id", "title", "description", "amount", "created_at", "updated_at"]
    ];
    report.consumptions.forEach((consumption: any) => {
        consumptionData.push([
        report.id, consumption.id, consumption.title, consumption.description, consumption.amount, consumption.created_at, consumption.updated_at
        ]);
    });
    const wsConsumptions = XLSX.utils.aoa_to_sheet(consumptionData);
    XLSX.utils.book_append_sheet(wb, wsConsumptions, `Report ${report.id} - Consumptions`);
    });

    // Export to Excel
    XLSX.writeFile(wb, 'report.xlsx');
}
</script>