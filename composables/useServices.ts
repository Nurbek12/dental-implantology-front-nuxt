import type { IService } from '~/types'

export default function useServices() {
    const getServices = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IService[]
    }>(`/services/`, { params })

    const createService = (data: any) => $fetch(`/services/`, { method: 'post', body: data })

    const updateService = (id: number, data: any) => $fetch(`/services/${id}/`, { method: 'put', body: data })

    const deleteService = (id: any) => $fetch(`/services/${id}/`, { method: 'delete' })

    return {
        getServices,
        createService,
        updateService,
        deleteService
    }
}