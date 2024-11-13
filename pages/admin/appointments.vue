<template>
    <div class="w-full p-2">
        <div class="p-2 rounded border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-white">
            <app-input v-model="filterdate" type="date" placeholder="Поиск" @changed="getItems({date:$event.target.value})" />
            <div class="hidden md:block"></div>
            <div class="hidden md:block"></div>
            <app-btn @click="dialog=true" size="small">Добавить</app-btn>
        </div>

        <div class="border w-full rounded mt-2 overflow-hidden">
            <div class="relative overflow-x-auto flex bg-white">
                <div class="w-[150px] border-r">
                    <div class="h-[30px] flex items-center justify-center text-sm border-b bg-gray-50">Часы/Докторы</div>
                    <div v-for="hour in WORKING_HOURS" :key="hour" :class="{'text-gray-500':hour==='Обед'}" class="h-[30px] flex items-center justify-center text-sm border-b">{{ hour }}</div>
                </div>
                <div class="flex-1 overflow-auto scrollbar-hide">
                    <div class="flex w-max">
                        <div v-for="doctor,i in doctors" :key="i" class="relative">
                            <div class="relative h-[30px] z-10 text-sm px-8 gap-1 flex flex-col items-center justify-center bg-gray-50 border-b border-r">
                                <!-- <div class="w-[50px] h-[50px] rounded-full overflow-hidden">
                                    <app-image :src="doctor.avatar!" class="w-full h-full object-cover" />
                                </div> -->
                                <span>{{ doctor?.firstName }} {{ doctor?.lastName }}</span>
                            </div>
                            <div>
                                <div v-for="hour in WORKING_HOURS" :key="hour" @click="selectItem(i, hour, doctor.id)"
                                    :class="{'bg-gray-300 pointer-events-none':hour==='Обед'}"
                                    class="hover:bg-gray-50 active:bg-gray-100 cursor-pointer h-[30px] flex items-center justify-center text-sm border-b border-r" />
                            </div>
                            <div class="top-[30px] absolute left-0 w-full">
                                <!-- <div v-for="ap,j in item.appointments" :key="j" :style="{'height': `${getTimeDifferenceInMilliseconds(ap.end_time, ap.start_time)*60/(60 * 60 * 1000)}px`, 'top':`${
                                    ((timeToDecimal(ap.start_time))>=14)?
                                    ((timeToDecimal(ap.start_time))-9)*60-30:
                                    ((timeToDecimal(ap.start_time))-9)*60}px`}"
                                    class="absolute w-full">
                                    <div @click="selectItem(i, '', item, ap)" class="w-full h-full border flex items-center justify-center flex-col cursor-pointer text-white text-center text-sm"
                                        :class="appointment_statuses[ap.status||'PN']?.[1]||'text-black'">
                                        {{ (ap.patient as IPatient)?.first_name }} {{ (ap.patient as IPatient)?.last_name }}:
                                        <span class="text-xs">({{ (ap.service as IService)?.name_ru }})</span>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <app-dialog v-model="dialog" @close-dialog="close" title="Подробности приема" rounded>
            <form @submit.prevent="createItem" class="bg-white w-full space-y-4 mt-4">

                <app-auto-complete required v-if="!$item.id" v-model="$item.patientId" @inputed="searching" :loading="patientLoading" :items="patients" itemValue="id" label="Пациент" placeholder="Пациент" :nullvalue="null">
                    <template #item="{item, onSelected}">
                        <div class="flex items-center gap-2" 
                            @click="onSelected(`${item.firstName} ${item.middleName } ${item.lastName}`, item.id, 1)">
                            <div>
                                <app-image :src="item?.avatar!" class="w-[35px] h-[35px] rounded-full object-cover" />
                            </div>
                            <div class="mb-2">
                                <span class="text-sm">{{item.firstName}} {{ item.middleName }} {{item.lastName}}</span>
                                <p class="text-xs text-gray-700">{{ item.phone }}</p>
                            </div>
                        </div>
                    </template>
                </app-auto-complete>

                <app-input required v-model="$item.startDate" label="Время начала" type="datetime-local" />
                <app-input required v-model="$item.endDate" @update:model-value="console.log" label="Время окончания" type="datetime-local" />
                <app-select required v-model="$item.doctorId" :items="doctors" name="firstName" value="id" label="Доктор" placeholder="Доктор" :nullvalue="null" />
                <app-select required v-model="$item.procedureId" :items="procedures" name="title_ru" value="id" label="Процедура" placeholder="Процедура" :nullvalue="null" />
                <app-textarea v-model="$item.description" label="Описания" placeholder="Описания" />
                
                <app-btn type="submit" :disabled="loading">Сохранить</app-btn>
            </form>
    
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { todayDate, WORKING_HOURS } from '@/constants'
import type { User, Appointment, Patient, Procedure } from '@/types'

const { getUsers } = useUsers()
const { getPatients } = usePatients()
const { getProcedures } = useProcedures()
const { getAppointments, createAppointment } = useAppointments()

const dialog = ref(false)
const loading = ref(false)
const filterdate = ref('')
const patientLoading = ref(false)
const doctors = ref<User[]>([])
const patients = ref<Patient[]>([])
const items = ref<Appointment[]>([])
const procedures = ref<Procedure[]>([])
const itemIndex = ref<number|null>(null)
const $item = ref<Partial<Appointment>>({
    endDate: '',
    startDate: '',
    description: '',
    doctorId: null as any,
    patientId: null as any,
    procedureId: null  as any,
})

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const selectItem = (index: number, hour: string, doctorId: number, app?: Appointment) => {
    dialog.value = true
    itemIndex.value = index

    if(app) {
        
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
    
    $item.value = {
        doctorId,
        description: '',
        patientId: null as any,
        procedureId: null as any,
        startDate: `${todayDate()}T${hour}`,
        endDate: `${todayDate()}T${newTime}`,
    }
}

const searching = debounce(async (e) => {
    if(!e.target.value?.trim()) return patients.value = []
    patientLoading.value = true
    const { data } = await getPatients({page: 1, perPage: 1000, search: e.target.value})
    patients.value = data as any
    patientLoading.value = false
}, 500)

const createItem = async () => {
    try {
        loading.value = true
        createAppointment($item.value)
        close()
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getAppointments(params)
        console.log(data);
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const init = async () => {
    initToday()

    const [doctorsResp, proceduresResp] = await Promise.all([
        getUsers({ role: 'DOCTOR'}),
        getProcedures({page: 1, perPage: 1000})
    ])
    
    doctors.value = doctorsResp as any
    procedures.value = proceduresResp.data as any

    await getItems({groupBy: 'doctor'});
    // date:todayDate()
}

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
}

const close = () => {
    $item.value = {
        endDate: '',
        startDate: '',
        description: '',
        doctorId: null as any,
        patientId: null as any,
        procedureId: null  as any,
    }
    dialog.value = false
}

init()
</script>