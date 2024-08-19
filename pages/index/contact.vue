<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 pb-12 mx-auto">
            <div class="flex flex-col text-center w-full mt-20">
                <div class="mb-4">
                    <span class="w-min rounded border border-primary-200 text-primary-500 px-3 py-1.5 text-sm">{{ $t('contacts.subtitle') }}</span>
                </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{ $t('contacts.title') }}</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{{ $t('contacts.description') }}</p>
            </div>
        </div>
    </section>

    <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div class="w-full lg:w-2/3 md:w-1/2 min-h-[400px] bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                <iframe width="100%" height="100%" id="gmap_canvas" class="absolute inset-0"
                    src="https://maps.google.com/maps?q=39.653814,66.970141&t=&z=18&ie=UTF8&iwloc=&output=embed"
                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                </iframe>
                <div class="bg-white relative hidden md:flex flex-wrap py-6 rounded shadow-md">
                    <div class="lg:w-1/2 px-6">
                        <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">{{ $t('form.address') }}</h2>
                        <p class="mt-1">{{ $t('footer.address') }}</p>
                    </div>
                    <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                        <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">{{ $t('form.email') }}</h2>
                            <a class="text-indigo-500 leading-relaxed">dental@email.com</a>
                        <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">{{ $t('form.phone') }}</h2>
                            <p class="leading-relaxed">+998 91 523 33 44</p>
                    </div>
                </div>
            </div>
            <form @submit.prevent="handleRecord" class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">{{ $t('contacts.form-title') }}</h2>
                <p class="leading-relaxed mb-5 text-gray-600">{{ $t('contacts.form-description') }}</p>
                <div class="space-y-4">
                    <div class="flex flex-col md:flex-row gap-2">
                        <site-input required v-model="review.first_name" :placeholder="$t('form.first-name')" :label="$t('form.first-name')" />
                        <site-input required v-model="review.last_name" :placeholder="$t('form.last-name')" :label="$t('form.last-name')" />
                    </div>
                    <site-input required v-model="review.phone" placeholder="example@mail.com" :label="$t('form.email')" />
                    <site-textarea required v-model="review.comment" :placeholder="$t('form.message-of-review')" :label="$t('form.message')" />
                    <site-btn type="submit" class="w-full">{{ $t('form.send') }}</site-btn>
                </div>
                <p class="text-xs text-gray-500 mt-3">{{ $t('contacts.form-description-1') }}</p>
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

useSeoMeta({
  title: 'Контакты - Стоматология "Dental Implantology"',
  ogTitle: 'Контакты - Стоматология "Dental Implantology"',
  description: 'Свяжитесь с нами для записи на прием или получения консультации. Адрес, телефон, email и форма обратной связи.',
  ogDescription: 'Свяжитесь с нами для записи на прием или получения консультации. Адрес, телефон, email и форма обратной связи.',
//   ogImage: '/',
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