import type { IAppointment } from "~/types"

export default function useAppointments() {
    const getAppointments = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IAppointment[]
    }>(`/appointments/`, { params })

    const createAppointment = (data: any) => $fetch<IAppointment>(`/appointments/`, { method: 'post', body: data })

    const updateAppointment = (id: number, data: any) => $fetch(`/appointments/${id}/`, { method: 'put', body: data })

    const deleteAppointment = (id: any) => $fetch(`/appointments/${id}/`, { method: 'delete' })

    return {
        getAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
    }
}