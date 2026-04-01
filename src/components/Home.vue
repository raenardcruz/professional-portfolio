<template>
    <div class="mesh-bg"></div>
    <Header />
    <main>
        <Hero />
        <Skills />
        <Projects />
    </main>
    <Footer />
</template>

<script setup>
import Header from './reusable/Header.vue'
import Hero from './reusable/Hero.vue'
import Skills from './reusable/Skills.vue'
import Projects from './reusable/Projects.vue'
import Footer from './reusable/Footer.vue'
</script>

<style scoped>
main {
    width: 100%;
}
</style>
