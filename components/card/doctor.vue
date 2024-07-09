<template>
    <div class="rounded overflow-hidden shadow-lg shadow-black/5" :class="{'opacity-50':!props.doctor.is_published}">
        <div class="h-[250px] relative">
            <img :src="doctor?.avatar || '/images/nophoto.jpg'" class="w-full h-full object-cover" alt="">
            <span class="absolute px-3 rounded-tr-md bottom-0 left-0 bg-white text-primary-500">
                <site-rating readonly :model-value="props?.doctor?.rating || 0"/>
            </span>
        </div>
        <div class="p-4">
            <h1 class="text-lg font-medium">{{ props?.doctor?.first_name }} {{ props?.doctor?.middle_name }} {{ props?.doctor?.last_name }}</h1>
            <p class="text-gray-600">{{ specs[props?.doctor?.content as keyof typeof specs] }}, {{ new Date().getFullYear() - new Date(props?.doctor?.birth_date).getFullYear() }} лет</p>
            <div class="mt-2 space-y-2">
                <p class="text-sm text-gray-600"><span class="font-medium">Образование:</span> {{ props?.doctor?.educations || '' }}</p>
                <p class="text-sm text-gray-600"><span class="font-medium">Опыт:</span> {{ props?.doctor?.experiences || '' }}</p>
                <p class="text-sm text-gray-600"><span class="font-medium">Сертификаты:</span> {{ props?.doctor?.certificates || '' }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { specs } from '@/constants'
import type { IDoctor } from '~/types'
import { UnComment } from '@kalimahapps/vue-icons'

const emits = defineEmits(['logout', 'edit-profile'])
const props = defineProps<{doctor: IDoctor}>()
</script>