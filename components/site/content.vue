<template>
    <div class="flex flex-col gap-4">
        <div v-if="!!subtitle" class="mb-2">
            <span class="rounded border border-primary-300 text-primary-600 px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium" v-html="subtitle"></span>
        </div>
        <h1 class="text-2xl md:text-4xl font-medium" v-if="title" v-html="title"></h1>
        <p class="text-gray-700" v-if="description" v-html="description"></p>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string,
    subtitle?: string,
    description?: string,
}>()
</script>