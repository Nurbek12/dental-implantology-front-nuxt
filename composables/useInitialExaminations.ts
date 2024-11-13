export default function useInitialExaminations() {
    const { $api } = useNuxtApp()

    const getInitialExamination = (id: number) => $api(`/initial-examinations/{id}`, { path: { id } })

    const createInitialExamination = (body: any) => $api(`/initial-examinations`, { method: 'POST', body })

    const updateInitialExamination = (id: number, body: any) => $api(`/initial-examinations/{id}`, { path: { id }, method: "PATCH", body })

    return {
        getInitialExamination,
        createInitialExamination,
        updateInitialExamination,
    }
}