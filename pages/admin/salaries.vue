<template>
    <div class="w-full p-2">
        <app-data-table
            hide-search
            :count="count"
            :items="items"
            :headers="headers"
            :loading="loading"
            :total-pages="pages"
            
            @fetching="getItems">
            <template #table-top>
                <site-btn @click="dialog=true" size="small">Добавить</site-btn>
                <!-- <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div> -->
            </template>
            <template #table-item-doctor="{tableItem}">
                <span class="text-xs text-balance">{{ tableItem.doctor?.first_name }} {{ tableItem.doctor?.last_name }}</span>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
        </app-data-table>
    </div>
    
    <app-dialog rounded :title="itemIndex==null?'Добавить пациент':'Изменить пациента'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <site-input required v-model="$item.amount" label="Сумма" placeholder="Сумма" type="number" />
            <site-select required v-model="$item.doctor" :items="doctors" name="first_name" value="id" label="Доктор" placeholder="Доктор" :nullvalue="null" />

            <site-textarea required v-model="$item.comment" label="Комментарий" placeholder="Комментарий" />

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
    comment: "",
    doctor: null,
})
                           
const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Доктор", value: "doctor", sortable: true, balancedText: false, custom: true },
    { name: "Сумма", value: "amount", sortable: false, balancedText: false, custom: false },
    // { name: "Очиство", value: "middle_name", sortable: false, balancedText: false, custom: false },
    // { name: "Активность", value: "is_active", sortable: false, balancedText: false, custom: true },
    { name: "Комментарий", value: "comment", sortable: true, balancedText: false, custom: false },
    { name: "Добавлен", value: "created_at", sortable: true, balancedText: false, custom: true },
    // { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getSalaries({...params, ordering: '-created_at'})
        pages.value = data.page_count
        items.value = data.results
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (item: ISalary, index: number) => {
    Object.assign($item, item)
    itemIndex.value = index
    dialog.value = true
}
const create = async (body: any) => {
    const data = await createSalary(JSON.stringify(body))
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