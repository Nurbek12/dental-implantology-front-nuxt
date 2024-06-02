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
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img :src="tableItem.avatar||'/images/nophoto.jpg'" alt="" class="w-full h-full object-cover">
                </div>
            </template>
            <template #table-item-name="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.first_name }} {{ tableItem.middle_name }} {{ tableItem.last_name }}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
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
           
            <site-input required v-model="doctor.first_name" placeholder="First Name" />
            <site-input required v-model="doctor.middle_name" placeholder="Middle Name" />
            <site-input required v-model="doctor.last_name" placeholder="Last Name" />
            
            <site-input required v-model="doctor.phone" placeholder="Phone" />
            <site-input required v-model="doctor.birth_date" placeholder="Birth Date" type="date" />

            <site-textarea required v-model="doctor.educations" placeholder="Education" />
            <site-textarea required v-model="doctor.experiences" placeholder="Expreince" />
            <site-textarea required v-model="doctor.licences" placeholder="Licence" />
            <site-textarea required v-model="doctor.certificates" placeholder="Certificates" />

            <!-- <div class="w-full border overflow-hidden rounded">
                <select required v-model="doctor.experience" class="text-sm px-3 py-2 w-full outline-none resize-none">
                    <option :value="undefined" disabled>Специальность</option>
                    <option v-for="c in speciality_list" :value="c.id" :key="c.id">{{ c.name_ru }}</option>
                </select>
            </div> -->

            <div class="w-full" hidden>
                <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" v-model="doctor.is_active" id="is_active">
                <label for="is_active">Активность</label>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" v-model="doctor.is_published" id="is_active">
                <label for="is_active">Публичность</label>
            </div>
            <button :disabled="createLoading" type="submit" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] rounded text-white text-sm px-3 py-2">
                {{ createLoading?'Загружается':'Сохранить' }}
            </button>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { IDoctor, Specialty } from '@/types'

definePageMeta({
  layout: 'admin-layout',
//   middleware: ['auth'],
})

const { createDoctor, deleteDoctor, getDoctors, updateDoctor } = useDoctors()
const dialog = ref(false)
const loading = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<IDoctor[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const speciality_list = ref<Specialty[]>([])
const doctor = reactive<IDoctor>({
    avatar: "",
    birth_date: "",
    certificates: "",
    content: "<b>bold text</b>",
    educations: "",
    experience: 0,
    experiences: "",
    first_name: "",
    rating: 0,
    is_active: false,
    is_published: false,
    last_name: "",
    licences: "",
    middle_name: "",
    phone: "",
    user_type: "DOCTOR",
})
                           
const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Фото", value: "image", sortable: true, balancedText: false, custom: true },
    { name: "Имя и фамилия", value: "name", sortable: true, balancedText: false, custom: true },
    { name: "Опыт", value: "experiences", sortable: true, balancedText: false, custom: false },
    { name: "Образование", value: "educations", sortable: true, balancedText: false, custom: false },
    // { name: "Специальность", value: "specialty", sortable: true, balancedText: false, custom: false },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
]

const currentImage = computed(() => {
    if(file.value) return URL.createObjectURL(file.value)
    else if(itemIndex.value!==null) return items.value[itemIndex.value]?.avatar || '/images/nophoto.jpg'
    else return '/images/nophoto.jpg'
})

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getDoctors(params)
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

const editItem = (item: IDoctor, index: number) => {
    Object.assign(doctor, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteDoctor(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createDoctor(body)
    items.value.push(data as any)
}

const update = async (index: number, body: any, id: any) => {
    const data = await updateDoctor(id, body)
    Object.assign(items.value[index], data)
    
}

const save = async () => {
    createLoading.value = true

    var form_data = new FormData()
    
    Object.keys(doctor).map((key: any) => {
        form_data.append(key, doctor[key as keyof typeof doctor] as string)
        
    })
    if(file.value) form_data.append('avatar', file.value)
    else form_data.delete('avatar')
    form_data.delete('specialties')
    
    if(itemIndex.value !== null) await update(itemIndex.value, form_data, doctor.id)
        
    else await create(form_data)

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
    // const data = await $fetch('/api/speciality', { params: {page: 1, limit: 1000} })
    // speciality_list.value = data.result as any
}

init()
</script>