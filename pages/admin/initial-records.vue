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
                    <site-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="updateStatus(tableItem.id!, index)" size="small" :disabled="!tableItem.is_active">{{tableItem.is_active?'Заверщать':'Просмотрено'}}</site-btn>
                    <site-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
</template>

<script setup lang="ts">
import type { IInitialRecord } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { getRecords, deleteRecord, updateRecord } = useInitialRecords()

const loading = ref(false)
const count = ref<number>(0)
const items = ref<IInitialRecord[]>([])

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Имя", value: "first_name", sortable: true, balancedText: false, custom: false },
    { name: "Фамилия", value: "last_name", sortable: true, balancedText: false, custom: false },
    { name: "Телефон", value: "phone", sortable: false, balancedText: false, custom: false },
    { name: "Комментарий", value: "comment", sortable: false, balancedText: true, custom: false },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getRecords({...params, ordering: '-created_at'})
        items.value = data.results
        count.value = data.count
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

const updateStatus = async (id: number, index: number) => {
    if(!confirm('Вы хотите заверщать этот запись?')) return
    await updateRecord(id, { is_active: false })
    items.value[index].is_active = false
}
</script>