<template>
  <div class="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white px-4 py-0.5 border rounded">
      <form @submit.prevent="handleUpdateUser" class="mt-4 flex flex-col gap-4 pb-4">
        <h1 class="text-lg">Изменить Данные</h1>
        
        <div class="flex items-center justify-start">
          <label for="file-input" class="cursor-pointer">
            <div class="w-[120px] h-[120px] border-2 hover:bg-primary-100 border-primary-600 p-1 overflow-hidden rounded-full">
              <img :src="currentImage" class="w-full rounded-full h-full object-cover" alt="">
            </div>
          </label>
        </div>

        <site-input required v-model="profile.first_name" label="Имя" placeholder="Имя" />
        <site-input required v-model="profile.last_name" label="Фамилия" placeholder="Фамилия" />
        <site-input required v-model="profile.middle_name" label="Отчество" placeholder="Отчество" />
        
        <site-input required v-model="profile.phone" label="Телефон" placeholder="Телефон" />
        <site-input required v-model="profile.birth_date" label="Дата рождения" placeholder="Дата рождения" type="date" />
        
        <template v-if="profile.user_type === 'DOCTOR'">
          <site-textarea required v-model="profile.experience" label="Образование" placeholder="Образование" />
          <site-textarea required v-model="profile.experiences" label="Опыт" placeholder="Опыт" />
          <site-textarea required v-model="profile.licences" label="Лицензия" placeholder="Лицензия" />
          <site-textarea required v-model="profile.certificates" label="Сертификаты" placeholder="Сертификаты" />
        </template>
  
        <div class="w-full" hidden>
          <input @change="handleFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
        </div>
        <site-btn :disabled="createLoading||isEdited" type="submit">
            {{ createLoading?'Загружается':'Сохранить' }}
        </site-btn>
      </form>
    </div>
    <form @submit.prevent="handleUpdatePassword" class="p-4 border rounded bg-white h-min flex flex-col gap-4">
        <h1 class="text-lg">Изменить Пароль</h1>
        <site-input v-model="password.password" required label="Старый пароль" placeholder="Старый пароль" />
        <site-input v-model="password.new_password" required label="Новый пароль" placeholder="Новый пароль" />
        <site-input v-model="password.confirm_password" required label="Повторите новый пароль" placeholder="Повторите новый пароль" />
        <site-btn :disabled="isDisabledPassword" type="submit" size="medium">Изменить пароля</site-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { IUser, IDoctor } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const { updateDoctor } = useDoctors()
const { changeAvatar, changePassword, updateUser } = useUsers()
const user = useUserData()
const file = ref<any>(null)
const createLoading = ref<boolean>(false)
const profile = reactive<IUser & IDoctor>({...user.value as any})
const currentImage = computed(() => {
  if(file.value) return URL.createObjectURL(file.value)
  else if(user.value?.avatar) return user.value?.avatar
  else return '/images/nophoto.jpg'
})

const password = reactive({
  password: "",
  new_password: "",
  confirm_password: ""
})

const isEdited = computed(() => {
  return Object.keys(profile).map((key) => {
    return !profile[key as keyof (IUser & IDoctor)]?.toString().trim() || profile[key as keyof (IUser & IDoctor)] === user.value![key as keyof typeof user.value]
  }).every(k => k === true)
})

const isDisabledPassword = computed(() => {
  return !password.password.trim() ||
         !password.new_password.trim() || 
         !password.confirm_password.trim() || 
         password.confirm_password !== password.new_password ||
         password.password === password.new_password
})

const handleUpdateUser = async () => {
  try {
    delete profile.avatar;
    delete (profile as any).experience
    const data: any = await (user.value?.user_type==='DOCTOR'?updateDoctor(user.value!.id!, profile):updateUser(user.value!.id!, profile))
    Object.assign(user.value!, data)
    Object.assign(profile, data)
    alert('Данные успешно изменено✅')
  } catch (error) {
      console.log(error)
  }
}

const handleFileChange = async (e: any) => {
  const f = e.target?.files?.[0]
  if(!f) return
  file.value = f
  const f_data = new FormData()
  f_data.append('avatar', f)
  const { avatar }: any = await changeAvatar(user.value!.id!, f_data)
  console.log(avatar);
  
  user.value!.avatar = avatar as string
}

const handleUpdatePassword = async () => {
  try {
    await changePassword(user.value!.id!, password)
    Object.assign(password, {
      password: "",
      new_password: "",
      confirm_password: ""
    })
    alert('Пароль изменено✅')
  } catch (error) {
    console.log(error)
    alert('Ошыбка с измененем паролья ')
  }
}
</script>