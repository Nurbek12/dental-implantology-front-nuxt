<template>
    <div class="relative rounded overflow-hidden shadow-md shadow-black/10 flex items-start gap-4 p-6">
        <div class="flex gap-2 items-center">
            <LaToothSolid class="text-primary-500 w-16 h-16" />
        </div>    
        <div class="font-medium">
            <h1 class="text-lg font-medium">{{ item?.[`name_${$i18n.locale as 'uz'}`] }}</h1>
            <p class="text-sm">{{ item?.[`description_${$i18n.locale as 'uz'}`] }}</p>

            <div class="text-sm text-primary-500">
                <span v-show="item?.price_end">от </span>
                <span>{{ item?.price_start?.toLocaleString('ru-RU') }}</span>
                <span v-show="item?.price_end"> до </span>
                <span v-show="!item?.price_end"> сумов </span>
                <span v-show="item?.price_end">{{ item?.price_end?.toLocaleString('ru-RU') }} сумов</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IService } from '~/types'
import { LaToothSolid } from '@kalimahapps/vue-icons'

const props = defineProps<{
    item?: IService
}>()
</script>