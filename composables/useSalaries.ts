import type { ISalary } from '~/types'

export const useSalaries = () => {
    const getSalaries = (params: any) => $fetch<{
        count: number
        page_count: number
        results: ISalary[]
    }>(`/salaries/`, { params })

    const createSalary = (data: any) => $fetch(`/salaries/`, { method: 'post', body: data })

    return {
        getSalaries,
        createSalary
    }
}