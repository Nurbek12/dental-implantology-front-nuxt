<template>
    <div class="w-full bg-white py-4 rounded border overflow-auto">
        <div class="w-full flex justify-center items-center">
            <app-tooths @chooseeTooth="handleOpenTooth" v-if="patient?.teeth" :teeth="patient.teeth" /> 
        </div>
    </div>
    
    <div class="mt-2 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white border rounded p-2">
            <div class="hidden lg:block"></div>
            <div class="hidden lg:block"></div>
            <div class="hidden lg:block"></div>
            <app-btn @click="dialog=true" size="small">Первичный осмотр</app-btn>
        </div>
        <app-examinations-table :examinations="examinations" />
    </div>

    <app-dialog v-model="dialog" rounded max-width="900">
        <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="nums,i in tooth_nums" :key="i">
                <table>
                    <tr v-for="tm,j in therapy_map" :key="j">
                        <td class="text-sm">{{ tm.title }}</td>
                        <td class="px-2.5" v-for="l in 8" :key="l">
                            <input type="checkbox" :value="tm.value"
                                v-model="toothExamination.find(t => t.toothNum === nums[l-1])!.toothCondition"
                                @change="isEdited(l + i * 8 - 1)"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="px-2" v-for="l in 8" :key="l">
                            <span class="text-sm">
                                {{ nums[l-1] }}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <app-btn @click="saveInitialExamination">Сохранить</app-btn>
        </div>
    </app-dialog>
</template>

<script setup lang="ts">
import { patient } from '~/store/useApp'
import { therapy_map, tooth_nums } from '@/constants'
import type { Examination, ToothConditionLocale } from '@/types'

definePageMeta({
  middleware: ['auth'],
})

const { pushAlert } = useAlert()
const { getExaminations } = useExaminations()
const { createInitialExamination, updateInitialExamination } = useInitialExaminations()

const route = useRoute()
const dialog = ref(false)
const router = useRouter()
const examinations = ref<Examination[]>([])
const toothExamination = ref<ToothConditionLocale[]>(tooth_nums.flat().map((toothNum) => ({
    toothNum,
    toothCondition: [],
})))

const isEdited = (index: number) => {
    if(toothExamination.value[index]?.id && !toothExamination.value[index]?.isEdit) {
        toothExamination.value[index].isEdit = true
    }
}

const handleOpenTooth = (tooth: number | null) => {
    console.log(tooth);
    
    if(tooth === null) {
        dialog.value = true
    } else {
        const examination = toothExamination.value.find(te => te.toothNum === tooth)
        if(examination?.id)
            router.push(`/admin/patients/${route.params.id}/examination/${examination.id}`)
        else
            router.push(`/admin/patients/${route.params.id}/examination/create/${tooth}`)
    }
}

const handleUpdateToothExaminations = (toothExaminations: Examination[]) => {
    toothExaminations.map(tooth => {
        const index = toothExamination.value.findIndex(te => te.toothNum === tooth.tooth.num)
        if(index >= 0) toothExamination.value[index] = { ...tooth, toothNum: tooth.tooth.num }
    })
}

const handleUpdateInitialExamination = async (id: number) => {
    const updatedInitialExaminations = toothExamination
        .value.filter(tx => tx?.isEdit || (tx.toothCondition.length > 0 && !tx.id))
        .map(({toothCondition,toothNum}: any) => ({toothCondition,toothNum}))
    
    if(updatedInitialExaminations.length===0) return

    return updateInitialExamination(id, {
        toothExaminations: updatedInitialExaminations
    })
}

const handleCreateInitialExamination = async () => {
    const createdInitialExaminations = toothExamination.value.filter(tx => tx.toothCondition.length > 0 && !tx.id)

    return createInitialExamination({
        patientId: +route.params.id,
        toothExaminations: createdInitialExaminations
    })
}

const saveInitialExamination = async () => {
    try {
        const initialExaminationId = patient.value?.initialExamination?.id
        const data = await (initialExaminationId
            ? handleUpdateInitialExamination(initialExaminationId!) 
            : handleCreateInitialExamination())
    
        handleUpdateToothExaminations(data?.toothExaminations as any)
        
        patient.value!.teeth = data?.toothExaminations.map(te => ({
            id: te.toothId,
            num: te.tooth.num,
            condition: te.tooth?.condition || [] 
        })) as any
        patient.value!.initialExamination = data as any

        dialog.value = false
        pushAlert("Успешно сохранено", 'SUCCESS')
    } catch (error) {
        console.log(error)
    }
}

const handleGetExaminations = async () => {
    const data = await getExaminations({ patientId: route.params.id })
    examinations.value = data.data as any
}

handleGetExaminations()
handleUpdateToothExaminations(patient.value?.initialExamination?.toothExaminations as any)
</script>