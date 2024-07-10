<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"

            @fetching="getItems">
            <template #table-top>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <site-btn @click="dialog=true" size="small">Добавить</site-btn>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded overflow-hidden">
                    <img :src="tableItem.image||'/images/nophoto.jpg'" class="w-full h-full object-cover" alt="">
                </div>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-category="{tableItem}">
                <span class="text-xs text-balance">{{ specs[tableItem.category as keyof typeof specs] || '-' }}</span>
            </template>
            <template #table-item-price="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.price_start }} - {{ tableItem.price_end }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <site-btn customColor class="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</site-btn>
                    <site-btn customColor class="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    <app-dialog rounded :title="itemIndex==null?'Добавление услуга':'Редактирование услуга'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-start w-full">
                <label for="file-input" class="cursor-pointer w-full">
                    <div class="w-full h-[200px] border-2 hover:bg-[#23408e20] border-primary-600 p-1 overflow-hidden rounded">
                        <img :src="currentImage" class="w-full rounded h-full object-contain" alt="">
                    </div>
                </label>
            </div>
            <site-input required v-model="service.name_en" label="Название (EN)" placeholder="Название (EN)" />
            <site-input required v-model="service.name_ru" label="Название (RU)" placeholder="Название (RU)" />
            <site-input required v-model="service.name_uz" label="Название (UZ)" placeholder="Название (UZ)" />
            <site-select required v-model="service.category" :items="Object.keys(specs).map(k => ({name: specs[k as keyof typeof specs], value: k}))" label="Категория" placeholder="Категория" :nullvalue="null" />
            <site-input required v-model="service.price_start"  label="Начальная цена" placeholder="Начальная цена" type="nubmer" />
            <site-input required v-model="service.price_end"  label="Конечная цена" placeholder="Конечная цена" type="nubmer" />
            <site-input required v-model="service.kpi_percent"  label="KPI процент" placeholder="KPI процент" type="nubmer" :min="0" :max="100" />
            
        
            <site-textarea required v-model="service.description_en" label="Описание (EN)" placeholder="Описание (EN)" />
            <site-textarea required v-model="service.description_ru" label="Описание (RU)" placeholder="Описание (RU)" />
            <site-textarea required v-model="service.description_uz" label="Описание (UZ)" placeholder="Описание (UZ)" />

            <div class="w-full" hidden>
                <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
            </div>

            <site-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</site-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { specs } from '@/constants'
import type { IService, Service } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { createService, deleteService, getServices, updateService } = useServices()

const dialog = ref(false)
const loading = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<IService[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const service = reactive<IService>({
    content: "",
    description_en: "",
    description_ru: "",
    description_uz: "",
    is_published: false,
    name_en: "",
    name_ru: "",
    name_uz: "",
    price_end: 0,
    price_start: 0,
    kpi_percent: 0,
    slug: "",
    category: null,
})

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Фото", value: "image", sortable: false, balancedText: false, custom: true },
    { name: "Название", value: "name_ru", sortable: true, balancedText: false, custom: false },
    { name: "KPI процент", value: "kpi_percent", sortable: false, balancedText: false, custom: false },
    { name: "Цена", value: "price", sortable: true, balancedText: false, custom: true },
    { name: "Категория", value: "category", sortable: false, balancedText: false, custom: true },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const currentImage = computed(() => {
    if(file.value) return URL.createObjectURL(file.value)
    else if(itemIndex.value!==null) return items.value[itemIndex.value]?.image || '/images/nophoto.jpg'
    else return '/images/nophoto.jpg'
})

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getServices(params)
        count.value = data.count
        items.value = data.results
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const onFileChange = (e: any) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return file.value = null
  return file.value = files[0]
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

const update = async (index: number, body: any, id: any) => {
    const data = await updateService(id, body)
    Object.assign(items.value[index], data)
}

const save = async () => {
    try {
        createLoading.value = true
    
        var form_data = new FormData()
    
        Object.keys(service).map((key: any) => {
            form_data.append(key, service[key as keyof typeof service] as string)
            
        })
        form_data.delete('image')
        if(file.value) form_data.append('image', file.value)
    
        if(itemIndex.value !== null) update(itemIndex.value, form_data, service.slug)
        else create(form_data)

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
        content: "",
        description_en: "",
        description_ru: "",
        description_uz: "",
        is_published: false,
        kpi_percent: 0,
        name_en: "",
        name_ru: "",
        name_uz: "",
        price_end: 0,
        price_start: 0,
        slug: "",
        category: null,
    })
    file.value = null
    dialog.value = false
    itemIndex.value = null
}
</script>