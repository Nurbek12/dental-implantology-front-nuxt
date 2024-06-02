import type { IServiceCategory } from '~/types'

export default function useServiceCategories() {
    const getCategories = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IServiceCategory[]
    }>(`/service-categories/`, { params })

    const createCategory = (data: any) => $fetch(`/service-categories/`, { method: 'post', body: data })

    const updateCategory = (id: number, data: any) => $fetch(`/service-categories/${id}/`, { method: 'put', body: data })

    const deleteCategory = (id: any) => $fetch(`/service-categories/${id}/`, { method: 'delete' })

    return {
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}