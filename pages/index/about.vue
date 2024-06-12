<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Узнайте о нас больше</h2>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">О нашей клинике</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Добро пожаловать в нашу стоматологическую клинику, где ваши улыбки - наш приоритет. Мы предлагаем современные методы лечения и заботу на высшем уровне. Узнайте больше о наших ценностях и миссии.</p>
            </div>
        </div>
    </section>

    <div class="relative py-8">
        <div class="container">
            <div class="h-full flex items-center gap-4">
                <div class="w-full md:w-[50%]">
                    <site-content
                        subtitle="О нас"
                        title="Доверие, качество и профессионализм"
                        description="Наша стоматологическая клиника была основана в 2000 году с целью предоставления качественных стоматологических услуг. За эти годы мы накопили большой опыт и стали одной из ведущих клиник в отрасли. Наша команда квалифицированных специалистов постоянно совершенствует свои навыки, чтобы предоставлять услуги на самом высоком уровне.">
                        <br>
                        <p class="text-gray-700">Мы ценим доверие наших пациентов и стараемся превзойти их ожидания. Наша клиника оснащена современным оборудованием и материалами, которые обеспечивают безопасность и комфорт наших пациентов. Мы предлагаем широкий спектр услуг для поддержания здоровья и красоты ваших зубов и десен. Выберите нас и доверьте свою улыбку рукам профессионалов!</p>
                    </site-content>
                </div>
                <div class="w-0 md:w-[50%]">
                    <nuxt-img src="/images/bg-3-image.jpg" class="w-[90%] h-[400px] object-cover overflow-hidden rounded" />
                </div>
            </div>
        </div>
    </div>

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
import type { IRatings } from '~/types';

definePageMeta({
    layout: 'home-layout'
})

useHead({
    title: "О нас - Стоматология \"Dental Implantology\"",
    meta: [
        { name: "description", content: "Узнайте больше о нашей стоматологической клинике \"Dental Implantology\", нашей миссии, ценностях и команде профессионалов." },
        { name: "keywords", content: "о нас, стоматология, наша команда, стоматологическая клиника" },
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