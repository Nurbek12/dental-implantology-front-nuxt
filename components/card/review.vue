<template>
    <div class="rounded p-4 transition-all group border hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg cursor-pointer hover:text-white">
        <div class="flex justify-between items-center">
            <h1>{{ item.first_name }} {{ item.last_name }}</h1>
            <span class="text-sm text-gray-500 group-hover:text-gray-100">{{ new Date(item.created_at!).toDateString() }}</span>
        </div>
        <site-rating :model-value="item.rate" readonly />
        <p class="text-sm">{{ item.review }}</p>
    </div>
</template>

<script setup lang="ts">
import type { IRatings } from '~/types'

defineProps<{
    item: IRatings
}>()
</script>