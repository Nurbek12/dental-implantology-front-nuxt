<template>
    <site-navbar />

    <header class="bg-[#F1F8FF] relative">
        
        <div class="container min-h-screen h-full relative pt-32 pb-10 md:pb-0">
            <tooth-svg class="absolute" />
            <tools-svg class="absolute bottom-80 md:bottom-44 right-0" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative mb-4 md:mb-0">
                <div class="hidden md:flex px-0 lg:px-20 items-end relative">
                    <div class="flex justify-center items-end">
                        <doctor-back class="absolute scale-[75%] object-bottom translate-y-20 z-0" />
                        <nuxt-img src="/images/dr-ikramov.png" class="w-[360px] h-[460px] relative object-contain object-bottom" alt="Dr. Ikramov" />
                    </div>
                    <card-doctor-info class="absolute right-10 top-5" :doctor="{
                        first_name: 'Мехрож',
                        last_name: 'Икрамов',
                        middle_name: 'Рустамович',
                        rating: 4.9,
                        experience: 12,
                    }" />
                </div> 

                <div class="text-center sm:text-left relative z-20">
                    <site-content :subtitle="$t('home.header-subtitle')" />
                    <h1 style="line-height: 1.2;" class="text-2xl md:text-4xl font-extrabold font-manarope mt-4 relative" v-html="$t('home.header-title', { tag: '<br>', svg: '<span draw-line></span>' })"></h1>
                    <p class="text-gray-700 text-sm md:text-base mt-4" v-html="$t('home.header-description')"></p>
                </div>
            </div>

            <div class="relative">
                <form @submit.prevent="handleRecord" class="relative rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end shadow-lg shadow-black/5 bg-white w-full">
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
            <div class="flex flex-col text-center w-full mb-16">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('about.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('about.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('about.description') }}</p>
            </div>

            <div class="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        <!-- <site-btn @click="dialog=true" class="w-min text-nowrap">{{ $t('form.create-review') }}</site-btn> -->
                    </site-content>
                </div>
                <div class="w-full h-full">
                    <nuxt-img src="/images/DSCF1082_8_11zon_8_11zon.webp" alt="Dental Implantalogy Doctors" class="w-full h-full object-cover overflow-hidden rounded" />
                </div>
            </div>
        </section>

        <section class="py-0 container">
            <div class="h-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <nuxt-img src="/images/DSCF0192_11zon.webp" alt="Dental Imlantalogy" class="w- w-full h-full object-cover rounded" />
                </div>
                <div class="w-full text-center sm:text-left">
                    <!-- :subtitle="$t('home.home-about-us-subtitle')"
                        :description="$t('home.home-about-us-description')" -->
                    <site-content
                        :title="$t('about.title-1')">
                        <form @submit.prevent="handleReview" class="space-y-4 w-full shadow rounded-lg p-4">
                            <div class="grid grid-cols-2 gap-2 w-full mt-4">
                                <site-input v-model="review.first_name" required :placeholder="$t('form.first-name')" :label="$t('form.first-name')" />
                                <site-input v-model="review.last_name" required :placeholder="$t('form.last-name')" :label="$t('form.last-name')" />
                            </div>
                            <site-textarea v-model="review.review" required :placeholder="$t('form.message-of-review')" :label="$t('form.message')" :rows="6" />
                            <site-rating v-model="review.rate" />
                            <site-btn type="submit">{{ $t('form.send') }}</site-btn>
                        </form>
                    </site-content>
                </div>
            </div>
        </section>

        <!-- <section class="py-12 container">
            <div class="h-full flex items-center justify-between gap-8">
                <div class="w-full md:w-[50%] text-center sm:text-left">
                    <site-content
                        subtitle=""
                        :title="$t('about.title-1')"
                        description="">
                        <form @submit.prevent="handleReview" class="space-y-4 w-full shadow-lg rounded-lg p-4">
                            <div class="grid grid-cols-2 gap-2 w-full mt-4">
                                <site-input v-model="review.first_name" required :placeholder="$t('form.first-name')" :label="$t('form.first-name')" />
                                <site-input v-model="review.last_name" required :placeholder="$t('form.last-name')" :label="$t('form.last-name')" />
                            </div>
                            <site-textarea v-model="review.review" required :placeholder="$t('form.message-of-review')" :label="$t('form.message')" :rows="6" />
                            <site-rating v-model="review.rate" />
                            <site-btn type="submit">{{ $t('form.send') }}</site-btn>
                        </form>
                    </site-content>
                </div>
                <div class="hidden md:flex gap-2 w-0 md:w-[50%]">
                    <nuxt-img src="/images/DSCF1048_5_11zon_5_11zon.webp" alt="Dental Imlantalogy" class="w-[50%] h-[450px] object-cover rounded" />
                    <nuxt-img src="/images/DSCF1099_11_11zon_11_11zon.webp" alt="Dental Imlantalogy" class="w-[50%] h-[450px] object-cover rounded" />
                </div>
            </div>
        </section> -->
        
        <section class="py-12 container">
            <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <card-review v-for="review,i in reviews" :item="review" :key="i" />
            </div>
        </section>

        <section class="py-12 container">
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

        <section class="py-24 container" id="services">
            <div class="flex flex-col text-center w-full mb-16">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('services.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('services.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('doctors.description') }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <card-service v-for="service,i in services" :item="service" :key="i" />
            </div>
        </section>

        <section class="py-24 container" id="doctors">
            <div class="flex flex-col text-center w-full mb-10">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('doctors.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('doctors.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('doctors.description') }}</p>
            </div>

            <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
                <card-doctor v-for="doctor,i in doctors" :doctor="doctor" :key="i" />
                
            </div>
        </section>

        <section class="py-12 container">
            <div class="flex justify-center mb-8">
                <div class="text-center">
                    <site-content
                        :title="$t('home.home-faqs-subtitle')"
                        :subtitle="$t('home.home-faqs-title')"
                        :description="$t('home.home-faqs-description')" />
                </div>
            </div>
            
            <site-faqs />
        </section>

        <section class="py-12 container">
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

        <section class="py-24 container" id="contacts">
            <div class="flex flex-col text-center w-full mb-14">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('contacts.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('contacts.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('contacts.description') }}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="w-full col-span-1 md:col-span-2 min-h-[700px] md:min-h-[400px] h-full bg-gray-300 rounded-lg overflow-hidden flex items-end justify-start relative">
                    <iframe width="100%" height="100%" id="gmap_canvas" class="absolute inset-0"
                        src="https://maps.google.com/maps?q=39.653550,66.97005&t=&z=18&ie=UTF8&iwloc=&output=embed"
                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                    </iframe>

                    <div class="bg-white absolute grid grid-cols-1 md:grid-cols-2 gap-2 p-2 rounded shadow-md m-1">
                        <div class="h-[150px]">
                            <nuxt-img class="w-full h-full rounded" src="/images/DSCF1004_3_11zon_3_11zon_11zon.webp" alt="Dental Implantalogy" />
                        </div>
                        <div class="p-2">
                            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">{{ $t('form.address') }}</h2>
                                <p class="mt-1">{{ $t('footer.address') }}</p>
                            <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">{{ $t('form.phone') }}</h2>
                                <a class="leading-relaxed" href="tel:+998915233344">+998 91 523 33 44</a>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="handleRecord" class="bg-white flex flex-col w-full">
                    <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">{{ $t('contacts.form-title') }}</h2>
                    <p class="leading-relaxed mb-5 text-gray-600">{{ $t('contacts.form-description') }}</p>
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                            <site-input required v-model="record.first_name" :placeholder="$t('form.first-name')" :label="$t('form.first-name')" />
                            <site-input required v-model="record.last_name" :placeholder="$t('form.last-name')" :label="$t('form.last-name')" />
                        </div>
                        <site-input required v-model="record.phone" placeholder="example@mail.com" :label="$t('form.email')" />
                        <client-only>
                            <site-textarea required v-model="record.comment" :placeholder="$t('form.message-of-review')" :label="$t('form.message')" />
                        </client-only>
                        <site-btn type="submit" class="w-full">{{ $t('form.send') }}</site-btn>
                    </div>
                    <p class="text-xs text-gray-500 mt-3">{{ $t('contacts.form-description-1') }}</p>
                </form>
            </div>
        </section>
    </main>

    <site-footer />
</template>

<script setup lang="ts">
import type { IDoctor, IRatings, IService } from '~/types'
import { index_cards, index_statistics } from '~/constants'
import { BxSolidBadgeCheck, BxUser, FePhone, } from '@kalimahapps/vue-icons'

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
const { getServices } = useServices()
const { createRecord } = useInitialRecords()
const { getRatings, createRating } = useRatings()

const dialog = ref(false)
const doctors = ref<IDoctor[]>([])
const reviews = ref<IRatings[]>([])
const services = ref<IService[]>([])
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
    last_name: "",
    first_name: "",
})

const handleGetServices = async () => {
    try {
        const data = await getServices({page: 1, limit: 12})
        services.value = data.results
    } catch (error) {
        console.log(error)
    }
}

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
        handleGetServices(),
        handleGetDoctors(),
        handleGetReviews()
    ])
}

await init()
</script>