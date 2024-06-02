<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 mx-auto">
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
                <site-button @click="dialog=true">Create an Review</site-button>
            </div>
            <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
            <site-button type="submit">Create an Review</site-button>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { IRatings } from '@/types'

definePageMeta({
    layout: 'home-layout'
})

const { getRatings, createRating } = useRatings()

const dialog = ref(false)
const items = ref<IRatings[]>([
    { id: 1, created_at: new Date().toString(), first_name: 'John', last_name: 'Doe', rate: 4, review: 'This product exceeded my expectations. I was hesitant at first, but after using it for a few days, I can confidently say that it is worth the investment. The quality is top-notch, and the customer service is exceptional.' },
    { id: 2, created_at: new Date().toString(), first_name: 'Jane', last_name: 'Doe', rate: 5, review: 'I am absolutely in love with this product! It has completely transformed my life. The design is sleek and modern, and the features are incredible. I would highly recommend it to anyone looking for a high-quality product.' },
    { id: 3, created_at: new Date().toString(), first_name: 'Bob', last_name: 'Smith', rate: 3, review: 'I was excited to try this product, but it didn\'t quite meet my expectations. The quality is decent, but there are a few features that are missing. It\'s a good product, but it could be better.' },
    { id: 4, created_at: new Date().toString(), first_name: 'Alice', last_name: 'Smith', rate: 4, review: 'This product is pretty good. I have been using it for a few weeks now, and I am satisfied with the results. The customer service is also very helpful and responsive.' },
    { id: 5, created_at: new Date().toString(), first_name: 'Charlie', last_name: 'Brown', rate: 2, review: 'I was disappointed with this product. It didn\'t work as advertised, and the quality is not great. I would not recommend it to others.' },
    { id: 6, created_at: new Date().toString(), first_name: 'Emma', last_name: 'Brown', rate: 5, review: 'This is the best product I have ever used! It is easy to use, and the results are amazing. The customer service is also outstanding. I would highly recommend it to anyone.' },
    { id: 7, created_at: new Date().toString(), first_name: 'Tom', last_name: 'Taylor', rate: 3, review: 'This product is okay. It does what it is supposed to do, but there is nothing exceptional about it. The quality is decent, but there are better products out there.' },
    { id: 8, created_at: new Date().toString(), first_name: 'Sophie', last_name: 'Taylor', rate: 4, review: 'I am happy with this product. It has some great features, and the quality is good. The customer service is also very helpful. Overall, it is a good product.' },
    { id: 9, created_at: new Date().toString(), first_name: 'Daniel', last_name: 'Wilson', rate: 2, review: 'This product needs improvement. The design is outdated, and the features are limited. The quality is also not great. I would not recommend it to others.' },
    { id: 10, created_at: new Date().toString(), first_name: 'Grace', last_name: 'Wilson', rate: 5, review: 'This product is perfect! It has everything I need, and the quality is exceptional. The customer service is also very responsive and helpful. I would highly recommend it to anyone.' },
])
const rating = reactive<IRatings>({
    rate: 1,
    review: "",
    // doctor: null,
    last_name: "",
    first_name: "",
})

const getItems = async () => {
    const data = await getRatings({ page: 1, limit: 12 })
    items.value = data.results
}

const handleReview = async () => {
    await createRating(rating)
    alert('Successfully sended')
}

// getItems()
</script>