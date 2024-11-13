export default function useTeeth() {
    const { $api } = useNuxtApp()

    const getTeeth = (id: number) => $api('/teeth/{id}', { path: { id } })

    const updateTeeth = (id: number, body: any) => $api('/teeth/{id}', { path: { id }, method: "PATCH", body })

    return {
        getTeeth,
        updateTeeth,
    }
}