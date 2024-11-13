export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookie = useAuthAccessToken()
    
    if(!cookie.value) navigateTo('/login', { external: true })
})