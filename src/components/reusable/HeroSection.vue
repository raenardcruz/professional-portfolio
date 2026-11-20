<template>
  <section id="hero" class="relative pt-10 pb-16 sm:pt-14 sm:pb-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- 2-Column Asymmetric Curved Hero -->
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Left Column (Desktop) / Below Portrait (Mobile) -->
        <div class="order-2 lg:order-1 lg:col-span-7">
          <!-- Interactive Persona Pill Segmented Control -->
          <div class="mb-7">
            <span class="mb-2.5 block font-mono text-xs uppercase tracking-widest text-subtle">
              Tailor view for
            </span>
            <div
              role="tablist"
              aria-label="Visitor Persona"
              class="inline-flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl"
            >
              <button
                v-for="persona in personas"
                :key="persona.id"
                type="button"
                role="tab"
                :aria-selected="activePersona === persona.id"
                class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ease-spring sm:text-sm"
                :class="
                  activePersona === persona.id
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white shadow-glow-indigo'
                    : 'text-body hover:bg-white/[0.06] hover:text-heading'
                "
                @click="activePersona = persona.id"
              >
                {{ persona.label }}
              </button>
            </div>
          </div>

          <!-- H1: Primary Identity -->
          <h1 class="font-display text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
            Raenard Cruz
            <span class="mt-2 block text-xl font-semibold text-body sm:text-2xl lg:text-[1.65rem]">
              Senior Full-Stack &amp; AI Systems Architect
            </span>
          </h1>

          <!-- Dynamic Persona Subheadline & Concise 2-Line Summary -->
          <div class="mt-5 min-h-[104px] sm:min-h-[96px]">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div :key="activePersona">
                <p class="text-sm font-semibold tracking-wide text-indigo-300 sm:text-base">
                  {{ currentPersona.subheadline }}
                </p>
                <p class="mt-2 max-w-2xl text-base leading-relaxed text-body">
                  {{ currentPersona.summary }}
                </p>
              </div>
            </Transition>
          </div>

          <!-- Streamlined Action Row: 2 Clean Pill CTAs -->
          <div class="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-indigo transition-all duration-300 ease-spring hover:scale-[1.02] hover:brightness-110"
              @click="scrollToProjects"
            >
              <i class="pi pi-play-circle text-base" aria-hidden="true"></i>
              <span>Watch Product Demos</span>
            </button>

            <a
              href="https://docs.google.com/document/d/1-xNGMsBZrgRewXn3EBTWfmN6-g_aEkfT/edit?usp=sharing&ouid=114428223977798358412&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-heading backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/50 hover:bg-white/[0.08]"
            >
              <span>Download Resume / CV</span>
              <i class="pi pi-arrow-up-right text-xs text-body" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Right Column: Prominent Curved Portrait Frame -->
        <div class="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div
            class="w-full max-w-[340px] rounded-3xl bg-gradient-to-br from-indigo-500/60 via-purple-500/40 to-cyan-400/60 p-[1.5px] shadow-glow-indigo sm:max-w-[380px] lg:max-w-full"
          >
            <div
              class="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#0C1220]"
            >
              <!-- Subtle internal aurora glow behind portrait -->
              <div
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(99,102,241,0.22),transparent_65%),radial-gradient(circle_at_80%_75%,rgba(34,211,238,0.14),transparent_60%)]"
              ></div>

              <div class="relative aspect-[4/5] w-full">
                <img
                  :src="ProfilePicture"
                  alt="Raenard Cruz — Senior Full-Stack & AI Systems Architect"
                  loading="eager"
                  decoding="async"
                  class="h-full w-full object-cover object-top"
                />

                <!-- Bottom glass vignette -->
                <div
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090D16] via-[#090D16]/60 to-transparent"
                ></div>

                <!-- Floating glass location / status pill -->
                <div
                  class="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-full border border-white/15 bg-[#090D16]/75 px-4 py-2 backdrop-blur-xl"
                >
                  <span class="flex items-center gap-2 text-xs font-medium text-heading">
                    <span class="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
                    <span>Muntinlupa, PH &bull; UTC+8</span>
                  </span>
                  <span class="font-mono text-[11px] text-cyan-300">Open to Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Proof Metric Strip (3 Equal-Width Curved Glass Cards) -->
      <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <div
          v-for="metric in currentPersona.metrics"
          :key="metric.value"
          class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/40"
        >
          <p class="font-display text-2xl font-bold tracking-tight text-heading tabular-nums sm:text-3xl">
            {{ metric.value }}
          </p>
          <p class="mt-1 text-sm text-body">
            {{ metric.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProfilePicture from '../../assets/profilepicture.png'

type PersonaId = 'recruiter' | 'founder' | 'engineer'

interface PersonaConfig {
  id: PersonaId
  label: string
  subheadline: string
  summary: string
  metrics: Array<{ value: string; label: string }>
}

const personas: PersonaConfig[] = [
  {
    id: 'recruiter',
    label: 'Recruiter / Eng Lead',
    subheadline: 'Fault-Tolerant Distributed Systems & Full-Stack Leadership',
    summary:
      '13+ years architecting fault-tolerant Go & C# distributed systems, Kafka/gRPC pipelines, and production Vue/React AI applications that scale cleanly.',
    metrics: [
      { value: '13+ Years', label: 'Enterprise & Startup Production Experience' },
      { value: '4+ Live Platforms', label: 'Production AI, SaaS & Distributed Apps' },
      { value: '35+ Guides', label: 'Deep-Dive System Design & Code Articles' },
    ],
  },
  {
    id: 'founder',
    label: 'Founder / Client',
    subheadline: '0-to-1 AI SaaS & Revenue-Ready Product Architecture',
    summary:
      'Turning ambitious product visions into shipped web & iOS platforms—combining custom LLM agents, real-time voice intelligence, and conversion-focused UX.',
    metrics: [
      { value: '13+ Years', label: 'End-to-End Product Engineering & Delivery' },
      { value: '4+ Live Platforms', label: 'Shipped AI Voice, Liturgical & SaaS Apps' },
      { value: '35+ Guides', label: 'Battle-Tested Architecture Blueprints' },
    ],
  },
  {
    id: 'engineer',
    label: 'Fellow Engineer',
    subheadline: 'Go Concurrency, Local LLM Inference & Event-Driven Craft',
    summary:
      'Focused on clean Go goroutine pipelines, zero-hallucination RAG citation engines, local Ollama GPU orchestration, and high-craft Vue 3 / TypeScript systems.',
    metrics: [
      { value: '13+ Years', label: 'Systems, Cloud & Polyglot Engineering' },
      { value: '4+ Live Platforms', label: 'Go, Kafka, gRPC & Multi-Agent Production' },
      { value: '35+ Guides', label: 'Open Engineering Docs & Code Patterns' },
    ],
  },
]

const activePersona = ref<PersonaId>('recruiter')

const defaultPersona: PersonaConfig = {
  id: 'recruiter',
  label: 'Recruiter / Eng Lead',
  subheadline: 'Fault-Tolerant Distributed Systems & Full-Stack Leadership',
  summary:
    '13+ years architecting fault-tolerant Go & C# distributed systems, Kafka/gRPC pipelines, and production Vue/React AI applications that scale cleanly.',
  metrics: [
    { value: '13+ Years', label: 'Enterprise & Startup Production Experience' },
    { value: '4+ Live Platforms', label: 'Production AI, SaaS & Distributed Apps' },
    { value: '35+ Guides', label: 'Deep-Dive System Design & Code Articles' },
  ],
}

const currentPersona = computed<PersonaConfig>(
  () => personas.find((p) => p.id === activePersona.value) ?? defaultPersona
)

const scrollToProjects = () => {
  const el = document.getElementById('projects')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
