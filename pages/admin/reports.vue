<template>
    <div class="w-full p-2">
        <div class="p-2 rounded border flex justify-between items-center gap-2 bg-white">
            <site-input v-model="filterdate" type="date" placeholder="Поиск" @changed="getItems($event.target.value)" />
            <div class="flex items-center gap-2">
                <site-btn @click="dialog1=true" size="small">Добавить прибыль</site-btn>
                <site-btn @click="dialog2=true" size="small">Добавить расход</site-btn>
            </div>
        </div>

        <div class="flex flex-col md:flex-row items-start gap-2">

            <div class="flex flex-col gap-2 items-start w-full md:w-[70%] lg:flex-1">
                <app-data-table
                    :count="item?.profits?.length||0"
                    :items="item?.profits||[]"
                    :headers="headers"
                    :loading="loading"
                    hide-bottom
                    hide-top>
    
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
                        <span class="text-xs text-balance">{{ new Date(tableItem?.appointment?.end_time!).toLocaleString() }}</span>
                    </template>
                    <template #table-item-start_time="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem?.appointment?.start_time!).toLocaleString() }}</span>
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
                    <template #table-item-created_at="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
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
            </div>

        </div>

    </div>
    
    <app-dialog rounded title="Добавить прибыль" :open="dialog1" @close-dialog="close">
        <form @submit.prevent="saveProfit" class="mt-4 flex flex-col gap-4">
            <site-auto-complete v-model="profit.appointment" @inputed="searching" :loading="appoinmentLoading" :items="appointments" label="Прием" placeholder="Прием">
                <template #item="acItem">
                    <div class="flex items-center gap-2 text-sm" @click="acItem.onSelected(`${acItem.item?.patient?.first_name} ${acItem.item?.patient?.last_name } - ${acItem.item?.service?.name_ru} : ${appointment_statuses[acItem.item?.status as keyof typeof appointment_statuses]?.[0]} . ${new Date(acItem.item?.created_at).toLocaleDateString()}`, acItem.item.id)">
                        <span>{{ acItem.item?.patient?.first_name }} {{ acItem.item?.patient?.last_name }} - {{ acItem.item?.service?.name_ru }} : </span>
                        <span :class="appointment_statuses[acItem.item?.status as keyof typeof appointment_statuses]?.[2]">
                            {{ appointment_statuses[acItem.item?.status as keyof typeof appointment_statuses]?.[0] }}
                        </span>
                        <span>. {{ new Date(acItem.item?.created_at).toLocaleDateString() }}</span>
                    </div>
                </template>
            </site-auto-complete>
            <site-input readonly required v-model="profit.date" type="date" label="Дата прибыла" />
            <site-input required v-model="profit.amount" type="number" label="Выплаченная сумма" placeholder="Выплаченная сумма" />
            <!-- <site-select required v-model="profit.appointment" :items="appointments" name="none" value="id" label="Прием" :nullvalue="null" placeholder="Прием">
                <template #item="$i">{{ $i.item?.patient?.first_name }} - {{ $i.item?.service?.name_ru }}</template>
            </site-select> -->
            
            <site-btn :disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </site-btn>
        </form>
    </app-dialog>

    <app-dialog rounded title="Добавить расход" :open="dialog2" @close-dialog="close">
        <form @submit.prevent="saveConsumption" class="mt-4 flex flex-col gap-4">
            <site-input readonly required v-model="consumption.date" type="date" label="Дата расхода" />
            <site-input required v-model="consumption.title" label="Название расхода" placeholder="Название расхода" />
            <site-input required v-model="consumption.amount" type="number" label="Выплаченная сумма" placeholder="Выплаченная сумма" />
            <site-textarea required v-model="consumption.description" label="Описание расхода" placeholder="Описание расхода" />
            
            <site-btn :disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </site-btn>
        </form>
    </app-dialog>

    <div hidden>
        <span class="text-yellow-400"></span>
        <span class="text-green-500"></span>
        <span class="text-red-500"></span>
        <span class="text-gray-600"></span>
    </div>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import type { IAppointment, IReport } from '@/types'
import { todayDate, appointment_statuses } from '~/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { getAppointments } = useAppointments()
const { getReports, addConsumption, addProfit } = useReports()

const filterdate = ref('')
const dialog1 = ref(false)
const dialog2 = ref(false)
const loading = ref(false)
const item = ref<IReport|null>(null)
const appoinmentLoading = ref(false)
const createLoading = ref<boolean>(false)
const appointments = ref<IAppointment[]>([])

const consumption = reactive({
    date: '',
    title: '',
    description: '',
    amount: 0,
})

const profit = reactive({
    date: '',
    amount: 0,
    appointment: null,
})

const headers = [
    { name: "Прибыли", value: "id", sortable: false, balancedText: false, custom: false },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Пациет", value: "patient", sortable: false, balancedText: false, custom: true },
    { name: "Услуга", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "price", sortable: false, balancedText: false, custom: true },
    { name: "Оплачен", value: "amount", sortable: false, balancedText: false, custom: false },
    { name: "Дата начало", value: "start_time", sortable: false, balancedText: false, custom: true },
    { name: "Дата окончания", value: "end_time", sortable: false, balancedText: false, custom: true },
    // { name: "Дата создания", value: "created_at", sortable: false, balancedText: false, custom: true },
    // { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const headers1 = [
    { name: "Расходы", value: "id", sortable: false, balancedText: false, custom: false },
    { name: "Называния", value: "title", sortable: false, balancedText: false, custom: false },
    { name: "Описания", value: "description", sortable: false, balancedText: false, custom: false },
    { name: "Оплачен", value: "amount", sortable: false, balancedText: false, custom: false },
    // { name: "Дата", value: "created_at", sortable: false, balancedText: false, custom: true },
]

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
    consumption.date = todaydate
    profit.date = todaydate
    
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getReports(params)
        item.value = data.results[0]
        // const data = await getDoctors(params)
        // items.value = data.results
        // count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const saveConsumption = async () => {
    const data = await addConsumption(consumption)
    item.value = data
    close()
}

const saveProfit = async () => {
    const data = await addProfit(profit)
    item.value = data
    close()
}

const close = () => {
    dialog1.value && Object.assign(profit, {
        amount: 0,
        appointment: null,
    })
    dialog2.value && Object.assign(consumption, {
        amount: 0,
        title: '',
        description: '',
    })
    dialog1.value = false
    dialog2.value = false
}

const init = async () => {
    initToday()
    getItems(filterdate.value)
    const data = await getAppointments({})
    appointments.value = data.results
}

const searching = lodash.debounce(async (e) => {
    if(!e.target.value?.trim()) return appointments.value = []
    appoinmentLoading.value = true
    const p = await getAppointments({page: 1, limit: 1000, search: e.target.value, ordering: '-created_at'})
    appointments.value = p.results
    appoinmentLoading.value = false
}, 500)

init()
</script>