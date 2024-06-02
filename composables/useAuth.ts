export const useAuth = () => {
    const token = useAuthAccessToken()
    
    const setToken = (tk: string | null) => {
        token.value = tk
    }
    
    const handleLogin = async (body: any) => {
        const data = await $fetch<{access: string}>('/api/token/', {
            method: 'post',
            body
        })
        if(data.access) {
            setToken(data.access)
            navigateTo('/admin')
        }
    }

    return {
        token,
        handleLogin,
    }
}