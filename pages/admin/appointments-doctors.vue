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


            <template #table-item-patient="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem?.patient?.first_name }} {{ tableItem?.patient?.last_name }}</span>
            </template>
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem?.doctor?.first_name }} {{ tableItem?.doctor?.last_name }}</span>
            </template>
            <template #table-item-service="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.service?.name_ru }}</span>
            </template>
            
            <template #table-item-end_time="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.end_time!).toLocaleString() }}</span>
            </template>
            <template #table-item-start_time="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.start_time!).toLocaleString() }}</span>
            </template>

            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <site-btn @click="editItem(tableItem, index)" size="small">Изменить</site-btn>
                    <site-btn @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog :open="dialog" @close-dialog="close" title="Appointment Details" rounded>
        <form @submit.prevent="save" class="bg-white w-full space-y-4 mt-4">
            <site-input @inputed="console.log($event.target.value)" v-model="$item.start_time" label="Start Time" type="datetime-local" />
            <site-input v-model="$item.end_time" label="End Time" type="datetime-local" />
            <site-select v-model="$item.patient" :items="patients" name="first_name" value="id" label="Patient" placeholder="Patient" :nullvalue="null" />
            <site-select v-model="$item.service" :items="services" @changed="changePrice" name="name_ru" value="id" label="Service" placeholder="Service" :nullvalue="null" />
            <site-input v-model="$item.price" label="Price" type="number" placeholder="Priced" />
            <site-btn type="submit" :disabled="loading||!!$item.id">Create an Appointment</site-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { todayDate, formatDate } from '@/constants'
import type { IAppointment, IPatient, IService } from '@/types'

definePageMeta({
  layout: 'admin-layout',
//   middleware: ['auth'],
})

const { getPatients } = usePatients()
const { getServices } = useServices()
const { getAppointments, createAppointment, deleteAppointment, updateAppointment } = useAppointments()

const dialog = ref(false)
const filterdate = ref('')
const user = useUserData()
const loading = ref(false)
const count = ref<number>(0)
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
})

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Пациет", value: "patient", sortable: false, balancedText: false, custom: true },
    { name: "Услуга", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "price", sortable: true, balancedText: false, custom: false },
    { name: "Дата начало", value: "start_time", sortable: true, balancedText: false, custom: true },
    { name: "Дата окончания", value: "end_time", sortable: true, balancedText: false, custom: true },
    { name: "Дата создания", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
]

const changePrice = (e: any) => {
    const service = services.value.find(s => s.id === +e.target.value)
    if(!service) return
    $item.value.price = service.price_end
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getAppointments({...params, start_time: filterdate.value, ordering:'-created_at'})
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
        service: (item?.service as any).id,
        end_time: formatDate(item?.end_time!, 'T'),
        start_time: formatDate(item?.start_time!, 'T'),
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
    }
    dialog.value = false
    itemIndex.value = null
}

const init = async () => {
    initToday()
    
    const p = await getPatients({page: 1, limit: 1000})
    const s = await getServices({page: 1, limit: 1000})

    patients.value = p.results
    services.value = s.results
}

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
}

init()
</script>