<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"
            
            @fetching="getItems">
            <template #table-top>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <button @click="dialog=true" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white rounded text-xs px-3 py-2">Добавить</button>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img :src="tableItem.thumb||'/images/nophoto.jpg'" alt="">
                </div>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <button @click="update(index, { id: tableItem.id, publish: !tableItem.publish })" class="text-white text-xs px-3 py-2 rounded" :class="tableItem.publish?'bg-green-500 hover:bg-green-400':'bg-red-500 hover:bg-red-400'">
                        <GlEye v-show="tableItem.publish" class="w-4 h-4" />
                        <ChEyeSlash v-show="!tableItem.publish" class="w-4 h-4" />
                    </button>
                    <button @click="editItem(tableItem, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
                    <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавить доктор':'Изменить доктор'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-start">
                <label for="file-input" class="cursor-pointer">
                    <div class="w-[120px] h-[120px] border-2 hover:bg-[#23408e20] border-[#23408e] p-1 overflow-hidden rounded-full">
                        <img :src="currentImage" class="w-full rounded-full h-full object-cover" alt="">
                    </div>
                </label>
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input required v-model="doctor.name" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Имя и фамилия">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input required v-model="doctor.phone" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Телефон">
            </div>

            
            <div class="w-full border rounded overflow-hidden">
                <input @keypress.enter.prevent="doctor.certificates.push(($event as any).target.value),($event as any).target.value=''" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Сертификаты">
            </div>
            <div class="w-full border rounded overflow-hidden p-2" v-show="doctor.certificates.length>0">
                <p>Сертификаты:</p>
                <ul class="list-decimal pl-4">
                    <li class="text-sm" v-for="e,i in doctor.certificates">
                        <span>{{ e }}</span>
                        <button class="ml-2" type="button" @click="doctor.certificates.splice(i,1)">x</button>
                    </li>
                </ul>
            </div>

            <div class="w-full border rounded overflow-hidden">
                <input required v-model="doctor.experience" type="number" class="text-sm py-2 px-3 w-full outline-none" placeholder="Опыт года">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input @keypress.enter.prevent="doctor.experiences.push(($event as any).target.value),($event as any).target.value=''" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Опыт работы">
            </div>
            <div class="w-full border rounded overflow-hidden p-2" v-show="doctor.experiences.length>0">
                <p>Опыт работы:</p>
                <ul class="list-decimal pl-4">
                    <li class="text-sm" v-for="e,i in doctor.experiences">
                        <span>{{ e }}</span>
                        <button class="ml-2" type="button" @click="doctor.experiences.splice(i,1)">x</button>
                    </li>
                </ul>
            </div>

            <div class="w-full border rounded overflow-hidden">
                <input @keypress.enter.prevent="doctor.educations.push(($event as any).target.value),($event as any).target.value=''" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Образование">
            </div>
            <div class="w-full border rounded overflow-hidden p-2" v-show="doctor.educations.length>0">
                <p>Образование:</p>
                <ul class="list-decimal pl-4">
                    <li class="text-sm" v-for="e,i in doctor.educations">
                        <span>{{ e }}</span>
                        <button class="ml-2" type="button" @click="doctor.educations.splice(i,1)">x</button>
                    </li>
                </ul>
            </div>

            <div class="w-full border rounded overflow-hidden">
                <input v-model="doctor.tg" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Telegram">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input v-model="doctor.inst" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Instagram">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input v-model="doctor.fb" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Facebook">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input v-model="doctor.in" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Linkedin">
            </div>
            <div class="w-full h-full border rounded p-2">
                <p class="mb-2">Специалисты</p>
                <div v-for="s,i in speciality_list" :key="i" class="flex items-center gap-2">
                    <input v-model="doctor.speciality_id" type="checkbox" :value="s.id" :id="`spec_item_${i}`">
                    <label class="text-sm mb-0.5" :for="`spec_item_${i}`">{{ s.name_ru }}</label>
                </div>
            </div>
            <div class="w-full border rounded overflow-hidden flex items-center gap-2 px-2">
                <input v-model="doctor.laboratory" id="lab-checkbox" type="checkbox">
                <label for="lab-checkbox" class="cursor-pointer">Показать в лаборатории</label>
            </div>
            <div style="all: unset;">
                <editor v-model="doctor.content" />
            </div>
            <div class="w-full" hidden>
                <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
            </div>
            <button :disabled="createLoading" type="submit" class="dbg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] rounded text-white text-sm px-3 py-2">
                {{ createLoading?'Загружается':'Сохранить' }}
            </button>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Doctor, Specialty } from '@/types'
