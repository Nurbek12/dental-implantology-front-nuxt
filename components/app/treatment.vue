<template>
    <div class="px-4 py-2 border rounded flex items-end md:items-center flex-col md:flex-row justify-between gap-8" :class="{'bg-gray-100':treatment.isCompleted}">
        <div>
            <h3>{{treatment.procedure.code}}. {{ treatment.procedure.title_ru }}</h3>
            <app-price :value="treatment?.procedure?.price" class="font-bold" />
            <p class="text-sm text-gray-600">{{ treatment.procedure.description_ru }}</p>
        </div>
        <div class="flex items-center gap-2" v-if="!hideActions">
            <app-btn @click="emits('toggle-complete-treatment')" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="square">
                <AkCheck v-show="!treatment.isCompleted" />
                <ClCloseMd v-show="treatment.isCompleted" />
            </app-btn>
            <app-btn @click="emits('remove-treatment')" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                <ClCloseMd />
            </app-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Treatment } from '~/types'
import { AkCheck, ClCloseMd } from '@kalimahapps/vue-icons'

defineProps<{
    treatment: Treatment
    hideActions?: boolean
}>()
const emits = defineEmits(['remove-treatment', 'toggle-complete-treatment'])
</script>