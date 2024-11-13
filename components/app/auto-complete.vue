<template>
    <div class="relative">
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="id" class="text-sm text-gray-500 font-medium">{{ props.label }}</label>
        </div>
        <div @mouseenter="opened=true" @mouseleave="opened=false">
            <div class="border rounded overflow-hidden">
                <input :id="id" @input="emits('inputed', $event);" class="w-full outline-none h-full px-4 py-2" :required="!!props.required" :type="props.type||'text'" :placeholder="props.placeholder||''" v-model="str">
            </div>

            <div class="absolute w-full border shadow-md max-h-[200px] overflow-auto" v-show="opened">
                <div v-show="items.length===0" class="flex items-center justify-center gap-1 w-full bg-white py-2">
                    <span v-show="!loading" class="text-xs">Пусто</span>
                    <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
                    <span v-show="loading" class="mb-0.5 text-xs">Загрузка...</span>
                </div>
    
                <div class="w-full">
                    <div v-for="item,i in items" :key="item" class="cursor-pointer px-4 py-2 bg-white hover:bg-gray-50 active:bg-gray-100 border-b"
                    :class="{'!bg-gray-100':model===item?.[props.itemValue!]}">
                        <slot name="item" :item="item" :index="i" @selected="(e1: any, e2: any, e3: any) => {str=e1;model=e2;opened=false;emits('updated', e3)}" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { McLoading2Line } from '@kalimahapps/vue-icons'

const id = useId()
const str = ref('')
const opened = ref(false)
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