<template>
    <div class="w-full p-2">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      </div>
      <div class="mt-3 grid gap-2 grid-cols-1 md:grid-cols-2">
        <div class="min-h-[400px] border rounded bg-white p-4">
          <h2 class="font-normal mb-4">Ежемесячные записи</h2>
        </div>
        <div class="min-h-[400px] border rounded bg-white p-4">
          <h2 class="font-normal mb-4">Популярные врачи</h2>
        </div>
      </div>

      <div class="mt-4"></div>
    </div>
    <div class="hidden">
      <span class="bg-red-500/20 text-red-500"></span>
      <span class="bg-primary-500/20 text-primary-500"></span>
      <span class="bg-yellow-400/20 text-yellow-400"></span>
      <span class="bg-green-500/20 text-green-500"></span>
    </div>
</template>

<script setup lang="ts">
const user = useUserData()
const router = useRouter()
const tab_data = reactive<any>({})

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

if(user.value?.user_type === 'DOCTOR') router.push('/admin/appointments-doctors')
if(user.value?.user_type === 'SUPERUSER') router.push('/admin/appointments')
</script>