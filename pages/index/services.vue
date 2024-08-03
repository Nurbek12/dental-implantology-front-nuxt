<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('services.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('services.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('doctors.description') }}</p>
            </div>
        </div>
    </section>

    <div class="relative py-12">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <card-service v-for="item,i in items" :item="item" :key="i" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IService } from '~/types'

definePageMeta({
    layout: 'home-layout'
})

useHead({
    title: "Наши услуги - Стоматология \"Dental Implantology\"",
    meta: [
        { name: "description", content: "Предлагаем широкий спектр стоматологических услуг: лечение кариеса, имплантация, отбеливание зубов и многое другое. Узнайте больше о наших услугах." },
        { name: "keywords", content: "стоматологические услуги, лечение зубов, имплантация, отбеливание зубов" },
    ]
})

const { getServices } = useServices()
const items = ref<IService[]>([])

const init = async () => {
    const data = await getServices({page: 1, limit: 12})
    items.value = data.results
}

init()
</script>