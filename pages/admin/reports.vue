<template>
    <div class="w-full p-2">
        <div class="p-2 rounded border flex justify-between items-center gap-2 bg-white">
            <site-input type="date" placeholder="Поиск" />
            <div class="flex items-center gap-2">
                <app-btn @click="dialog1=true">Добавить прибыль</app-btn>
                <app-btn @click="dialog2=true">Добавить расход</app-btn>
            </div>
        </div>

        <div class="flex flex-col md:flex-row items-start gap-2">

            <div class="flex flex-col gap-2 items-start w-full md:w-[70%] lg:flex-1">
                <app-data-table
                    :count="test?.profits?.length||0"
                    :items="test?.profits||[]"
                    :headers="headers"
                    :loading="loading"
                    hide-bottom
                    hide-top
                    
                    @fetching="getItems">
    
                    <template #table-item-patient="{tableItem}">
                        <span class="text-xs text-balance">{{ tableItem?.appointment?.patient?.first_name }} {{ tableItem?.appointment?.patient?.last_name }}</span>
                    </template>
                    <template #table-item-doctor="{tableItem}">
                        <span class="text-xs text-balance">{{ tableItem?.appointment?.doctor?.first_name }} {{ tableItem?.appointment?.doctor?.last_name }}</span>
                    </template>
                    <template #table-item-service="{tableItem}">
                        <span class="text-xs text-balance">{{ tableItem?.appointment?.service?.name_ru }}</span>
                    </template>
                    
                    <template #table-item-price="{tableItem}">
                        <span class="text-xs text-balance">{{ tableItem?.appointment?.price }}</span>
                    </template>
                    
                    <template #table-item-end_time="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem?.appointment?.end_time!).toLocaleString() }}</span>
                    </template>
                    <template #table-item-start_time="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem?.appointment?.start_time!).toLocaleString() }}</span>
                    </template>
    
                    <template #table-item-created_at="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
                    </template>
                </app-data-table>
                <app-data-table
                    :count="test?.consumptions?.length||0"
                    :items="test?.consumptions||[]"
                    :headers="headers1"
                    :loading="loading"
                    hide-bottom
                    hide-top
                    
                    @fetching="getItems">
                    <template #table-item-created_at="{tableItem}">
                        <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
                    </template>
                    <!-- <template #table-item-actions="{tableItem,index}">
                        <div class="flex gap-1">
                            <button @click="editItem(tableItem, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
                            <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                        </div>
                    </template> -->
                </app-data-table>
            </div>
    
            <div class="mt-2 flex flex-col text-center flex-wrap gap-2  w-full md:w-[30%] lg:w-[250px]">
                <div class="text-sm rounded border bg-white px-4 py-2 text-blue-700">Общая прибыль: {{ (test?.total_profit)?.toLocaleString('ru-RU') || 0 }} сумов</div>
                <div class="text-sm rounded border bg-white px-4 py-2 text-red-600">Общая расход: {{ (test?.total_consumption)?.toLocaleString('ru-RU') || 0 }} сумов</div>
                <div class="text-sm rounded border bg-white px-4 py-2 text-green-700">Чистая прибыль: {{ (test?.net_profit)?.toLocaleString('ru-RU') || 0 }} сумов</div>
            </div>

        </div>

    </div>
    
    <app-dialog rounded title="Добавить прибыль" :open="dialog1" @close-dialog="close1">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <site-input required v-model="profit.date" type="date" label="Дата прибыла" />
            <site-input required v-model="profit.amount" type="number" label="Выплаченная сумма" placeholder="Выплаченная сумма" />
            <site-input required v-model="profit.appointment" label="Прием" placeholder="Прием" />
            
            <app-btn disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </app-btn>
        </form>
    </app-dialog>

    <app-dialog rounded title="Добавить расход" :open="dialog2" @close-dialog="close1">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <site-input required v-model="consumption.date" type="date" label="Дата расхода" />
            <site-input required v-model="consumption.title" label="Название расхода" placeholder="Название расхода" />
            <site-input required v-model="consumption.amount" type="number" label="Выплаченная сумма" placeholder="Выплаченная сумма" />
            <site-textarea required v-model="consumption.description" label="Описание расхода" placeholder="Описание расхода" />
            
            <app-btn disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { IDoctor, IReport } from '@/types'

