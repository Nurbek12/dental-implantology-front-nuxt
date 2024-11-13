export default function useUsers() {
    const { $api } = useNuxtApp()

    const getMe = () => useApi('/users/me')

    const createUser = (body: any) => $api('/users', { method: 'POST', body })

    const getUsers = (params: any) => $api('/users', { method: "GET", params })

    const deleteUser = (id: any) => $api('/users/{id}', { method: 'DELETE', path: { id } })
    
    const changeAvatar = (body: any) => $api(`/users/me/change-avatar`, { method: 'PATCH', body })

    const changePassword = (body: any) => $api('/users/me/change-password', { method: "PATCH", body })

    const updateUser = (id: number, body: any) => $api('/users/{id}', { method: 'PATCH', body, path: { id } })

    const updateUserMe = (body: any) => $api('/users/me', { method: 'PATCH', body })

    return {
        getMe,
        getUsers,
        createUser,
        deleteUser,
        updateUser,
        changeAvatar,
        updateUserMe,
        changePassword,
    }
}