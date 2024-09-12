<template>
    <div class="bg-white/45 rounded p-4 shadow-md">
        <h1 class="font-semibold text-lg">{{ cyrillicToTranslit({ preset: $i18n.locale=="ru"?"ru":"mn" }).transform(`${props.doctor.last_name} ${props.doctor.first_name}`) }}</h1>
        <h1 class="font-semibold text-lg">{{ cyrillicToTranslit().transform(props.doctor.middle_name!) }}</h1>
        <span class="text-sm text-gray-700 mt-2"> {{ $t('others.experience', {year: props.doctor.experience}) }}</span>
        <p class="text-[15px] font-normal space-x-2">
            <span>{{ $t('others.doctor-rating') }}:</span>
            <span class="text-3xl">{{ props.doctor.rating }}/5</span>
        </p>
        <div class="flex justify-end mt-2">
            <site-rating readonly :model-value="Math.ceil(props.doctor.rating!)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IDoctor } from '~/types'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

const props = defineProps<{doctor: Partial<IDoctor>}>()
</script>