definePageMeta({
  layout: 'admin-layout',
//   middleware: ['auth'],
})

const { getReports } = useReports()

const dialog1 = ref(false)
const dialog2 = ref(false)
const loading = ref(false)
const test = ref<IReport|null>(null)
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
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

const consumption = reactive({
    date: '',
    title: '',
    description: '',
    amount: 0,
})

const profit = reactive({
    date: '',
    amount: 0,
    appointment: null,
})

const headers = [
    { name: "Прибыли", value: "id", sortable: false, balancedText: false, custom: false },
    { name: "Доктор", value: "doctor", sortable: false, balancedText: false, custom: true },
    { name: "Пациет", value: "patient", sortable: false, balancedText: false, custom: true },
    { name: "Услуга", value: "service", sortable: false, balancedText: false, custom: true },
    { name: "Цена", value: "price", sortable: false, balancedText: false, custom: true },
    { name: "Оплачен", value: "amount", sortable: false, balancedText: false, custom: false },
    { name: "Дата начало", value: "start_time", sortable: false, balancedText: false, custom: true },
    { name: "Дата окончания", value: "end_time", sortable: false, balancedText: false, custom: true },
    // { name: "Дата создания", value: "created_at", sortable: false, balancedText: false, custom: true },
    // { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const headers1 = [
    { name: "Расходы", value: "id", sortable: false, balancedText: false, custom: false },
    { name: "Называния", value: "title", sortable: false, balancedText: false, custom: false },
    { name: "Описания", value: "description", sortable: false, balancedText: false, custom: false },
    { name: "Оплачен", value: "amount", sortable: false, balancedText: false, custom: false },
    // { name: "Дата", value: "created_at", sortable: false, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    try {
        loading.value = true
        const data = await getReports({})
        test.value = data.results[0]
        // const data = await getDoctors(params)
        // items.value = data.results
        // count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
const editItem = (item: IDoctor, index: number) => {
    Object.assign(doctor, item)
    itemIndex.value = index
    dialog1.value = true
}

const deleteItem = async (id: number, index: number) => {
    // if(!confirm('Вы хотите удалить это?')) return
    // await deleteDoctor(id)
    // items.value.splice(index, 1)
}

const create = async (body: any) => {
    // const data = await createDoctor(body)
    // items.value.push(data as any)
}

const update = async (index: number, body: any, id: any) => {
    // const data = await updateDoctor(id, body)
    // Object.assign(items.value[index], data)
    
}

const save = async () => {
    createLoading.value = true

    // var form_data = new FormData()
    
    // Object.keys(doctor).map((key: any) => {
    //     form_data.append(key, doctor[key as keyof typeof doctor] as string)
        
    // })
    // if(file.value) form_data.append('avatar', file.value)
    // else form_data.delete('avatar')
    // form_data.delete('specialties')
    
    // if(itemIndex.value !== null) await update(itemIndex.value, form_data, doctor.id)
        
    // else await create(form_data)

    createLoading.value = false
    close()
}

const close1 = () => {
    // delete doctor.id
    // Object.assign(doctor, {
    //     name: "",
    //     education: "",
    //     experience: "",
    //     phone: "",
    //     image: "",
    //     thumb: "",
    //     fb: "",
    //     in: "",
    //     tg: "",
    //     inst: "",
    //     publish: false,
    //     laboratory: false,
    //     speciality_id: [],
    // })
    dialog1.value = false
    dialog2.value = false
    itemIndex.value = null
}

const init = async () => {
    // const data = await $fetch('/api/speciality', { params: {page: 1, limit: 1000} })
    // speciality_list.value = data.result as any
}

init()
</script>