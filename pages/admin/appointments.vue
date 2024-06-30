<template>
    <div class="w-full p-2">
        <div class="p-2 rounded border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white">
            <site-input v-model="filterdate" type="date" placeholder="Поиск" @changed="getItems({date:$event.target.value})" />
            <div class="hidden lg:block"></div>
            <div class="flex items-center justify-start md:justify-end gap-4 col-span-1 lg:col-span-2 flex-wrap">
                <div v-for="aps,i of appointment_statuses" :key="i" class="text-xs text-nowrap flex items-center gap-1">
                    <div :class="aps[1]" class="h-[14px] w-[14px] rounded border"></div>
                    <span :class="aps[2]">{{ aps[0] }}</span>
                </div>
            </div>
        </div>

        <div class="border w-full rounded mt-2 overflow-hidden">
            <div class="relative overflow-x-auto flex bg-white">
                <div class="w-[150px] border-r">
                    <div class="h-[30px] flex items-center justify-center text-sm border-b bg-gray-50">Часы/Докторы</div>
                    <div v-for="hour in hours" :key="hour" :class="{'text-gray-500':hour==='Обед'}" class="h-[30px] flex items-center justify-center text-sm border-b">{{ hour }}</div>
                </div>
                <div class="flex-1 overflow-auto scrollbar-hide">
                    <div class="flex w-max">
                        <div v-for="item,i in items" :key="i" class="relative">
                            <div class="relative z-10 h-[30px] flex px-8 items-center justify-center bg-gray-50 border-b border-r">{{ item?.first_name }} {{ item?.last_name }}</div>
                            <div>
                                <div v-for="hour in hours" :key="hour" @click="selectItem(i, hour, item)" :class="{'bg-gray-300 pointer-events-none':hour==='Обед'}" class="hover:bg-gray-50 active:bg-gray-100 cursor-pointer h-[30px] flex items-center justify-center text-sm border-b border-r"></div>
                            </div>
                            <div class="top-[30px] absolute left-0 w-full">
                                <div v-for="ap,j in item.appointments" :key="j" :style="{'height': `${getTimeDifferenceInMilliseconds(ap.end_time, ap.start_time)*60/(60 * 60 * 1000)}px`, 'top':`${
                                    ((+ap.start_time.split(':')[0])>=14)?
                                    ((+ap.start_time.split(':')[0])-9)*60-30:
                                    ((+ap.start_time.split(':')[0])-9)*60}px`}"
                                    class="absolute w-full">
                                    <div @click="selectItem(i, '', item, ap)" class="w-full h-full border flex items-center justify-center flex-col cursor-pointer text-white text-center text-sm"
                                        :class="appointment_statuses[ap.status||'PN']?.[1]||'text-black'">
                                        {{ (ap.patient as IPatient).first_name }} {{ (ap.patient as IPatient).last_name }}:
                                        <span class="text-xs">({{ (ap.service as IService)?.name_ru }})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <app-dialog :open="dialog" @close-dialog="close" title="Подробности приема" rounded>
            <form @submit.prevent="createItem" class="bg-white w-full space-y-4 mt-4">
                <site-input v-model="$item.start_time" label="Время начала" type="time" />
                <site-input v-model="$item.end_time" label="Время окончания" type="time" />
                <site-auto-complete v-if="!$item.id" v-model="$item.patient" @inputed="searching" :loading="patientLoading" :items="patients" label="Пациент" placeholder="Пациент" :nullvalue="null">
                    <template #item="acItem">
                        <div class="flex items-center gap-2" @click="acItem.onSelected(`${acItem.item.first_name} ${acItem.item.middle_name } ${acItem.item.last_name}`, acItem.item.id)">
                            <div>
                                <img srcset="/images/nophoto.jpg" :src="acItem.item?.avatar||'/images/nophoto.jpg'" class="w-[35px] h-[35px] rounded-full object-cover">
                            </div>
                            <div class="mb-2">
                                <span class="text-sm">{{acItem.item.first_name}} {{ acItem.item.middle_name }} {{acItem.item.last_name}}</span>
                                <p class="text-xs text-gray-700">{{ acItem.item.phone }}</p>
                            </div>
                        </div>
                    </template>
                </site-auto-complete>
                
                <site-select v-model="$item.status" :items="Object.keys(appointment_statuses).map(k => ({name:appointment_statuses[k as keyof typeof appointment_statuses][0], value:k}))" label="Статус" placeholder="Статус" :nullvalue="null" />
                <site-select v-model="$item.doctor" :items="doctors" name="first_name" value="id" label="Врач" placeholder="Врач" :nullvalue="null" />
                <site-select v-model="$item.service" :items="services" @changed="changePrice" name="name_ru" value="id" label="Услуга" placeholder="Услуга" :nullvalue="null" />
                <site-input v-model="$item.price" label="Цена" type="number" placeholder="Цена" />
                <div class="flex items-center gap-2">
                    <site-btn type="submit" :disabled="loading||!!$item.id">Сохранить</site-btn>
                </div>
            </form>
            
            <div v-if="$item.id" class="mt-6 pt-4 border-t border-gray-800 border-dashed">
                <h1 class="my-4">Оплаты</h1>
                <app-data-table :items="$item.profits!" :loading="false" :headers="profitHeaders" :count="0" hide-bottom hide-top>
                    <template #table-top-extra>
                        <form @submit.prevent="handlePay($item.id)" class="flex items-center justify-between">
                            <site-input required v-model="profitPrice" label="Цена оплаты" type="number" :min="0" />
                            <site-btn type="submit" :disabled="!profitPrice||loading||($item.profits?.reduce((a,b) => a + b.amount, 0)!+profitPrice>$item.price)">Оплатить</site-btn>
                        </form>
                    </template>
                    <template #table-item-created_at="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
                    </template>
                </app-data-table>
                <span class="text-sm mt-2" :class="appointment_statuses[$item.status][2]">
                    Общая оплата: {{ $item.profits?.reduce((a,b) => a + b.amount, 0)?.toLocaleString('ru-RU') || 0 }}
                </span>
            </div>
        </app-dialog>
    </div>
</template>


<script setup lang="ts">
import lodash from 'lodash'
import { todayDate, appointment_statuses, getTimeDifferenceInMilliseconds } from '@/constants'
import type { IAppointment, IDoctor, IPatient, IService, } from '@/types'

const { getDoctors } = useDoctors()
const { getPatients } = usePatients()
const { getServices } = useServices()
const { getAppointments, createAppointment, addProfitForAppointment } = useAppointments()

const itemIndex = ref(-1)
const dialog = ref(false)
const loading = ref(false)
const filterdate = ref('')
const profitPrice = ref(0)
const items = ref<IDoctor[]>([])
const patientLoading = ref(false)
const doctors = ref<IDoctor[]>([])
const services = ref<IService[]>([])
const patients = ref<IPatient[]>([])
const $item = ref<IAppointment>({
    doctor: null,
    patient: null,
    service: null,
    price: 0,
    status: "PN",
    end_time: '',
    start_time: '',
    date: todayDate(),
})

const hours = [
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "Обед",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
]

const profitHeaders = [
    { name: "Прибыли", value: "id", sortable: false, balancedText: false, custom: false },
    { name: "Цена", value: "amount", sortable: false, balancedText: false, custom: false },
    { name: "Дата создания", value: "created_at", sortable: false, balancedText: false, custom: true },
]

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const selectItem = (index: number, hour: string, doctor: IDoctor | null, app?: IAppointment) => {
    itemIndex.value = index
    dialog.value = true

    if(app) {
        Object.assign($item.value, {
            ...app,
            doctor: (app.doctor as any).id,
            patient: (app.patient as any).id,
            service: (app.service as any).id,
        })
        return
    }
    
    let newTime
    
    if(hour == "12:30") newTime = "13:00"
    else if(hour == "20:30") newTime = "21:00"
    else {
        const date = new Date();
        const [h, m] = hour.split(':')
    
        date.setHours(parseInt(h, 10));
        date.setMinutes(parseInt(m, 10));
        date.setHours(date.getHours() + 1);
    
        const newHours = String(date.getHours()).padStart(2, '0');
        const newMinutes = String(date.getMinutes()).padStart(2, '0');

        newTime = `${newHours}:${newMinutes}`;
    }
        
    Object.assign($item.value, {
        doctor: doctor?.id,
        patient: null,
        service: null,
        price: 0,
        end_time: newTime,
        start_time: hour,
    })
}

const searching = lodash.debounce(async (e) => {
    if(!e.target.value?.trim()) return patients.value = []
    patientLoading.value = true
    const p = await getPatients({page: 1, limit: 1000, search: e.target.value})
    patients.value = p.results
    patientLoading.value = false
}, 500)

const changePrice = (e: any) => {
    const service = services.value.find(s => s.id === +e.target.value)
    if(!service) return
    $item.value.price = service.price_end
}

const createItem = async () => {
    try {
        loading.value = true
        const data = await createAppointment($item.value)
        const newItem = {
            ...data,
            doctor: doctors.value.find(d => d.id === data.doctor),
            patient: patients.value.find(p => p.id === data.patient),
            service: services.value.find(s => s.id === data.service),
            profits: [],
        } as any
        items.value[itemIndex.value].appointments?.push(newItem)
        close()
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const handlePay = async (id: any) => {
    try {
        loading.value = true
        const data: any = await addProfitForAppointment(id, JSON.stringify({
            date: todayDate(),
            amount: profitPrice.value,
            appointment: id,
        }))
        
        profitPrice.value = 0
        
        const appindex = items.value[itemIndex.value].appointments?.findIndex(ap => ap.id === id)
        const app = items.value[itemIndex.value].appointments![appindex!]
        if(!app) return
        
        app.profits?.push(data)
        
        const d = app.profits?.reduce((a,b) => a + b.amount, 0)
    
        if(d === app.price) $item.value.status = app.status = 'FP'
        else if(d! < app.price) $item.value.status = app.status = 'PP'

    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const a = await getAppointments(params)
        items.value = doctors.value.map(di => {
            const appointments = a.results.filter(ai => (ai.doctor as any).id === di.id)
            di.appointments = appointments
            return di
        })
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const init = async () => {
    initToday()

    const [d,s] = await Promise.all([
        getDoctors({page: 1, limit: 1000}),
        getServices({page: 1, limit: 1000})
    ])
    doctors.value = d.results
    services.value = s.results

    await getItems({date:todayDate()});
}

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
}

const close = () => {
    $item.value = {
        doctor: null,
        patient: null,
        service: null,
        price: 0,
        status: "PN",
        end_time: '',
        start_time: '',
        date: todayDate(),
    }
    dialog.value = false
}

init()
</script>