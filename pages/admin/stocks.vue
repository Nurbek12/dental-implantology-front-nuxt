<template>
  <div class="w-full p-2">
      <app-data-table
          :count="count"
          :items="items"
          :headers="headers"
          
          @fetching="getItems">
          <template #table-top>
              <div class="hidden lg:block"></div>
              <div class="hidden lg:block"></div>
              <site-button size="medium" @click="dialog=true">Добавить</site-button> 
          </template>
          <template #table-item-image="{tableItem}">
              <div class="w-[40px] h-[40px] rounded overflow-hidden">
                  <img :src="tableItem.thumb||'/images/nophoto.jpg'" class="w-full h-full object-cover">
              </div>
          </template>
          <template #table-item-created_at="{tableItem}">
              <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
          </template>
          <template #table-item-actions="{tableItem,index}">
              <div class="flex gap-1">
                <site-button @click="editItem(tableItem, index)">Изменить</site-button>
                <site-button  @click="deleteItem(tableItem.id!, index)">Удалить</site-button>
              </div>
          </template>
      </app-data-table>
  </div>
  
  <app-dialog rounded :title="itemIndex==null?'Добавить доктор':'Изменить доктор'" :open="dialog" @close-dialog="close">
      <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
          <div class="flex items-center justify-start w-full">
              <label for="file-input" class="cursor-pointer w-full">
                  <div class="w-full h-[200px] border-2 hover:bg-blue-600/20 border-blue-600 p-1 overflow-hidden rounded">
                      <img :src="currentImage" class="w-full rounded h-full object-contain" alt="">
                  </div>
              </label>
          </div>
          <site-input required v-model="editedItem.name_uz" placeholder="Загаловок (UZ)" />
        
          <site-input required v-model="editedItem.name_ru" placeholder="Загаловок (RU)" />

          <site-input required v-model="editedItem.start_date" type="date" placeholder="Дата начала" />

          <site-input required v-model="editedItem.end_date" type="date" placeholder="Дата конца" />
          
          <site-input required v-model="editedItem.discount" type="number" placeholder="Специальность" />

          <site-textarea required v-model="editedItem.description_uz" placeholder="Описания (UZ)" />

          <site-textarea required v-model="editedItem.description_ru" placeholder="Описания (RU)" />

          <div class="w-full" hidden>
              <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
          </div>
          <site-button :disabled="createLoading" type="submit">
            {{ createLoading?'Загружается':'Сохранить' }}
          </site-button>
      </form>
  </app-dialog>
</template>

<script setup lang="ts">
import type { Stock } from '@/types'
// import { ChEyeSlash, GlEye } from '@kalimahapps/vue-icons'

definePageMeta({
  layout: 'admin-layout',
  // middleware: ['auth'],
})

const dialog = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<Stock[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const editedItem = reactive<Stock>({
  discount: 0,
  content: "",
  name_uz: "",
  name_ru: "",
  end_date: "",
  start_date: "",
  description_ru: "",
  description_uz: "",
})
                         
const headers = [
  { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
  { name: "Фото", value: "image", sortable: true, balancedText: false, custom: true },
  { name: "Загаловок", value: "name_ru", sortable: true, balancedText: false, custom: false },
  { name: "Описания", value: "description_ru", sortable: false, balancedText: true, custom: false },
  { name: "Дата начала", value: "start_date", sortable: false, balancedText: false, custom: false },
  { name: "Дата конца", value: "end_date", sortable: false, balancedText: false, custom: false },
  { name: "Дата создания", value: "created_at", sortable: true, balancedText: false, custom: true },
  { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const currentImage = computed(() => {
  if(file.value) return URL.createObjectURL(file.value)
  else if(itemIndex.value!==null) return items.value[itemIndex.value]?.thumb || '/images/nophoto.jpg'
  else return '/images/nophoto.jpg'
})

const getItems = async (params: any) => {
  try {
      // const data = await $fetch(`/api/stock`, { params })
      // items.value = data.result as any
      // count.value = data.count
  } catch (error) {
      console.log(error)
  }
}

const onFileChange = (e: any) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return file.value = null
  return file.value = files[0]
}

const editItem = (item: Stock, index: number) => {
  Object.assign(editedItem, item)
  itemIndex.value = index
  dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
  if(!confirm('Вы хотите удалить это?')) return
  await $fetch(`/api/stock/delete/${id}`, {
      method: 'delete'
  })
  items.value.splice(index, 1)
}

const uploadImage = async (file: any) => {
  const body = new FormData()
  body.append('file', file)
  // return $fetch<{url: string, thumbnailUrl: string}>('/api/media/upload', {
  //     method: 'post', body
  // })
}

const create = async (body: any) => {
  // const data = await $fetch('/api/stock', {
  //     method: 'POST',
  //     body: JSON.stringify(body)
  // })
  // items.value.push(data as any)
}

const update = async (index: number, body: any) => {
  // const data = await $fetch(`/api/stock/update/${body.id}`, {
  //     method: 'put',
  //     body: JSON.stringify(body)
  // })
  // Object.assign(items.value[index], data)
}

const save = async () => {
  createLoading.value = true

  // if(file.value) {
  //   const { url, thumbnailUrl } = await uploadImage(file.value)
  //   editedItem.image = url
  //   editedItem.thumb = thumbnailUrl
  // }
  
  if(itemIndex.value !== null) update(itemIndex.value, editedItem)
      
  else create(editedItem)

  createLoading.value = false
  close()
}

const close = () => {
  Object.assign(editedItem, {
    discount: 0,
    content: "",
    name_uz: "",
    name_ru: "",
    end_date: "",
    start_date: "",
    description_ru: "",
    description_uz: "",
  })
  file.value = null
  dialog.value = false
  itemIndex.value = null
}
</script>