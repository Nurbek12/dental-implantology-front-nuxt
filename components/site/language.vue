<template>
    <div class="relative cursor-pointer flex justify-center items-center">
        <client-only>
            <site-select v-model="locale" :items="languages" name="title" value="lang" />
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { languages } from '@/constants'
import { useRouter, useRoute } from '#vue-router'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

// const navigate = (lang: string) => {
//     const path = route.path.replace('/en', '').replace('/ru', '').replace('/uz', '');
//     router.push(`/${lang}${path}`)
// }
// route.path.replace('/en').replace('/ru').replace('/uz'));

</script>