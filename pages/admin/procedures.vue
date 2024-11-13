<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"

            @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
            </template>
            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
            <template #table-item-service="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.service?.title }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    <app-dialog rounded :title="itemIndex==null?'Добавление услуга':'Редактирование услуга'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

            <app-input required v-model="$item.title_en" label="Название (EN)" placeholder="Название (EN)" />
            <app-input required v-model="$item.title_ru" label="Название (RU)" placeholder="Название (RU)" />
            <app-input required v-model="$item.title_uz" label="Название (UZ)" placeholder="Название (UZ)" />
            <app-input required v-model="$item.code" label="Код процедуры" placeholder="Код процедуры" />
            <app-input required v-model="$item.price"  label="Цена" placeholder="Цена" type="nubmer" />
            <app-input required v-model="$item.kpi"  label="KPI процент" placeholder="KPI процент" type="nubmer" />
            <app-select required v-model="$item.serviceId" :items="services" name="title" value="id" label="Сервис" placeholder="Сервис" :nullvalue="null" />
            
        
            <app-textarea required v-model="$item.description_en" label="Описание (EN)" placeholder="Описание (EN)" />
            <app-textarea required v-model="$item.description_ru" label="Описание (RU)" placeholder="Описание (RU)" />
            <app-textarea required v-model="$item.description_uz" label="Описание (UZ)" placeholder="Описание (UZ)" />

            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Procedure, Service } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { getServices } = useServices()
const { createProcedure, deleteProcedure, getProcedures, updateProcedure } = useProcedures()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<Procedure[]>([])
const services = ref<Service[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const $item = reactive<Partial<Procedure>>({
    kpi: 0,
    price: 0,
    code: "",
    title_en: "",
    title_ru: "",
    title_uz: "",
    description_en: "",
    description_ru: "",
    description_uz: "",
    serviceId: null as any,
})

const headers = [
    { name: "No", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Название", value: "title_ru", sortable: true, balancedText: true, custom: false },
    { name: "KPI процент", value: "kpi", sortable: false, balancedText: false, custom: false },
    { name: "Цена", value: "price", sortable: true, balancedText: false, custom: false },
    { name: "Категория", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getProcedures(params)
        count.value = data.meta.total
        items.value = data.data as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: Procedure, index: number) => {
    Object.assign($item, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteProcedure(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createProcedure(body)
    items.value.push(data as any)
}

const update = async (index: number, {id, ...body}: any) => {
    const data = await updateProcedure(id, body)
    Object.assign(items.value[index], data)
}

const save = async () => {
    try {
        createLoading.value = true
    
        if(itemIndex.value !== null) await update(itemIndex.value, $item)
        else await create($item)

        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const init = async () => {
    const data = await getServices({})
    services.value = data as any
}

const close = () => {
    delete $item.id
    Object.assign($item, {
        kpi: 0,
        price: 0,
        code: "",
        title_en: "",
        title_ru: "",
        title_uz: "",
        description_en: "",
        description_ru: "",
        description_uz: "",
        serviceId: null as any,
    })
    dialog.value = false
    itemIndex.value = null
}

init()
</script>