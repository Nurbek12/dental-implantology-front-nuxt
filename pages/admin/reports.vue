<template>
    <div class="w-full p-2">
        <div class="p-2 rounded border flex flex-col w-full md:flex-row justify-between items-center gap-2 bg-white">
            <site-input class="w-full md:w-fit" v-model="filterdate" type="date" placeholder="Поиск" @changed="getItems($event.target.value)" />
            <div class="w-full md:w-fit flex items-center sm:flex-row flex-col gap-2">
                <site-btn class="w-full md:w-fit" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="dialog1=true" size="small">Добавить прибыль</site-btn>
                <site-btn class="w-full md:w-fit" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="dialog2=true" size="small">Добавить расход</site-btn>
                <site-btn class="w-full md:w-fit" @click="dialog3=true" size="small">Добавить заплату</site-btn>
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
            <site-auto-complete @updated="profit.amount = $event" v-model="profit.appointment" @inputed="searching" :loading="appoinmentLoading" :items="appointments" label="Прием" placeholder="Прием">
                <template #item="acItem">
                    <div class="flex items-center gap-2 text-sm" @click="acItem.onSelected(`${acItem.item?.patient?.first_name} ${acItem.item?.patient?.last_name } - ${acItem.item?.service?.name_ru} : ${appointment_statuses[acItem.item?.status as keyof typeof appointment_statuses]?.[0]} . ${new Date(acItem.item?.created_at).toLocaleDateString()}`, acItem.item.id, acItem.item.price)">
                        <span>{{ acItem.item?.patient?.first_name }} {{ acItem.item?.patient?.last_name }} - {{ acItem.item?.service?.name_ru }} : </span>
                        <span class="text-xs">{{ acItem.item?.date }}</span>
                        <span class="text-xs" :class="appointment_statuses[acItem.item?.status as keyof typeof appointment_statuses]?.[2]">
                            ({{ appointment_statuses[acItem.item?.status as keyof typeof appointment_statuses]?.[0] }})
                        </span>
                    </div>
                </template>
            </site-auto-complete>
            <site-input readonly required v-model="profit.date" type="date" label="Дата прибыла" />
            <site-input required v-model="profit.amount" type="number" label="Выплаченная сумма" placeholder="Выплаченная сумма" />

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
            <site-textarea v-model="consumption.description" label="Описание расхода" placeholder="Описание расхода" />
            
            <site-btn :disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </site-btn>
        </form>
    </app-dialog>

    <app-dialog rounded title="Выдача заплаты" :open="dialog3" @close-dialog="close">
        <form @submit.prevent="createSalary" class="mt-4 flex flex-col gap-4">
            <site-input readonly required v-model="salary.date" type="date" label="Дата заплаты" />

            <site-input required v-model="salary.title" label="Название заплаты" placeholder="Название заплаты" />
            <site-select required v-model="salary.doctor" :items="doctors" name="first_name" value="id" label="Доктор" placeholder="Доктор" :nullvalue="null" />
            <site-input required v-model="salary.amount" label="Сумма" placeholder="Сумма" type="number" />

            <site-textarea v-model="salary.description" label="Описание заплаты" placeholder="Описание заплаты" />
            
            <site-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</site-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import type { IAppointment, IDoctor, IReport } from '@/types'
import { todayDate, appointment_statuses } from '~/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { getDoctors } = useDoctors()
const { getAppointments } = useAppointments()
const { getReports, addConsumption, addProfit, addSalary } = useReports()

const filterdate = ref('')
const dialog1 = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
const loading = ref(false)
const doctors = ref<IDoctor[]>([])
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

const salary = reactive({
    date: '',
    title: "",
    description: "",
    
    amount: 0,
    doctor: null,
})

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

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
    consumption.date = todaydate
    salary.date = todaydate
    profit.date = todaydate
    
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getReports(params)
        item.value = data
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

const createSalary = async () => {
    const data = await addSalary(salary)
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
    dialog3.value && Object.assign(salary, {
        amount: 0,
        comment: "",
        doctor: null,
    })
    dialog1.value = false
    dialog2.value = false
    dialog3.value = false
}

const init = async () => {
    initToday()

    getItems(filterdate.value)
    const [AP, DC] = await Promise.all([getAppointments({}),getDoctors({})])
    doctors.value = DC.results
    appointments.value = AP.results
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