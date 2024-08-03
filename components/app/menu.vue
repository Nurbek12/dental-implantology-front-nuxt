<template>
    <div class="relative group" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
        <slot name="default" />
        <div class="absolute flex h-[12px] w-full"></div>
        <div v-show="isOpen" class="translate-y-[12px] min-w-[250px] w-min absolute rounded-xl overflow-hidden shadow-xl bg-white border border-[#385399]">
            <slot name="items" />
        </div>
    </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>