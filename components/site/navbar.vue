<template>
    <div class="fixed bg-white z-50 w-full">

        <div class="shadow">
            <div class="container mx-auto py-4">
                <div class="w-full flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <site-link class="text-sm" title="+01234 567 890" link="http://localhost" :icon="MdSharpPhone" />
                        <site-link class="text-sm" title="Jl. Patimura II No. 18, Denpasar" link="http://localhost" :icon="BsMap" />
                    </div>
                    <site-link title="Monday - Saturday: 9 am - 11.30 pm" link="" :icon="CdCalendar" class="text-sm" />
                </div>
            </div>
        </div>

        <div class="container mx-auto py-5">
            <div class="flex items-center justify-between">
                <nuxt-link>logo</nuxt-link>
                <div class="space-x-10">
                    <nuxt-link class="hover:text-blue-500 font-medium" to="/">Главная</nuxt-link>
                    <nuxt-link class="hover:text-blue-500 font-medium" to="/about">О нас</nuxt-link>
                    <nuxt-link class="hover:text-blue-500 font-medium" to="/services">Услуги</nuxt-link>
                    <nuxt-link class="hover:text-blue-500 font-medium" to="/page">Страницы</nuxt-link>
                    <nuxt-link class="hover:text-blue-500 font-medium" to="/contact">Контакты</nuxt-link>
                </div>
                <site-button>Записаться на прием</site-button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { MdSharpPhone, BsMap, CdCalendar } from '@kalimahapps/vue-icons'
</script>