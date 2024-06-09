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
</template>

<script setup lang="ts">
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
</script>