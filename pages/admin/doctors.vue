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
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <app-image :src="tableItem.avatar" class="w-full h-full object-cover" />
                </div>
            </template>
            <template #table-item-name="{tableItem}">
                <nuxt-link class="hover:underline" :to="`/admin/patients/${tableItem.id}/appointments`">
                    <h3 class="text-sm font-medium">{{ tableItem.firstName }} {{ tableItem.lastName }}</h3>
                    <p class="text-xs text-gray-700">{{ tableItem.phone }}</p>
                </nuxt-link>
            </template>
            <template #table-item-fisrt_name="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.first_name }} {{ tableItem.middle_name }} {{ tableItem.last_name }}</span>
            </template>
            <template #table-item-spec="{tableItem}">
                <app-badges :items="tableItem.specialties" :data="specs" />
            </template>
            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.createdAt!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</app-btn>
                    <app-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</app-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавление доктора':'Редактирование доктора'" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">

            <app-input required v-model="doctor.firstName" label="Имя" placeholder="Имя" />
            <app-input required v-model="doctor.lastName" label="Фамилия" placeholder="Фамилия" />
            <app-input required v-model="doctor.middleName" label="Отчество" placeholder="Отчество" />
            
            <app-input required v-model="doctor.phone" label="Телефон" placeholder="Телефон" />
            <app-input required v-model="doctor.experience" label="Опыт" placeholder="Опыт" type="number" />
            <app-input required v-model="doctor.address" label="Адрес" placeholder="Адрес" />
            <app-input v-model="doctor.birthDate" label="Дата рождения" placeholder="Дата рождения" type="date" />
            
            <app-multiple-select required v-model="doctor.specialties" :items="Object.keys(specs).map(k => ({title: specs[k as keyof typeof specs], value: k}))" label="Специализация" placeholder="Специализация">
                <template #chip-item="{item}">
                    <span class="text-xs whitespace-nowrap">{{ specs[item as keyof typeof specs] }}</span>
                </template>
            </app-multiple-select>
    
            <app-textarea required v-model="doctor.content" label="Контент" placeholder="Контент" />

            <div class="flex items-center gap-2">
                <input type="checkbox" v-model="doctor.isPublished" id="is_active">
                <label for="is_active">Публиковать</label>
            </div>
            <app-btn :disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { specs } from '@/constants'
import type { User } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { createUser, deleteUser, getUsers, updateUser } = useUsers()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<User[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const doctor = reactive<Partial<User>>({
    phone: "",
    address: "",
    content: "",
    lastName: "",
    birthDate: "",
    firstName: "",
    experience: 0,
    middleName: "",
    specialties: [],
    isPublished: false,
})
                           
const headers = [
    { name: "Фото", value: "image", sortable: false, balancedText: false, custom: true },
    { name: "Имя и фамилия", value: "name", sortable: true, balancedText: false, custom: true },
    { name: "Опыт", value: "experience", sortable: false, balancedText: true, custom: false },
    { name: "Специализация", value: "spec", sortable: false, balancedText: false, custom: true },
    { name: "Баланс", value: "balance", sortable: false, balancedText: false, custom: false },
    { name: "Дата", value: "createdAt", sortable: false, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async () => {
    try {
        loading.value = true
        const data = await getUsers({})
        items.value = data as any
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: User, index: number) => {
    Object.assign(doctor, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteUser(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const data = await createUser(body)
    items.value.push(data as any)
}

const update = async (index: number, {id, ...body}: any) => {
    const obj: any = {}
    Object.keys(body).map(key => {
        if(body[key] !== (items.value[index] as any)[key])
            obj[key] = body[key]
    })
    const data = await updateUser(id, obj)
    Object.assign(items.value[index], data)
}

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null) await update(itemIndex.value, doctor)
        else await create(doctor)
    
        close()
    } catch (error) {
        console.log(error);
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    delete doctor.id
    Object.assign(doctor, {
        phone: "",
        address: "",
        content: "",
        lastName: "",
        birthDate: "",
        firstName: "",
        experience: 0,
        middleName: "",
        specialties: [],
        isPublished: false,
    })
    dialog.value = false
    itemIndex.value = null
}
</script>