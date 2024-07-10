import type { IAppointment } from "~/types"

export default function useAppointments() {
    const getAppointments = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IAppointment[]
    }>(`/appointments/`, { params })

    const createAppointment = (data: any) => $fetch<IAppointment>(`/appointments/`, { method: 'post', body: data })

    const updateAppointment = (id: number, data: any) => $fetch(`/appointments/${id}/`, { method: 'put', body: data })

    const deleteAppointment = (id: number) => $fetch(`/appointments/${id}/`, { method: 'delete' })

    const addProfitForAppointment = (id: number, data: any) => $fetch(`/appointments/${id}/add_profit/`, { method: 'post', body: data }) 

    const updateStatus = (id: number, data: any) => $fetch(`/appointments/${id}/`, { method: 'patch', body: data }) 

    return {
        updateStatus,
        getAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        addProfitForAppointment,
    }
}