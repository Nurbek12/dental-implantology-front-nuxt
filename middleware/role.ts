export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server) return

    const user = useUserData()
    console.log(user.value);
    
    user.value?.user_type === 'DOCTOR' && navigateTo('/admin/appointments-doctors', { external: true })
})