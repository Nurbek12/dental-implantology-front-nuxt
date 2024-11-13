<template>
  <div class="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white px-4 py-0.5 border rounded">
      <form @submit.prevent="handleUpdateUser" class="mt-4 flex flex-col gap-4 pb-4">
        <h1 class="text-lg">Изменить Данные</h1>
        
        <div class="flex items-center justify-start">
          <label for="file-input" class="cursor-pointer">
            <div class="w-[120px] h-[120px] border-2 hover:bg-primary-100 border-primary-600 p-1 overflow-hidden rounded-full">
              <app-image :src="profile.avatar!" class="w-full rounded-full h-full object-cover" />
            </div>
          </label>
        </div>

        <app-input required v-model="profile.firstName" label="Имя" placeholder="Имя" />
        <app-input required v-model="profile.lastName" label="Фамилия" placeholder="Фамилия" />
        <app-input required v-model="profile.middleName" label="Отчество" placeholder="Отчество" />
        
        <app-input required v-model="profile.phone" label="Телефон" placeholder="Телефон" />
        <app-input v-model="profile.birthDate" label="Дата рождения" placeholder="Дата рождения" type="date" />

        <app-input v-model="profile.email" label="Email" placeholder="Email" />
        <app-input v-model="profile.address" label="Адрес" placeholder="Адрес" />
        
        <template v-if="profile.role === 'DOCTOR'">
          <app-input required v-model="profile.experience" label="Опыт" placeholder="Опыт" type="number" />
          <app-textarea required v-model="profile.content" label="Контент" placeholder="Контент" />
        </template>
  
        <div class="w-full" hidden>
          <input @change="handleFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
        </div>
        <app-btn :disabled="createLoading" type="submit">
            {{ createLoading?'Загружается':'Сохранить' }}
        </app-btn>
      </form>
    </div>
    <form @submit.prevent="handleUpdatePassword" class="p-4 border rounded bg-white h-min flex flex-col gap-4">
        <h1 class="text-lg">Изменить Пароль</h1>
        <app-input v-model="password.oldPassword" required label="Старый пароль" placeholder="Старый пароль" />
        <app-input v-model="password.newPassword" required label="Новый пароль" placeholder="Новый пароль" />
        <app-input v-model="password.confirmPassword" required label="Повторите новый пароль" placeholder="Повторите новый пароль" />
        <app-btn :disabled="isDisabledPassword" type="submit" size="medium">Изменить пароля</app-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { pickNeededUserFields } from '~/constants'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { pushAlert } = useAlert() 
const { changeAvatar, changePassword, updateUserMe, getMe } = useUsers()

const { data } = await getMe()

const file = ref<any>(null)
const profile = ref(pickNeededUserFields(data.value as any))
const createLoading = ref<boolean>(false)

const password = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
})

// const isEdited = computed(() => {
//   return Object.keys(profile).map((key) => {

//     const profileKey = profile.value[key as keyof typeof profile.value]

//     return profileKey === data.value![key as keyof typeof data.value]
//   }).every(k => k === true)
// })

const isDisabledPassword = computed(() => {
  return !password.oldPassword.trim() ||
         !password.newPassword.trim() || 
         !password.confirmPassword.trim() || 
         password.confirmPassword !== password.newPassword ||
         password.oldPassword === password.newPassword
})

const handleUpdateUser = async () => {
  try {
    delete profile.value.avatar;
    delete profile.value.role;
    const response = await updateUserMe(profile.value)
    Object.assign(profile.value, response)
    
    pushAlert('Данные успешно изменено✅', 'SUCCESS')
  } catch (error) {
      console.log(error)
  }
}

const handleFileChange = async (e: any) => {
  const fileValue = e.target?.files?.[0]

  if(!fileValue) return
  file.value = fileValue

  const formData = new FormData()
  formData.append('avatar', fileValue)

  const { avatar } = await changeAvatar(formData)
  profile.value.avatar = avatar

  pushAlert('Аватар успешно изменено✅', 'SUCCESS')
}

const handleUpdatePassword = async () => {
  try {
    await changePassword(password)
    Object.assign(password, {
      password: "",
      new_password: "",
      confirm_password: ""
    })
    pushAlert('Пароль успешно изменено✅', 'SUCCESS')
  } catch (error) {
    console.log(error)
    alert('Ошыбка с измененем паролья❗')
  }
}
</script>