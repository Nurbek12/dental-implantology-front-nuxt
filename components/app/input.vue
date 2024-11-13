<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <client-only>
                <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
                <label :for="id" class="text-gray-500 text-sm font-medium">{{ props.label }}</label>
            </client-only>
        </div>
        <div class="border rounded overflow-hidden">
            <input aria-label="input" :id="id" @input="emits('inputed', $event)" @change="emits('changed', $event)" class="w-full outline-none h-full px-4 py-2.5 text-sm" :required="!!props.required" :readonly="!!props.readonly" :type="props.type||'text'" :placeholder="props.placeholder||''" v-model="model" :min="props?.min===undefined?-99999999999:props?.min">
        </div>
    </div>
</template>

<script setup lang="ts">
const id = useId()
const emits = defineEmits(['inputed', 'changed'])
const model = defineModel()
const props = defineProps<{
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
    readonly?: boolean,
    min?: number
}>()
</script>