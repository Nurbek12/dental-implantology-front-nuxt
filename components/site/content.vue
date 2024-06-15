<template>
    <div class="space-y-4">
        <div>
            <span class="rounded border border-blue-200 text-primary-500 px-3 py-1.5 text-sm" v-html="subtitle"></span>
        </div>
        <h1 class="text-2xl md:text-4xl font-medium my-6" v-html="title"></h1>
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