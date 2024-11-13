
export const usePatients = () => {
    const { $api } = useNuxtApp()

    const getPatients = (params: any) => $api('/patients', { params })

    const createPatient = (body: any) => $api(`/patients`, { method: 'POST', body })

    const deletePatient = (id: any) => $api(`/users/{id}`, { method: 'DELETE', path: { id } })

    const getPatient = (id: number, params: any = {}) => $api('/patients/{id}', { method: 'GET', path: { id }, query: params })

    const updatePatient = (id: number, body: any) => $api(`/patients/{id}`, { method: 'PATCH', body, path: { id } })

    const changePatientAvatar = (id: number, body: any) => $api('/patients/{id}/change-avatar', { method: "PATCH", path: { id }, body })

    return {
        getPatient,
        getPatients,
        createPatient,
        updatePatient,
        deletePatient,
        changePatientAvatar,
    }
}