<template>
    <div>
        <div class="flex items-center gap-2 mb-2" v-show="!!props.label || props.icon">
            <component class="text-primary-500 w-4 h-4" :is="props.icon"></component>
            <label :for="id" class="text-sm text-gray-500 font-medium">{{ props.label }}</label>
        </div>
        <div @mouseenter="opened=true" @mouseleave="opened=false" class="rounded border relative bg-white" :class="props.class||''">

            <div class="relative z-0 h-full overflow-x-auto px-2 py-1 scrollbar-none">
                <div class="flex items-center flex-wrap gap-2 h-full">

                    <div v-for="item,i in model" :key="i" class="bg-gray-200 flex justify-between items-center gap-2 w-fit rounded px-2 py-1  pointer-events-auto">
                        <slot v-if="$slots['chip-item']" name="chip-item" :item="item" />
                        <div>
                            <ClCloseSm class="cursor-pointer" @click="removeItem(i)" />
                        </div>
                    </div>

                    <input v-model="search" :placeholder="placeholder" class="text-sm py-1 px-2 w-full outline-none bg-white flex-1 min-w-[200px]" type="text">
                </div>
            </div>

            <transition name="menu-fade"> 
                <div v-if="opened" class="absolute top-[100%] z-10 w-full maw-h-[400px] bg-white px-4 py-2 border overflow-auto">
                    <div v-for="c,i in searchedItems" :key="i" class="flex gap-2 items-center relative">
                        <input type="checkbox" :id="`c_${c[title||'title']}`" :value="c[value||'value']" v-model="model">
                        <label :for="`c_${c[title||'title']}`" class="cursor-pointer select-none">{{ c[title||'title'] }}</label>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ClCloseSm } from '@kalimahapps/vue-icons'
import { toRefs, defineProps, defineEmits, defineModel } from 'vue'

interface Props {
    icon?: any
    type?: string
    label?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean,

    title?: string
    items: any[],
    name?: string,
    value?: string,
    class?: string,
    nullvalue?: '' | undefined | null,
}

const id = useId()
const search = ref('')
const opened = ref(false)
const emits = defineEmits(['changed'])
const model = defineModel<any[], any>({ type: Array, default: [] })
const props = defineProps<Props>()
const { items, title, value } = toRefs(props)

const searchedItems = computed(() => {
    if(!search.value.trim()) return items.value
    return items.value.filter(item => String(item?.[title.value||'title'])
        .toLocaleLowerCase()
        .includes(search.value.toLocaleLowerCase()))
})

const removeItem = (index: number) => {
    model.value = model.value.filter((_, i) => i !== index)
}
</script>

<style>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>