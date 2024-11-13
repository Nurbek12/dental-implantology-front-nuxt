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
                <div class="hidden lg:block"></div>
            </template>

            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
            </template>

            <template #table-item-amount="{tableItem}">
                <app-price :value="tableItem.amount" class="text-xs text-balance" />
            </template>

            <template #table-item-type="{tableItem}">
                <span class="text-sm">{{ payment_types[tableItem.type as keyof typeof payment_types] }}</span>
            </template>
            
            <template #table-item-createdUser="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem?.firstName }} {{ tableItem?.lastName }}</span>
            </template>
            
            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
</template>

<script setup lang="ts">
import type { Payment } from '@/types'
import { todayDate, payment_types } from '@/constants'

definePageMeta({
  middleware: ['auth'],
})

const { getPayments } = usePayments()

const filterdate = ref('')
const loading = ref(false)
const count = ref<number>(0)
const items = ref<Payment[]>([])

const headers = [
    { name: "ID", value: "id", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "amount", sortable: false, balancedText: false, custom: true },
    { name: "Тип платежа", value: "type", sortable: false, balancedText: false, custom: true },
    { name: "Создатель", value: "createdUser", sortable: false, balancedText: false, custom: true },
    { name: "Дата создания", value: "createdAt", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getPayments({...params})
        items.value = data.data as any
        count.value = data.meta.total
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