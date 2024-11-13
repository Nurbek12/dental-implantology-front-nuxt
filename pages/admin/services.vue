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

            <app-input required v-model="service.title" label="Название" placeholder="Название" />
            
            <app-textarea required v-model="service.description" label="Описание" placeholder="Описание" />
        
            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Service } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { createService, deleteService, getServices, updateService } = useServices()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<Service[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const service = reactive<Partial<Service>>({
    title: "",
    isPublic: true,
    description: "",
})

const headers = [
    { name: "No", value: "id", sortable: false, balancedText: false, custom: true },
    { name: "Название", value: "title", sortable: false, balancedText: true, custom: false },
    { name: "Описание", value: "description", sortable: false, balancedText: true, custom: false },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getServices(params)
        count.value = data.length
        items.value = data as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: Service, index: number) => {
    Object.assign(service, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteService(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createService(body)
    items.value.push(data as any)
}

const update = async (index: number, { id, ...body }: any) => {
    const data = await updateService(id, body)
    Object.assign(items.value[index], data)
}

const save = async () => {
    try {
        createLoading.value = true
    
        if(itemIndex.value !== null) await update(itemIndex.value, service)
        else await create(service)

        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    delete service.id
    Object.assign(service, {
        title: "",
        isPublic: true,
        description: "",
    })
    dialog.value = false
    itemIndex.value = null
}
</script>