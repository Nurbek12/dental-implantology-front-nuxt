<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"

            @fetching="getItems">
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.doctor?.name }}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <button @click="checkItem(tableItem.id!, index)" :disabled="tableItem.check" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white rounded text-xs px-3 py-2">{{tableItem.check?"Проверено":"Проверять"}}</button>
                    <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                </div>
            </template>
        </app-data-table>
    </div>
</template>

<script setup lang="ts">
import type { Appointment } from '@/types'

const count = ref<number>(0)
const items = ref<Appointment[]>([])

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя и фамилия", value: "name", sortable: true, balancedText: false, custom: false },
    { name: "Телефон", value: "phone", sortable: true, balancedText: false, custom: false },
    { name: "Доктор?", value: "doctor", sortable: true, balancedText: false, custom: true },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    const data = await $fetch('/api/appointments', {
        params
    })
    count.value = data.count
    items.value = data.result as any
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    console.log('Deleted', id)
    items.value.splice(index, 1)
}

const checkItem = async (id: number, index: number) => {
    if(!confirm('Вы чекали это?')) return
    console.log('check', id)
    await $fetch(`/api/appointments/update/${id}`, {
        method: 'put',
        body: JSON.stringify({ check: true })
    })
    Object.assign(items.value[index], { check: true })
}
</script>