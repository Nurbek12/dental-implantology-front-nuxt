import type { IUser } from "~/types"

export const useAuthAccessToken = () => {
    return useCookie<string|null>('access-token', {
        default: () => null,
        expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
        // httpOnly: true
    })
}

export const useAuthRefreshToken = () => {
    return useCookie<string|null>('refresh-token', {
        default: () => null
    })
}

export const useUserData = () => {
    return useCookie<IUser|null>('user-data', {
        default: () => null
    })
}