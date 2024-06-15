<template>
    <div class="rounded overflow-hidden">
        <div class="h-[250px] relative">
            <img :src="blog.image || '/images/nophoto.jpg'" class="w-full h-full object-cover" alt="">
            <span class="absolute px-4 py-0.5 rounded-tr-md bottom-0 left-0 bg-white text-primary-500">News</span>
        </div>
        <div class="py-4">
            <h1 class="text-lg font-medium">{{ blog.title }}</h1>
            <p class="mb-6 text-sm">{{ blog.description }}</p>
            <!-- <site-btn>Читать далее &rightarrow;</site-btn> -->
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