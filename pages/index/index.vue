<template>
    <div class="relative">
        <div class="container h-screen relative z-10">
            <div class="flex items-center h-screen md:h-full">
                <div class="w-full md:w-[50%] pr-2">
                    <site-content
                        subtitle="👋Здоровая улыбка с нашей помощью!"
                        title="Квалифицированные специалисты и современное оборудование"
                        description="В нашей клинике вы можете пройти диагностику и лечение заболеваний зубов и десен, а также провести профилактические процедуры, которые помогут избежать проблем в будущем. Кроме того, мы предлагаем услуги по эстетической стоматологии, которые помогут вам улучшить внешний вид вашей улыбки." />
                </div>
            </div>

        </div>
    </div>

    <div class="relative py-36">
        <div class="container mx-auto">

            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

                <div class="p-4 md:w-1/3 flex flex-col text-center items-center"  v-for="c,i in index_cards" :key="i">
                    <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                        <component class="text-blue-600 w-10 h-10 group-hover:text-white" :is="c.icon"></component>
                    </div>
                    <div class="flex-grow">
                        <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{{ c.title }}</h2>
                        <p class="leading-relaxed text-base">{{ c.description }}</p>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <div class="relative py-8">
        <div class="container">
            <div class="h-full flex items-center justify-between gap-8">
                <div class="w-0 md:w-[50%]">
                    <img src="https://img.freepik.com/free-photo/orthodontist-with-latex-glove-handling-dental-equipment_23-2148985840.jpg?t=st=1717834896~exp=1717838496~hmac=4e0b454948a2c0f393dbc65fa8d551a9f367db3ca6f0776466054d1daad84bb4&w=996" class="w-full h-[480px] object-cover rounded">
                </div>
                <div class="w-full md:w-[50%]">
                    <site-content
                        subtitle="Подробнее о нас"
                        title="Добро пожаловать в нашу стоматологическую клинику!"
                        description="Мы рады, что вы выбрали нас для ухода за вашим здоровьем и красотой улыбки. Наша клиника является одной из ведущих в отрасли, и мы гордимся тем, что предоставляем нашим пациентам качественные услуги и индивидуальный подход.">
                        <br>
                        <p class="text-gray-700">Наша команда состоит из высококвалифицированных стоматологов и медсестер, которые имеют обширный опыт работы и постоянно совершенствуют свои профессиональные навыки. Мы используем только современное оборудование и инновационные технологии, чтобы гарантировать наилучшие результаты и комфорт во время процедур.</p>
                        <br>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center gap-2" v-for="item,i in index_about_items" :key="i">
                                <BxSolidBadgeCheck class="text-blue-500 w-6 h-6" />
                                <span class="font-medium">{{ item }}</span>
                            </div>
                        </div>
                        <br>
                        <!-- <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <site-button>Узнать больше</site-button>
                            <site-button>Записаться на прием</site-button>
                        </div> -->
                    </site-content>
                </div>
            </div>
        </div>
    </div>
    
    <div class="relative py-36">
        <div class="container">
            <div class="h-full flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="w-full md:w-[50%]">
                    <site-content
                        subtitle="Почему выбрать нас"
                        title="Качество, профессионализм и индивидуальный подход"
                        description="Наша стоматологическая клиника предлагает широкий спектр услуг для поддержания здоровья и красоты вашей улыбки. Мы используем только современное оборудование и материалы, которые обеспечивают безопасность и комфорт во время процедур.">
                        <br>
                        <p>Наша команда квалифицированных специалистов имеет большой опыт работы и постоянно совершенствует свои навыки, чтобы предоставлять услуги на самом высоком уровне. Мы ценим доверие наших пациентов и стараемся превзойти их ожидания. Выберите нас и наслаждайтесь здоровой и красивой улыбкой!</p>
                    </site-content>
                </div>
                <div class="w-0 md:w-[50%]">
                    <img src="https://img.freepik.com/free-photo/crop-doctor-with-clipboard_23-2147896195.jpg?t=st=1717834925~exp=1717838525~hmac=0c3fb706eb533f74aab08af08fe68b719fa97d5eadd5336b1fc997cbbac93d17&w=996" class="w-full h-[400px] object-cover rounded">
                </div>
            </div>
        </div>
    </div>

    <div class="relative py-16 bg-blue-50">
        <div class="container mx-auto">
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="flex items-center gap-4" v-for="c,i in index_statistics" :key="i">
                    <div class="bg-blue-500 rounded p-4">
                        <component class="text-white w-9 h-9" :is="c.icon"></component>
                    </div>
                    <div>
                        <h1 class="font-bold text-3xl">{{ (c.count).toLocaleString('en-US') }} <span class="text-blue-500">+</span></h1>
                        <p class="text-gray-600">{{ c.title }}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="relative py-36">
        <div class="container mx-auto">
            <div class="flex justify-center mb-8">
                <div class="text-center">
                    <site-content
                        title="Комплексный уход за зубами для всех возрастов"
                        subtitle="Наши услуги"
                        description="Наша стоматологическая клиника предлагает широкий спектр услуг для поддержания здоровья и красоты ваших зубов и десен.">
                        <br>
                    </site-content>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <card-service  v-for="i in 6" :key="i" />

            </div>
        </div>
    </div>

    <div class="relative py-36">
        <div class="container mx-auto">
            <div class="flex justify-center mb-8">
                <div class="text-center">
                    <site-content
                        subtitle="Наш блог"
                        title="Блог"
                        description="Добро пожаловать в наш блог! Здесь мы делимся полезной информацией и новостями из мира стоматологии." />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <card-blog  v-for="blog,i in index_blogs" :blog="blog" :key="i" />

            </div>
        </div>
    </div>

    <div class="relative py-36">
        <div class="container mx-auto">
            <div class="bg-blue-50 rounded-lg p-8">

                <div class="w-full">
                    
                    <site-content
                        subtitle="Регулярные осмотры — залог здоровья вашей улыбки"
                        title="Почему важно регулярно посещать стоматолога?"
                        description="Регулярные визиты к стоматологу играют ключевую роль в поддержании здоровья полости рта и профилактике серьезных заболеваний. В этом блоге мы расскажем, почему регулярные осмотры так важны, как часто стоит посещать стоматолога и какие преимущества это приносит. Вы узнаете, как своевременное выявление проблем может предотвратить их развитие и сэкономить вам время, деньги и нервы в будущем. Прочитайте наши советы и будьте уверены в здоровье своей улыбки!">
                        <br>
                        <site-button>Записаться на прием</site-button>
                    </site-content>
                    
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BxSolidBadgeCheck } from '@kalimahapps/vue-icons'
import { index_cards, index_statistics, index_about_items, index_blogs } from '~/constants'

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
</script>