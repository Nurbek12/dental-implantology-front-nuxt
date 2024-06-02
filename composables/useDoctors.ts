import type { IDoctor } from '~/types'

export default function useDoctors() {
    const getDoctors = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IDoctor[]
    }>(`/doctors/`, { params })

    const createDoctor = (data: any) => $fetch(`/doctors/`, { method: 'post', body: data })

    const updateDoctor = (id: number, data: any) => $fetch(`/doctors/${id}/`, { method: 'put', body: data })

    const deleteDoctor = (id: any) => $fetch(`/doctors/${id}/`, { method: 'delete' })

    return {
        getDoctors,
        createDoctor,
        updateDoctor,
        deleteDoctor
    }
}