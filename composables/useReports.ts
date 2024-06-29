import type { IReport } from "~/types"

export default function useReports() {
    const getReports = (date: string) => $fetch<IReport>(`/reports/${date}/`,)

    const createReport = (body: any) => $fetch(`/reports/`, { method: 'post', body })

    const updateReport = (id: number, body: any) => $fetch(`/reports/${id}/`, { method: 'put', body })

    const deleteReport = (id: any) => $fetch(`/reports/${id}/`, { method: 'delete' })

    const addConsumption = (body: any) => $fetch<IReport>('/reports/add_consumption/', { method: 'post', body })

    const addProfit = (body: any) => $fetch<IReport>('/reports/add_profit/', { method: 'post', body })

    return {
        addProfit,
        getReports,
        createReport,
        updateReport,
        deleteReport,
        addConsumption,
    }
}