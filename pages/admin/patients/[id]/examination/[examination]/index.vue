<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div class="col-span-1 md:col-span-3 bg-white rounded border p-4 h-fit">

                <div class="flex text-left items-start md:items-center gap-2 flex-col md:flex-row text-gray-700 border-b pb-2 text-sm">
                    <span>Зуб: {{ examination?.tooth.num }}</span>
                    <span class="flex-1 hidden md:block"></span>
                    <span>{{ new Date(examination?.createdAt!).toLocaleString() }}</span>
                    <app-price :value="totalPrice" class="text-xs text-balance">
                        <template #prepend>Общие: </template>
                    </app-price>
                </div>

                <div class="mt-4 grid grid-cols-1 lg:grid-cols-[280px_auto] gap-4">

                    <div class="space-y-2">

                        <div class="rounded border">
                            <app-tooth-image :tooth-num="examination?.tooth?.num!" :conditions="examination?.tooth?.condition||[]" />
                        </div>
                
                        <app-multiple-select v-model="examination!.toothCondition" placeholder="Состояние зуба" :items="therapy_map" value="value">
                            <template #chip-item="{item}">
                                <span class="text-sm whitespace-nowrap">
                                    {{ therapy_map.find(({value}) => item === value)?.title }}
                                    ({{ therapy_map.find(({value}) => item === value)?.code }})
                                </span>
                            </template>
                        </app-multiple-select>

                    </div>

                    <div class="space-y-2">

                        <app-treatment v-for="treatment,i in examination?.treatments||[]" :key="i"
                            :treatment="treatment" @toggle-complete-treatment="handleToggleTreatment(i)" @remove-treatment="handleRemoveTreatment(i)" />

                        <div v-show="examination?.treatments?.length===0" class="text-center">
                            <span class="text-sm text-gray-600">Нет процедуры</span>
                        </div>
                    </div>

                </div>

                <div class="flex gap-2 items-center justify-end flex-wrap mt-4">
                    <app-btn size="small" @click="navigateTo(`/admin/patients/${route.params.id}/examination/create/${examination?.tooth.num}`)">Новый осмотр</app-btn>
                    <app-btn size="small" @click="dialog=true">Добавить лечения</app-btn>
                    <app-btn @click="handleUpdateExamination" size="small">Сохранить</app-btn>
                    <app-btn size="small" @click="dialog1=true">Оплатить</app-btn>
                </div>

            </div>

            <!-- <div class="bg-white rounded border p-4">
                <div class="flex justify-between items-start">
                    <span>Рентген</span>
                    <app-btn size="square" class="!px-2.5 !py-0.5 !text-xl">+</app-btn>
                </div>

                <div class="mt-2 space-y-2">
                    <div class="text-center">
                        <span class="text-sm text-gray-600">Пусто</span>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
    <app-dialog v-model="dialog" title="Лечении" rounded max-width="600">
        <div class="bg-white w-full mt-2 overflow-hidden rounded border">

            <template v-for="service,i in services" :key="service.id">
                <div class="w-full" v-if="service.procedures.length>0">

                    <div class="bg-gray-100 cursor-pointer px-4 py-2" @click="serviceOpen==i?serviceOpen=null:serviceOpen=i">
                        {{ service.title }}: {{ service.procedures?.length }} процедуры
                    </div>
    
                    <div v-show="serviceOpen===i">
                        <div v-for="procedure in service?.procedures||[]" :key="procedure.id" class="px-4 py-1 border-y cursor-pointer hover:bg-gray-100 flex justify-between items-center gap-2">
                            <div>
                                <h2 class="text-sm"><b class="font-medium">{{ procedure.code }}</b>: {{ procedure.title_ru }}</h2>
                                <p class="text-sm"><b class="font-medium">Цена</b>: <app-price :value="procedure.price" /> </p>
                            </div>
                            <app-btn @click="toggleToProcedures(procedure)" size="small">{{examination?.treatments.some(p => p.procedureId === procedure.id) ?'Убрать':'Добавить'}}</app-btn>
                        </div>
                    </div>

                </div>
            </template>
            
        </div>
        <div class="flex justify-between items-center gap-4 mt-4 pl-1">
            <app-price :value="totalPrice" class="text-xs text-balance">
                <template #prepend>Общие: </template>
            </app-price>
            <app-btn size="small" @click="dialog=false">Закрыть</app-btn>
        </div>
    </app-dialog>

    <app-dialog v-model="dialog1" title="Создать Платеж" rounded max-width="600" @close-dialog="closePaymentDialog">
        <form @submit.prevent="handleCreatePayment" class="mt-4 flex flex-col gap-4">
            <app-input required v-model="payment.amount" type="number" label="Сумма" placeholder="Сумма" />
            <app-select required v-model="payment.type" :items="Object.keys(payment_types).map(key => ({ name: payment_types[key as PaymentType], value: key }))" label="Тип платежа" placeholder="Тип платежа" :nullvalue="null" />
            
            <app-btn :disabled="createLoading" type="submit" size="small">{{ createLoading?'Загружается':'Сохранить' }}</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { therapy_map, payment_types } from '@/constants'
import type { Examination, Procedure, Service, Payment, PaymentType } from '~/types'

const { pushAlert } = useAlert()
const { getServices } = useServices()
const { createPayment } = usePayments()
const { getExamination } = useExaminations()
const { updateExamination } = useExaminations()

const route = useRoute()
const dialog = ref(false)
const dialog1 = ref(false)
const createLoading = ref(false)
const services = ref<Service[]>([])
const serviceOpen = ref<number|null>(null)
const examination = ref<Examination|null>(null)
const payment = ref<Partial<Payment>>({
    amount: 0,
    type: "CASH",
    examinationId: +route.params.examination,
})

const totalPrice = computed(() => examination.value?.treatments?.reduce((a,b) => a + b.price, 0) || 0)

const handleToggleTreatment = (index: number) => {
    if(examination.value?.treatments?.[index]?.isCompleted === undefined) return
        examination.value!.treatments[index].isCompleted = !examination.value!.treatments[index].isCompleted
}

const handleRemoveTreatment = (index: number) => {
    examination.value?.treatments?.splice(index, 1)
}

const toggleToProcedures = (procedure: Procedure) => {
    const index = examination.value?.treatments?.findIndex(p => p.procedureId === procedure.id)!
    if(index > -1)
        return examination.value?.treatments?.splice(index, 1)
    examination.value?.treatments.push({price: procedure.price, procedureId: procedure.id, isCompleted: false, procedure} as any)
}

const handleUpdateExamination = async () => {
    await updateExamination(+route.params.examination, {
        patientId: +route.params.id,
        toothNum: examination.value?.tooth?.num,
        toothCondition: examination.value?.toothCondition,
        treatments: examination.value?.treatments?.map(({price, procedureId, isCompleted}) => ({
            price,
            procedureId,
            isCompleted,
        })),
    })
    pushAlert('Успешно изменено', 'SUCCESS')
}

const handleGetExamination = async () => {
    const exp = await getExamination(+route.params.examination)
    if(!exp.id) navigateTo(`/admin/patients/${route.params.id}/examination`)
    examination.value = exp as any
}

const handleCreatePayment = async () => {
    await createPayment(payment.value)
    closePaymentDialog()
    pushAlert('Успешно создано', 'SUCCESS')
}

const closePaymentDialog = () => {
    payment.value = {
        amount: 0,
        type: "CASH",
        examinationId: +route.params.examination,
    }
    dialog1.value = false
}

const init = async () => {
    const data = await getServices({})   
    services.value = data as any
}

init()
await handleGetExamination()
</script>