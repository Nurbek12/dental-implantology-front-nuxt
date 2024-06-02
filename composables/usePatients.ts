import type { IPatient } from '~/types'

export const usePatients = () => {
    const runtimeConfig = useRuntimeConfig()

    const getPatients = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IPatient[]
    }>(`/patients/`, { params })

    const createPatient = (data: any) => $fetch(`/patients/`, { method: 'post', body: data })

    const updatePatient = (id: number, data: any) => $fetch(`/patients/${id}/`, { method: 'put', body: data })

    const deletePatient = (id: any) => $fetch(`/users/${id}/`, { method: 'delete' })

    return {
        getPatients,
        createPatient,
        updatePatient,
        deletePatient
    }
}