<template>
    <button :type="type||'button'" @click="$emit('click')" :disabled="!!disabled" :class="[classes[size||'large'], props.class||'']" class="inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded border border-transparent text-white
        bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-300 disabled:opacity-50 disabled:pointer-events-none">
        <slot />
    </button>
    <span hidden class="py-1 p-1"></span>
    <span hidden class="py-2 px-2"></span>
    <span hidden class="py-3 px-5"></span>
</template>

<script setup lang="ts">
const classes = {
    "small": "py-2 px-3 text-xs",
    "medium": "py-2 px-4",
    "large": "py-3 px-5",
    "square": "p-1"
}

defineEmits(['click'])
const props = defineProps<{
    type?: "button" | "reset" | "submit",
    disabled?: boolean,
    class?: string,
    size?: "small"|"medium"|"large"|"square",
}>()
</script>