<template>
    <div class="relative">
        <div class="container h-[50vh] relative z-10">
            <div class="h-full flex items-center pt-16">
                <div class="w-full md:w-[60%] mx-auto text-center">
                    <h1 class="font-medium text-3xl">
                        <nuxt-link to="/" class="text-lg text-gray-600 font-normal">Home /</nuxt-link> 
                        Contact with Us
                    </h1>
                </div>
            </div>
        </div>
    </div>

    <div class="relative">
        <div class="container grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            <div class="bg-blue-600 rounded p-4 md:p-6 space-y-6">
                <h1 class="text-white text-3xl font-medium">Get in Touch</h1>
                <div class="flex items-center gap-4 p-4rounded" v-for="i in 4" :key="i">
                    <div>
                        <div class="text-blue-600 bg-white p-4 rounded-full">
                            <CaPhoneFilled class="w-6 h-6" />
                        </div>
                    </div>
                    <div class="text-white">
                        <h1 class="font-medium">Далеко-далеко, за словесными.</h1>
                        <p class="text-sm">Далеко-далеко за словесными</p>
                    </div>
                </div>
            </div>

            <div class="px-4 space-y-4 rounded">
                <site-input label="Full Name" placeholder="Full Name" />
                <!-- <site-input label="Email" placeholder="you@company.domain" /> -->
                <site-input label="Phone Number" placeholder="+998 00 000 00 00" />
                <site-textarea label="Message" placeholder="Message of Appointment" :rows="6" />
                <site-button>Book an appointment</site-button>
            </div>
        </div>

        <div class="h-[600px]">
            <iframe width="100%" height="100%" id="gmap_canvas"
                src="https://maps.google.com/maps?q=samarkhand&t=&z=12&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CaPhoneFilled } from '@kalimahapps/vue-icons'

definePageMeta({
    layout: 'home-layout'
})
</script>