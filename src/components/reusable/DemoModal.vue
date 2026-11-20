<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="project"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-title-${project.slug}`"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6"
        @click.self="emit('close')"
      >
        <div
          class="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0C1220]/95 p-6 shadow-glass backdrop-blur-2xl sm:p-8"
        >
          <!-- Modal Header -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <span
                class="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 font-mono text-xs font-medium text-indigo-300"
              >
                {{ project.category }}
              </span>
              <h3
                :id="`modal-title-${project.slug}`"
                class="mt-3 font-display text-2xl font-bold text-heading sm:text-3xl"
              >
                {{ project.title }}
              </h3>
              <p class="mt-1 text-sm text-body sm:text-base">
                {{ project.subtitle }}
              </p>
            </div>

            <button
              ref="closeButtonRef"
              type="button"
              aria-label="Close modal"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-body transition-colors hover:border-indigo-400/50 hover:bg-white/[0.1] hover:text-heading"
              @click="emit('close')"
            >
              <i class="pi pi-times text-sm"></i>
            </button>
          </div>

          <!-- Media Preview (Video Player or Architecture Screenshot) -->
          <div class="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#090D16]">
            <video
              v-if="project.video"
              :key="project.video"
              :src="project.video"
              :poster="project.image"
              controls
              autoplay
              playsinline
              class="aspect-video w-full bg-black object-contain"
            >
              Your browser does not support embedded video playback.
            </video>
            <div v-else class="relative aspect-video w-full overflow-hidden">
              <img
                :src="project.image"
                :alt="`${project.title} architecture preview`"
                class="h-full w-full object-cover object-top"
              />
              <div
                class="absolute bottom-4 left-4 rounded-full border border-white/15 bg-[#090D16]/80 px-3.5 py-1.5 font-mono text-xs text-cyan-300 backdrop-blur-xl"
              >
                Live Interactive Platform Preview
              </div>
            </div>
          </div>

          <!-- Key Metrics Strip -->
          <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              v-for="metric in project.metrics"
              :key="metric.label"
              class="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <p class="font-display text-lg font-bold text-heading tabular-nums">
                {{ metric.value }}
              </p>
              <p class="mt-0.5 text-xs text-body">
                {{ metric.label }}
              </p>
            </div>
          </div>

          <!-- Architecture Summary & Highlights -->
          <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h4 class="font-display text-sm font-semibold uppercase tracking-wider text-indigo-300">
                System Architecture
              </h4>
              <p class="mt-2.5 text-sm leading-relaxed text-body">
                {{ project.architectureSummary }}
              </p>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h4 class="font-display text-sm font-semibold uppercase tracking-wider text-cyan-300">
                Key Engineering Highlights
              </h4>
              <ul class="mt-2.5 space-y-2">
                <li
                  v-for="item in project.highlights"
                  :key="item"
                  class="flex items-start gap-2.5 text-sm text-body"
                >
                  <i class="pi pi-check-circle mt-0.5 text-xs text-emerald-400" aria-hidden="true"></i>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Full Tech Stack & Actions -->
          <div class="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-body"
              >
                {{ tech }}
              </span>
            </div>

            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-glow-indigo transition-all duration-300 ease-spring hover:scale-[1.02] hover:brightness-110"
            >
              <span>Open Live App</span>
              <i class="pi pi-arrow-up-right text-xs" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { Project } from '../../data/projects'

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  close: []
}>()

const closeButtonRef = ref<HTMLButtonElement | null>(null)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.project) {
    emit('close')
  }
}

watch(
  () => props.project,
  async (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeButtonRef.value?.focus()
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