import { ChEyeSlash, GlEye } from '@kalimahapps/vue-icons'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const dialog = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<Doctor[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const speciality_list = ref<Specialty[]>([])
const doctor = reactive<Doctor>({
    name: "",
    educations: [],
    experiences: [],
    certificates: [],
    licences: [],
    experience: '',
    rating: 0,
    fb: "",
    in: "",
    tg: "",
    inst: "",
    phone: "",
    publish: false,
    laboratory: false,
    content: '',
    speciality_id: [],
})
                           
const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Фото", value: "image", sortable: true, balancedText: false, custom: true },
    { name: "Имя и фамилия", value: "name", sortable: true, balancedText: false, custom: false },
    { name: "Опыт", value: "experience", sortable: true, balancedText: false, custom: false },
    { name: "Образование", value: "education", sortable: true, balancedText: false, custom: false },
    // { name: "Специальность", value: "specialty", sortable: true, balancedText: false, custom: false },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
]

const currentImage = computed(() => {
    if(file.value) return URL.createObjectURL(file.value)
    else if(itemIndex.value!==null) return items.value[itemIndex.value]?.thumb || '/images/nophoto.jpg'
    else return '/images/nophoto.jpg'
})

const getItems = async (params: any) => {
    try {
        const data = await $fetch(`/api/doctors`, { params })
        items.value = data.result as any
        count.value = data.count
    } catch (error) {
        console.log(error)
    }
}

const onFileChange = (e: any) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return file.value = null
  return file.value = files[0]
}

const editItem = (item: Doctor, index: number) => {
    Object.assign(doctor, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await $fetch(`/api/doctors/delete/${id}`, {
        method: 'delete'
    })
    items.value.splice(index, 1)
}

const uploadImage = async (file: any) => {
    const body = new FormData()
    body.append('file', file)
    return $fetch<{url: string, thumbnailUrl: string}>('/api/media/upload', {
        method: 'post', body
    })
}

const create = async (body: any) => {
    const data = await $fetch('/api/doctors', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    items.value.push(data as any)
}

const update = async (index: number, body: any) => {
    delete body.speciality_id
    const data = await $fetch(`/api/doctors/update/${body.id}`, {
        method: 'put',
        body: JSON.stringify(body)
    })
    Object.assign(items.value[index], data)
}

const save = async () => {
    createLoading.value = true

    if(file.value) {
        const { url, thumbnailUrl } = await uploadImage(file.value)
        doctor.image = url
        doctor.thumb = thumbnailUrl
    }
    
    if(itemIndex.value !== null) update(itemIndex.value, doctor)
        
    else create(doctor)

    createLoading.value = false
    close()
}

const close = () => {
    delete doctor.id
    Object.assign(doctor, {
        name: "",
        education: "",
        experience: "",
        phone: "",
        image: "",
        thumb: "",
        fb: "",
        in: "",
        tg: "",
        inst: "",
        publish: false,
        laboratory: false,
        speciality_id: [],
    })
    file.value = null
    dialog.value = false
    itemIndex.value = null
}

const init = async () => {
    const data = await $fetch('/api/speciality', { params: {page: 1, limit: 1000} })
    speciality_list.value = data.result as any
}

init()
</script>