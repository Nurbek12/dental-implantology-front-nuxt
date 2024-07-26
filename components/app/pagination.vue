<template>
    <div class="flex gap-2 items-center">
        <site-btn size="small" :disabled="1>=model" @click="model--"><AkChevronLeft /></site-btn>
        <site-btn size="small" :custom-color="i+1 !== model?'bg-primary-400 hover:bg-primary-500 active:bg-primary-600 disabled:bg-primary-700 text-black':''" v-for="item, i in items" :key="i" @click="model=i+1">{{ item }}</site-btn>
        <site-btn size="small" :disabled="model>=items.length" @click="model++"><AkChevronRight /></site-btn>
    </div>
</template>

<script setup lang="ts">
import { AkChevronLeft, AkChevronRight } from '@kalimahapps/vue-icons'

const model = defineModel({ type: Number, default: 1 })

defineProps<{
    items: any[]
}>()
</script>