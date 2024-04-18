<template>
    <div class="rounded p-4 transition-all group border hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg cursor-pointer hover:text-white">
        <div class="flex justify-between items-center">
            <h1>Debian Kali Linux</h1>
            <span class="text-sm text-gray-500 group-hover:text-gray-100">20 Aug 2022</span>
        </div>
        <div class="flex gap-1 my-2">
            <AnFilledStar class="text-yellow-400 cursor-pointer w-4 h-4" v-for="i in 4" :key="i" />
            <AnOutlinedStar class="text-yellow-400 cursor-pointer w-4 h-4" v-for="i in (5-4)" :key="i" />
        </div>
        <p class="text-sm">Далеко-далеко за, словесными горами в стране гласных и согласных живут рыбные тексты. Последний, запятых по всей пояс, жизни возвращайся несколько использовало запятой пор, имени имеет безопасную текстами щеке выйти. Образ они рыбного сбить запятой заголовок на берегу деревни заманивший знаках коварных свой, коварный если подзаголовок буквенных вершину? Взгляд вопроса лучше прямо толку они океана.</p>
    </div>
</template>

<script setup lang="ts">
import { AnFilledStar, AnOutlinedStar } from '@kalimahapps/vue-icons'
</script>