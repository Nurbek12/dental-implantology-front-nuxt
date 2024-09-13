<template>
    <div class="relative group space-y-2 rounded-xl h-min transition-shadow hover:shadow-xl">
        <div class="h-[200px] rounded-xl transition-all group-hover:rounded-b-none overflow-hidden">
            <nuxt-img :src="item?.image || '/images/nophoto.jpg'" class="w-full h-full object-cover" />
        </div>
        <div class="transition-all px-0 group-hover:px-4 py-4 pt-0">
            <h1 class="text-base font-bold text-primary-600">{{ item?.[`name_${$i18n.locale as 'uz'}`] }}</h1>
            <!-- <p class="text-sm">{{ item?.[`description_${$i18n.locale as 'uz'}`] || 'Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Буквоград домах даль коварных дороге если его текст заглавных безорфографичный прямо толку.' }}</p> -->
            <div class="text-primary-500 mt-2">
                <span v-show="item?.price_end">от </span>
                <span>{{ item?.price_start?.toLocaleString('ru-RU') }}</span>
                <span v-show="item?.price_end"> до </span>
                <span v-show="!item?.price_end"> сумов </span>
                <span v-show="item?.price_end">{{ item?.price_end?.toLocaleString('ru-RU') }} сумов</span>
            </div>
        </div>
    </div>

    <!-- <div class="relative p-6 space-y-2 h-min rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
        <div class="relative">
            <div class="absolute -top-3 -left-3 w-[40px] h-[40px] rounded-full bg-primary-100 z-0" />
            <PhTooth class="size-10 text-primary-600 relative" />
        </div>
        <h1 class="text-base font-bold text-primary-600">{{ item?.[`name_${$i18n.locale as 'uz'}`] }}</h1>
        <p class="text-sm">{{ item?.[`description_${$i18n.locale as 'uz'}`] || 'Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Буквоград домах даль коварных дороге если его текст заглавных безорфографичный прямо толку.' }}</p>
        <site-btn size="medium">
            <span v-show="item?.price_end">от </span>
            <span>{{ item?.price_start?.toLocaleString('ru-RU') }}</span>
            <span v-show="item?.price_end"> до </span>
            <span v-show="!item?.price_end"> сумов </span>
            <span v-show="item?.price_end">{{ item?.price_end?.toLocaleString('ru-RU') }} сумов</span>
        </site-btn>
    </div> -->

    <!-- <div class="relative h-min rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
        <div class="h-[200px]">
            <nuxt-img :src="item?.image || '/images/nophoto.jpg'" class="w-full h-full object-cover" />
        </div>
        <div class="w-full bottom-0 left-0 bg-white p-4">
            <h1 class="text-sm md:text-base font-medium">{{ item?.[`name_${$i18n.locale as 'uz'}`] }}</h1>
            <p class="my-2 text-xs md:text-sm">{{ item?.[`description_${$i18n.locale as 'uz'}`] }}</p>
            <div v-show="!props.category" class="text-black font-medium text-xs md:text-sm text-primary-600">
                <span v-show="item?.price_end">от </span>
                <span>{{ item?.price_start?.toLocaleString('ru-RU') }}</span>
                <span v-show="item?.price_end"> до </span>
                <span v-show="!item?.price_end"> сумов </span>
                <span v-show="item?.price_end">{{ item?.price_end?.toLocaleString('ru-RU') }} сумов</span>
            </div>
        </div>
    </div> -->
</template>

<script setup lang="ts">
import type { IService } from '~/types'
import { PhTooth } from '@kalimahapps/vue-icons'

const props = defineProps<{
    category?: boolean,
    item?: IService
}>()
</script>