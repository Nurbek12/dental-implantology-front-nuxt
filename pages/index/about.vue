<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 mx-auto">
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
                        subtitle="More About Us"
                        title="The Best Dental Clinic <br> That You Can Trust"
                        description="Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих инициал lorem силуэт! Всеми, своих щеке.">
                        <br>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Дорогу собрал языком страна рот несколько сих.</p>
                        <br>
                        <p class="text-gray-700">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Себя бросил одна за диких она, своих, рукопись переписали образ первую, даже свое семь рукописи. Имени о рукопись все ручеек прямо lorem инициал, это ты путь своих? Послушавшись языкового себя имеет предупредила путь? Города имеет эта, пустился парадигматическая океана напоивший!</p>
                    </site-content>
                </div>
                <div class="w-0 md:w-[50%]">
                    <nuxt-img src="/images/bg-3-image.jpg" class="w-full h-full object-cover overflow-hidden rounded" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'home-layout'
})
</script>