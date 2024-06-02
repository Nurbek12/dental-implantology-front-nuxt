<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-blue-500 w-4 h-4" :is="props.icon"></component>
            <label :for="randomid" class="text-xs text-gray-500 font-medium">{{ props.label }}</label>
        </div>
        <div class="border rounded overflow-hidden">
            <select :id="randomid" :disabled="!!props.disabled" :required="required" v-model="model" @change="emits('changed', $event)" class="text-sm py-2 px-3 w-full outline-none">
                <option :value="nullvalue" disabled selected v-if="props.placeholder">{{ props.placeholder }}</option>
                <option v-for="item,i in items" :key="i" :value="item[value||'value']">{{ item[name||'name'] }}</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid'
import { toRefs, defineProps, defineEmits, defineModel } from 'vue'

interface Props {
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean,

    items: any[],
    name?: string,
    value?: string,
    nullvalue?: '' | undefined | null,
}

const randomid = v4()
const model = defineModel()
const emits = defineEmits(['changed'])
const props = defineProps<Props>()
const { items } = toRefs(props)
</script>