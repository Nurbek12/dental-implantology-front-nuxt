<template>
    <div class="fixed z-50 w-full transition-all" :class="isScrolled?'shadow-md shadow-black/5 bg-white':'bg-transparent'">
        <div class="container mx-auto py-2">
            <div class="flex items-center justify-between">
                <nuxt-link to="/">
                    <img src="/logo.svg" class="w-[140px] md:w-[180px]" alt="">
                </nuxt-link>
                <div class="hidden md:flex gap-8">
                    <nuxt-link v-for="link in site_links" :key="link.url" class="hover:text-primary-500 font-normal text-gray-500 text-sm" :class="{'text-primary-600':link.url===route.path}" :to="link.url">
                        {{ $t(link.title) }}
                    </nuxt-link>
                </div>
                <site-language />
            </div>
        </div>

        <div class="bottom-0 left-0 fixed w-full border-t bg-white z-10 md:hidden">
            <div class="container py-4">
                <div class="grid grid-cols-5 gap-4">
                    <nuxt-link v-for="link in site_links" :key="link.url" :class="{'text-primary-600':link.url===route.path}" class="hover:text-primary-500 font-normal text-xs flex flex-col text-nowrap text-ellipsis gap-1 items-center" :to="link.url">
                        <component :is="link.icon" class="size-6" />
                        {{ $t(link.title) }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { site_links } from '~/constants'

const route = useRoute()
const isScrolled = ref(false)

onMounted(() => {
    window.scrollY > 0 && (isScrolled.value = true)

    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0
    })
})
</script>