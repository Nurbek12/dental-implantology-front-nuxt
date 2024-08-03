<template>
    <div class="rounded overflow-hidden">
        <div class="h-[250px] relative">
            <img :src="blog.image || '/images/nophoto.jpg'" class="w-full h-full object-cover" alt="">
        </div>
        <div class="py-4">
            <h1 class="text-lg font-medium">{{ blog.title }}</h1>
            <p class="mb-6 text-sm text-gray-600">{{ blog.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    blog: {
        title: string
        image: string
        description: string
    }
}>()
</script>