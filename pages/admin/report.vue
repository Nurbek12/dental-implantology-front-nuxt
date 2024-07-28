<template>
  <div class="w-full p-2">
    <div class="p-2 rounded border flex flex-col sm:flex-row justify-between items-center gap-2 bg-white">
        <div class="flex items-center gap-2 justify-between w-full md:w-fit">
            <site-input v-model="filterdate.start_date" type="date" class="w-full" />
            <site-input v-model="filterdate.end_date" type="date" class="w-full" />
        </div>
        <site-btn @click="getItems(filterdate)" customColor="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400 w-full sm:w-fit" size="small">Скачать отчет</site-btn>
    </div>
    
    <div class="mt-4 p-2 rounded border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white">
        <site-btn @click="setFilter(0)" customColor="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 15 дней</site-btn>
        <site-btn @click="setFilter(1)" customColor="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 1 месяц</site-btn>
        <site-btn @click="setFilter(2)" customColor="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 6 месяцев</site-btn>
        <site-btn @click="setFilter(3)" customColor="bg-green-700 hover:bg-green-600 active:bg-green-500 disabled:bg-green-400" size="small">Скачать отчет за 1 год</site-btn>
    </div>

    <div v-if="item" class="flex flex-col md:flex-row items-start gap-2">

        <div class="flex flex-col gap-2 items-start w-full md:w-[70%] lg:flex-1">
            <app-data-table
                :count="item?.profits?.length||0"
                :items="item?.profits||[]"
                :headers="headers"
                :loading="loading"
                hide-bottom
                hide-top>
                <template #table-item-id="{index}">
                    <span class="text-xs">{{ index+1 }}</span>
                </template>

                <template #table-item-patient="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.appointment?.patient?.first_name }} {{ tableItem?.appointment?.patient?.last_name }}</span>
                </template>
                <template #table-item-doctor="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.appointment?.doctor?.first_name }} {{ tableItem?.appointment?.doctor?.last_name }}</span>
                </template>
                <template #table-item-service="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.appointment?.service?.name_ru }}</span>
                </template>
                
                <template #table-item-price="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.appointment?.price }}</span>
                </template>
                
                <template #table-item-end_time="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.appointment?.end_time }}</span>
                </template>
                <template #table-item-start_time="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.appointment?.start_time }}</span>
                </template>

                <template #table-item-created_at="{tableItem}">
                    <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
                </template>
            </app-data-table>

            <app-data-table
                :count="item?.consumptions?.length||0"
                :items="item?.consumptions||[]"
                :headers="headers1"
                :loading="loading"
                hide-bottom
                hide-top>
                <template #table-item-id="{index}">
                    <span class="text-xs">{{ index+1 }}</span>
                </template>
                <template #table-item-created_at="{tableItem}">
                    <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
                </template>
                
                <template #table-item-doctor="{tableItem}">
                    <span class="text-xs text-balance">{{ tableItem?.doctor?.first_name }} {{ tableItem?.doctor?.last_name || '-' }}</span>
                </template>
                <!-- <template #table-item-actions="{tableItem,index}">
                    <div class="flex gap-1">
                        <button @click="editItem(tableItem, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
                        <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                    </div>
                </template> -->
            </app-data-table>
        </div>

        <div class="mt-2 flex flex-col text-center flex-wrap gap-2  w-full md:w-[30%] lg:w-[250px]">
            <div class="text-sm rounded border bg-white px-4 py-2 text-blue-700">Общая прибыль: {{ (item?.total_profit)?.toLocaleString('ru-RU') || 0 }} сумов</div>
            <div class="text-sm rounded border bg-white px-4 py-2 text-red-600">Общая расход: {{ (item?.total_consumption)?.toLocaleString('ru-RU') || 0 }} сумов</div>
            <div class="text-sm rounded border bg-white px-4 py-2 text-green-700">Чистая прибыль: {{ (item?.net_profit)?.toLocaleString('ru-RU') || 0 }} сумов</div>
            <site-select v-model="currentIndex":items="items?.map((a, i) => ({name:a.date, value: i}))||[]" />
        </div>

    </div>

    <div class="flex w-full items-center justify-center py-10">
        <div class="flex gap-2 items-center">
            <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
            <span v-show="loading" class="mb-0.5">Загрузка...</span>
            <span v-show="!loading||items?.length">Пусто</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx'
import { getDates } from '~/constants'
import type { IReport } from '~/types'
import { McLoading2Line } from '@kalimahapps/vue-icons'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth']
})

const { getRange } = useReports()

const headers = [
    { name: "Прибыль", value: "id", sortable: false, balancedText: false, custom: true },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Пациент", value: "patient", sortable: false, balancedText: false, custom: true },
    { name: "Услуга", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "price", sortable: false, balancedText: false, custom: true },
    { name: "Оплачено", value: "amount", sortable: false, balancedText: false, custom: false },
    { name: "Дата начала", value: "start_time", sortable: false, balancedText: false, custom: true },
    { name: "Дата окончания", value: "end_time", sortable: false, balancedText: false, custom: true },
]

const headers1 = [
    { name: "Расход", value: "id", sortable: false, balancedText: false, custom: true },
    { name: "Названия", value: "title", sortable: false, balancedText: false, custom: false },
    { name: "Описания", value: "description", sortable: false, balancedText: false, custom: false },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Оплачено", value: "amount", sortable: false, balancedText: false, custom: false },
]

const items = ref<IReport[]>()
const loading = ref(false)
const currentIndex = ref(0)
const filterdate = ref({
    start_date: '',
    end_date: '',
})

const item = computed(() => {
    return items.value?.[currentIndex.value] || null
})

