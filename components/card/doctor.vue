<template>
    <div class="rounded overflow-hidden shadow-lg shadow-black/5" :class="{'opacity-50':!props.doctor.is_published}">
        <div class="h-[380px] relative overflow-hidden">
            <nuxt-img :src="doctor?.avatar || '/images/nophoto.jpg'" class="w-full h-full object-cover relative z-10" alt="" />
            <!-- <img :src="doctor?.avatar || '/images/nophoto.jpg'" class="w-full h-full object-cover absolute top-0 z-0 opacity-30 blur-sm" alt="" /> -->
            <div class="absolute px-3 py-1.5 rounded-tr-md bottom-0 left-0 bg-white z-20">
                <site-rating readonly :model-value="props?.doctor?.rating || 0"/>
            </div>
        </div>
        <div class="p-4">
            <h1 class="text-lg font-medium">{{ props?.doctor?.first_name }} {{ props?.doctor?.middle_name }} {{ props?.doctor?.last_name }}</h1>
            <p class="text-gray-600 my-2">{{ specs[props?.doctor?.content as keyof typeof specs] }}, {{ new Date().getFullYear() - new Date(props?.doctor?.birth_date).getFullYear() }} лет</p>
            <p class="text-sm text-gray-600" v-show="props?.doctor?.experiences"><span class="font-medium">Опыт:</span> {{ props?.doctor?.experiences }}</p>
            <site-btn size="medium" class="mt-4" @click="$emit('add-comment')">{{ $t('others.add-comment') }}</site-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { specs } from '@/constants'
import type { IDoctor } from '~/types'

const emits = defineEmits(['logout', 'edit-profile', 'add-comment'])
const props = defineProps<{doctor: IDoctor}>()
</script>