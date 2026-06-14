<template>
    <div class="mesh-bg"></div>
    <component :is="activeView" />
    <Toast />
</template>

<script setup>
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