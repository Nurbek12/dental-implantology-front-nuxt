<template>
    <img :src="image" :class="props.class" alt="">
</template>

<script setup lang="ts">
const { $config } = useNuxtApp()

const props = defineProps<{src: string, class?: string}>()

const image = computed(() => {
    if(props.src) return `${$config.public.api_url}${props.src}`
    return '/images/nophoto.jpg'
})
</script>