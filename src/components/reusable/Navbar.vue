<template>
  <header class="sticky top-5 z-50 mx-auto w-full max-w-5xl px-4 sm:px-6">
    <div
      class="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[#090D16]/75 px-4 py-2.5 shadow-glass backdrop-blur-xl transition-all duration-300 ease-spring"
      :class="{ 'border-white/15 bg-[#090D16]/90': isScrolled }"
    >
      <!-- Left: Monogram + Availability -->
      <a
        href="#"
        class="group flex items-center gap-3 rounded-full pr-2 text-left focus-visible:outline-none"
        aria-label="Raenard Cruz — Back to top"
        @click.prevent="goHome"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-cyan-400/25 font-display text-xs font-bold tracking-wider text-heading transition-transform duration-300 ease-spring group-hover:scale-105"
        >
          RC
        </span>
        <span class="hidden items-center gap-2 text-xs font-medium text-body sm:inline-flex">
          <span class="relative flex h-2 w-2" aria-hidden="true">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
          </span>
          <span class="whitespace-nowrap">Available &bull; PH / Global Remote</span>
        </span>
      </a>

      <!-- Center: 4 Clean Anchor Links (Desktop) -->
      <nav aria-label="Primary Navigation" class="hidden items-center gap-1 md:flex">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200"
          :class="
            isItemActive(item)
              ? 'bg-white/10 text-heading shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]'
              : 'text-body hover:bg-white/[0.05] hover:text-heading'
          "
          @click.prevent="handleNavClick(item)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Right: Primary Gradient Pill CTA + Mobile Drawer Trigger -->
      <div class="flex items-center gap-2">
        <a
          href="#contact"
          class="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-glow-indigo transition-all duration-300 ease-spring hover:scale-[1.03] hover:brightness-110 sm:inline-flex"
          @click.prevent="navigateToSection('contact')"
        >
          <span>Let's Talk</span>
        </a>

        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-heading transition-colors hover:border-indigo-400/40 hover:bg-white/[0.08] md:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-nav-drawer"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-sm"></i>
        </button>
      </div>
    </div>

    <!-- Accessible Mobile Drawer (< 768px) -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        class="mt-3 rounded-3xl border border-white/10 bg-[#090D16]/95 p-4 shadow-glass backdrop-blur-2xl md:hidden"
      >
        <div class="mb-3 flex items-center gap-2 px-3 text-xs text-body">
          <span class="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
          <span>Available &bull; PH / Global Remote</span>
        </div>
        <nav class="flex flex-col gap-1" aria-label="Mobile links">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href"
            class="rounded-2xl px-4 py-3 text-sm font-medium transition-colors"
            :class="
              isItemActive(item)
                ? 'bg-white/10 text-heading'
                : 'text-body hover:bg-white/[0.05] hover:text-heading'
            "
            @click.prevent="handleNavClick(item)"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            class="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-glow-indigo"
            @click.prevent="navigateToSection('contact')"
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface NavItem {
  id: string
  label: string
  href: string
  isRoute?: boolean
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview', href: '#' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Tech Stack', href: '#skills' },
  { id: 'guides', label: 'Guides', href: '#guides' },
]

const currentHash = ref(window.location.hash)
const isScrolled = ref(false)
const activeSection = ref('hero')
const mobileMenuOpen = ref(false)

const isKnowledgeBase = computed(() => currentHash.value.startsWith('#knowledge-base'))

const isItemActive = (item: NavItem) => {
  if (isKnowledgeBase.value) {
    return item.id === 'guides'
  }
  return activeSection.value === item.id
}

const updateHash = () => {
  currentHash.value = window.location.hash
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
  if (isKnowledgeBase.value) return

  const ids = ['hero', 'projects', 'skills', 'guides', 'contact']
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120) {
        activeSection.value = id === 'contact' ? 'guides' : id
      }
    }
  }
}

const navigateToSection = (id: string) => {
  mobileMenuOpen.value = false
  if (isKnowledgeBase.value) {
    window.location.hash = '#'
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return
  }

  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleNavClick = (item: NavItem) => {
  navigateToSection(item.id)
}

const goHome = () => {
  mobileMenuOpen.value = false
  if (isKnowledgeBase.value) {
    window.location.hash = '#'
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('hashchange', updateHash)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateHash)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
