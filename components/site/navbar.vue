<template>
    <div class="fixed z-50 w-full transition-all" :class="isScrolled?'shadow-md shadow-black/5 bg-white':'bg-transparent'">
        <div class="container mx-auto py-4">
            <div class="flex items-center justify-between">
                <nuxt-link to="/">
                    <span class="text-black font-medium text-xl">Dental Implantology</span>
                </nuxt-link>
                <div class="hidden md:flex gap-8">
                    <nuxt-link v-for="link in site_links" :key="link.url" class="hover:text-primary-500 font-normal text-gray-500 text-sm" :class="{'text-primary-600':link.url===route.path}" :to="link.url">
                        {{ $t(link.title) }}
                    </nuxt-link>
                </div>
                <site-language class="hidden md:block" />
                <ReMenu2Fill @click="isOpen=true" class="cursor-pointer w-6 h-6 block md:hidden" />
            </div>
        </div>

        <div :class="isOpen?'left-0':'left-[-100%]'" class="top-0 flex flex-col absolute w-full md:w-[350px] h-[100vh] shadow bg-white z-10 transition-all">
            <div class="container py-4 flex justify-between items-center">
                <site-language />
                <CgClose @click="isOpen=false" class="cursor-pointer w-6 h-6 block md:hidden" />
            </div>

            <div class="container py-4 flex-1 flex flex-col mt-10">
                <div class="flex flex-col items-center gap-8 flex-1 px-4">
                    <nuxt-link @click="isOpen=false" v-for="link in site_links" :key="link.url" :class="{'text-primary-600':link.url===route.path}" class="hover:text-primary-500 font-medium" :to="link.url">
                        {{ $t(link.title) }}
                    </nuxt-link>
                </div>
                <!-- <site-btn>Записаться на прием</site-btn> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { site_links } from '~/constants'
import { ReMenu2Fill, CgClose } from '@kalimahapps/vue-icons'

const route = useRoute()
const isOpen = ref(false)
const isScrolled = ref(false)

onMounted(() => {
    window.scrollY > 0 && (isScrolled.value = true)

    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0
    })
})
</script>