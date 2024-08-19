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
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <site-btn @click="dialog=true" size="small">Добавить</site-btn>
            </template>
            <template #table-item-id="{index}">
                <span class="text-xs">{{ index+1 }}</span>
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
                    <site-btn customColor="bg-green-600 hover:bg-green-500 active:bg-green-400 disabled:bg-green-300" @click="editItem(tableItem, index)" size="small">Изменить</site-btn>
                    <site-btn customColor="bg-red-600 hover:bg-red-500 active:bg-red-400 disabled:bg-red-300" @click="deleteItem(tableItem.id!, index)" size="small">Удалить</site-btn>
                </div>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавление пациента':'Редактирование пациента'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <site-input required v-model="$item.first_name" label="Имя" placeholder="Имя" />
            <site-input required v-model="$item.last_name" label="Фамилия" placeholder="Фамилия" />
            <site-input required v-model="$item.middle_name" label="Отчество" placeholder="Отчество" />
            <site-input required v-model="$item.phone" label="Телефон" placeholder="Телефон" />

            <site-input required v-model="$item.birth_date" label="Дата рождения" type="date" />

            <site-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</site-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { IPatient } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth', 'role'],
})

const { createPatient, deletePatient, getPatients, updatePatient } = usePatients()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const pages = ref<number>(0)
const items = ref<IPatient[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const $item = reactive<IPatient>({
    phone: "",
    last_name: "",
    birth_date: "",
    first_name: "",
    middle_name: ""
})
                           
const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Имя", value: "first_name", sortable: true, balancedText: false, custom: false },
    { name: "Фамилия", value: "last_name", sortable: true, balancedText: false, custom: false },
    { name: "Отчество", value: "middle_name", sortable: true, balancedText: false, custom: false },
    // { name: "Активность", value: "is_active", sortable: false, balancedText: false, custom: true },
    { name: "Дата рождения", value: "birth_date", sortable: true, balancedText: false, custom: false },
    { name: "Добавлен", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управление", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getPatients(params)
        pages.value = data.page_count
        items.value = data.results
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: IPatient, index: number) => {
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
    const data = await createPatient(JSON.stringify(body))
    items.value.push(data as any)
}

const update = async (index: number, body: any) => {
    delete body.avatar
    const data = await updatePatient(body.id, JSON.stringify(body))
    Object.assign(items.value[index], data)
}

// const handleUpdatePatch = async (index: number, body: any) => {
//     const editedFields: any = {}
//     const oldItem = items.value[index]
//     Object.keys(body).map((key) => {
//         if(body[key] !== oldItem[key as keyof typeof oldItem])
//             editedFields[key] = body[key]
//     })
//     const data = await updatePatch(body.id, editedFields)
//     Object.assign(items.value[index], data)
// }

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null) update(itemIndex.value, $item)        
        else create($item)
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
        last_name: "",
        birth_date: "",
        first_name: "",
        middle_name: ""
    })
    dialog.value = false
    itemIndex.value = null
}
</script>