<template>
    <div class="w-full p-2">
        <app-data-table
            hide-top
            :count="count"
            :items="items"
            :headers="headers"
            
            @fetching="getItems">
            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
            </template>
            <template #table-item-first_name="{tableItem}">
                <span class="text-xs">{{ tableItem.first_name }} {{ tableItem.last_name }}</span>
            </template>
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.doctor?.name || 'Нет'}}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <site-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
</template>

<script setup lang="ts">
import type { IRatings } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { deleteRating, getRatings } = useRatings()

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Имя и фамилия", value: "first_name", sortable: true, balancedText: false, custom: true },
    { name: "Отзыв", value: "review", sortable: false, balancedText: true, custom: false },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const count = ref<number>(0)
const items = ref<IRatings[]>([])

const getItems = async (params: any) => {
    const data = await getRatings(params)
    count.value = data.count
    items.value = data.results
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    console.log('Deleted', id)
    await deleteRating(id)
    items.value.splice(index, 1)
}
</script>