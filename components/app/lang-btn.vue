<template>
    <select v-model="locale" class="border-2 rounded-lg px-2 py-1 cursor-pointer outline-none text-[#385399] border-[#385399]">
        <option v-for="l,i in languages" :key="i" :value="l.lang">{{ l.title }}</option>
    </select>
</template>

<script setup lang="ts">
import { languages } from '@/constants'

const { locale } = useI18n()
</script>