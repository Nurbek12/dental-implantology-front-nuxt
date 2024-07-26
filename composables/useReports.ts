import type { IReport } from "~/types"

export default function useReports() {
    const getReports = (date: string) => $fetch<IReport>(`/reports/${date}/`,)

    const createReport = (body: any) => $fetch(`/reports/`, { method: 'post', body })

    const updateReport = (id: number, body: any) => $fetch(`/reports/${id}/`, { method: 'put', body })

    const deleteReport = (id: any) => $fetch(`/reports/${id}/`, { method: 'delete' })

    const addConsumption = (body: any) => $fetch<IReport>('/reports/add_consumption/', { method: 'post', body })

    const addProfit = (body: any) => $fetch<IReport>('/reports/add_profit/', { method: 'post', body })

    const addSalary = (body: any) => $fetch<IReport>('/reports/add_salary/', { method: 'post', body })

    const getRange = (params: any) => $fetch<{
            aggregated_totals: {
            total_profit: number,
            total_consumption: number,
            net_profit: number
        },
        reports: IReport[]
    }>('/reports/range/', { params })

    return {
        getRange,
        addSalary,
        addProfit,
        getReports,
        createReport,
        updateReport,
        deleteReport,
        addConsumption,
    }
}