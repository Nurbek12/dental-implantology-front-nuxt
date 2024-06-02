<template>
    <div class="w-full p-2">
        <app-data-table :count="count" :items="items" :headers="headers" :loading="loading" @fetching="getItems">
            <template #table-top>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <button @click="dialog = true"
                    class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white rounded text-xs px-3 py-2">Добавить</button>
            </template>
            <template #table-item-image="{ tableItem }">
                <div class="w-[40px] h-[40px] rounded overflow-hidden">
                    <img :src="tableItem.image || '/images/nophoto.jpg'" class="w-full h-full object-cover">
                </div>
            </template>
            <template #table-item-created_at="{ tableItem }">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{ tableItem, index }">
                <div class="flex gap-1">
                    <!-- <button @click="update(index, { id: tableItem.id, publish: !tableItem.publish })" class="text-white text-xs px-3 py-2 rounded" :class="tableItem.publish?'bg-green-500 hover:bg-green-400':'bg-red-500 hover:bg-red-400'">
                        <GlEye v-show="tableItem.publish" class="w-4 h-4" />
                        <ChEyeSlash v-show="!tableItem.publish" class="w-4 h-4" />
                    </button> -->
                    <button @click="editItem(tableItem, index)"
                        class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
                    <button @click="deleteItem(tableItem.id!, index)"
                        class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                </div>
            </template>
        </app-data-table>
    </div>

    <app-dialog rounded :title="itemIndex == null ? 'Добавить специализация' : 'Изменить специализацию'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-start w-full">
                <label for="file-input" class="cursor-pointer w-full">
                    <div class="w-full h-[200px] border-2 hover:bg-[#23408e20] border-[#23408e] p-1 overflow-hidden rounded">
                        <img :src="currentImage" class="w-full rounded h-full object-contain" alt="">
                    </div>
                </label>
            </div>
            <site-input required v-model="editedItem.name_uz" placeholder="Загаловок (UZ)" />
            <site-input required v-model="editedItem.name_ru" placeholder="Загаловок (RU)" />
            <site-input required v-model="editedItem.name" placeholder="Загаловок (EN)" />
            
            <div class="w-full" hidden>
                <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
            </div>
            <button :disabled="createLoading" type="submit"
                class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] rounded text-white text-sm px-3 py-2">
                {{ createLoading ? 'Загружается' : 'Сохранить' }}
            </button>
        </form>
    </app-dialog>
</template>
  
<script setup lang="ts">
import type { Specialty } from '@/types'
// import { ChEyeSlash, GlEye } from '@kalimahapps/vue-icons'

definePageMeta({
    layout: 'admin-layout',
    // middleware: ['auth'],
})

const { createSpecalisation, deleteSpecalisation, getSpecalisations, updateSpecalisation } = useSpecalisations()

const dialog = ref(false)
const loading = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<Specialty[]>([])
const itemIndex = ref<number | null>(null)
const createLoading = ref<boolean>(false)
const editedItem = reactive<Specialty>({
    name_ru: "",
    name_uz: "",
    name: "",
})

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Фото", value: "image", sortable: true, balancedText: false, custom: true },
    { name: "Загаловок", value: "name_ru", sortable: true, balancedText: false, custom: false },
    { name: "Докторы", value: "start_date", sortable: false, balancedText: false, custom: false },
    { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const currentImage = computed(() => {
    if (file.value) return URL.createObjectURL(file.value)
    else if (itemIndex.value !== null) return items.value[itemIndex.value]?.thumb || '/images/nophoto.jpg'
    else return '/images/nophoto.jpg'
})

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getSpecalisations(params)
        items.value = data.results
        count.value = data.count
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

const editItem = (item: Specialty, index: number) => {
    Object.assign(editedItem, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if (!confirm('Вы хотите удалить это?')) return
    await deleteSpecalisation(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createSpecalisation(body)
    items.value.push(data as any)
}

const update = async (id: number, index: number, body: any) => {
    const data = await updateSpecalisation(id, body)
    Object.assign(items.value[index], data)
}

const save = async () => {
    try {
        createLoading.value = true
    
        const formdata = new FormData()
        Object.keys(editedItem).map(key => {
            formdata.append(key, editedItem[key as keyof typeof editedItem] as string)
        })
        formdata.delete('id')
        if(file.value) formdata.append('image', file.value)

        if (itemIndex.value !== null) await update(editedItem.id!, itemIndex.value, formdata)
    
        else await create(formdata)
    
        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    Object.assign(editedItem, {
        name_ru: "",
        name_uz: "",
        name: ""
    })
    file.value = null
    dialog.value = false
    itemIndex.value = null
}
</script>