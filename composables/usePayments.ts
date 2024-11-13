export default function usePayments() {
    const { $api } = useNuxtApp()

    const getPayments = (params: any) => $api('/payments', { params })

    const createPayment = (body: any) => $api('/payments', { method: 'POST', body })

    // const updatePayment = (id: number, params: any) => $api('/payments/{id}', { path: { id }, method: "GET", params })

    return {
        getPayments,
        createPayment,
        // updatePayment,
    }
}