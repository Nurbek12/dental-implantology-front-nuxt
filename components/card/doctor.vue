<template>
    <div class="rounded overflow-hidden shadow-lg shadow-black/5">
        <div class="relative h-[100px] bg-gray-200 flex items-end justify-center">
            <!-- <img src="https://random.imagecdn.app/600/400" class="w-full h-full object-cover"> -->
            <div class="absolute w-[110px] h-[110px] translate-y-14 rounded-full bg-white p-1 overflow-hidden">
                <img :src="doctor?.avatar||'/images/nophoto.jpg'" class="w-full h-full rounded-full object-cover">
            </div>
        </div>
        <div class="pt-14">
            <div class="px-4 pb-2 text-center space-y-2">
                <div>
                    <span class="text-sm text-blue-600 font-medium">{{ props?.doctor?.experience }} лет опыта</span>
                    <p class="text-lg font-bold">{{ props?.doctor?.first_name }} {{ props?.doctor?.middle_name }} {{ props?.doctor?.last_name }}</p>
                    <!-- <router-link :to="`/user/${user.id}`" class="text-lg font-bold">{{ props.user.first_name }} {{ props.user.last_name }}</router-link> -->
                </div>
                <!-- <p class="text-xs line-clamp-3">{{ props.user.bio || 'Biograph of User' }}</p> -->
            </div>
            <div class="grid grid-cols-3 text-center border-t py-2">
                <div class="border-r">
                    <b>{{ props?.doctor?.educations || '' }}</b>
                    <p class="text-sm">Образование</p>
                </div>
                <div class="border-r flex flex-col items-center">
                    <site-rating readonly :model-value="props?.doctor?.rating || 0"/>
                    <p class="text-sm">Рейтинг</p>
                </div>
                <div>
                    <b>{{ props?.doctor?.certificates || '' }}</b>
                    <p class="text-sm">Сертификаты</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IDoctor } from '~/types'

const emits = defineEmits(['logout', 'edit-profile'])
const props = defineProps<{doctor: IDoctor}>()
</script>