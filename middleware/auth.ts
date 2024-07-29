export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return

    const cookie = useCookie('access-token').value
    
    if(!cookie) navigateTo('/login', { external: true })

    // const { accessToken } = useAuth()
    
    // if(!accessToken.value) {
    //     navigateTo('/login', { external: true })
    // }
})