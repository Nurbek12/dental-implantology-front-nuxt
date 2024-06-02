export default defineNuxtRouteMiddleware((to, from) => {
    const token = useAuthAccessToken()
    
    if(!token.value) {
        navigateTo('/login', { external: true })
    }
})