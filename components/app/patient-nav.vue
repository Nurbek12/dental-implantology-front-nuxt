<template>
    <div class="flex items-center gap-4 bg-white rounded w-fit">
        <nuxt-link
            v-for="link in patient_links" :key="link.url"
            :to="`/admin/patients/${$route.params.id}/${link.url}`"
            class="text-sm text-gray-400 font-medium"
            exact-active-class="!text-black">
            {{ link.title }}
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
import { patient_links } from '~/constants'
</script>