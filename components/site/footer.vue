<template>
    <footer class="bg-slate-900 py-10">
        <div class="mx-auto container space-y-8 py-4 lg:space-y-16">
            
            <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <div class="text-white font-bold text-xl">
                        Dental Implantology
                    </div>

                    <p class="mt-4 max-w-xs text-gray-300">Мы предлагаем широкий спектр услуг для здоровья вашей улыбки. Наши опытные специалисты используют современные технологии и индивидуальный подход к каждому пациенту. Свяжитесь с нами для записи на прием и консультации.</p>
                </div>

                <div>
                    <p class="font-medium text-gray-200">Контакты:</p>

                    <ul class="mt-6 space-y-4 text-sm">
                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            <a href="https://maps.app.goo.gl/jvA5nAwTy3jL4oe2A" target="_blank">Самарканд, улица Дахбед, 168А</a>
                        </li>

                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            Телефон: <a href="tel:+998662350005">+998 66 235 00 05</a>
                        </li>

                        <li class="text-gray-300 transition hover:opacity-75 text-nowrap">
                            Email: <a href="#">dentalemplament@stomatologyclinic.ru</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="font-medium text-gray-200">Часы работы:</p>
                    
                    <ul class="mt-6 space-y-4 text-sm">
                        <li class="text-red-500 transition hover:opacity-75">воскресенье	Закрыто</li>
                        <li class="text-gray-300 transition hover:opacity-75">понедельник	09:00–18:00</li>
                        <li class="text-gray-300 transition hover:opacity-75">вторник	09:00–18:00</li>
                        <li class="text-gray-300 transition hover:opacity-75">среда	09:00–18:00</li>
                        <li class="text-gray-300 transition hover:opacity-75">четверг	08:00–18:00</li>
                        <li class="text-gray-300 transition hover:opacity-75">пятница	08:00–18:00</li>
                    </ul>
                </div>

                <div>
                    <p class="font-medium text-gray-200">Быстрые ссылки:</p>

                    <ul class="mt-6 space-y-4 text-sm">
                        <li>
                            <nuxt-link to="/" class="text-gray-300 transition hover:opacity-75">Главная</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/about" class="text-gray-300 transition hover:opacity-75">О нас</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/doctors" class="text-gray-300 transition hover:opacity-75">Докторы</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/services" class="text-gray-300 transition hover:opacity-75">Услуги</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/reviews" class="text-gray-300 transition hover:opacity-75">Отзывы</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/contact" class="text-gray-300 transition hover:opacity-75">Контакты</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <p class="text-xs text-gray-100">&copy; {{ new Date().getFullYear() }}. Стоматология "Dental Implantology". Все права защищены.</p>
        </div>
    </footer>
</template>