<template>
    <div class="h-[100vh] flex items-center justify-center px-2">
        <div class="max-w-[420px] w-full p-4 border rounded overflow-hidden">
            <form @submit.prevent="" class="w-full">
                <h1 class="text-2xl text-center font-medium text-primary-600">Войти в систему</h1>
                <p v-show="err" class="text-center text-sm text-red-600">Логин или пароль неправилный!</p>
                <div class="space-y-4 pt-4">
                    <site-input required v-model="form_data.login" placeholder="Логин" />
                    <site-input required v-model="form_data.password" placeholder="Пароль" type="password" />
                    <site-btn type="submit" :disabled="loading" class="w-full">Отправить</site-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {} from '@kalimahapps/vue-icons'

const err = ref(false)
const loading = ref(false)
// const router = useRouter()
// const adminToken = useAuthData()
const form_data = reactive({
    login: '',
    password: ''
})

// const setToken = (token: string) => {
//     adminToken.value = token
// }

// const login = async () => {
//     loading.value = true
//     const data: any = await $fetch('/api/auth/login', {
//         method: 'post',
//         body: JSON.stringify(form_data)
//     })
//     if(data.status === "ok") {
//         setToken(data.token)
//         router.push('/admin')
//         err.value = false
//     } else {
//         err.value = true
//     }
//     loading.value = false
//     Object.assign(login, {
//         login: '',
//         password: ''
//     })
// }
</script>