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
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.doctor?.first_name }} {{ tableItem.doctor?.last_name }}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded title="Выдача заплаты" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <site-select required v-model="$item.doctor" :items="doctors" name="first_name" value="id" label="Доктор" placeholder="Доктор" :nullvalue="null" />

            <site-input required v-model="$item.amount" label="Сумма" placeholder="Сумма" type="number" />
            <site-input required v-model="$item.title" label="Название заплаты" placeholder="Название заплаты" />

            <site-textarea required v-model="$item.description" label="Описание заплаты" placeholder="Описание заплаты" />
            
            <site-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</site-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { ISalary, IDoctor } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { getDoctors } = useDoctors()
const { getSalaries, createSalary } = useSalaries()

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const pages = ref<number>(0)
const items = ref<ISalary[]>([])
const doctors = ref<IDoctor[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const $item = reactive<ISalary>({
    amount: 0,
    title: "",
    doctor: null,
    description: "",
})
                           
const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: true },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    
    { name: "Названия", value: "title", sortable: false, balancedText: false, custom: false },
    { name: "Описания", value: "description", sortable: false, balancedText: false, custom: false },
    { name: "Оплачено", value: "amount", sortable: false, balancedText: false, custom: false },

    { name: "Добавлен", value: "created_at", sortable: true, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getSalaries({ordering: '-created_at', ...params})
        pages.value = data.page_count
        items.value = data.results
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const create = async (body: any) => {
    const data: any = await createSalary(JSON.stringify(body))
    data.doctor = doctors.value.find(d => d.id === data.doctor)
    items.value.unshift(data as any)
}

const save = async () => {
    try {
        createLoading.value = true      
        create($item)
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
        amount: 0,
        comment: "",
        doctor: null,
    })
    dialog.value = false
    itemIndex.value = null
}

const init = async () => {
    const data = await getDoctors({})
    doctors.value = data.results
}

init()
</script>