<template>
    <div class="relative rounded-lg overflow-hidden p-16">
        <nuxt-img :src="item?.image||'/images/nophoto.jpg'" class="w-full h-full object-cover absolute inset-0 z-0"/>

        <div class="relative bg-white p-6 rounded-md">
            <div class="flex gap-2 items-center">
                <div>
                    <PhTooth class="text-primary-500 size-5" />
                </div>
                <h1 class="text-primary-500 text-lg font-medium">{{ item?.[`name_${$i18n.locale as 'uz'}`] }}</h1>
            </div>
    
            <div class="font-medium">
                <p class="text-sm my-4 font-light text-[#7D7F8C]">{{ item?.[`description_${$i18n.locale as 'uz'}`] || 'Удаляем зубы под анастезией - врач подбирает анестетик для каждого пациента и конкретной процедуры.' }}</p>
    
                <p class="text-primary-600">Цена</p>
                <div class="mt-1 text-base font-semibold text-[#7D7F8C]">
                    <span v-show="item?.price_end">от </span>
                    <span>{{ item?.price_start?.toLocaleString('ru-RU') }}</span>
                    <span v-show="item?.price_end"> до </span>
                    <span v-show="!item?.price_end"> сумов </span>
                    <span v-show="item?.price_end">{{ item?.price_end?.toLocaleString('ru-RU') }} сумов</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IService } from '~/types'
import { PhTooth } from '@kalimahapps/vue-icons'

const props = defineProps<{
    item?: IService
}>()
</script>