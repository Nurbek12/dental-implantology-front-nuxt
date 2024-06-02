<template>
    <div class="flex gap-1 my-2">
        <component v-for="i in 5" :is='i>model!?AnOutlinedStar:AnFilledStar'  :key="i"
            class="text-yellow-400 cursor-pointer w-5 h-5"  @click="changeModel(i)" />
    </div>
</template>

<script setup lang="ts">
import { AnOutlinedStar, AnFilledStar } from '@kalimahapps/vue-icons'

const model = defineModel<number>()

const props = defineProps<{
    readonly?: boolean
}>()

const changeModel = (value: number) => {
    if(!props.readonly) model.value = value
}
</script>