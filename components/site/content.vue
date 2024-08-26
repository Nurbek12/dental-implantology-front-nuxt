<template>
    <div class="flex flex-col gap-4">
        <div v-if="!!subtitle" class="mb-2">
            <span class="rounded border border-primary-300 text-primary-600 px-4 py-2 text-sm" v-html="subtitle"></span>
        </div>
        <h1 class="text-2xl md:text-4xl font-medium" v-html="title"></h1>
        <p class="text-gray-700 text-sm md:text-base" v-html="description"></p>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    subtitle: string,
    description: string,
}>()
</script>