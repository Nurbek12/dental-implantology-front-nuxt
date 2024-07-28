export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) {
        return;
    }

    const { accessToken } = useAuth()
    
    if(!accessToken.value) {
        navigateTo('/login', { external: true })
    }
})