<template>
    <div class="grid grid-cols-2 gap-y-6 gap-x-4">
        <div class="flex items-center gap-4 w-[300px]" v-for="nums,i in tooth_nums" :key="i">
            <div v-for="num,j in nums" :key="j" class="cursor-pointer flex items-center flex-col gap-2"
                @click="emits('chooseeTooth', num)">
                <img :src="`/teeth/tooth-${num}.svg`" class="min-h-[60px]"
                    :class="unhealthyClass(tooth(num))">
                <span :class="!tooth(num)?.id ? 'text-primary-600':'text-red-600'">
                    {{ num }}
                </span>
           </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Tooth } from '@/types'
import { tooth_nums, toothHealthCondition } from '@/constants'

const emits = defineEmits(['chooseeTooth'])
const props = defineProps<{ teeth: Tooth[] }>()
const { teeth } = toRefs(props)

const tooth = (num: number) => {
    return teeth.value.find(te => te.num === num)
}

const unhealthyClass = (tooth?: Tooth) => {
    if(!tooth?.id) return 'opacity-60'
    else if(tooth?.condition?.includes('REMOVED')||tooth?.condition?.includes('IMPLANT')) return 'opacity-25'
    else if(tooth?.condition?.every(condition => toothHealthCondition.includes(condition))) return 'red-svg'
    return ''
}

</script>