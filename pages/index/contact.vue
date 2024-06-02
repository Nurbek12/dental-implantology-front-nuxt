<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-24 mx-auto">
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
                src="https://maps.google.com/maps?q=samarkhand&t=&z=12&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
            <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div class="lg:w-1/2 px-6">
                    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                    <p class="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                </div>
                <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                    <a class="text-indigo-500 leading-relaxed">example@email.com</a>
                    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                    <p class="leading-relaxed">123-456-7890</p>
                </div>
            </div>
            </div>
            <form @submit.prevent="handleRecord" class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                <p class="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
                <div class="flex flex-col md:flex-row gap-2">
                    <div class="relative mb-4">
                        <label for="fname" class="leading-7 text-sm text-gray-600">First Name</label>
                        <input required v-model="review.first_name" type="text" id="fname" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                    <div class="relative mb-4">
                        <label for="lname" class="leading-7 text-sm text-gray-600">Last Name</label>
                        <input required v-model="review.last_name" type="text" id="lname" name="lname" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                </div>
                <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                    <input required v-model="review.phone" type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <div class="relative mb-4">
                    <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                    <textarea required v-model="review.comment" id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <site-button type="submit" class="w-full">Send Message</site-button>
                <p class="text-xs text-gray-500 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quidem assumenda optio doloremque.</p>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'home-layout'
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