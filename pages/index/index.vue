<template>
    <div class="relative">
        <div class="absolute z-0 w-full h-full">
            <nuxt-img class="w-full h-full object-cover opacity-20" src="/images/home-bg-1.jpg" width="600" height="600" alt="image" />
        </div>
        <div class="container h-screen relative z-10">
            <div class="flex items-center h-full">
                <div class="w-full md:w-[50%] pr-2">
                    <site-content
                        :subtitle="$t('home.header-subtitle')"
                        :title="$t('home.header-title')"
                        :description="$t('home.header-description')" />
                </div>
            </div>
            <div class="relative h-[140px]">
                <form @submit.prevent="handleRecord" class="absolute bottom-8 rounded-md p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end shadow-md shadow-black/5 bg-white w-full">
                    <site-input v-model="review.first_name" required :icon="MdRoundAlternateEmail" :label="$t('form.name')" :placeholder="$t('form.name')" />
                    <site-input v-model="review.phone" required :icon="FePhone" :label="$t('form.phone')" :placeholder="$t('form.phone')" />
                    <site-input v-model="review.comment" required :icon="BsCalendarWeek" :label="$t('form.date')" type="date" />
                    <site-btn type="submit">{{ $t('form.create-appointment') }}</site-btn>
                </form>
            </div>
        </div>
    </div>

    <div class="relative pb-20 pt-40 md:pb-24">
        <div class="container mx-auto">

            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

                <div class="p-4 md:w-1/3 flex flex-col text-center items-center"  v-for="c,i in index_cards" :key="i">
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
                    <nuxt-img src="/images/carousel-bg-1.jpg" class="w-[50%] h-[450px] object-cover rounded" />
                    <nuxt-img src="/images/carousel-bg-3.jpg" class="w-[50%] h-[450px] object-cover rounded" />
                </div>
                <div class="w-full md:w-[50%]">
                    <site-content
                        :subtitle="$t('home.home-about-us-subtitle')"
                        :title="$t('home.home-about-us-title')"
                        :description="$t('home.home-about-us-description')">
                        <br>
                        <!-- <p class="text-gray-700">Наша команда состоит из высококвалифицированных стоматологов и медсестер, которые имеют обширный опыт работы и постоянно совершенствуют свои профессиональные навыки. Мы используем только современное оборудование и инновационные технологии, чтобы гарантировать наилучшие результаты и комфорт во время процедур.</p>
                        <br> -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center gap-2" v-for="i in 4" :key="i">
                                <div>
                                    <BxSolidBadgeCheck class="text-blue-500 w-6 h-6" />
                                </div>
                                <span class="font-medium">{{ $t('home.home-about-us-item-'+i) }}</span>
                            </div>
                        </div>
                        <br>
                        <!-- <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <site-btn>Узнать больше</site-btn>
                            <site-btn>Записаться на прием</site-btn>
                        </div> -->
                    </site-content>
                </div>
            </div>
        </div>
    </div>
    
    <div class="relative py-10 md:py-24">
        <div class="container">
            <div class="h-full flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="w-full md:w-[50%]">
                    <site-content
                        :subtitle="$t('home.home-why-choice-us-subtitle')"
                        :title="$t('home.home-why-choice-us-title')"
                        :description="$t('home.home-why-choice-us-description-1')">
                        <!-- <br> -->
                        <p class="text-gray-700 text-sm md:text-base">{{$t('home.home-why-choice-us-description-2')}}</p>
                    </site-content>
                </div>
                <div class="w-0 md:w-[50%] hidden md:block">
                    <img src="https://img.freepik.com/free-photo/crop-doctor-with-clipboard_23-2147896195.jpg?t=st=1717834925~exp=1717838525~hmac=0c3fb706eb533f74aab08af08fe68b719fa97d5eadd5336b1fc997cbbac93d17&w=996" class="w-full h-[400px] object-cover rounded">
                </div>
            </div>
        </div>
    </div>

    <div class="relative py-8">
        <div class="container mx-auto">
            <div class=" bg-blue-50 p-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="flex items-center gap-4" v-for="c,i in index_statistics" :key="i">
                    <div class="bg-blue-500 rounded p-4">
                        <component class="text-white w-9 h-9" :is="c.icon"></component>
                    </div>
                    <div>
                        <h1 class="font-bold text-3xl">{{ (c.count).toLocaleString('en-US') }}<span class="text-blue-500">+</span></h1>
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
                        :title="$t('home.home-blog-title')"
                        :subtitle="$t('home.home-blog-subtitle')"
                        :description="$t('home.home-blog-description')" />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <card-blog  v-for="blog,i in index_blogs" :blog="blog" :key="i" />

            </div>
        </div>
    </div>

    <div class="relative py-10 md:py-24">
        <div class="container mx-auto">
            <div class="bg-blue-50 rounded-lg p-8">

                <div class="w-full">
                    
                    <site-content
                        :subtitle="$t('home.home-jumbotron-subtitle')"
                        :title="$t('home.home-jumbotron-title')"
                        :description="$t('home.home-jumbotron-description')">
                        <br>
                        <!-- <site-btn>Записаться на прием</site-btn> -->
                    </site-content>
                    
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IService } from '~/types'
import { index_cards, index_statistics, index_blogs } from '~/constants'
import { BxSolidBadgeCheck, MdRoundAlternateEmail, FePhone, BsCalendarWeek } from '@kalimahapps/vue-icons'

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

init()
</script>