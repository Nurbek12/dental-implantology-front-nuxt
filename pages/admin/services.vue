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
                <button @click="dialog=true" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white rounded text-xs px-3 py-2">Добавить</button>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded overflow-hidden">
                    <img :src="tableItem.image||'/images/nophoto.jpg'" class="w-full h-full object-cover" alt="">
                </div>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index,openTr,isOpened}">
                <div class="flex gap-1">
                    <button @click="editItem(tableItem, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
                    <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                </div>
            </template>
        </app-data-table>
    </div>
    <app-dialog rounded :title="itemIndex==null?'Добавить услугу':'Изменить услугу'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-start w-full">
                <label for="file-input" class="cursor-pointer w-full">
                    <div class="w-full h-[200px] border-2 hover:bg-[#23408e20] border-[#23408e] p-1 overflow-hidden rounded">
                        <img :src="currentImage" class="w-full rounded h-full object-contain" alt="">
                    </div>
                </label>
            </div>
            <site-input required v-model="service.name_ru" placeholder="Название (RU)" />
            <site-input required v-model="service.name_uz" placeholder="Название (UZ)" />
            <site-input required v-model="service.name_en" placeholder="Название (EN)" />
            <site-input required v-model="service.price_start" placeholder="Цена" type="nubmer" />
            <site-input required v-model="service.price_end" placeholder="Цена" type="nubmer" />
        
            <site-textarea required v-model="service.description_ru" placeholder="Описание (RU)" />
            <site-textarea required v-model="service.description_uz" placeholder="Описание (UZ)" />
            <site-textarea required v-model="service.description_en" placeholder="Описание (EN)" />
            
            <!-- <site-select -->
            <div class="w-full border overflow-hidden rounded">
                <select required v-model="service.category" class="text-sm px-3 py-2 w-full outline-none resize-none">
                    <option :value="undefined" disabled>Категория</option>
                    <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.name_ru }}</option>
                </select>
            </div>
            <!-- <div style="all: unset;">
                <editor v-model="service.content" />
            </div> -->
            <div class="w-full" hidden>
                <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
            </div>
            <button :disabled="createLoading" type="submit" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-sm px-3 py-2">
                {{ createLoading?'Загружается':'Сохранить' }}
            </button>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { IService, Service, Service_Category } from '@/types'

definePageMeta({
  layout: 'admin-layout',
//   middleware: ['auth'],
})

const { getCategories } = useServiceCategories()
const { createService, deleteService, getServices, updateService } = useServices()

const dialog = ref(false)
const loading = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<IService[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const categories = ref<Service_Category[]>([])
const service = reactive<IService>({
    content: "text",
    description_en: "",
    description_ru: "",
    description_uz: "",
    is_published: false,
    name_en: "",
    name_ru: "",
    name_uz: "",
    price_end: 0,
    price_start: 0,
    slug: "",
})

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Иконок", value: "image", sortable: true, balancedText: false, custom: true },
    { name: "Название", value: "name_ru", sortable: true, balancedText: false, custom: false },
    { name: "Цена", value: "price", sortable: true, balancedText: false, custom: false },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
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

const uploadImage = async (file: any) => {
    // const body = new FormData()
    // body.append('file', file)
    // return $fetch<{url: string, thumbnailUrl: string}>('/api/media/upload', {
    //     method: 'post', body
    // })
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
        if(file.value) form_data.append('image', file.value)
    
        if(itemIndex.value !== null) update(itemIndex.value, form_data, service.id)
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
        content: "text",
        description: "",
        description_ru: "",
        description_uz: "",
        is_published: false,
        name: "",
        name_ru: "",
        name_uz: "",
        price: 0,
        slug: "",
    })
    file.value = null
    dialog.value = false
    itemIndex.value = null
}

const init = async () => {
    const data = await getCategories({ params: { page: 1, limit: 1000 } })
    categories.value = data.results
}

init()
</script>