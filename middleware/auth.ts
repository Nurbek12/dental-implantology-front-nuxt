export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookie = useCookie('access-token').value
    
    if(!cookie) navigateTo('/login', { external: true })
})