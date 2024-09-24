<template>
    <div>
        <div class="h-[300px] relative overflow-hidden rounded-2xl">
            <nuxt-img :src="doctor?.avatar || '/images/nophoto.jpg'" class="w-full h-full object-cover relative z-10" alt="" />
            <!-- <img :src="doctor?.avatar || '/images/nophoto.jpg'" class="w-full h-full object-cover absolute top-0 z-0 opacity-30 blur-sm" alt="" /> -->
        </div>
        <div class="p-2 space-y-1">
            <h1 class="font-medium text-lg">{{ doctor.first_name }} {{ doctor.last_name }} {{ doctor.middle_name }}</h1>
            <p class="text-[#7D7F8C] font-medium"> {{ $t('others.experience', {year: props.doctor.experience}) }}</p>
            <div class="flex items-end gap-4">
                <div>
                    <p class="text-[#7D7F8C] font-medium mb-1">{{ $t('others.doctor-rating') }}:</p>
                    <site-rating readonly :model-value="Math.ceil(props.doctor.rating!)" />
                </div>
                <span class="text-3xl">{{ props.doctor.rating }}/5</span>
            </div>
            <!-- <site-btn size="medium" class="mt-4" @click="$emit('add-comment')">{{ $t('others.add-comment') }}</site-btn> -->
        </div>
    </div>
</template>

<script setup lang="ts">
// import { specs } from '@/constants'
import type { IDoctor } from '~/types'

const emits = defineEmits(['logout', 'edit-profile', 'add-comment'])
const props = defineProps<{doctor: IDoctor}>()
</script>