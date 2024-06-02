import type { IUser } from "~/types"

export const useAuthAccessToken = () => {
    return useCookie<string|null>('access-token', {
        default: () => null,
        expires: new Date(),
        httpOnly: true
    })
}

export const useAuthRefreshToken = () => {
    return useCookie<string|null>('refresh-token', {
        default: () => null
    })
}

export const useLogout = () => {
    const token = useAuthAccessToken()
    token.value = null
    navigateTo('/login')
}

export const useUserData = () => {
    return useCookie<IUser|null>('user-data', {
        default: () => null
    })
}