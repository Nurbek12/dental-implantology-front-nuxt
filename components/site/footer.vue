<template>
    <footer class="bg-slate-900 py-10">
        <div class="mx-auto container space-y-8 pt-4 pb-12 md:pb-4 lg:space-y-16">
            
            <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <div class="text-white font-bold text-xl">
                        Dental Implantology
                    </div>

                    <p class="mt-4 max-w-xs text-gray-300">{{ $t('footer.description') }}</p>
                </div>

                <div>
                    <p class="font-medium text-gray-200">{{ $t('footer.concats-title') }}:</p>

                    <ul class="mt-6 space-y-4 text-sm">
                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            <a href="https://maps.app.goo.gl/jvA5nAwTy3jL4oe2A" target="_blank">{{ $t('footer.address') }}</a>
                        </li>

                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            {{ $t('form.phone') }}: <a href="tel:+998915233344">+998 91 523 33 44</a>
                        </li>

                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            Email: <a href="#">dentalemplament@stomatologyclinic.ru</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="font-medium text-gray-200">{{ $t('footer.working-time-tilte') }}:</p>
                    
                    <ul class="mt-6 space-y-4 text-sm">
                        <li class="text-red-500 transition hover:opacity-75">{{ $t('footer.sun') }}</li>
                        <li class="text-gray-300 transition hover:opacity-75">{{ $t('footer.mon') }}</li>
                        <li class="text-gray-300 transition hover:opacity-75">{{ $t('footer.tue') }}</li>
                        <li class="text-gray-300 transition hover:opacity-75">{{ $t('footer.wed') }}</li>
                        <li class="text-gray-300 transition hover:opacity-75">{{ $t('footer.thu') }}</li>
                        <li class="text-gray-300 transition hover:opacity-75">{{ $t('footer.fri') }}</li>
                        <li class="text-gray-300 transition hover:opacity-75">{{ $t('footer.sat') }}</li>
                    </ul>
                </div>

                <div>
                    <p class="font-medium text-gray-200">{{ $t('footer.links-title') }}:</p>

                    <ul class="mt-6 space-y-4 text-sm">
                        <li v-for="l,i in site_links" :key="i">
                            <nuxt-link :to="l.url" class="text-gray-300 transition hover:opacity-75">{{ $t(l.title) }}</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/admin/appointments" class="text-gray-300 transition hover:opacity-75">Admin</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <client-only>
                <p class="text-xs text-gray-100">&copy; {{ new Date().getFullYear() }}. {{ $t('footer.copy') }}</p>
            </client-only>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { site_links } from '@/constants'
</script>