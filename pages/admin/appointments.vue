<template>
    <div class="w-full p-2">
        <div class="border w-full rounded mt-2 overflow-hidden">
            <div class="relative overflow-x-auto flex bg-white">
                <div class="w-[150px] border-r">
                    <div class="h-[30px] flex items-center justify-center text-sm border-b bg-gray-50">Часы/Докторы</div>
                    <div v-for="hour in hours" :key="hour" :class="{'text-gray-500':hour==='Обед'}" class="h-[30px] flex items-center justify-center text-sm border-b">{{ hour }}</div>
                </div>
                <div class="flex-1 overflow-auto scrollbar-hide">
                    <div class="flex w-max">
                        <div v-for="item,i in items" :key="i" class="relative">
                            <div class="relative z-10 h-[30px] flex px-6 items-center justify-center bg-gray-50 border-b border-r">{{ item?.first_name }} {{ item?.last_login }}</div>
                            <div>
                                <div v-for="hour in hours" :key="hour" @click="selectItem(i, hour, item)" :class="{'bg-gray-300 pointer-events-none':hour==='Обед'}" class="hover:bg-gray-50 active:bg-gray-100 cursor-pointer h-[30px] flex items-center justify-center text-sm border-b border-r"></div>
                            </div>
                            <div class="top-[30px] absolute left-0 w-full">
                                <div v-for="ap,j in item.appointments" :key="j" :style="{'height': `${((new Date(ap.end_time) as any)-(new Date(ap.start_time) as any))*60/(60 * 60 * 1000)}px`, 'top':`${
                                    formatDateJson(ap.start_time).hours>=14?
                                    (formatDateJson(ap.start_time).hours-9)*60-30:
                                    (formatDateJson(ap.start_time).hours-9)*60}px`}"
                                    class="absolute w-full">
                                    <div @click="selectItem(i, '', item, ap)" class="w-full h-full border flex items-center justify-center cursor-pointer bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white text-center text-xs px-4">
                                        {{ (ap.patient as IPatient).first_name }} {{ (ap.patient as IPatient).last_name }}
                                        <!-- {{ formatDateJson(ap.start_time).hours }} -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <app-dialog :open="dialog" @close-dialog="close" title="Appointment Details" rounded>
            <form @submit.prevent="createItem" class="bg-white w-full space-y-4 mt-4">
                <site-input @inputed="console.log($event.target.value)" v-model="$item.start_time" label="Start Time" type="datetime-local" />
                <site-input v-model="$item.end_time" label="End Time" type="datetime-local" />
                <site-select v-model="$item.patient" :items="patients" name="first_name" value="id" label="Patient" placeholder="Patient" :nullvalue="null" />
                <site-select v-model="$item.doctor" :items="doctors" name="first_name" value="id" label="Doctor" placeholder="Doctor" :nullvalue="null" />
                <site-select v-model="$item.service" :items="services" @changed="changePrice" name="name_ru" value="id" label="Service" placeholder="Service" :nullvalue="null" />
                <site-input v-model="$item.price" label="Price" type="number" placeholder="Priced" />
                <site-button type="submit" :disabled="loading||!!$item.id">Create an Appointment</site-button>
            </form>
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import { formatDate, formatDateJson } from '@/constants'
import type { IAppointment, IDoctor, IPatient, IService, } from '@/types'

const { getDoctors } = useDoctors()
const { getPatients } = usePatients()
const { getServices } = useServices()
const { getAppointments, createAppointment } = useAppointments()

const dialog = ref(false)
const loading = ref(false)
const itemIndex = ref(-1)
const doctors = ref<IDoctor[]>([])
const services = ref<IService[]>([])
const patients = ref<IPatient[]>([])
const $item = ref<IAppointment>({
    doctor: null,
    patient: null,
    service: null,
    price: 0,
    end_time: '',
    start_time: '',
})
const items = ref<IDoctor[]>([])
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

definePageMeta({
  layout: 'admin-layout',
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
            end_time: formatDate(app.end_time!, 'T', '-'),
            start_time: formatDate(app.start_time!, 'T', '-'),
        })
        return
    }
    const now = new Date()
    const [hours, minutes] = hour.split(':').map(Number)
    
    now.setHours(hours)
    now.setMinutes(minutes)

    now.setSeconds(0)
    now.setMilliseconds(0)

    const end = new Date(now.getTime());
    end.setHours(end.getHours() + 1);
    
    Object.assign($item.value, {
        doctor: doctor?.id,
        patient: null,
        service: null,
        price: 0,
        end_time: formatDate(end.toLocaleString(), ', ', '.'),
        start_time: formatDate(now.toLocaleString(), ', ', '.'),
    })
}

const deleteItem = async (id: number, index: number) => {
    // if(!confirm('Вы хотите удалить это?')) return
    // console.log('Deleted', id)
    // items.value.splice(index, 1)
}

const changePrice = (e: any) => {
    const service = services.value.find(s => s.id === +e.target.value)
    if(!service) return
    $item.value.price = service.price_end
}

const createItem = async () => {
    try {
        loading.value = true
        const data: any = await createAppointment($item.value)
        items.value[itemIndex.value].appointments?.push({
            ...data,
            doctor: doctors.value.find(d => d.id === data.doctor),
            patient: patients.value.find(p => p.id === data.patient),
            service: services.value.find(s => s.id === data.service),
        })
        close()
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const init = async () => {
    const a = await getAppointments({})
    const d = await getDoctors({page: 1, limit: 1000})

    const p = await getPatients({page: 1, limit: 1000})
    const s = await getServices({page: 1, limit: 1000})

    items.value = d.results.map(di => {
        const appointments = a.results.filter(ai => (ai.doctor as any).id === di.id)
        di.appointments = appointments
        return di
    })
    doctors.value = d.results
    patients.value = p.results
    services.value = s.results
}

init()

const close = () => {
    $item.value = {
        doctor: null,
        patient: null,
        service: null,
        price: 0,
        end_time: '',
        start_time: '',
    }
    dialog.value = false
}
</script>