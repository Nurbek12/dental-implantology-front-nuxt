<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('doctors.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('doctors.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('doctors.description') }}</p>
            </div>
        </div>
    </section>

    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
                <card-doctor v-for="item,i in items" :doctor="item" :key="i" />
                
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IDoctor } from '~/types'

definePageMeta({
    layout: 'home-layout'
})

useHead({
    title: "Профессионалы стоматологии \"Dental Implantology\"",
    meta: [
        { name: "description", content: "Познакомьтесь с нашей командой опытных и квалифицированных стоматологов. Каждый врач в \"Dental Implantology\" стремится к наивысшему качеству лечения." },
        { name: "keywords", content: "стоматологи, врачи, стоматологическая клиника, профессионалы" },
    ]
})

const { getDoctors } = useDoctors()
const items = ref<IDoctor[]>([])

const init = async () => {
    const data = await getDoctors({page: 1, limit: 48})
    items.value = data.results
}

init()
</script>