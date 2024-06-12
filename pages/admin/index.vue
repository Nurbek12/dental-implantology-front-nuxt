<template>
    <div class="w-full p-2">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <!-- <div v-for="item,i in dashboard_items" :key="i" class="border rounded p-2 flex gap-4 bg-white items-center">
          <div class="rounded w-[70px] h-[70px] p-2 flex items-center justify-center" :class="[item.class]">
            <component :is="item.icon" class="w-8 h-8 " />
          </div>
          <div>
            <p class="font-normal text-gray-800">{{ item.title }}</p>
            <h1 class="text-2xl font-medium">{{ tab_data?.[item.value] || 0 }}</h1>
          </div>
        </div> -->
      </div>
      <div class="mt-3 grid gap-2 grid-cols-1 md:grid-cols-2">
        <div class="min-h-[400px] border rounded bg-white p-4">
          <h2 class="font-normal mb-4">Ежемесячные записи</h2>
          <!-- <app-line-chart :items="tab_data?.monthly_appointments||[]" /> -->
        </div>
        <div class="min-h-[400px] border rounded bg-white p-4">
          <h2 class="font-normal mb-4">Популярные врачи</h2>
          <!-- <app-bar-chart :items="[{name:'Doctor 1', count: 12},{name:'Doctor 2', count: 43},{name:'Doctor 3', count: 34},{name:'Doctor 4', count: 54},]" /> -->
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
const tab_data = reactive<any>({})

definePageMeta({
  layout: 'admin-layout',
  // middleware: ['auth'],
})

const init = async () => {
  // const data = await $fetch('/api/info/admin')
  // Object.assign(tab_data, data)
}

init()
</script>