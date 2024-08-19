export default function useUsers() {
    const updateUser = (id: number, data: any) => $fetch(`/users/${id}/`, { method: 'put', body: data })

    const changePassword = (id: number, data: any) => $fetch(`/users/change-password/`, { method: 'post', body: data })

    const changeAvatar = (id: number, data: any) => $fetch(`/users/change-avatar/`, { method: 'post', body: data })

    return {
        updateUser,
        changePassword,
        changeAvatar,
    }
}