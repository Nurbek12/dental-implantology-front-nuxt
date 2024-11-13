<template>
    <div class="flex justify-center gap-2 items-center p-4">
        <div class="w-[100px] h-[100px] flex justify-center gap-2 items-center">
            <img :class="unhealthyClass" class="w-full h-full" :src="`/teeth/tooth-${toothNum}.svg`">
            <img :class="unhealthyClass" class="w-full h-full rotate-180" :src="`/teeth/tooth-${toothNum}-back.svg`">
        </div>
    </div>
</template>

<script setup lang="ts">
import { toothHealthCondition } from '@/constants'

const { conditions } = defineProps<{toothNum: number, conditions: string[]}>()

const unhealthyClass = computed(() => {
    if(conditions.includes('REMOVED')||conditions.includes('IMPLANT')) return 'opacity-10'
    else if(conditions.every(condition => toothHealthCondition.includes(condition))) return 'red-svg'
    return ''
})
</script>