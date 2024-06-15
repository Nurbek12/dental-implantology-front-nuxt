<template>
    <div class="relative cursor-pointer flex justify-center items-center">
        <!-- <site-btn @click="isOpen=!isOpen" size="small">{{ languages.find(l => l.lang === locale)?.title }}</site-btn>
        <div class="rounded absolute top-[100%] bg-white w-[100px] shadow-lg shadow-black/5 p-1" v-if="isOpen">
            <button class="rounded text-center w-full text-sm py-1 hover:bg-gray-50"
                :class="{'bg-gray-100':locale===l.lang}"
                v-for="l,i in languages"
                :key="i"
                @click="locale=l.lang;isOpen=false">{{ l.title }}</button>
        </div> -->
        <site-select v-model="locale" :items="languages" name="title" value="lang" />
    </div>
</template>

<script setup lang="ts">
import { languages } from '@/constants'

const { locale } = useI18n()
</script>