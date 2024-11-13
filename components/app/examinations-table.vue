<template>
    <app-data-table
        hide-top
        :loading="false"
        :headers="headers"
        :items="examinations"
        :count="examinations.length">

        <template #table-item-tooth="{tableItem}">
            <div class="flex flex-col gap-4 items-center max-w-[200px]">
                <app-tooth-image :tooth-num="tableItem?.tooth?.num" :conditions="tableItem?.tooth?.condition||[]" />
                <app-badges :items="tableItem.toothCondition" :data="tooth_conditions" />
            </div>
        </template>
        
        <template #table-item-toothNum="{tableItem}">
            <span class="text-lg">{{ tableItem?.tooth?.num }}</span>
        </template>

        <template #table-item-info="{tableItem}">
            <p class="text-base font-medium">{{ new Date(tableItem?.createdAt).toDateString() }}</p>
            <span class="text-sm text-gray-500">{{ tableItem?.createdUser?.firstName }} {{ tableItem?.createdUser?.lastName }}</span>
        </template>
        
        <template #table-item-treatments="{tableItem}">
            <div class="divide-y">
                <div v-for="treatment in tableItem.treatments" :key="treatment.id" class="p-4">
                    <p><b>{{ treatment.procedure.code }}</b> - {{ treatment.procedure.title_ru }}</p>
                    <div class="space-x-2 mt-2">
                        <app-price :value="treatment.price" class="text-gray-600" />
                        <span v-show="treatment.isCompleted" class="px-2 py-1 rounded text-xs bg-green-500 text-white">Сделано</span>
                        <span v-show="!treatment.isCompleted" class="px-2 py-1 rounded text-xs bg-red-500 text-white">Не сделано</span>
                    </div>
                </div>
            </div>
        </template>
        
        <template #table-item-actions="{tableItem}">
            <div class="flex gap-1">
                <nuxt-link class="hover:underline" :to="`/admin/patients/${route.params.id}/examination/${tableItem.id}`">
                    <app-btn size="small">Посмотреть</app-btn>
                </nuxt-link>
            </div>
        </template>
    </app-data-table>
</template>

<script setup lang="ts">
import type { Examination } from '~/types';
import { tooth_conditions } from '@/constants'

const route = useRoute()

defineProps<{
    examinations: Examination[]
}>()


const headers = [
    { name: "Номер зуба", value: "toothNum", sortable: false, balancedText: false, custom: true },
    { name: "Зуб", value: "tooth", sortable: false, balancedText: false, custom: true },
    { name: "Доктор / Время", value: "info", sortable: false, balancedText: false, custom: true },
    { name: "Лечение", value: "treatments", sortable: false, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]
</script>