<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="randomid" class="text-xs text-gray-500 font-medium">{{ props.label }}</label>
        </div>
        <div class="border rounded overflow-hidden">
            <input :id="randomid" @input="emits('inputed', $event)" @change="emits('changed', $event)" class="w-full outline-none h-full px-4 py-2" :required="!!props.required" :readonly="!!props.readonly" :type="props.type||'text'" :placeholder="props.placeholder||''" v-model="model">
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid'

const randomid = v4()
const emits = defineEmits(['inputed', 'changed'])
const model = defineModel()
const props = defineProps<{
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
    readonly?: boolean
}>()
</script>