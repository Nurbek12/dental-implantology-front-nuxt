<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-blue-500 w-5 h-5" :is="props.icon"></component>
            <span class="text-sm text-gray-500">{{ props.label }}</span>
        </div>
        <div class="border rounded overflow-hidden">
            <textarea @input="emits('inputed', $event)" class="w-full outline-none h-full px-4 py-2 resize-none" :required="!!props.required" :rows="props.rows||4" :placeholder="props.placeholder||''" v-model="model"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['inputed'])
const model = defineModel<any>()
const props = defineProps<{
    icon?: any
    rows?: number
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
}>()
</script>