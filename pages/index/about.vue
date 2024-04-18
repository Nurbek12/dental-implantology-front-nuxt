<template>
    <div class="relative">
        <div class="container h-[50vh] relative z-10">
            <div class="h-full flex items-center pt-16">
                <div class="w-full md:w-[60%] mx-auto text-center">
                    <h1 class="font-medium text-3xl">
                        <nuxt-link to="/" class="text-lg text-gray-600 font-normal">Home /</nuxt-link> 
                        About Us
                    </h1>
                </div>
            </div>
        </div>
    </div>

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