<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Мы на связи</h2>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Свяжитесь с нами</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Мы всегда готовы ответить на ваши вопросы и записать вас на прием. Здесь вы найдете нашу контактную информацию, адрес и часы работы. Ждем вас в нашей клинике!</p>
            </div>
        </div>
    </section>

    <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe width="100%" height="100%" id="gmap_canvas" class="absolute inset-0"
                src="https://maps.google.com/maps?q=samarkand,dental+implant+clinic&t=&z=16&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
            <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div class="lg:w-1/2 px-6">
                    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">Адрес</h2>
                    <p class="mt-1">Самарканд, улица Дахбед, 168А</p>
                </div>
                <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">Эл. Почта</h2>
                        <a class="text-indigo-500 leading-relaxed">dental@email.com</a>
                    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">Телефон</h2>
                        <p class="leading-relaxed">+998 66 235 00 05</p>
                </div>
            </div>
            </div>
            <form @submit.prevent="handleRecord" class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Свяжитесь с нами</h2>
                <p class="leading-relaxed mb-5 text-gray-600">Мы всегда рады помочь вам</p>
                <div class="space-y-4">
                    <div class="flex flex-col md:flex-row gap-2">
                        <site-input required v-model="review.first_name" placeholder="Имя" label="Имя" />
                        <site-input required v-model="review.last_name" placeholder="Фамилия" label="Фамилия" />
                    </div>
                    <site-input required v-model="review.phone" placeholder="example@mail.com" label="Электронная почта" />
                    <site-textarea required v-model="review.comment" placeholder="Напишите..." label="Сообщения" />
                    <site-btn type="submit" class="w-full">Отправить</site-btn>
                </div>
                <p class="text-xs text-gray-500 mt-3">Наши специалисты свяжутся с вами в ближайшее время. Пожалуйста, укажите свои контактные данные и кратко опишите ваш запрос. Мы ценим ваше время и стремимся ответить на все обращения как можно быстрее.</p>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'home-layout'
})

useHead({
    title: "Контакты - Стоматология \"Dental Implantology\"",
    meta: [
        { name: "description", content: "Свяжитесь с нами для записи на прием или получения консультации. Адрес, телефон, email и форма обратной связи." },
        { name: "keywords", content: "контакты, стоматология, телефон, адрес, запись на прием" },
    ]
})

const { createRecord } = useInitialRecords()

const review = reactive({
    first_name: "",
    last_name: "",
    phone: "",
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
</script>