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

            <!-- <div class="relative h-[140px] md:h-0">
                <div class="absolute bottom-8 rounded-md p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end shadow-xl shadow-[#0001] bg-white w-full">
                    <site-input :icon="MdRoundAlternateEmail" label="Почта" placeholder="Почта" />
                    <site-input :icon="FePhone" label="Телефон" placeholder="Телефон" />
                    <site-input :icon="BsCalendarWeek" label="Дата" type="date" />
                    <site-button>Забронируйте сейчас</site-button>
                </div>
            </div> -->
        </div>
        <div class="absolute h-full w-0 md:w-[50%] top-0 right-0 bg-blue-50"></div>
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
            <div class="h-full flex items-center gap-4">
                <div class="w-0 md:w-[50%]">
                    <img src="/images/nophoto.jpg" class="w-[90%] h-[90%] object-cover">
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
            <div class="h-full flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="w-full md:w-[50%]">
                    <site-content
                        subtitle="Почему выбрать нас"
                        title="Качество, профессионализм и индивидуальный подход"
                        description="Наша стоматологическая клиника предлагает широкий спектр услуг для поддержания здоровья и красоты вашей улыбки. Мы используем только современное оборудование и материалы, которые обеспечивают безопасность и комфорт во время процедур.">
                        <br>
                        <p>Наша команда квалифицированных специалистов имеет большой опыт работы и постоянно совершенствует свои навыки, чтобы предоставлять услуги на самом высоком уровне. Мы ценим доверие наших пациентов и стараемся превзойти их ожидания. Выберите нас и наслаждайтесь здоровой и красивой улыбкой!</p>
                        <!-- <br>
                        <div class="flex flex-col gap-6">
                            <div v-for="i in 2" key="i">
                                <div class="flex items-center justify-between gap-4">
                                    <span class="font-medium">Dental and Mounth Care</span>
                                    <span class="text-sm text-gray-700">95%</span>
                                </div>
                                <div class="mt-2 relative w-full flex items-center bg-blue-100 rounded-lg overflow-hidden h-[12px]">
                                    <div class="absolute left-0 bg-blue-500 rounded-lg w-[95%] h-full"></div>
                                </div>
                            </div>
                        </div> -->
                    </site-content>
                </div>
                <div class="max-w-[350px] rounded-lg p-6 shadow-lg shadow-[#0001]">
                    <h1 class="text-3xl font-bold">Don't Hesitate to Do <br> Consultation</h1>
                    <p class="my-2 text-sm text-gray-600">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Себя, вершину коварный?</p>
                    <div class="space-y-2 my-4">
                        <div class="flex gap-2 items-center justify-between">
                            <span class="font-medium">Monday-Friday</span>
                            <span>8AM-10PM</span>
                        </div>
                        <div class="flex gap-2 items-center justify-between">
                            <span class="font-medium">Saturday</span>
                            <span>8AM-10PM</span>
                        </div>
                        <div class="flex gap-2 items-center justify-between">
                            <span class="font-medium">Sunday</span>
                            <span>8AM-10PM</span>
                        </div>
                    </div>
                    <site-button class="w-full">Call +998 90 123 45 67</site-button>
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
        <div class="container">
            <div class="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <site-content
                    subtitle="Our Testimonals"
                    title="The Honest Review <br> From Our Client"
                    description="Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.">
                    <br>
                    <site-button>Посмотреть все отзывы</site-button>
                </site-content>
                <div class="space-y-6">
                    <card-testimonal v-for="i in 2" :key="i" />
                </div>
            </div>
        </div>
    </div>

    <div class="relative py-36 bg-blue-50">
        <div class="container">
            <div class="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <site-content
                    subtitle="Our Testimonals"
                    title="Dedicated to Give You <br> The Best Services"
                    description="Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.">
                    <br>
                    <site-button>Связаться с нами</site-button>
                </site-content>
            </div>
        </div>
    </div>

    <div class="relative py-36">
        <div class="container mx-auto">
            <div class="flex justify-center mb-8">
                <div class="text-center">
                    <site-content
                        subtitle="Our Blogs"
                        title="Блог"
                        description="Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные." />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <card-blog  v-for="i in 3" :key="i" />

            </div>
        </div>
    </div>

    <div class="relative py-36">
        <div class="container mx-auto">
            <div class="bg-blue-50 rounded-lg p-8">

                <div class="w-full md:w-[50%]">
                    
                    <site-content
                        subtitle="Contact Us"
                        title="Become The Next <br> Our"
                        description="Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.">
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
import { index_cards, index_statistics, index_about_items } from '~/constants'

definePageMeta({
    layout: 'home-layout'
})
</script>