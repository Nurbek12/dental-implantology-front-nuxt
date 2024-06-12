<template>
    <div class="relative h-[400px] rounded overflow-hidden shadow-lg shadow-black/5">
        <!-- <div class="bg-gray-100 h-full w-full"> -->
            <img :src="item?.image || '/images/nophoto.jpg'" class="w-full h-full object-cover">
        <!-- </div> -->
        <div class="absolute rounded-tr-md bottom-0 left-0 bg-white p-4">
            <div class="flex gap-2 items-center">
                <slot name="icon" />
                <LaToothSolid class="text-primary-500 w-7 h-7" />
                <h1 class="text-lg font-medium">{{ item?.[`name_${$i18n.locale as 'uz'}`] }}</h1>
            </div>
            <p class="max-w-[250px] my-2 text-sm">{{ item?.[`description_${$i18n.locale as 'uz'}`] }}</p>
            <div v-show="!props.category" class="text-primary-500 font-medium">
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
    category?: boolean,
    item?: IService
}>()
</script>