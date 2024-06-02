<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Встречайте наших докторов</h2>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Наша команда специалистов</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Наши врачи - это опытные и квалифицированные профессионалы, преданные своему делу. Ознакомьтесь с биографиями и квалификациями наших стоматологов, чтобы быть уверенными в своем выборе.</p>
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

const { getServices } = useServices()
const items = ref<IService[]>([])

const init = async () => {
    const data = await getServices({page: 1, limit: 12})
    items.value = data.results
}

init()
</script>