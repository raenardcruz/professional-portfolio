<template>
  <footer id="contact" class="relative border-t border-white/10 pt-20 pb-12">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Zero-Form Curved Gradient-Bordered Glass Contact CTA Banner -->
      <div
        class="rounded-3xl bg-gradient-to-r from-indigo-500/40 via-purple-500/35 to-cyan-400/40 p-[1.5px] shadow-glow-indigo"
      >
        <div
          class="flex flex-col justify-between gap-8 rounded-[calc(1.5rem-1.5px)] bg-[#0C1220]/95 p-7 backdrop-blur-2xl sm:p-10 lg:flex-row lg:items-center"
        >
          <div class="max-w-xl">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
              <span>Available for Senior Full-Stack, AI &amp; Architecture Roles</span>
            </span>

            <h2 class="mt-4 font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Let's Build Something Extraordinary
            </h2>
            <p class="mt-2.5 text-sm leading-relaxed text-body sm:text-base">
              Have a distributed system to architect, an AI product to launch, or a senior engineering role to fill? Reach out directly—no forms required.
            </p>

            <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-body sm:text-sm">
              <span class="inline-flex items-center gap-2">
                <i class="pi pi-map-marker text-indigo-300" aria-hidden="true"></i>
                <span>Muntinlupa, PH (UTC+8)</span>
              </span>
              <a
                href="tel:+639155179745"
                class="inline-flex items-center gap-2 transition-colors hover:text-heading"
              >
                <i class="pi pi-phone text-cyan-300" aria-hidden="true"></i>
                <span class="tabular-nums">+63 915 517 9745</span>
              </a>
              <span class="inline-flex items-center gap-2">
                <i class="pi pi-clock text-purple-300" aria-hidden="true"></i>
                <span>Flexible Global Overlap</span>
              </span>
            </div>
          </div>

          <!-- Direct Action Buttons -->
          <div class="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm font-semibold text-heading transition-all duration-300 ease-spring hover:border-indigo-400/50 hover:bg-white/[0.1]"
              @click="copyEmail"
            >
              <i
                :class="copied ? 'pi pi-check text-emerald-400' : 'pi pi-copy text-indigo-300'"
                aria-hidden="true"
              ></i>
              <span>{{ copied ? 'Copied Email!' : 'raenard.cruz@gmail.com' }}</span>
            </button>

            <a
              href="mailto:raenard.cruz@gmail.com"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-indigo transition-all duration-300 ease-spring hover:scale-[1.02] hover:brightness-110"
            >
              <i class="pi pi-send text-xs" aria-hidden="true"></i>
              <span>Compose Email</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Minimal Footer Bar -->
      <div
        class="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center"
      >
        <div>
          <p class="font-display text-sm font-bold tracking-wider text-heading">
            RAENARD CRUZ
          </p>
          <p class="mt-1 text-xs text-subtle">
            &copy; {{ new Date().getFullYear() }} Raenard Cruz. Engineered with Vue 3, TypeScript &amp; Tailwind CSS.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <a
            href="https://github.com/raenardcruz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-body transition-all duration-200 hover:border-indigo-400/40 hover:text-heading"
          >
            <i class="pi pi-github text-sm" aria-hidden="true"></i>
          </a>
          <a
            href="https://linkedin.com/in/raenardcruz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-body transition-all duration-200 hover:border-indigo-400/40 hover:text-heading"
          >
            <i class="pi pi-linkedin text-sm" aria-hidden="true"></i>
          </a>
          <a
            href="mailto:raenard.cruz@gmail.com"
            aria-label="Email"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-body transition-all duration-200 hover:border-indigo-400/40 hover:text-heading"
          >
            <i class="pi pi-envelope text-sm" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const copied = ref(false)
const toast = useToast()

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('raenard.cruz@gmail.com')
    copied.value = true
    toast.add({
      severity: 'success',
      summary: 'Email Copied',
      detail: 'raenard.cruz@gmail.com copied to clipboard',
      life: 2500,
    })
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    window.location.href = 'mailto:raenard.cruz@gmail.com'
  }
}
</script>
