<template>
    <div class="w-full p-2">
        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="link,i in admin_settings_links" :key="i" class="border bg-white p-4 flex items-start gap-4">
                <div class="pt-2">
                    <component :is="link.icon" class="size-10 text-primary-600" />
                </div>
                <div>
                    <nuxt-link :to="link.url" class="text-primary-600 text-lg hover:underline">{{ link.title }}</nuxt-link>
                    <p class="text-sm text-gray-600">{{ link.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { admin_settings_links } from '~/constants'

definePageMeta({
    layout: 'admin-layout'
})

</script>