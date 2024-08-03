<template>
    <div class="h-[100vh] flex items-center justify-center px-2">
        <div class="max-w-[420px] w-full p-4 border rounded overflow-hidden">
            <form @submit.prevent="login" class="w-full">
                <h1 class="text-2xl text-center font-medium text-primary-600">Войти в систему</h1>
                <p v-show="err" class="text-center text-sm text-red-600">Логин или пароль неправилный!</p>
                <div class="space-y-4 pt-4">
                    <site-input required v-model="form_data.phone" placeholder="Логин" label="Логин" />
                    <site-input required v-model="form_data.password" placeholder="Пароль" label="Пароль" type="password" />
                    <site-btn size="medium" type="submit" :disabled="loading" class="w-full">Отправить</site-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const { handleLogin } = useAuth()

const err = ref(false)
const loading = ref(false)

const form_data = reactive({
    phone: '',
    password: ''
})

const login = async () => {
    loading.value = true
    
    try {
        await handleLogin(form_data)
        Object.assign(form_data, {
            login: '',
            password: ''
        })
    } catch (error) {
        alert('Неправилный логин или пароль!')
    } finally {
        loading.value = false
    }

}
</script>