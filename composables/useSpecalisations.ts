import type { ISpecialtie } from "~/types"

export default function useSpecalisations() {
    const getSpecalisations = (params: any) => $fetch<{
        count: number
        page_count: number
        results: ISpecialtie[]
    }>('/specialties/', { params })
    
    const createSpecalisation = (data: any) => $fetch('/specialties/', { method: 'post', body: data })

    const updateSpecalisation = (id: number, data: any) => $fetch(`/specialties/${id}/`, { method: 'put', body: data })

    const deleteSpecalisation = (id: any) => $fetch(`/specialties/${id}/`, { method: 'delete' })

    return {
        getSpecalisations,
        createSpecalisation,
        updateSpecalisation,
        deleteSpecalisation,
    }
}