const setFilter = (p: 0 | 1 | 2 | 3) => {
    const { start_date, end_date } = getDates(p)
    filterdate.value.start_date = start_date
    filterdate.value.end_date = end_date
    getItems(filterdate.value)
}

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

const exportToExcel = (data: any) => {
    const workbook = XLSX.utils.book_new();

    // Function to calculate the maximum width of the content in each column
    const calculateColumnWidths = (jsonData: any, headers: string[]) => {
        const colWidths = headers.map(header => ({ wch: header.length }));

        jsonData.forEach((row: any) => {
            headers.forEach((header, index) => {
                const cellValue = row[header] ? row[header].toString() : '';
                colWidths[index].wch = Math.max(colWidths[index].wch, cellValue.length);
            });
        });

        return colWidths;
    };

    // Function to fill a column with a specified color
    const fillColumnWithColor = (sheet: any, col: number, startRow: number, endRow: number, color: string) => {
        for (let row = startRow; row <= endRow; row++) {
            const cellAddress = XLSX.utils.encode_cell({ c: col, r: row });
            sheet[cellAddress] = {
                t: 's',
                s: {
                    fill: {
                        patternType: "solid",
                        fgColor: { rgb: color }
                    }
                }
            };
        }
    };

    // Create a sheet for aggregated totals
    const totalsData = [{
        'Общая прибыль': data.aggregated_totals.total_profit,
        'Общая расход': data.aggregated_totals.total_consumption,
        'Чистая прибыль': data.aggregated_totals.net_profit
    }];
    const aggregatedTotalsSheet = XLSX.utils.json_to_sheet(totalsData, { header: ['Общая прибыль', 'Общая расход', 'Чистая прибыль'] });
    aggregatedTotalsSheet['!cols'] = calculateColumnWidths(totalsData, ['Общая прибыль', 'Общая расход', 'Чистая прибыль']);
    XLSX.utils.book_append_sheet(workbook, aggregatedTotalsSheet, 'Агрегированные итоги');

    let reportIndex = 1;
    // Create sheets for each report
    data.reports.forEach((report: any) => {
        const sheet = XLSX.utils.aoa_to_sheet([[]]);

        // Preprocess profits data
        const profitsData = report.profits.map((profit: any, index: any) => ({
            'No.': index + 1,
            'Доктор': profit.appointment.doctor.first_name + ' ' + profit.appointment.doctor.last_name,
            'Пациент': profit.appointment.patient.first_name + ' ' + profit.appointment.patient.last_name,
            'Услуга': profit.appointment.service.name_ru,
            'Оплачено': profit.amount,
            'Дата начала': profit.appointment.start_time,
            'Дата окончания': profit.appointment.end_time
        }));
        const profitsHeaders = ['No.', 'Доктор', 'Пациент', 'Услуга', 'Оплачено', 'Дата начала', 'Дата окончания'];
        XLSX.utils.sheet_add_aoa(sheet, [profitsHeaders], { origin: 'A1' });
        XLSX.utils.sheet_add_json(sheet, profitsData, { origin: 'A2', skipHeader: true });
        sheet['!cols'] = calculateColumnWidths(profitsData, profitsHeaders);

        // Preprocess report data
        const reportData = [{
            'Дата': report.date,
            'Общая прибыль': report.total_profit,
            'Общая расход': report.total_consumption,
            'Чистая прибыль': report.net_profit
        }];
        const reportHeaders = ['Дата', 'Общая прибыль', 'Общая расход', 'Чистая прибыль'];
        const reportStartCol = profitsHeaders.length + 1;
        XLSX.utils.sheet_add_aoa(sheet, [reportHeaders], { origin: XLSX.utils.encode_cell({ c: reportStartCol, r: 0 }) });
        XLSX.utils.sheet_add_json(sheet, reportData, { origin: XLSX.utils.encode_cell({ c: reportStartCol, r: 1 }), skipHeader: true });
        sheet['!cols'] = [
            ...sheet['!cols'],
            ...new Array(reportStartCol - sheet['!cols'].length).fill({ wch: 10 }),  // Fill in empty columns
            ...calculateColumnWidths(reportData, reportHeaders)
        ];

        // Fill the gap column with gray color
        fillColumnWithColor(sheet, profitsHeaders.length, 0, Math.max(profitsData.length, 1), 'D3D3D3');

        // Preprocess consumptions data
        const consumptionsData = report.consumptions.map((consumption: any, index: any) => ({
            'No.': index + 1,
            'Название': consumption.title,
            'Описание': consumption.description,
            'Доктор': consumption.doctor ? (consumption.doctor.first_name + ' ' + consumption.doctor.last_name) : '-',
            'Оплачено': consumption.amount
        }));
        const consumptionsHeaders = ['No.', 'Название', 'Описание', 'Доктор', 'Оплачено'];
        const consumptionsStartRow = Math.max(profitsData.length, 1) + 3; // 3 rows gap below the profits data
        XLSX.utils.sheet_add_aoa(sheet, [consumptionsHeaders], { origin: `A${consumptionsStartRow}` });
        XLSX.utils.sheet_add_json(sheet, consumptionsData, { origin: `A${consumptionsStartRow + 1}`, skipHeader: true });
        sheet['!cols'] = [
            ...sheet['!cols'],
            ...calculateColumnWidths(consumptionsData, consumptionsHeaders)
        ];

        XLSX.utils.book_append_sheet(workbook, sheet, `${reportIndex}. Отчет: ${report.date}`);
        reportIndex += 1;
    });

    // Write the workbook to a file
    XLSX.writeFile(workbook, 'reports.xlsx');
};

</script>