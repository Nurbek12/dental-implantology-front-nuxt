<template>
    <div class="w-full p-2">
        <div class="bg-white border px-4 py-2.5 rounded mb-2">
            <div class="mb-4 flex gap-2 items-center">
                <div class="w-[50px] h-[50px] overflow-hidden rounded-full bg-primary-600 text-white font-medium text-xl flex justify-center items-center">
                    <app-image v-if="patient?.avatar" :src="patient?.avatar" class="w-full h-full object-cover" />
                    <span v-else>{{ patient?.firstName?.[0] }}{{ patient?.lastName?.[0] }}</span>
                </div>
                <div>
                    <p class="font-medium text-sm">{{ patient?.firstName }} {{ patient?.lastName }}</p>
                    <span class="text-gray-500 text-sm">{{ patient?.phone }}</span>
                </div>
            </div>
            <app-patient-nav />
        </div>
        <nuxt-page />
    </div>
</template>

<script setup lang="ts">
import { patient } from '~/store/useApp'

definePageMeta({
    layout: 'admin-layout'
})

const route = useRoute()

const { getPatient } = usePatients()

const init = async () => {
    const data = await getPatient(+route.params.id!, { expand: "teeth,initialExamination" })
    patient.value = data as any
}

await init()
</script>