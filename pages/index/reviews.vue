<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Ваши мнения важны</h2>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Отзывы наших пациентов</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Узнайте, что говорят наши пациенты о своем опыте лечения в нашей клинике. Мы гордимся положительными отзывами и стремимся поддерживать высокие стандарты обслуживания.</p>
            </div>
        </div>
    </section>

    <div class="relative py-8">
        <div class="container">
            <div class="mb-4">
                <site-btn @click="dialog=true">Create an Review</site-btn>
            </div>
            <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <card-review v-for="item,i in items" :item="item" :key="i" />
            </div>
        </div>
    </div>

    <app-dialog title="Form for reviews" :open="dialog" @close-dialog="dialog=false" rounded>
        <form @submit.prevent="handleReview" class="space-y-4 w-full">
            <div class="grid grid-cols-2 gap-2 w-full mt-4">
                <site-input v-model="rating.first_name" required label="First Name" placeholder="First Name" />
                <site-input v-model="rating.last_name" required label="Last Name" placeholder="Last Name" />
            </div>
            <site-textarea v-model="rating.review" required label="Message" placeholder="Message of Appointment" :rows="6" />
            <site-rating v-model="rating.rate" />
            <site-btn type="submit">Create an Review</site-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { IRatings } from '@/types'

definePageMeta({
    layout: 'home-layout'
})

useHead({
    title: "Отзывы наших пациентов - Стоматология \"Dental Implantology\"",
    meta: [
        { name: "description", content: "Прочитайте отзывы наших довольных пациентов. Узнайте, почему они выбирают стоматологическую клинику \"Dental Implantology\"" },
        { name: "keywords", content: "отзывы, пациенты, стоматология, опыт пациентов" },
    ]
})

const { getRatings, createRating } = useRatings()

const dialog = ref(false)
const items = ref<IRatings[]>([])
const rating = reactive<IRatings>({
    rate: 1,
    review: "",
    last_name: "",
    first_name: "",
})

const getItems = async () => {
    const data = await getRatings({ page: 1, limit: 12 })
    items.value = data.results
}

const handleReview = async () => {
    await createRating(rating)
    dialog.value = false
    alert('Successfully sended')
}

getItems()
</script>