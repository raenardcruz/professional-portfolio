<template>
  <section id="guides" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Header Row -->
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span class="font-mono text-xs uppercase tracking-widest text-indigo-300">
            Engineering Knowledge Base
          </span>
          <h2 class="mt-2 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            System Design &amp; Code Guides
          </h2>
          <p class="mt-3 max-w-2xl text-base text-body">
            Deep-dive technical notes covering Go concurrency, Kafka event sourcing, NGINX hardening, and scalable Vue 3 architecture.
          </p>
        </div>

        <a
          href="#knowledge-base"
          class="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-heading backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/50 hover:bg-white/[0.08] sm:self-auto"
        >
          <span>Explore All 35+ Guides</span>
          <i class="pi pi-arrow-right text-xs text-cyan-300" aria-hidden="true"></i>
        </a>
      </div>

      <!-- Horizontal 4-Card Row -->
      <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="guide in featuredGuides"
          :key="guide.title"
          :href="guide.href"
          class="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 ease-spring hover:border-indigo-400/40 hover:bg-white/[0.06]"
        >
          <div>
            <div class="flex items-center justify-between gap-2">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-indigo-300 transition-colors group-hover:text-cyan-300"
              >
                <i :class="guide.icon" class="text-sm" aria-hidden="true"></i>
              </span>
              <span class="font-mono text-[11px] uppercase tracking-wider text-subtle">
                {{ guide.tag }}
              </span>
            </div>

            <h3 class="mt-5 font-display text-lg font-bold text-heading group-hover:text-indigo-200">
              {{ guide.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-body">
              {{ guide.description }}
            </p>
          </div>

          <span class="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <span>Read Guide</span>
            <i class="pi pi-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"></i>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface GuideCard {
  title: string
  tag: string
  description: string
  icon: string
  href: string
}

const featuredGuides: GuideCard[] = [
  {
    title: 'Go Concurrency',
    tag: 'Backend',
    description: 'Worker pools, context cancellation, channel patterns, and race-free goroutine orchestration.',
    icon: 'pi pi-code',
    href: '#knowledge-base/learning-materials/go/concurrency-and-best-practices.md',
  },
  {
    title: 'Kafka Event Sourcing',
    tag: 'Distributed',
    description: 'Event-driven state reconstruction, outbox patterns, and resilient consumer group design.',
    icon: 'pi pi-server',
    href: '#knowledge-base/learning-materials/devops/kafka-pattern-event-sourcing.md',
  },
  {
    title: 'NGINX Reverse Proxy',
    tag: 'DevOps',
    description: 'Production TLS termination, WebSocket proxying, rate limiting, and upstream load balancing.',
    icon: 'pi pi-shield',
    href: '#knowledge-base/learning-materials/devops/nginx-reverse-proxy.md',
  },
  {
    title: 'Scalable Vue 3',
    tag: 'Frontend',
    description: 'Feature-modular folder architecture, composable boundaries, and strict TypeScript patterns.',
    icon: 'pi pi-desktop',
    href: '#knowledge-base/vue/best-practice-scalable-folder-structure.md',
  },
]
</script>
