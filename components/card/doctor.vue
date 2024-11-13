<template>
    <div class="group transition-shadow hover:shadow-lg shadow-black/5 rounded-2xl">
        <div class="h-[300px] transition-all group-hover:rounded-b-none relative overflow-hidden rounded-2xl">
            <app-image :src="doctor?.avatar!" class="w-full h-full object-cover relative z-10" />
        </div>
        <div class="p-4 pt-2 space-y-1">
            <h1 class="font-semibold text-primary-600 text-[20px]">{{ doctor.firstName }} {{ doctor.lastName }} {{ doctor.middleName }}</h1>
            <p class="text-[#7D7F8C] font-medium text-sm"> {{ $t('others.experience', {year: props.doctor.experience}) }}</p>
            <!-- <p class="text-[#7D7F8C] font-medium text-sm"> <b>{{ $t('others.specialization') }}:</b> {{props.doctor}}</p> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

const emits = defineEmits(['logout', 'edit-profile', 'add-comment'])
const props = defineProps<{doctor: User}>()
</script>