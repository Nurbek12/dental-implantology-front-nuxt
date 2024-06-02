import type { IRatings } from '~/types'

export default function useRatings() {
    const getRatings = (params: any) => $fetch<{
        count: number
        page_count: number
        results: IRatings[]
    }>('/ratings/', { params })

    const createRating = (data: any) => $fetch('/ratings/', { method: 'post', body: data })

    const updateRating = (id: number, data: any) => $fetch(`/ratings/${id}/`, { method: 'patch', body: data })

    const deleteRating = (id: any) => $fetch(`/ratings/${id}/`, { method: 'delete' })

    return {
        getRatings,
        createRating,
        updateRating,
        deleteRating,
    }
}