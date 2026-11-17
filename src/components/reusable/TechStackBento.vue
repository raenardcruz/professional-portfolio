<template>
  <section id="skills" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span class="font-mono text-xs uppercase tracking-widest text-indigo-300">
            Production Tech Ecosystem
          </span>
          <h2 class="mt-2 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Core Engineering Pillars
          </h2>
          <p class="mt-3 max-w-2xl text-base text-body">
            Select any technology pill below to inspect which live platforms run it in production and jump to its engineering guide.
          </p>
        </div>

        <button
          v-if="selectedSkill"
          type="button"
          class="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-body transition-colors hover:border-indigo-400/50 hover:text-heading lg:self-auto"
          @click="selectedSkill = null"
        >
          <i class="pi pi-times text-[11px]" aria-hidden="true"></i>
          <span>Clear Filter ({{ selectedSkill.name }})</span>
        </button>
      </div>

      <!-- Interactive Production Usage Bar -->
      <div
        class="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-all duration-300 sm:px-6"
      >
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="font-mono text-xs uppercase tracking-wider text-subtle">
              {{ selectedSkill ? `${selectedSkill.name} in Production:` : 'Flagship Platforms:' }}
            </span>
            <a
              v-for="proj in flagshipLinks"
              :key="proj.name"
              :href="proj.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300"
              :class="
                isProjectHighlighted(proj.name)
                  ? 'border-indigo-400/60 bg-gradient-to-r from-indigo-500/25 to-cyan-400/20 text-heading shadow-glow-indigo'
                  : selectedSkill
                    ? 'border-white/5 bg-white/[0.02] text-subtle opacity-45'
                    : 'border-white/10 bg-white/[0.04] text-body hover:border-indigo-400/40 hover:text-heading'
              "
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="isProjectHighlighted(proj.name) ? 'bg-cyan-300' : 'bg-white/30'"
                aria-hidden="true"
              ></span>
              <span>{{ proj.name }}</span>
            </a>
          </div>

          <a
            v-if="selectedSkill?.kbLink"
            :href="selectedSkill.kbLink"
            class="inline-flex items-center gap-2 self-start rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3.5 py-1.5 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/25 sm:self-auto"
          >
            <i class="pi pi-book text-xs" aria-hidden="true"></i>
            <span>{{ selectedSkill.kbLabel || 'Read Engineering Guide' }}</span>
            <i class="pi pi-arrow-right text-[10px]" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <!-- 2x2 Bento Grid -->
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="pillar in skillPillars"
          :key="pillar.id"
          class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/40 sm:p-8"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br"
                :class="pillar.accentClass"
              >
                <i :class="pillar.icon" class="text-base" aria-hidden="true"></i>
              </span>
              <div>
                <h3 class="font-display text-xl font-bold text-heading">
                  {{ pillar.title }}
                </h3>
                <p class="font-mono text-xs text-subtle">
                  {{ pillar.subtitle }}
                </p>
              </div>
            </div>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-body">
            {{ pillar.description }}
          </p>

          <!-- Interactive Tech Pills -->
          <div class="mt-6 flex flex-wrap gap-2">
            <button
              v-for="skill in pillar.skills"
              :key="skill.name"
              type="button"
              :aria-pressed="selectedSkill?.name === skill.name"
              class="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200"
              :class="
                selectedSkill?.name === skill.name
                  ? 'border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white shadow-glow-indigo'
                  : 'border-white/10 bg-white/[0.04] text-body hover:border-indigo-400/40 hover:bg-white/[0.08] hover:text-heading'
              "
              @click="toggleSkill(skill)"
            >
              <span>{{ skill.name }}</span>
              <i
                v-if="skill.kbLink"
                class="pi pi-book text-[10px] opacity-70"
                aria-hidden="true"
                title="Includes Engineering Guide"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { skillPillars, type Skill, type FlagshipProjectName } from '../../data/skills'

const selectedSkill = ref<Skill | null>(null)

const flagshipLinks: Array<{ name: FlagshipProjectName; url: string }> = [
  { name: 'ClarifAI', url: 'https://clarifai.raenardcruz.com' },
  { name: 'Devotion', url: 'https://devotion.raenardcruz.com/#/' },
  { name: 'Oasi', url: 'https://oasi.raenardcruz.com/#/' },
  { name: 'Floowsynk', url: 'https://floowsynk.raenardcruz.com' },
]

const toggleSkill = (skill: Skill) => {
  if (selectedSkill.value?.name === skill.name) {
    selectedSkill.value = null
  } else {
    selectedSkill.value = skill
  }
}

const isProjectHighlighted = (projectName: FlagshipProjectName) => {
  if (!selectedSkill.value) return false
  return selectedSkill.value.projects.includes(projectName)
}
</script>
