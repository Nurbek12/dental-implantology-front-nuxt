<template>
    <div class="w-full">
        <app-data-table
            hide-search
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            
            @fetching="getItems">
            <template #table-top>
                <app-input v-model="filterdate" type="date" placeholder="Поиск" @changed="getItems({date:$event.target.value})" />
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
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
            <!-- <template #table-item-status="{tableItem}">
                <span class="text-xs whitespace-nowrap" :class="appointment_statuses[tableItem.status as keyof typeof appointment_statuses]?.[2]">
                    {{ appointment_statuses[tableItem.status as keyof typeof appointment_statuses]?.[0] }}
                </span>
            </template> -->
            
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
</template>

<script setup lang="ts">
import type { Appointment } from '@/types'
import { todayDate } from '@/constants'

definePageMeta({
  middleware: ['auth'],
})

const { getAppointments } = useAppointments()

const filterdate = ref('')
const loading = ref(false)
const count = ref<number>(0)
const items = ref<Appointment[]>([])

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Услуга", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "price", sortable: true, balancedText: false, custom: false },
    { name: "Дата начала", value: "startDate", sortable: true, balancedText: false, custom: false },
    { name: "Дата окончания", value: "endDate", sortable: true, balancedText: false, custom: false },
    { name: "Дата создания", value: "createdAt", sortable: true, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        // const data = await getAppointments(params)
        // doctor=doctorid
        // items.value = data.results
        // count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}


const init = async () => {
    initToday()
    
    // const s = await getServices({page: 1, limit: 1000})

    // services.value = s.results
}

const initToday = () => {
    const todaydate = todayDate()
    filterdate.value = todaydate
}

init()
</script>