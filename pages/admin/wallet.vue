<template>
    <div class="w-full p-2">
        <app-data-table
            hide-search
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            :total-pages="pages"
            
            @fetching="getItems">
            <template #table-top>
                <div class="h-full w-full py-1">Счет: {{ balance }} сумов</div>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
            </template>
            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
            </template>
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.doctor?.first_name }} {{ tableItem.doctor?.last_name }}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
</template>

<script setup lang="ts">
import { todayDate } from '~/constants'
// import type { ISalary } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

// const { handleGetMe } = useAuth()
const { getSalaries } = useSalaries()

const balance = ref(0)
const loading = ref(false)
const user = useUserData()
const count = ref<number>(0)
const pages = ref<number>(0)
const items = ref<any[]>([])
          
const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Названия", value: "title", sortable: false, balancedText: false, custom: false },
    { name: "Описания", value: "description", sortable: false, balancedText: false, custom: false },
    { name: "Оплачено", value: "amount", sortable: false, balancedText: false, custom: false },
    { name: "Добавлен", value: "created_at", sortable: true, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        // const data = await getSalaries({doctor: user.value?.id, ordering: '-created_at', ...params})
        // pages.value = data.page_count
        // items.value = data.results
        // count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const init = async () => {
    const token = useAuthAccessToken()
    if(!token) return
    // const data = await handleGetMe(token.value!)
    // balance.value = data.balance!
}

init()
</script>