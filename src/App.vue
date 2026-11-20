<template>
  <div class="aurora-canvas" aria-hidden="true"></div>
  <div class="relative z-10 flex min-h-screen flex-col">
    <component :is="activeView" />
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Home from './components/Home.vue'
import KnowledgeBase from './components/KnowledgeBase.vue'
import Toast from 'primevue/toast'

const currentHash = ref(window.location.hash)

const updateRoute = () => {
  currentHash.value = window.location.hash
}

onMounted(() => {
  window.addEventListener('hashchange', updateRoute)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateRoute)
})

const activeView = computed(() => {
  if (currentHash.value.startsWith('#knowledge-base')) {
    return KnowledgeBase
  }
  return Home
})
</script>