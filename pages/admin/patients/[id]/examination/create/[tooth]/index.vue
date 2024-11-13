<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div class="col-span-1 md:col-span-3 bg-white rounded border p-4 h-fit">

                <div class="flex justify-between items-start md:items-center gap-2 flex-col md:flex-row text-gray-700 border-b pb-2 text-sm">
                    <span>Зуб: {{ toothNum }}</span>
                    <span class="flex-1 hidden md:block"></span>
                    <span>{{ new Date().toLocaleString() }}</span>
                    <app-price :value="totalPrice" class="text-xs text-balance">
                        <template #prepend>Общие: </template>
                    </app-price>
                </div>

                <div class="mt-4 grid grid-cols-1 lg:grid-cols-[280px_auto] gap-4">

                    <div class="space-y-2">
                        <div class="rounded border">
                            <app-tooth-image :tooth-num="+toothNum!" :conditions="conditions" />
                        </div>
                
                        <app-multiple-select v-model="conditions" placeholder="Состояние зуба" :items="therapy_map" value="value">
                            <template #chip-item="{item}">
                                <span class="text-sm whitespace-nowrap">
                                    {{ therapy_map.find(({value}) => item === value)?.title }}
                                    ({{ therapy_map.find(({value}) => item === value)?.code }})
                                </span>
                            </template>
                        </app-multiple-select>

                    </div>

                    <div class="space-y-2">

                        <app-procedure v-for="procedure,i in procedures" :key="i"
                            :procedure="procedure" @remove-procedure="handleRemoveProcedure(i)"
                            @toggle-complete-procedure="toggleProcedureComplete(procedure.id)" />

                        <div v-show="procedures.length===0" class="text-center">
                            <span class="text-sm text-gray-600">Нет процедуры</span>
                        </div>
                    </div>

                </div>

                <div class="flex gap-2 items-center justify-end flex-wrap mt-4">
                    <app-btn size="small" @click="dialog=true">Добавить лечения</app-btn>
                    <app-btn @click="handleCreateExamination" size="small">Сохранить</app-btn>
                </div>

            </div>

        </div>
    </div>

    <app-dialog v-model="dialog" title="Лечении" rounded max-width="600">
        <div class="bg-white w-full mt-2 overflow-hidden rounded border">

            <template v-for="service,i in services" :key="service.id">
                <div class="w-full" v-if="service.procedures.length>0">

                    <div class="bg-gray-100 cursor-pointer px-4 py-2" @click="ext==i?ext=null:ext=i">
                        {{ service.title }}: {{ service.procedures?.length }} процедуры
                    </div>
    
                    <div v-show="ext===i">
                        <div v-for="procedure in service?.procedures||[]" :key="procedure.id" class="px-4 py-1 border-y cursor-pointer hover:bg-gray-100 flex justify-between items-center gap-2">
                            <div>
                                <h2 class="text-sm"><b class="font-medium">{{ procedure.code }}</b>: {{ procedure.title_ru }}</h2>
                                <p class="text-sm"><b class="font-medium">Цена</b>: <app-price :value="procedure.price" /></p>
                            </div>
                            <app-btn @click="toggleProcedures(procedure)" size="small">{{procedures.some(p => p.id === procedure.id) ?'Убрать':'Добавить'}}</app-btn>
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
</template>

<script setup lang="ts">
import { therapy_map } from '@/constants'
import type { Procedure, Service } from '~/types'

const { pushAlert } = useAlert()
const { getServices } = useServices()
const { createExamination, getExaminations } = useExaminations()

const route = useRoute()
const dialog = ref(false)
const ext = ref<number|null>(null)
const services = ref<Service[]>([])
const conditions = ref<string[]>([])
const toothNum = ref(route.params.tooth||null)
const procedures = ref<(Procedure & { isCompleted?: boolean })[]>([])

const totalPrice = computed(() => procedures.value.reduce((a,b) => a + b.price, 0) || 0)

const handleRemoveProcedure = (index: number) => {
    procedures.value.splice(index, 1)
}

const handleCreateExamination = async () => {
    if(!procedures.value.length) return
    const data = await createExamination({
        toothCondition: conditions.value,
        patientId: +route.params.id,
        toothNum: +route.params.tooth,
        treatments: procedures.value.map(({price, id, isCompleted}) => ({
            price,
            isCompleted,
            procedureId: id,
        })),
    })
    navigateTo(`/admin/patients/${route.params.id}/examination/${data.id}`)
    pushAlert('Успешно создано', 'SUCCESS')
}

const toggleProcedureComplete = (procedureId: number) => {
    const index = procedures.value.findIndex(p => p.id === procedureId)!
    if(index > -1)
        procedures.value[index].isCompleted = !procedures.value[index].isCompleted
}

const toggleProcedures = (procedure: Procedure) => {
    const index = procedures.value.findIndex(p => p.id === procedure.id)!
    if(index > -1)
        return procedures.value.splice(index, 1)
    procedures.value.push({...procedure, isCompleted: false})
}

const init = async () => {
    const data = await getServices({})   
    services.value = data as any
}

init()
</script>