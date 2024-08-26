export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUserData()

    user.value?.user_type === 'DOCTOR' && navigateTo('/admin/appointments-doctors', { external: true })
})