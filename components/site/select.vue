<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="randomid" class="text-sm text-gray-500 font-medium">{{ props.label }}</label>
        </div>
        <div class="rounded overflow-hidden" :class="props.class||''">
            <select aria-label="select" :id="randomid" :disabled="!!props.disabled" :required="required" v-model="model" @change="emits('changed', $event)" class="text-sm py-1.5 px-3 w-full outline-none cursor-pointer">
                <option :value="nullvalue" disabled selected v-if="props.placeholder">{{ props.placeholder }}</option>
                <option v-for="item,i in items" :key="i" :value="item[value||'value']">
                    <span v-if="item[name||'name']">{{ item[name||'name'] }}</span>
                    <slot v-else name="item" :item="item" />
                </option>
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
    class?: string,
    nullvalue?: '' | undefined | null,
}

const randomid = v4()
const model = defineModel()
const emits = defineEmits(['changed'])
const props = defineProps<Props>()
const { items } = toRefs(props)
</script>