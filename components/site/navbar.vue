<template>
    <div class="fixed bg-white z-50 w-full transition-all" :class="{'shadow-md shadow-black/5':isScrolled}">

        <!-- <div>
            <div class="container mx-auto py-2">
                <div class="w-full flex justify-between items-center">
                    <div class="items-center gap-4  hidden md:flex">
                        <site-link class="text-sm" title="+998 66 235 00 05" link="tel:+998662350005" :icon="MdSharpPhone" />
                        <site-link class="text-sm" title="Самарканд, улица Дахбед, 168А" link="https://maps.app.goo.gl/jvA5nAwTy3jL4oe2A" :icon="BsMap" />
                    </div>
                    <site-link title="Пн - Сб: 9.00 - 18.30" link="" :icon="CdCalendar" class="text-sm" />
                </div>
            </div>
        </div> -->

        <div class="container mx-auto py-4">
            <div class="flex items-center justify-between">
                <nuxt-link to="/">
                    <!-- <nuxt-img src="/logo.jpg" class="w-full h-[70px] object-cover" /> -->
                    <div class="text-black font-medium text-xl">
                        Dental Implantology
                    </div>
                </nuxt-link>
                <div class="hidden md:flex gap-8">
                    <nuxt-link v-for="link in site_links" :key="link.url" class="hover:text-primary-500 font-normal text-gray-500" :to="link.url">
                        {{ link.title }}
                    </nuxt-link>
                </div>
                <site-btn class="hidden md:block">Записаться на прием</site-btn>
                <site-btn @click="isOpen=true" class="block md:hidden" size="square">
                    <ChMenuHamburger class="w-5 h-5" />
                </site-btn>
            </div>
        </div>

        <div :class="isOpen?'left-0':'left-[-100%]'" class="top-0 flex flex-col absolute w-full md:w-[350px] h-[100vh] shadow bg-white z-10 transition-all">
            <div class="container py-4 flex justify-end">
                <site-btn @click="isOpen=false" size="square">
                    <CgClose class="w-5 h-5" />
                </site-btn>
            </div>

            <div class="container py-4 flex-1 flex flex-col">
                <div class="flex flex-col items-center gap-8 flex-1 px-4">
                    <nuxt-link @click="isOpen=false" v-for="link in site_links" :key="link.url" class="hover:text-primary-500 font-medium" :to="link.url">
                        {{ link.title }}
                    </nuxt-link>
                </div>
                <site-btn>Записаться на прием</site-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { site_links } from '~/constants'
import { ChMenuHamburger, CgClose } from '@kalimahapps/vue-icons'

const isOpen = ref(false)
const isScrolled = ref(false)

onMounted(() => {
    window.scrollY > 0 && (isScrolled.value = true)

    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0
    })
})
</script>