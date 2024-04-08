<template>
    <a :href="link" target="_blank" class="no-underline flex items-center gap-2">
        <component :is="icon" color="blue"></component>
        <span class="text-black">{{ title }}</span>
    </a>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    icon: any,
    link: string
}>()
</script>