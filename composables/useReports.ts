import type { IReport } from "~/types"

export default function useAppointments() {
    const getReports = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IReport[]
    }>(`/reports/`, { params })

    const createReport = (data: any) => $fetch(`/reports/`, { method: 'post', body: data })

    const updateReport = (id: number, data: any) => $fetch(`/reports/${id}/`, { method: 'put', body: data })

    const deleteReport = (id: any) => $fetch(`/reports/${id}/`, { method: 'delete' })

    return {
        getReports,
        createReport,
        updateReport,
        deleteReport,
    }
}