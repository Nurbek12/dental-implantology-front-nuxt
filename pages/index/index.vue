<template>
    <site-navbar />

    <header class="bg-[#F1F8FF] flex items-center min-h-screen">
        
        <div class="container relative pt-24 pb-10">
            <tooth-svg class="absolute" />
            <tools-svg class="absolute bottom-80 md:bottom-44 right-0" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative mb-4 md:mb-0">

                <div class="hidden md:flex px-0 lg:px-20 items-end relative">
                    <div class="flex justify-center items-end">
                        <doctor-back class="absolute scale-[75%] object-bottom translate-y-20 z-0" />
                        <nuxt-img src="/images/dr-ikramov.png" class="w-[360px] h-[460px] relative object-contain object-bottom" alt="Dr. Ikramov" />
                    </div>
                    <div class="absolute top-10 right-10 rounded-xl w-[240px] h-[130px] p-6 flex justify-center items-center shadow-lg shadow-primary-600/10 bg-white/45">
                        <p class="font-semibold text-lg relative">
                            Работаем <span class="text-primary-600">круглосуточно</span> <br> и <span class="text-primary-600">без выходных</span>
                        </p>
                        <svg-24-7 class="absolute z-0 right-5" />
                    </div>
                </div> 

                <div class="text-center sm:text-left relative z-20">
                    <site-content :subtitle="$t('home.header-subtitle')" />
                    <h1 style="line-height: 1.2;" class="text-2xl md:text-4xl font-extrabold font-manarope mt-4 relative" v-html="$t('home.header-title', { tag: '<br>', svg: '<span draw-line></span>' })"></h1>
                    <p class="text-gray-700 text-sm md:text-base mt-4" v-html="$t('home.header-description')"></p>
                </div>

            </div>

            <div class="relative">
                <form @submit.prevent="handleRecord" class="relative rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end bg-white w-full">
                    <site-input v-model="record.first_name" required :icon="BxUser" :label="$t('form.name')" :placeholder="$t('form.placeholder-name')" />
                    <site-input v-model="record.phone" required :icon="FePhone" :label="$t('form.phone')" :placeholder="$t('form.placeholder-phone')" />
                    <site-btn type="submit">{{ $t('form.order-call') }}</site-btn>
                </form>
            </div>
        </div>
        
    </header>

    <main>
        <section class="py-10 container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                <div class="p-4 flex flex-col text-center items-center"  v-for="c,i in index_cards" :key="i">
                    <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                        <component class="text-blue-600 w-10 h-10 group-hover:text-white" :is="c.icon"></component>
                    </div>
                    <div class="flex-grow">
                        <h1 class="text-gray-900 text-lg title-font font-medium mb-3">{{ $t(c.title) }}</h1>
                        <p class="leading-relaxed text-sm">{{ $t(c.description) }}</p>
                    </div>
                </div>

            </div>
        </section>

        <section class="py-24 container" id="about">
            <div class="h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <site-slider :images="slider_images" />
                <div class="w-full text-center sm:text-left">
                    <site-content
                        :title="$t('home.home-about-us-title')"
                        :description="$t('about.description-1')">
                        <p class="text-gray-700">{{ $t('about.description-2') }}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="text-left flex items-center gap-2" v-for="i in 4" :key="i">
                                <div>
                                    <BxSolidBadgeCheck class="text-blue-500 w-6 h-6" />
                                </div>
                                <span class="font-medium">{{ $t('home.home-about-us-item-'+i) }}</span>
                            </div>
                        </div>
                    </site-content>
                </div>
            </div>
        </section>

        <section class="py-0 container">
            <div class=" bg-blue-50 p-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="flex items-center gap-4" v-for="c,i in index_statistics" :key="i">
                    <div class="bg-primary-400 rounded p-4">
                        <component class="text-white w-9 h-9" :is="c.icon"></component>
                    </div>
                    <div>
                        <h1 class="font-bold text-2xl md:text-3xl">{{ (c.count).toLocaleString('en-US') }}<span class="text-blue-500">+</span></h1>
                        <p class="text-gray-600">{{ $t(c.title) }}</p>
                    </div>
                </div>

            </div>
        </section>

        <section class="pt-12 container">
            <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <card-review v-for="review,i in reviews" :item="review" :key="i" />
            </div>
        </section>
        
        <section class="pt-24 pb-12 container" id="services">
            <div class="flex flex-col text-center w-full mb-16">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('services.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('services.popular-title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ $t('services.description') }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <card-service2 v-for="service,i in services" :item="service" :key="i" />
            </div>
            <div class="flex justify-center pt-12">
                <nuxt-link to="/services" class="text-primary-600 bg-primary-100 hover:bg-primary-200 px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2">
                    {{ $t('services.all-services') }}
                    <AkChevronRightSmall class="size-5" />
                </nuxt-link>
            </div>
        </section>

        <section class="py-24 container" id="doctors">
            <div class="flex flex-col text-center w-full mb-10">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('doctors.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('doctors.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ $t('doctors.description') }}</p>
            </div>

            <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            
                <card-doctor v-for="doctor,i in doctors" :doctor="doctor" :key="i" @add-comment="dialogReview=true,review.doctor=doctor.id" />
                
            </div>
        </section>

        <section class="pb-12 container">
            <div class="bg-blue-50 rounded-lg p-8">

                <div class="w-full">
                    <site-content
                        :subtitle="''"
                        :title="$t('home.home-jumbotron-title')"
                        :description="$t('home.home-jumbotron-description')">
                    </site-content>
                    
                </div>

            </div>
        </section>

        <section class="pt-12 container">
            <div class="flex flex-col text-center w-full mb-8">
                <div class="mb-2 flex items-center flex-col gap-2">
                    <svg-subtitle-tooth />
                    <span class="text-primary-500 text-sm font-semibold">{{ $t('home.home-faqs-subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('home.home-faqs-title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-sm">{{ $t('home.home-faqs-description') }}</p>
            </div>
            
            <site-faqs />
        </section>

        <section class="py-24 container" id="contacts">           

            <div class="bg-[#f1f8ff] md:mt-16 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                <tooth-svg class="absolute z-0 bottom-5 left-[25%] -rotate-45" />
                <tools-svg class="absolute bottom-44 left-[40%]" />
                <site-content
                    :subtitle="$t('contacts.form-title')"
                    :title="$t('contacts.title')"
                    :description="$t('contacts.description')">
                    <form @submit.prevent="handleRecord" class="space-y-4 md:w-[60%] mt-10 relative">
                        <site-input v-model="record.first_name" required :placeholder="$t('form.placeholder-name')" />
                        <site-input v-model="record.phone" required :placeholder="$t('form.placeholder-phone')" />
                        <site-btn type="submit">{{ $t('form.order-call') }}</site-btn>
                    </form>
                </site-content>
                <div class="relative w-full hidden md:block">
                    <nuxt-img class="relative md:absolute -bottom-10 h-[120%] w-[120%] object-contain" src="/images/DSCF0029.webp" />
                </div>

            </div>

        </section>
    </main>
    <site-footer />
</template>

<script setup lang="ts">
import type { IDoctor, IRatings } from '~/types'
import { index_cards, index_statistics, slider_images, services } from '~/constants'
import { BxSolidBadgeCheck, BxUser, FePhone, AkChevronRightSmall, } from '@kalimahapps/vue-icons'

useHead({
    title: "Стоматология Dental Implantology - Ваш путь к здоровой улыбке",
    meta: [
        { name: "description", content: "Добро пожаловать в стоматологическую клинику \"Dental Implantology\". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд." },
        { name: "keywords", content: "стоматология, стоматологическая клиника, зубной врач, лечение зубов, Samarkand" },
    ]
})

// useSeoMeta({
//   title: 'Стоматология Dental Implantology - Ваш путь к здоровой улыбке',
//   ogTitle: 'Стоматология Dental Implantology - Ваш путь к здоровой улыбке',
//   description: 'Добро пожаловать в стоматологическую клинику "Dental Implantology". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд.',
//   ogDescription: 'Добро пожаловать в стоматологическую клинику "Dental Implantology". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд.',
// })

const { getDoctors } = useDoctors()
const { createRecord } = useInitialRecords()
const { getRatings, createRating } = useRatings()

const dialog = ref(false)
const dialogReview = ref(false)
const dialogContact = ref(false)
const doctors = ref<IDoctor[]>([])
const reviews = ref<IRatings[]>([])
const record = reactive({
    phone: "",
    email: "",
    comment: "",
    last_name: "",
    first_name: "",
})
const review = reactive<IRatings>({
    rate: 0,
    review: "",
    doctor: null,
    last_name: "",
    first_name: "",
})

const handleGetDoctors = async () => {
    try {
        const data = await getDoctors({page: 1, limit: 12})
        doctors.value = data.results
    } catch (error) {
        console.log(error)
    }
}

const handleGetReviews = async () => {
    try {
        const data = await getRatings({page: 1, limit: 12})
        reviews.value = data.results
    } catch (error) {
        console.log(error)
    }
}

const handleRecord = async () => {
    try {
        await createRecord(JSON.stringify(review))
        alert('Successfully sended')
    } catch (error) {
        alert('Wrong with sending!')
    } finally {
        Object.assign(review, {
            first_name: "",
            last_name: "",
            phone: "",
            comment: ""  
        })
    }
}

const handleReview = async () => {
    await createRating(review)
    dialog.value = false
    alert('Successfully sended')
}

const init = async () => {
    await Promise.all([
        handleGetDoctors(),
        handleGetReviews()
    ])
}

await init()
</script>