<template>
    <div class="w-full p-2">
        <app-data-table
            :count="count"
            :items="items"
            :headers="headers"
            
            @fetching="getItems">
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs text-balance">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <button @click="update(tableItem.id!, index, { publish: !tableItem.publish })" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">{{ tableItem.publish?'Скрыть':'Публиковать' }}</button>
                    <button @click="editItem(tableItem, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Изменить</button>
                    <button @click="deleteItem(tableItem.id!, index)" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-xs px-3 py-2 rounded">Удалить</button>
                </div>
            </template>
        </app-data-table>
    </div>
    <app-dialog title="Изменить ответ" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="w-full border overflow-hidden rounded">
                <textarea readonly required v-model="faqs.title_ru" class="text-sm py-2 px-3 w-full outline-none resize-none" rows="4" type="text" placeholder="Название" />
            </div>
            <div class="w-full border overflow-hidden rounded">
                <textarea required v-model="faqs.title_uz" class="text-sm py-2 px-3 w-full outline-none resize-none" rows="4" type="text" placeholder="Название (UZ)" />
            </div>
            <div class="w-full border overflow-hidden rounded">
                <textarea required v-model="faqs.content_ru" class="text-sm py-2 px-3 w-full outline-none resize-none" rows="4" type="text" placeholder="Описание" />
            </div>
            <div class="w-full border overflow-hidden rounded">
                <textarea required v-model="faqs.content_uz" class="text-sm py-2 px-3 w-full outline-none resize-none" rows="4" type="text" placeholder="Описание (UZ)" />
            </div>
            <button :disabled="createLoading" type="submit" class="bg-[#23408e] hover:bg-[#385399] active:bg-[#3c67d5] disabled:bg-[#1b2e63] text-white text-sm px-3 py-2 rounded">
                {{ createLoading?'Загружается':'Сохранить' }}
            </button>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import type { FAQs } from '@/types'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['auth'],
})

const dialog = ref(false)
const count = ref<number>(0)
const items = ref<FAQs[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const faqs = reactive<FAQs>({
    title_uz: "",
    title_ru: "",
    content_uz: "",
    content_ru: "",
    publish: false,
})

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Вопрос", value: "title", sortable: true, balancedText: false, custom: false },
    { name: "Ответ", value: "content", sortable: true, balancedText: false, custom: false },
    { name: "Дата", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: true, balancedText: false, custom: true },
]

const getItems = async (params: any) => {
    const data = await $fetch(`/api/faqs`, { params })
    count.value = data.count
    items.value = data.result as any
}

const editItem = (item: FAQs, index: number) => {
    Object.assign(faqs, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await $fetch(`/api/faqs/delete/${id}`, {
        method: 'delete'
    })
    console.log('Deleted', id)
    items.value.splice(index, 1)
}

const update = async (id: number, index: number, body: any) => {
    const data = await $fetch(`/api/faqs/update/${id}`, {
        method: 'put',
        body: JSON.stringify(body)
    })
    Object.assign(items.value[index], data)
}

const save = async () => {
    await update(items.value[itemIndex.value!].id!, itemIndex.value!, faqs)
    close()
}

const close = () => {
    Object.assign(faqs, {
        title: "",
        content: "",
        publish: false,
    })
    dialog.value = false
    itemIndex.value = null
}
</script>