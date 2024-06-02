<template>
    <div class="fixed bg-white z-50 w-full transition-all" :class="{'shadow-md':isScrolled}">

        <div>
            <div class="container mx-auto py-2">
                <div class="w-full flex justify-between items-center">
                    <div class="items-center gap-4  hidden md:flex">
                        <site-link class="text-sm" title="+01234 567 890" link="http://localhost" :icon="MdSharpPhone" />
                        <site-link class="text-sm" title="Jl. Patimura II No. 18, Denpasar" link="http://localhost" :icon="BsMap" />
                    </div>
                    <site-link title="Monday - Saturday: 9 am - 11.30 pm" link="" :icon="CdCalendar" class="text-sm" />
                </div>
            </div>
        </div>

        <div class="container mx-auto py-2 md:py-5">
            <div class="flex items-center justify-between">
                <nuxt-link to="/">
                    <div class="text-blue-600 font-bold text-xl">
                        Dental Emplament
                    </div>
                </nuxt-link>
                <div class="hidden md:flex gap-8">
                    <nuxt-link v-for="link in site_links" :key="link.url" class="hover:text-blue-500 font-medium" :to="link.url">
                        {{ link.title }}
                    </nuxt-link>
                </div>
                <site-button class="hidden md:block">Записаться на прием</site-button>
                <site-button @click="isOpen=true" class="block md:hidden" size="square">
                    <ChMenuHamburger class="w-5 h-5" />
                </site-button>
            </div>
        </div>

        <div :class="isOpen?'left-0':'left-[-100%]'" class="top-0 flex flex-col absolute w-full h-[100vh] shadow bg-white z-10 transition-all">
            <div class="container py-11 flex justify-end">
                <site-button @click="isOpen=false" class="block md:hidden" size="square">
                    <CgClose class="w-5 h-5" />
                </site-button>
            </div>

            <div class="container py-4 flex-1 flex flex-col">
                <div class="flex flex-col items-center gap-8 flex-1 px-4">
                    <nuxt-link @click="isOpen=false" class="hover:text-blue-500 font-medium" to="/">Главная</nuxt-link>
                    <nuxt-link @click="isOpen=false" class="hover:text-blue-500 font-medium" to="/about">О нас</nuxt-link>
                    <nuxt-link @click="isOpen=false" class="hover:text-blue-500 font-medium" to="/services">Услуги</nuxt-link>
                    <nuxt-link @click="isOpen=false" class="hover:text-blue-500 font-medium" to="/reviews">Отзывы</nuxt-link>
                    <nuxt-link @click="isOpen=false" class="hover:text-blue-500 font-medium" to="/contact">Контакты</nuxt-link>
                </div>
                <site-button>Записаться на прием</site-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { site_links } from '~/constants'
import { MdSharpPhone, BsMap, CdCalendar, ChMenuHamburger, CgClose } from '@kalimahapps/vue-icons'

const isOpen = ref(false)
const isScrolled = ref(false)

onMounted(() => {
    window.scrollY > 0 && (isScrolled.value = true)

    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0
    })
})
</script>