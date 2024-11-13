<template>
    <div class="w-full p-2">
        <app-data-table
            hide-top
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            
            @fetching="getItems">
            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <!-- <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="updateStatus(tableItem.id!, index)" size="small" :disabled="!tableItem.is_active">{{tableItem.is_active?'Заверщать':'Просмотрено'}}</app-btn> -->
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
</template>

<script setup lang="ts">
import type { InitialRecord } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { getRecords, deleteRecord } = useInitialRecords()

const loading = ref(false)
const count = ref<number>(0)
const items = ref<InitialRecord[]>([])

const headers = [
    { name: "No", value: "id", sortable: false, balancedText: false, custom: true },
    { name: "Имя", value: "firstName", sortable: false, balancedText: false, custom: false },
    { name: "Фамилия", value: "lastName", sortable: false, balancedText: false, custom: false },
    { name: "Телефон", value: "phone", sortable: false, balancedText: false, custom: false },
    { name: "Комментарий", value: "notes", sortable: false, balancedText: true, custom: false },
    { name: "Дата", value: "createdAt", sortable: false, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getRecords({ ...params })
        items.value = data.data as any
        count.value = data.meta.total
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteRecord(id)
    items.value.splice(index, 1)
}
</script>