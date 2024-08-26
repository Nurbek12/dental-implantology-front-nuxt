<template>
  <transition name="fade">
    <div v-if="open" @click="emits('close-dialog')" class="fixed p-4 flex items-center z-50 justify-center w-full h-full inset-0 bg-black/20 backdrop-blur-sm transition">
      <div :class="props.rounded?'rounded':'rounded-3xl'" class="bg-white border p-4 overflow-auto max-w-[600px] max-h-[95vh] w-full scrollbar-hide" @click.stop>
        <div class="flex justify-between items-center">
          <h1 class="text-primary-600 font-normal text-xl">{{ props.title || 'App Dialog' }}</h1>
          <button @click="emits('close-dialog')" aria-label="close" aria-labelledby="close-dialog">
            <GlClose class="w-6 h-6 text-red-500" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { GlClose } from '@kalimahapps/vue-icons'
import { onBeforeUnmount, onMounted, defineEmits } from 'vue'

const emits = defineEmits(['close-dialog'])
const props = defineProps<{title: string, open: boolean, rounded?: boolean}>()
const { open } = toRefs(props)

onMounted(() => {
  window.addEventListener('keydown', e => {
    if(e.keyCode === 27) emits('close-dialog')
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keypress', () => {})
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>