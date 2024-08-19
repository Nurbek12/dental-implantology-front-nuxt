import type { IUser, IDoctor } from "~/types"

export const useAuth = () => {
    const userData = useUserData()
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
        
        if(data.access) {
            setTokens(data.access, data.refresh)
            const { user_type }: any = await handleGetMe(data.access)
            setTimeout(() => {
                navigateTo(user_type === 'SUPERUSER' ? '/admin/appointments' : '/admin/appointments-doctors')
            }, 100);
        }
    }

    const handleGetMe = async (token: string): Promise<IUser & IDoctor> => {
        const data: any = await $fetch(`/users/me/`, { headers: { Authorization: `Bearer ${token}` } })

        userData.value = data
        return data
    }

    return {
        accessToken,
        handleGetMe,
        handleLogin,
    }
}