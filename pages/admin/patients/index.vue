<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            :total-pages="pages"
            
            @fetching="getItems">
            <template #table-top>
                <div class="hidden md:block"></div>
                <div class="hidden md:block"></div>
                <app-btn @click="dialog=true" size="small">Добавить</app-btn>
            </template>
            <template #table-item-name="{tableItem}">
                <nuxt-link class="hover:underline" :to="`/admin/patients/${tableItem.id}/appointments`">
                    <h3 class="text-sm font-medium">{{ tableItem.firstName }} {{ tableItem.lastName }}</h3>
                    <p class="text-xs text-gray-700">{{ tableItem.phone }}</p>
                </nuxt-link>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <app-image :src="tableItem?.avatar" class="w-full h-full object-cover" />
                </div>
            </template>
            <template #table-item-gender="{tableItem}">
                <span class="text-xs text-balance">{{ {'MALE':"Мужской", "FEMALE": "Женской"}[tableItem.gender as "MALE"] }}</span>
            </template>
            <template #table-item-birthDate="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.birthDate!).toDateString() }}</span>
            </template>
            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <nuxt-link class="hover:underline" :to="`/admin/patients/${tableItem.id}/appointments`">
                        <app-btn size="small">Посмотреть</app-btn>
                    </nuxt-link>
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавление пациента':'Редактирование пациента'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="flex items-center justify-start">
                <label for="file-input" class="cursor-pointer">
                    <div class="w-[120px] h-[120px] border-2 hover:bg-primary-100 border-primary-600 p-1 overflow-hidden rounded-full">
                        <img :src="currentImage" class="w-full rounded-full h-full object-cover" alt="">
                    </div>
                </label>
            </div>
            <input hidden @change="onFileChange" id="file-input" accept="image/*;capture=camera" type="file" placeholder="Фото для ава">

            <app-input required v-model="$item.firstName" label="Имя" placeholder="Имя" />
            <app-input required v-model="$item.lastName" label="Фамилия" placeholder="Фамилия" />
            <app-input required v-model="$item.middleName" label="Отчество" placeholder="Отчество" />
            <app-input required v-model="$item.phone" label="Телефон" placeholder="Телефон" />
            <app-select required v-model="$item.gender" label="Пол" :items="[{name: 'Мужской',value:'MALE'},{name: 'Женский',value:'FEMALE'}]" />
            <app-input required v-model="$item.address" label="Адрес" placeholder="Адрес" />
            <app-input required v-model="$item.birthDate" label="Дата рождения" type="date" />

            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { Patient } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { createPatient, deletePatient, getPatients, updatePatient, changePatientAvatar } = usePatients()

const dialog = ref(false)
const loading = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const pages = ref<number>(0)
const items = ref<Patient[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const $item = reactive<Partial<Patient>>({
    phone: "",
    address: "",
    lastName: "",
    firstName: "",
    middleName: "",
    gender: "FEMALE",
})

const currentImage = computed(() => {
    if(file.value) return URL.createObjectURL(file.value)
    else if(itemIndex.value!==null) return items.value[itemIndex.value]?.avatar || '/images/nophoto.jpg'
    else return '/images/nophoto.jpg'
})

const headers = [
    { name: "Фото", value: "image", sortable: false, balancedText: false, custom: true },
    { name: "Имя", value: "name", sortable: false, balancedText: false, custom: true },
    { name: "Баланс", value: "balance", sortable: false, balancedText: false, custom: false },
    { name: "Пол", value: "gender", sortable: false, balancedText: false, custom: true },
    { name: "Дата рождения", value: "birthDate", sortable: false, balancedText: false, custom: true },
    { name: "Адрес", value: "address", sortable: false, balancedText: false, custom: false },
    { name: "Добавлен", value: "createdAt", sortable: false, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const onFileChange = (e: any) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return file.value = null
  return file.value = files[0]
}

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getPatients(params)
        
        items.value = data.data as any
        count.value = data.meta.total!
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: Patient, index: number) => {
    Object.assign($item, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deletePatient(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createPatient(body)
    $item.id = data.id
    items.value.push(data as any)
}

const update = async (index: number, {id, ...body}: any) => {
    const data = await updatePatient(id, body)
    Object.assign(items.value[index], data)
}

const changeAvatar = async (id: number) => {
    const formData = new FormData()
    formData.append('avatar', file.value)
    const data = await changePatientAvatar(id, formData)
    console.log(data)
}

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null) await update(itemIndex.value, $item)        
        else await create($item)
        if(file.value) await changeAvatar($item.id!)
        close()
    } catch (error) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    delete $item.id
    Object.assign($item, {
        phone: "",
        address: "",
        lastName: "",
        firstName: "",
        middleName: "",
        gender: "FEMALE",
    })
    dialog.value = false
    itemIndex.value = null
}
</script>