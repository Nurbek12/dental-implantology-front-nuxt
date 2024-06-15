<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            
            @fetching="getItems">
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <site-btn @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
</template>

<script setup lang="ts">
import type { IInitialRecord } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { getRecords, deleteRecord } = useInitialRecords()

const loading = ref(false)
const count = ref<number>(0)
const items = ref<IInitialRecord[]>([])

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя", value: "first_name", sortable: true, balancedText: false, custom: false },
    { name: "Фамилия", value: "last_name", sortable: true, balancedText: false, custom: false },
    { name: "Телефон", value: "phone", sortable: true, balancedText: false, custom: false },
    { name: "Комментария", value: "comment", sortable: true, balancedText: true, custom: false },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
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
</script>