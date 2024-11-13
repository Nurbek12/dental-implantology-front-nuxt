<template>
    <div class="px-2 py-1 border rounded flex items-end md:items-center flex-col md:flex-row justify-between" :class="{'bg-gray-100':procedure.isCompleted}">
        <div>
            <h3>{{procedure.code}}. {{ procedure.title_ru }}</h3>
            <app-price :value="procedure.price" class="font-bold" />
            <p class="text-sm text-gray-600">{{ procedure.description_ru }}</p>
        </div>
        <div class="flex items-center gap-2" v-if="!hideActions">
            <app-btn @click="emits('toggle-complete-procedure')" customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" size="square">
                <AkCheck v-show="!procedure.isCompleted" />
                <ClCloseMd v-show="procedure.isCompleted" />
            </app-btn>
            <app-btn @click="emits('remove-procedure')" customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" size="square">
                <ClCloseMd />
            </app-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Procedure } from '~/types'
import { ClCloseMd, AkCheck } from '@kalimahapps/vue-icons'

defineProps<{
    procedure: Procedure & { isCompleted?: boolean }
    hideActions?: boolean
}>()
const emits = defineEmits(['remove-procedure', 'toggle-complete-procedure'])
</script>