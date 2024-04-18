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
            <button @click="dialog=true" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white rounded text-xs px-3 py-2">Добавить</button>
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
              <button @click="update(index, { id: tableItem.id, publish: !tableItem.publish })" class="text-white text-xs px-3 py-2 rounded" :class="tableItem.publish?'bg-green-500 hover:bg-green-400':'bg-red-500 hover:bg-red-400'">
                <GlEye v-show="tableItem.publish" class="w-4 h-4" />
                <ChEyeSlash v-show="!tableItem.publish" class="w-4 h-4" />
              </button>
              <button @click="editItem(tableItem, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
              <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
            </div>
          </template>
      </app-data-table>
  </div>
  
  <app-dialog rounded :title="itemIndex==null?'Добавить новости':'Изменить новости'" :open="dialog" @close-dialog="close">
      <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
          <div class="flex items-center justify-start w-full">
            <label for="file-input" class="cursor-pointer w-full">
                <div class="w-full h-[200px] border-2 hover:bg-[#23408e20] border-[#23408e] p-1 overflow-hidden rounded">
                  <img :src="currentImage" class="w-full rounded h-full object-contain" alt="">
                </div>
            </label>
          </div>
          <div class="w-full border rounded overflow-hidden">
              <input required v-model="editedItem.author" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Автор">
          </div>
          <div class="w-full border rounded overflow-hidden">
              <input required v-model="editedItem.title" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Загаловок">
          </div>
          <div class="w-full border overflow-hidden rounded">
              <textarea required v-model="editedItem.description" class="text-sm py-2 px-3 w-full outline-none resize-none" rows="4" type="text" placeholder="Описания" />
          </div>
          <div class="w-full" hidden>
              <input @change="onFileChange" id="file-input" accept="image/*" type="file" placeholder="Фото для ава">
          </div>
          <div style="all: unset;">
            <editor v-model="editedItem.content" />
          </div>
          <button :disabled="createLoading" type="submit" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] rounded text-white text-sm px-3 py-2">
            {{ createLoading?'Загружается':'Сохранить' }}
          </button>
      </form>
  </app-dialog>
</template>

<script setup lang="ts">
import type { Article } from '@/types'
import { ChEyeSlash, GlEye } from '@kalimahapps/vue-icons'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const dialog = ref(false)
const file = ref<any>(null)
const count = ref<number>(0)
const items = ref<Article[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const editedItem = reactive<Article>({
  images: [],
  title: "",
  author: "",
  content: "",
  publish: true,
  description: "",
})
                         
const headers = [
  { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
  { name: "Фото", value: "image", sortable: true, balancedText: false, custom: true },
  { name: "Загаловок", value: "title", sortable: true, balancedText: false, custom: false },
  { name: "Описания", value: "description", sortable: false, balancedText: true, custom: false },
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
    const data = await $fetch(`/api/articles`, { params })
    items.value = data.result as any
    count.value = data.count
  } catch (error) {
    console.log(error)
  }
}

const onFileChange = (e: any) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return file.value = null
  return file.value = files[0]
}

const editItem = (item: Article, index: number) => {
  Object.assign(editedItem, item)
  itemIndex.value = index
  dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
  if(!confirm('Вы хотите удалить это?')) return
  await $fetch(`/api/articles/delete/${id}`, {
    method: 'delete'
  })
  items.value.splice(index, 1)
}

const uploadImage = async (file: any) => {
  const body = new FormData()
  body.append('file', file)
  return $fetch<{url: string, thumbnailUrl: string}>('/api/media/upload', {
    method: 'post', body
  })
}

const create = async (body: any) => {
  const data = await $fetch('/api/articles', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  items.value.push(data as any)
}

const update = async (index: number, body: any) => {
  const data = await $fetch(`/api/articles/update/${body.id}`, {
    method: 'put',
    body: JSON.stringify(body)
  })
  Object.assign(items.value[index], data)
}

const save = async () => {
  createLoading.value = true

  if(file.value) {
    const { url, thumbnailUrl } = await uploadImage(file.value)
    editedItem.image = url
    editedItem.thumb = thumbnailUrl
  }
  
  if(itemIndex.value !== null) update(itemIndex.value, editedItem)
      
  else create(editedItem)

  createLoading.value = false
  close()
}

const close = () => {
  Object.assign(editedItem, {
    images: [],
    title: "",
    author: "",
    content: "",
    publish: true,
    description: "",
  })
  file.value = null
  dialog.value = false
  itemIndex.value = null
}
</script>