<template>
    <div class="p-4 rounded-xl space-y-4">
        <img :src="item.icon">
        <h1 class="text-primary-600 text-xl font-medium">{{ item.title.ru }}</h1>
        <p class="text-base font-light">{{ item.description.ru }}</p>
        <button class="px-6 py-2 rounded-full border text-primary-600 border-primary-600 text-sm font-medium">Подробнее</button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item:{
        icon: string,
        title: {
            uz: string
            en: string
            ru: string
        },
        description: {
            uz: string
            en: string
            ru: string
        }
    }
}>()
</script>