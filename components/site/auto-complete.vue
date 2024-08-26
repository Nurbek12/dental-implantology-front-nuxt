<template>
    <div class="relative">
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="randomid" class="text-sm text-gray-500 font-medium">{{ props.label }}</label>
        </div>
        <div class="border rounded overflow-hidden">
            <input :id="randomid" @input="emits('inputed', $event);isOpen=true" class="w-full outline-none h-full px-4 py-2" :required="!!props.required" :type="props.type||'text'" :placeholder="props.placeholder||''" v-model="str">
        </div>
        <div class="absolute w-full border shadow-md max-h-[200px] overflow-auto" v-show="isOpen">
            <div v-show="items.length===0" class="flex items-center justify-center gap-1 w-full bg-white py-2">
                <span v-show="!loading" class="text-xs">Пусто</span>
                <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
                <span v-show="loading" class="mb-0.5 text-xs">Загрузка...</span>
            </div>

            <div class="w-full">
                <div v-for="item,i in items" :key="item" class="cursor-pointer px-4 py-2 bg-white hover:bg-gray-50 active:bg-gray-100 border-b">
                    <slot name="item" :item="item" :index="i" @selected="(e1, e2, e3) => {str=e1;model=e2;isOpen=false;emits('updated', e3)}" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid'
import { McLoading2Line } from '@kalimahapps/vue-icons'

const str = ref('')
const isOpen = ref(false)
const randomid = v4()
const emits = defineEmits(['inputed','updated'])
const model = defineModel<string|number|null>()
const props = defineProps<{
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
    itemName?: string
    itemValue?: string
    items: any[],
    loading: boolean,
}>()

const { loading, items } = toRefs(props)
</script>