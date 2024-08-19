<template>
    <div class="relative cursor-pointer flex justify-center items-center">
        <client-only>
            <site-select @changed="setLocale" v-model="locale" :items="languages" name="title" value="lang" />
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { languages } from '@/constants'

const { locale, setLocale } = useI18n()

// setLocale('ru')
// const navigate = (lang: string) => {
//     const path = route.path.replace('/en', '').replace('/ru', '').replace('/uz', '');
//     router.push(`/${lang}${path}`)
// }
// route.path.replace('/en').replace('/ru').replace('/uz'));

</script>