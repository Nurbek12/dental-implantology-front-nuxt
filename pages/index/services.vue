<template>
    <div class="relative">
        <div class="container h-[50vh] relative z-10">
            <div class="h-full flex items-center pt-16">
                <div class="w-full md:w-[60%] mx-auto text-center">
                    <h1 class="font-medium text-3xl">
                        <nuxt-link to="/" class="text-lg text-gray-600 font-normal">Home /</nuxt-link> 
                        Our Services
                    </h1>
                </div>
            </div>
        </div>
    </div>

    <div class="relative py-12">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <card-service  v-for="i in 6" :key="i" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'home-layout'
})
</script>