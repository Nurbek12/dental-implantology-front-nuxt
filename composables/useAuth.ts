export const useAuth = () => {
    const accessToken = useAuthAccessToken()
    const refreshToken = useAuthRefreshToken()
    
    const setTokens = (a: string | null, r: string) => {
        accessToken.value = a
        refreshToken.value = r
    }
    
    const handleLogin = async (body: any) => {
        const data = await $fetch<{access: string, refresh: string}>('/api/token/', {
            method: 'post',
            body
        })
        console.log(data);
        
        if(data.access) {
            setTokens(data.access, data.refresh)
            setTimeout(() => {
                navigateTo('/admin/appointments')
            }, 100);
        }
    }

    return {
        accessToken,
        handleLogin,
    }
}