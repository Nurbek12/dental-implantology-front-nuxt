<template>
    <nav class="fixed w-full z-50 bg-white">
        <div class="container mx-auto">
            <div class="flex justify-between items-center py-4">
                <span class="font-bold text-lg">Dental Implament</span>

                <ul class="flex items-center gap-8">
                    <li class="text-gray-500 text-sm">Home</li>
                    <li class="text-gray-500 text-sm">About</li>
                    <li class="text-gray-500 text-sm">Services</li>
                    <li class="text-gray-500 text-sm">Testimonals</li>
                    <li class="text-gray-500 text-sm">Contact Us</li>
                </ul>

                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <div class="w-[30px] h-[30px] rounded-full bg-primary-600 text-white flex items-center justify-center">
                            <MdLocalPhone />
                        </div>
                        <span class="text-sm">+998 90 900 90 90</span>
                    </div>

                    <button class="rounded-full px-4 py-2 bg-primary-600 text-white cursor-pointer text-sm">Create Appointment</button>
                </div>
            </div>
        </div>
    </nav>

    <header class="relative min-h-screen bg-white">
        <div class="absolute w-full h-full inset-0 opacity-25">
            <img src="/images/home-bg-1.jpg" class="w-full h-full object-cover">
        </div>
        <div class="container relative z-10 h-full">
            <div class="h-screen flex items-center">
                <div class="maw-w-[300px] space-y-4">
                    <h1 class="text-3xl font-bold">
                        Excellent Techniques <br>
                        For Healthy Dental <br>
                        Condition
                    </h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, deserunt. In nulla laborum neque, inventore natus dicta cupiditate! Sed dolorem similique eveniet consectetur nulla, reiciendis labore molestiae ullam culpa voluptatum.</p>
                    <button class="rounded-full px-4 py-2 bg-primary-600 text-white cursor-pointer text-sm">Get Start</button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { MdLocalPhone } from '@kalimahapps/vue-icons'

</script>