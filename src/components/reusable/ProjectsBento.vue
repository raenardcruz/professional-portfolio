<template>
  <section id="projects" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header + Category Filter Pills -->
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span class="font-mono text-xs uppercase tracking-widest text-indigo-300">
            Selected Production Work
          </span>
          <h2 class="mt-2 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Featured Platforms &amp; Case Studies
          </h2>
          <p class="mt-3 max-w-2xl text-base text-body">
            End-to-end AI SaaS, distributed workflow engines, and social-impact platforms shipped to production.
          </p>
        </div>

        <!-- Category Filter Pills -->
        <div
          role="tablist"
          aria-label="Filter projects by category"
          class="inline-flex shrink-0 flex-wrap gap-1.5 self-start rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl sm:flex-nowrap lg:self-auto"
        >
          <button
            v-for="cat in projectCategories"
            :key="cat"
            type="button"
            role="tab"
            :aria-selected="activeCategory === cat"
            class="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ease-spring sm:text-sm"
            :class="
              activeCategory === cat
                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white shadow-glow-indigo'
                : 'text-body hover:bg-white/[0.06] hover:text-heading'
            "
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- 2-Column Curved Bento Grid -->
      <div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/40 sm:p-7"
        >
          <div>
            <!-- Rounded Preview Thumbnail with Glass Play Overlay -->
            <div
              class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0C1220]"
            >
              <img
                :src="project.image"
                :alt="`${project.title} — ${project.subtitle}`"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-top transition-transform duration-500 ease-spring group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D16]/80 via-transparent to-transparent"
              ></div>

              <!-- Glass Play Demo / Architecture Pill Overlay -->
              <button
                type="button"
                class="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#090D16]/75 px-4 py-2 text-xs font-semibold text-heading backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/60 hover:bg-indigo-500/30"
                @click="selectedProject = project"
              >
                <i
                  :class="project.video ? 'pi pi-play-circle text-cyan-300' : 'pi pi-sitemap text-indigo-300'"
                  aria-hidden="true"
                ></i>
                <span>{{ project.video ? 'Play Demo' : 'Architecture View' }}</span>
                <span v-if="project.videoLabel" class="hidden font-mono text-[11px] text-body sm:inline">
                  &bull; {{ project.videoLabel.match(/\(([^)]+)\)/)?.[1] ?? '' }}
                </span>
              </button>
            </div>

            <!-- Category Badge & Title -->
            <div class="mt-6 flex items-center justify-between gap-3">
              <span
                class="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-xs font-medium text-indigo-300"
              >
                {{ project.category }}
              </span>
              <span class="font-mono text-xs text-subtle tabular-nums">
                0{{ project.id }}
              </span>
            </div>

            <h3 class="mt-3 font-display text-2xl font-bold tracking-tight text-heading">
              {{ project.title }}
            </h3>
            <p class="mt-1 text-sm font-medium text-cyan-300/90">
              {{ project.subtitle }}
            </p>

            <!-- Concise 2-Sentence Impact Description -->
            <p class="mt-3 text-sm leading-relaxed text-body sm:text-[0.95rem]">
              {{ project.description }}
            </p>

            <!-- Max 5 Tech Stack Pills -->
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies.slice(0, 5)"
                :key="tech"
                class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-body"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Footer Action Row -->
          <div class="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-heading transition-all duration-300 ease-spring hover:border-indigo-400/50 hover:bg-white/[0.1] sm:text-sm"
              @click="selectedProject = project"
            >
              <i :class="project.video ? 'pi pi-video' : 'pi pi-sliders-h'" class="text-xs text-indigo-300" aria-hidden="true"></i>
              <span>Watch Walkthrough</span>
            </button>

            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-body transition-colors hover:text-heading sm:text-sm"
            >
              <span>Live App</span>
              <i class="pi pi-arrow-up-right text-xs" aria-hidden="true"></i>
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- On-Demand Video & Architecture Modal -->
    <DemoModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, projectCategories, type Project, type ProjectFilterCategory } from '../../data/projects'
import DemoModal from './DemoModal.vue'

const activeCategory = ref<ProjectFilterCategory>('All')
const selectedProject = ref<Project | null>(null)

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }
  return projects.filter((p) => p.filterCategory === activeCategory.value)
})
</script>
