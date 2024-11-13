<template>
    <div v-show="!props.hideTop" class="p-2 rounded border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-white">
        <app-input v-show="!props.hideSearch" @inputed="search_items" placeholder="Поиск" />
        <slot name="table-top" :handleFetch="handleFetching" />
    </div>
    <slot name="table-top-extra" :handleFetch="handleFetching" />

    <div class="border w-full rounded mt-2 overflow-hidden">
        <div class="relative overflow-x-auto">
            <table class="w-full text-[13px] text-left rtl:text-right text-gray-500">
                <thead class="text-gray-700 bg-gray-50">
                    <tr>
                        <template v-for="header in props.headers" :key="header.value">
                            <th v-if="header.sortable" scope="col" class="px-6 py-3 font-medium">
                                <div class="select-none flex gap-1 items-center cursor-pointer" @click="set_sorting(header.value)">
                                    {{ header.name }}
                                    <div>
                                        <CaArrowDown v-show="sorting[header.value] !== undefined" class="w-4 h-4" :class="{'rotate-180': sorting[header.value] === 'desc'}"/>
                                    </div>
                                </div>
                            </th>
                            <th v-else scope="col" class="px-6 py-3 font-medium">
                                {{ header.name }}
                            </th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="items.length===0||loading" class="bg-white" :class="{'border-b':loading&&items.length>0}">
                        <td scope="row" :colspan="props.headers.length" class="py-2 text-center text-base">
                            <div class="flex items-center justify-center gap-1">
                                <span v-show="!loading">Пусто</span>
                                <McLoading2Line class="w-6 h-6 animate-spin" v-show="loading" />
                                <span v-show="loading" class="mb-0.5">Загрузка...</span>
                            </div>
                        </td>
                    </tr>
                    <template v-for="item,i in items" :key="i">
                        <tr @click="emits('row-click', i, item)" class="bg-white hover:bg-gray-50 border-b" :class="{'cursor-pointer active:bg-gray-200':props.cursoredRow}">
                            <template v-for="h in props.headers" :key="h.value">
                                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                    <slot v-if="h.custom" :name="`table-item-${h.value}`" :table-item="item"  :table-value="h.value" :index="i" :open-tr="() => openRow(item.id)" :is-opened="item.id == expandRow" />
                                    <div v-else class="text-xs" :class="{'text-balance line-clamp-3':h.balancedText}">{{ ![null,undefined].includes(item[h.value])?item[h.value]:'Нет' }}</div>
                                </th>
                            </template>
                        </tr>
                        <tr v-if="props.expanded" v-show="expandRow===item.id">
                            <td scope="row" :colspan="props.headers.length" class="px-3 py-2 bg-white">
                                <slot name="table-expand" :table-item="item" :index="i" />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <div v-show="!hideBottom" class="py-2 flex items-center justify-between">
        <div class="border rounded overflow-hidden w-full max-w-[100px]">
            <select v-model="perPage" @change="handleFetching()" class="bg-white px-3 py-2 w-full text-sm outline-none" placeholder="Поиск">
                <option :value="20" selected>20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>
        </div>
        <div class="border rounded flex items-center justify-between gap-4 bg-white p-2">
            <span class="text-sm">{{ perPage*(page-1)+1 }}-{{ perPage*(page-1)+items.length }} / {{ count }}</span>
            <div class="flex items-center gap-2">
                <app-btn size="small" :disabled="page===1" @click="page--,handleFetching()">
                    <AkChevronLeft />
                </app-btn>

                <app-btn  v-if="totalPages===undefined" size="small" :disabled="page >= Math.ceil(count / perPage)" @click="page++,handleFetching()">
                    <AkChevronRight />
                </app-btn>

                <app-btn  v-else size="small" :disabled="page >= totalPages" @click="page++,handleFetching()">
                    <AkChevronRight />
                </app-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import { ref, reactive, computed, toRefs, defineProps, defineEmits } from 'vue'
import { CaArrowDown, AkChevronRight, AkChevronLeft, McLoading2Line } from '@kalimahapps/vue-icons'

interface TableHeaders {
    name: string
    value: string
    sortable?: boolean,
    balancedText?: boolean,
    custom?: boolean,
}

interface Props {
    headers: TableHeaders[],
    items: any[],
    count: number,
    expanded?: boolean,
    loading?: boolean,
    hideSearch?: boolean,
    hideTop?: boolean,
    customFilters?: any[],
    hideBottom?: boolean,
    cursoredRow?: boolean,
    totalPages?: number
}

const { debounce } = lodash

const emits = defineEmits(['fetching','searched','row-click'])
const props = defineProps<Props>()
const { count, items, loading, totalPages } = toRefs(props)

const page = ref(1)
const perPage = ref(20)
const search = ref('')
const ordering = ref('')
const sorting: any = reactive({})
const filtering: any = reactive({})
const expandRow = ref<number|null>(null)

const sortToOrder = (sortObj: any) => {
    const result: { ordering?: string } = {};
    if (sortObj && Object.keys(sortObj).length > 0) {
        for (const [key, value] of Object.entries(sortObj)) {
            if (value === 'asc') {
                result.ordering = key;
            } else if (value === 'desc') {
                result.ordering = `-${key}`;
            }
        }
    }
    return result;
}

const queryfilter = computed(() => {
    const qry: any = {}

    if(page.value) qry.page = page.value
    if(perPage.value) qry.perPage = perPage.value
    if(search.value?.trim()) qry.search = search.value

    props.customFilters?.map(cf => {
        if(filtering[cf.name]) qry[cf.name] = filtering[cf.name]
    })

    return { ...qry, ...sortToOrder(sorting) }
})

const set_sorting = debounce((key: string) => {
    if (sorting[key] === 'asc') sorting[key] = 'desc'
    else if (sorting[key] === 'desc') delete sorting[key]
    else if(Object.keys(sorting).length == 1) {
        Object.keys(sorting).map(d => delete sorting[d])
        set_sorting(key)
    }
    else sorting[key] = 'asc'

    handleFetching()
}, 500)

const search_items = debounce((e: any) => {
    emits('searched', e.target.value)
    search.value = e.target.value
    page.value = 1
    handleFetching()
}, 500)

const handleFetching = (cq?: any) => emits('fetching', cq?{...queryfilter.value,...cq}:queryfilter.value)

const openRow = (i: number) => {
    if(expandRow.value == i) expandRow.value = null 
    else expandRow.value = i
}

handleFetching()
</script>