<template>
    <div class="relative overflow-hidden">
        <site-carousel />
        <!-- <div class="w-[50%] h-full right-0 absolute z-0 overflow-hidden">
            <img src="/images/DSCF1007_4_11zon.webp" class="w-full h-full object-cover" />
        </div> -->
        <div class="container min-h-screen relative">
            <div class="flex items-center h-[80vh] md:h-screen relative">
                <div class="w-full mb-20 md:mb-0 md:w-[50%] pr-2 text-center sm:text-left relative z-20">
                    <site-content
                        :subtitle="$t('home.header-subtitle')"
                        :title="$t('home.header-title')"
                        :description="$t('home.header-description')" />
                </div>
                <!-- <div class="w-[650px] h-[650px] -right-20 absolute z-0 rounded-full overflow-hidden p-4 shadow-lg bg-white">
                    <img src="/images/DSCF1007_4_11zon.webp" class="w-full h-full object-cover rounded-full" />
                </div>
                <div class="w-[300px] h-[300px] right-[480px] top-16 absolute z-10 rounded-full overflow-hidden p-4 shadow-lg bg-white">
                    <img src="/images/DSCF1004_3_11zon.webp" class="w-full h-full object-cover rounded-full" />
                </div> -->
                
                <!-- <div class="h-full right-0 w-[400px] absolute z-0">
                    <img src="/images/doctor-image.png" class="w-full h-full object-contain" />
                </div> -->
            </div>
            <div class="relative h-[140px] md:h-0 mt-5 md:mt-10 md:-translate-y-5 lg:-translate-y-20">
                <form @submit.prevent="handleRecord" class="absolute bottom-8 rounded-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end shadow-lg shadow-black/5 bg-white w-full">
                    <site-input v-model="review.first_name" required :icon="BxUser" :label="$t('form.name')" :placeholder="$t('form.name')" />
                    <site-input v-model="review.phone" required :icon="FePhone" :label="$t('form.phone')" :placeholder="$t('form.phone')" />
                    <site-input v-model="review.comment" required :icon="BsCalendarWeek" :label="$t('form.date')" type="date" />
                    <site-btn type="submit">{{ $t('form.create-appointment') }}</site-btn>
                </form>
            </div>
        </div>
    </div>

    <div class="relative py-20">
        <div class="container mx-auto">

            <div class="grid grid-cols-1 md:grid-cols-3 sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

                <div class="p-4 flex flex-col text-center items-center"  v-for="c,i in index_cards" :key="i">
                    <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                        <component class="text-blue-600 w-10 h-10 group-hover:text-white" :is="c.icon"></component>
                    </div>
                    <div class="flex-grow">
                        <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{{ $t(c.title) }}</h2>
                        <p class="leading-relaxed text-sm">{{ $t(c.description) }}</p>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <div class="relative py-8">
        <div class="container">
            <div class="h-full flex items-center justify-between gap-8">
                <div class="hidden md:flex gap-2 w-0 md:w-[50%]">
                    <nuxt-img src="/images/DSCF1048_5_11zon.webp" loading="lazy" class="w-[50%] h-[450px] object-cover rounded" />
                    <nuxt-img src="/images/DSCF1099_11_11zon.webp" loading="lazy" class="w-[50%] h-[450px] object-cover rounded" />
                </div>
                <div class="w-full md:w-[50%] text-center sm:text-left">
                    <site-content
                        :subtitle="$t('home.home-about-us-subtitle')"
                        :title="$t('home.home-about-us-title')"
                        :description="$t('home.home-about-us-description')">
                        <br>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="text-left flex items-center gap-2" v-for="i in 4" :key="i">
                                <div>
                                    <BxSolidBadgeCheck class="text-blue-500 w-6 h-6" />
                                </div>
                                <span class="font-medium">{{ $t('home.home-about-us-item-'+i) }}</span>
                            </div>
                        </div>
                        <br>
                    </site-content>
                </div>
            </div>
        </div>
    </div>
    
    <div class="relative py-10 md:py-24">
        <div class="container">
            <div class="h-full flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="w-full md:w-[50%] text-center sm:text-left">
                    <site-content
                        :subtitle="$t('home.home-why-choice-us-subtitle')"
                        :title="$t('home.home-why-choice-us-title')"
                        :description="$t('home.home-why-choice-us-description-1')">
                        <p class="text-gray-700 text-sm md:text-base">{{$t('home.home-why-choice-us-description-2')}}</p>
                    </site-content>
                </div>
                <div class="w-0 md:w-[50%] hidden md:block">
                    <nuxt-img src="/images/DSCF1074_7_11zon.webp" loading="lazy" class="w-full h-[400px] object-cover rounded" />
                </div>
            </div>
        </div>
    </div>

    <div class="relative py-8">
        <div class="container mx-auto">
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
        </div>
    </div>

    <div class="relative py-10 md:py-24">
        <div class="container mx-auto">
            <div class="flex justify-center mb-8">
                <div class="text-center">
                    <site-content
                        :title="$t('home.home-services-title')"
                        :subtitle="$t('home.home-services-subtitle')"
                        :description="$t('home.home-services-description')">
                        <br>
                    </site-content>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <card-service v-for="item,i in items" :item="item" :key="i" />

            </div>
        </div>
    </div>

    <div class="relative">
        <div class="container mx-auto">
            <div class="flex justify-center mb-8">
                <div class="text-center">
                    <site-content
                        :title="$t('home.home-faqs-subtitle')"
                        :subtitle="$t('home.home-faqs-title')"
                        :description="$t('home.home-faqs-description')" />
                </div>
            </div>
            
            <site-faqs />
        </div>
    </div>

    <div class="relative py-10 md:py-24">
        <div class="container mx-auto">
            <div class="bg-blue-50 rounded-lg p-8">

                <div class="w-full">
                    <site-content
                        :subtitle="''"
                        :title="$t('home.home-jumbotron-title')"
                        :description="$t('home.home-jumbotron-description')">
                    </site-content>
                    
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IService } from '~/types'
import { index_cards, index_statistics } from '~/constants'
import { BxSolidBadgeCheck, BxUser, FePhone, BsCalendarWeek } from '@kalimahapps/vue-icons'

definePageMeta({
    layout: 'home-layout'
})

useHead({
    title: "Стоматология \"Dental Implantology\" - Ваш путь к здоровой и красивой улыбке",
    meta: [
        { name: "description", content: "Добро пожаловать в стоматологическую клинику \"Dental Implantology\". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд." },
        { name: "keywords", content: "стоматология, стоматологическая клиника, зубной врач, лечение зубов, Samarkand" },
    ]
})

useSeoMeta({
  title: 'Стоматология "Dental Implantology" - Ваш путь к здоровой и красивой улыбке',
  ogTitle: 'Стоматология "Dental Implantology" - Ваш путь к здоровой и красивой улыбке',
  description: 'Добро пожаловать в стоматологическую клинику "Dental Implantology". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд.',
  ogDescription: 'Добро пожаловать в стоматологическую клинику "Dental Implantology". Мы предлагаем широкий спектр стоматологических услуг для всей семьи в Самарканд.',
//   ogImage: '/',
})

const items = ref<IService[]>([])
const { getServices } = useServices()
const { createRecord } = useInitialRecords()

const init = async () => {
    const data = await getServices({page: 1, limit: 12})
    items.value = data.results
}

const review = reactive({
    first_name: "",
    last_name: "client",
    phone: "",
    email: "",
    comment: ""
})

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

// init()
</script>