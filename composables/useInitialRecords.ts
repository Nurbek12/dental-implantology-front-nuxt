import type { IInitialRecord } from '~/types'

export const useInitialRecords = () => {
    const getRecords = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IInitialRecord[]
    }>(`/initial-records/`, { params })

    const createRecord = (data: any) => $fetch(`/initial-records/`, { method: 'post', body: data })

    const updateRecord = (id: number, data: Partial<IInitialRecord>) => $fetch(`/initial-records/${id}/`, { method: 'patch', body: data })

    const deleteRecord = (id: any) => $fetch(`/initial-records/${id}/`, { method: 'delete' })

    return {
        getRecords,
        createRecord,
        deleteRecord,
        updateRecord,
    }
}