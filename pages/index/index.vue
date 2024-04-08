<template>
    <nuxt-layout name="home-layout">
        <div class="relative">
            <div class="container h-screen relative z-10">
                <div class="h-full flex items-center">
                    <div class="w-full md:w-[50%]">
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">👋Hey! We Are Dentic</span>
                        <h1 class="text-6xl font-medium my-6">Helping You to <br> Bring Back Your <br> <span>Happy Smile</span></h1>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.</p>
                    </div>
                </div>
                
                <div class="absolute bottom-8 rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end shadow-xl shadow-[#0001] bg-white w-full">
                    <site-input :icon="MdRoundAlternateEmail" label="Почта" placeholder="Почта" />
                    <site-input :icon="FePhone" label="Телефон" placeholder="Телефон" />
                    <site-input :icon="BsCalendarWeek" label="Дата" type="date" />
                    <site-button class="h-min">Забронируйте сейчас</site-button>
                </div>
            </div>
            <div class="absolute h-full w-0 md:w-[50%] top-0 right-0 bg-blue-50"></div>
        </div>

        <div class="relative py-36">
            <div class="container mx-auto">
                <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div class="flex flex-col items-center gap-2 text-center" v-for="c,i in index_cards" :key="i">
                        <div class="bg-blue-50 border border-blue-100 rounded p-4">
                            <component class="text-blue-500 w-9 h-9" :is="c.icon"></component>
                        </div>
                        <h1 class="mt-2 font-medium text-lg">{{ c.title }}</h1>
                        <p class="text-gray-600 max-w-[300px]">{{ c.description }}</p>
                    </div>

                </div>
            </div>
        </div>

        <div class="relative py-8">
            <div class="container">
                <div class="h-full flex items-center">
                    <div class="w-0 md:w-[50%]"></div>
                    <div class="w-full md:w-[50%]">
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">More About Us</span>
                        <h1 class="text-5xl font-medium my-6">The Best Dental Clinic <br> That You Can Trust</h1>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.</p>
                        <br>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих.</p>
                        <br>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center gap-2" v-for="i in 4" :key="i">
                                <BxSolidBadgeCheck class="text-blue-500 w-6 h-6" />
                                <span class="font-medium">Modern Equipment</span>
                            </div>
                        </div>
                        <br>
                        <div class="flex gap-4 items-center">
                            <site-button>Узнать больше</site-button>
                            <site-button>Записаться на прием</site-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="relative py-36">
            <div class="container">
                <div class="h-full flex items-center justify-between gap-4">
                    <div class="w-full md:w-[50%]">
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">Why Choose Us</span>
                        <h1 class="text-5xl font-medium my-6">Helping Your <br>Dental Problem</h1>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.</p>
                        <br>
                        <div class="flex flex-col gap-6">
                            <div v-for="i in 2" key="i">
                                <div class="flex items-center justify-between gap-4">
                                    <span class="font-medium">Dental and Mounth Care</span>
                                    <span class="text-sm text-gray-700">95%</span>
                                </div>
                                <div class="mt-2 relative w-full flex items-center bg-blue-100 rounded-lg overflow-hidden h-[15px]">
                                    <div class="absolute left-0 bg-blue-500 rounded-lg w-[95%] h-full"></div>
                                </div>
                            </div>
                        </div>
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

        <div class="min-h-screen bg-blue-500">
        </div>

        <div class="relative py-36">
            <div class="container mx-auto">
                <div class="flex justify-center mb-8">
                    <div class="text-center">
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">Our Services</span>
                        <h1 class="text-4xl font-medium my-4">Услуги</h1>
                        <p class="text-gray-700 max-w-[350px]">Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные.</p>
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
                    <div>
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">Our Testimonals</span>
                        <h1 class="text-5xl font-medium my-6">The Honest Review <br> From Our Client</h1>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.</p>
                        <br>
                        <site-button>Посмотреть все отзывы</site-button>
                    </div>
                    <div class="space-y-6">
                        <card-testimonal v-for="i in 2" :key="i" />
                    </div>
                </div>
            </div>
        </div>

        <div class="relative py-36 bg-blue-50">
            <div class="container">
                <div class="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">Our Testimonals</span>
                        <h1 class="text-5xl font-medium my-6">Dedicated to Give You <br> The Best Services</h1>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.</p>
                        <br>
                        <site-button>Связаться с нами</site-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative py-36">
            <div class="container mx-auto">
                <div class="flex justify-center mb-8">
                    <div class="text-center">
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">Our Blogs</span>
                        <h1 class="text-4xl font-medium my-4">Блог</h1>
                        <p class="text-gray-700 max-w-[350px]">Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные.</p>
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
                        <span class="rounded border text-blue-500 px-3 py-1.5 text-sm">Contact Us</span>
                        <h1 class="text-5xl font-medium my-6">Become The Next <br> Our</h1>
                        <p class="text-gray-700 max-w-[450px]">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.</p>
                        <br>
                        <site-button>Записаться на прием</site-button>
                    </div>

                </div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script setup lang="ts">
import { index_cards, index_statistics } from '~/constants'
import { MdRoundAlternateEmail, FePhone, BsCalendarWeek, BxSolidBadgeCheck, LaToothSolid } from '@kalimahapps/vue-icons'
</script>