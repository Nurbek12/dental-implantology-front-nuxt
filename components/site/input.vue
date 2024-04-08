<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label">
            <component class="text-blue-500 w-5 h-5" :is="props.icon"></component>
            <span class="text-lg">{{ props.label }}</span>
        </div>
        <div class="border rounded overflow-hidden">
            <input class="w-full outline-none h-full px-4 py-2" :type="props.type||'text'" :placeholder="props.placeholder||''" v-model="model">
        </div>
    </div>
</template>

<script setup lang="ts">
const model = defineModel()
const props = defineProps<{
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
}>()
</script>