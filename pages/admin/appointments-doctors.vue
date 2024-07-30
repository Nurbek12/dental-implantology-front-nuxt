<template>
    <div class="w-full p-2">
        <app-data-table
            hide-search
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            
            @fetching="getItems">
            <template #table-top>
                <site-input v-model="filterdate" type="date" placeholder="Поиск" @changed="getItems({date:$event.target.value})" />
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <site-btn @click="dialog=true" size="small">Добавить</site-btn>

            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img :src="tableItem.avatar||'/images/nophoto.jpg'" alt="" class="w-full h-full object-cover">
                </div>
            </template>

            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
            </template>

            <template #table-item-patient="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem?.patient?.first_name }} {{ tableItem?.patient?.last_name }}</span>
            </template>
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem?.doctor?.first_name }} {{ tableItem?.doctor?.last_name }}</span>
            </template>
            <template #table-item-service="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.service?.name_ru }}</span>
            </template>
            <template #table-item-status="{tableItem}">
                <span class="text-xs whitespace-nowrap" :class="appointment_statuses[tableItem.status as keyof typeof appointment_statuses]?.[2]">
                    {{ appointment_statuses[tableItem.status as keyof typeof appointment_statuses]?.[0] }}
                </span>
            </template>
            
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <site-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</site-btn>
                    <site-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog :open="dialog" @close-dialog="close" title="Подробности приема" rounded>
        <form @submit.prevent="save" class="bg-white w-full space-y-4 mt-4">
            <site-input required v-model="$item.start_time" label="Дата начала" type="time" />
            <site-input required v-model="$item.end_time" label="Дата окончания" type="time" />
            
            <site-auto-complete required v-if="!$item.id" v-model="($item.patient as number)" @inputed="searching" :loading="patientLoading" :items="patients" label="Пациент" placeholder="Пациент" :nullvalue="null">
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
            <site-select required v-model="$item.status" :items="Object.keys(appointment_statuses).map(k => ({name:appointment_statuses[k as keyof typeof appointment_statuses][0], value:k}))" label="Статус" placeholder="Статус" :nullvalue="null" />
            
            <site-select required v-model="$item.service" :items="services" @changed="changePrice" name="name_ru" value="id" label="Услуга" placeholder="Услуга" :nullvalue="null" />
            <site-input required v-model="$item.price" label="Цена" type="number" placeholder="Цена" />
            <site-btn type="submit" :disabled="loading||!!$item.id||$item.service==null">Сохранить</site-btn>

            <div v-if="$item.id" class="mt-6 border-t border-gray-800 border-dashed">
                <h1 class="my-2">Оплаты</h1>
                <app-data-table :items="$item.profits!" :loading="false" :headers="profitHeaders" :count="0" hide-bottom hide-top>
                    <template #table-item-id="{index}">
                        <span class="text-xs">{{ index+1 }}</span>
                    </template>
                    <template #table-item-created_at="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
                    </template>
                </app-data-table>
                <span class="text-sm mt-2" :class="appointment_statuses[$item.status][2]">
                    Общая оплата: {{ $item.profits?.reduce((a,b) => a + b.amount, 0)?.toLocaleString('ru-RU') || 0 }}
                </span>
            </div>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import { todayDate, appointment_statuses } from '@/constants'
import type { IAppointment, IPatient, IService } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { getPatients } = usePatients()
const { getServices } = useServices()
const { getAppointments, createAppointment, deleteAppointment, updateAppointment } = useAppointments()

const dialog = ref(false)
const filterdate = ref('')
const user = useUserData()
const loading = ref(false)
const count = ref<number>(0)
const patientLoading = ref(false)
const items = ref<IAppointment[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const services = ref<IService[]>([])
const patients = ref<IPatient[]>([])
const $item = ref<IAppointment>({
    doctor: user.value?.id!,
    patient: null,
    service: null,
    price: 0,
    end_time: '',
    start_time: '',
    date: todayDate(),
    status: 'PN',
})

const profitHeaders = [
    { name: "Прибыли", value: "id", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "amount", sortable: false, balancedText: false, custom: false },
    { name: "Дата создания", value: "created_at", sortable: false, balancedText: false, custom: true },
]

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Пациент", value: "patient", sortable: false, balancedText: false, custom: true },
    { name: "Услуга", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "price", sortable: true, balancedText: false, custom: false },
    { name: "Статус", value: "status", sortable: true, balancedText: false, custom: true },
    { name: "Дата начала", value: "start_time", sortable: true, balancedText: false, custom: false },
    { name: "Дата окончания", value: "end_time", sortable: true, balancedText: false, custom: false },
    { name: "Дата создания", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const changePrice = (e: any) => {
    const service = services.value.find(s => s.id === +e.target.value)
    if(!service) return
    $item.value.price = service.price_end
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getAppointments({...params,  ordering:'-created_at'})
        // doctor=doctorid
        items.value = data.results
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: IAppointment, index: number) => {
    itemIndex.value = index
    dialog.value = true
    
    Object.assign($item.value, {
        ...item,
        patient: (item?.patient as any).id,
        doctor: (item?.doctor as any).id,
        service: (item?.service as any).id,
    })
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteAppointment(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createAppointment(body)
    items.value.unshift(data as any)
}

const update = async (index: number, body: any, id: any) => {
    const data = await updateAppointment(id, body)
    Object.assign(items.value[index], data)
}

const save = async () => {
    createLoading.value = true

    if(itemIndex.value !== null) await update(itemIndex.value, $item.value, $item.value.id)
        
    else await create($item.value)

    createLoading.value = false
    close()
}

const close = () => {
    $item.value = {
        doctor: null,
        patient: null,
        service: null,
        price: 0,
        end_time: '',
        start_time: '',
        date: todayDate(),
        status: 'PN',
    }
    dialog.value = false
    itemIndex.value = null
}

const init = async () => {
    initToday()
    
    const s = await getServices({page: 1, limit: 1000})

    services.value = s.results
}

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
}

const searching = lodash.debounce(async (e) => {
    if(!e.target.value?.trim()) return patients.value = []
    patientLoading.value = true
    const p = await getPatients({page: 1, limit: 1000, search: e.target.value})
    patients.value = p.results
    patientLoading.value = false
}, 500)

init()
</script>