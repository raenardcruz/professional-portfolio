<template>
  <Navbar />
  <main class="flex-1">
    <HeroSection />
    <ProjectsBento />
    <TechStackBento />
    <GuidesSection />
  </main>
  <FooterContact />
</template>

<script setup lang="ts">
import Navbar from './reusable/Navbar.vue'
import HeroSection from './reusable/HeroSection.vue'
import ProjectsBento from './reusable/ProjectsBento.vue'
import TechStackBento from './reusable/TechStackBento.vue'
import GuidesSection from './reusable/GuidesSection.vue'
import FooterContact from './reusable/FooterContact.vue'
</script>
