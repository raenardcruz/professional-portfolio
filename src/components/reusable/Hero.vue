<template>
    <section id="hero" class="hero" @mousemove="onHeroMouseMove" @click="triggerShockwave">
        <!-- Three.js Interactive 3D Canvas -->
        <canvas ref="heroCanvas" class="hero-webgl"></canvas>

        <!-- Interactive 3D Mode Switcher HUD (IKEA / Agency Effect) -->
        <div class="webgl-hud" @click.stop>
            <span class="hud-label"><i class="pi pi-sliders-h"></i> 3D Physics:</span>
            <button
                v-for="mode in visualModes"
                :key="mode.id"
                class="hud-mode-btn"
                :class="{ active: activeVisualMode === mode.id }"
                @click="setVisualMode(mode.id)"
            >
                <i :class="mode.icon"></i> {{ mode.name }}
            </button>
        </div>

        <div class="hero-container">
            <div class="hero-content">
                <!-- Left Column: Psychological Value Prop & Persona Switcher -->
                <div class="text-section">
                    <div class="top-badges">
                        <span class="greeting-badge">
                            <span class="live-ping"></span>
                            Available for Senior Architecture & AI Projects
                        </span>
                        <span class="location-badge">
                            <i class="pi pi-globe"></i> PH / Global Remote
                        </span>
                    </div>

                    <!-- Self-Reference Effect: Interactive Persona Selector -->
                    <div class="persona-lens" @click.stop>
                        <span class="persona-prompt">Tailor view for:</span>
                        <div class="persona-tabs">
                            <button
                                v-for="p in personas"
                                :key="p.id"
                                class="persona-tab"
                                :class="{ active: activePersona === p.id }"
                                @click="activePersona = p.id"
                            >
                                <i :class="p.icon"></i>
                                <span>{{ p.label }}</span>
                            </button>
                        </div>
                    </div>

                    <h1 class="name">
                        Hi, I'm <span class="gradient-name">Raenard Cruz</span>
                    </h1>

                    <transition name="slide-fade" mode="out-in">
                        <div :key="activePersona" class="persona-dynamic-block">
                            <h2 class="role">
                                {{ currentPersonaData.headline }}
                            </h2>
                            <p class="description">
                                {{ currentPersonaData.pitch }}
                            </p>
                            <div class="persona-highlights">
                                <span
                                    v-for="tag in currentPersonaData.highlights"
                                    :key="tag"
                                    class="highlight-chip"
                                >
                                    <i class="pi pi-check-circle"></i> {{ tag }}
                                </span>
                            </div>
                        </div>
                    </transition>

                    <!-- Primary Action Buttons -->
                    <div class="buttons" @click.stop>
                        <button class="btn btn-primary" @click="scroll('projects')">
                            <span class="play-pulse"><i class="pi pi-play-fill"></i></span>
                            <span>Watch Product Demos</span>
                        </button>
                        <button class="btn btn-video" @click="scroll('skills')">
                            <span>Explore 3D Tech Stack</span>
                            <i class="pi pi-sitemap"></i>
                        </button>
                        <a
                            class="btn btn-outline"
                            href="https://docs.google.com/document/d/1-xNGMsBZrgRewXn3EBTWfmN6-g_aEkfT/edit?usp=sharing&ouid=114428223977798358412&rtpof=true&sd=true"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Resume / CV</span>
                            <i class="pi pi-arrow-up-right"></i>
                        </a>
                    </div>

                    <!-- Anchoring Effect: High-Trust Engineering Metrics -->
                    <div class="metrics-bar">
                        <div class="metric-item">
                            <span class="metric-val">13<span class="plus">+</span></span>
                            <span class="metric-lbl">Years Production Exp.</span>
                        </div>
                        <div class="metric-divider"></div>
                        <div class="metric-item">
                            <span class="metric-val">4<span class="plus">+</span></span>
                            <span class="metric-lbl">Live AI & SaaS Platforms</span>
                        </div>
                        <div class="metric-divider"></div>
                        <div class="metric-item">
                            <span class="metric-val">35<span class="plus">+</span></span>
                            <span class="metric-lbl">System Design Guides</span>
                        </div>
                    </div>
                </div>

                <!-- Right Column: 3D Interactive Holo-Profile & Telemetry -->
                <div class="image-section" @click.stop>
                    <div
                        class="holo-card-wrapper"
                        :style="cardTiltStyle"
                        @mousemove="onCardMouseMove"
                        @mouseleave="resetCardTilt"
                    >
                        <div class="holo-ring ring-outer"></div>
                        <div class="holo-ring ring-inner"></div>
                        <div class="image-frame">
                            <div class="inner-glow"></div>
                            <img :src="ProfilePicture" alt="Raenard Cruz — Senior Full-Stack Developer" class="profile-pic" />

                            <!-- Floating Interactive Telemetry Badges -->
                            <div class="stats-card top-right" @click="scroll('projects')">
                                <span class="stat-icon purple"><i class="pi pi-microphone"></i></span>
                                <div class="stat-text">
                                    <span class="stat-kicker">Latest Launch</span>
                                    <span class="stat-main">ClarifAI Audio LLM</span>
                                </div>
                            </div>

                            <div class="stats-card bottom-left" @click="scroll('skills')">
                                <span class="stat-icon emerald"><i class="pi pi-server"></i></span>
                                <div class="stat-text">
                                    <span class="stat-kicker">Core Architecture</span>
                                    <span class="stat-main">Go • Vue 3 • Kafka • AI</span>
                                </div>
                            </div>

                            <div class="stats-card bottom-right" @click="scroll('projects')">
                                <span class="stat-icon gold"><i class="pi pi-star-fill"></i></span>
                                <div class="stat-text">
                                    <span class="stat-kicker">Track Record</span>
                                    <span class="stat-main">13 Years Excellence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="scroll-indicator" @click.stop="scroll('projects')">
                <span class="mouse">
                    <span class="wheel"></span>
                </span>
                <span class="text">Scroll for Video Demos & Case Studies</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import ProfilePicture from '../../assets/profilepicture.png'

const heroCanvas = ref(null)
const activePersona = ref('recruiter')
const activeVisualMode = ref('constellation')

const personas = [
    {
        id: 'recruiter',
        label: 'Recruiter / Eng Lead',
        icon: 'pi pi-briefcase',
        headline: 'Senior Full-Stack & Distributed Systems Architect',
        pitch: '13+ years architecting fault-tolerant backend systems in Go & C#, event-driven Kafka/gRPC pipelines, and high-craft Vue/React applications that scale effortlessly.',
        highlights: ['13+ Yrs Enterprise & Startup Exp', 'Go, C#, Vue 3, React & TypeScript', 'Cloud-Native Azure & Docker CI/CD']
    },
    {
        id: 'founder',
        label: 'Founder / Product Client',
        icon: 'pi pi-bolt',
        headline: 'End-to-End AI SaaS & Product Builder',
        pitch: 'I turn ambitious product visions into revenue-ready web & mobile platforms—combining custom AI agents, real-time transcription, and psychology-driven UX.',
        highlights: ['0-to-1 Full Product Ownership', 'Custom LLM & Voice AI Integration', 'Web + iOS Native Hybrid Delivery']
    },
    {
        id: 'engineer',
        label: 'Fellow Engineer',
        icon: 'pi pi-code',
        headline: 'Polyglot Systems Engineer & AI Orchestrator',
        pitch: 'Obsessed with clean concurrency patterns, zero-hallucination RAG citation engines, local Ollama GPU orchestration, and interactive WebGL/Three.js experiences.',
        highlights: ['Go Goroutines & Kafka Outbox Patterns', 'Google ADK & Local Ollama Inference', '35+ Open Engineering Guides']
    }
]

const currentPersonaData = computed(() => {
    return personas.find(p => p.id === activePersona.value) || personas[0]
})

const visualModes = [
    { id: 'constellation', name: 'Neural Core', icon: 'pi pi-share-alt' },
    { id: 'vortex', name: 'Orbital Vortex', icon: 'pi pi-sync' },
    { id: 'wave', name: 'Quantum Field', icon: 'pi pi-wave-pulse' }
]

// 3D Card Tilt state
const cardRotX = ref(0)
const cardRotY = ref(0)

const cardTiltStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${cardRotX.value}deg) rotateY(${cardRotY.value}deg)`
}))

const onCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRotX.value = (-y * 14).toFixed(2)
    cardRotY.value = (x * 14).toFixed(2)
}

const resetCardTilt = () => {
    cardRotX.value = 0
    cardRotY.value = 0
}

const scroll = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

// Three.js WebGL Hero Scene
let scene, camera, renderer, animId
let coreGroup, icosahedronMesh, innerKnotMesh, ring1, ring2, ring3
let particlesGeometry, particlesMaterial, particlesMesh
const PARTICLE_COUNT = 1100
let basePositions = new Float32Array(PARTICLE_COUNT * 3)
let targetPositions = new Float32Array(PARTICLE_COUNT * 3)

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
let shockwaveIntensity = 0

const computeModePositions = (mode) => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        if (mode === 'constellation') {
            // Spherical shell distribution with filaments
            const radius = 2.4 + Math.random() * 4.5
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
            targetPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            targetPositions[i3 + 2] = (radius * Math.cos(phi)) - 1.5
        } else if (mode === 'vortex') {
            // Spiral galaxy arms
            const arm = i % 3
            const radius = 0.8 + (i / PARTICLE_COUNT) * 6.2
            const spinAngle = radius * 2.2 + (arm * (Math.PI * 2)) / 3
            const randomOffset = (Math.random() - 0.5) * 0.65
            targetPositions[i3] = Math.cos(spinAngle) * radius + randomOffset
            targetPositions[i3 + 1] = (Math.random() - 0.5) * 1.4
            targetPositions[i3 + 2] = Math.sin(spinAngle) * radius - 1.5
        } else if (mode === 'wave') {
            // 3D Quantum grid wave
            const cols = 34
            const row = Math.floor(i / cols)
            const col = i % cols
            const x = (col - cols / 2) * 0.42
            const z = (row - cols / 2) * 0.42 - 1.2
            const y = Math.sin(x * 1.2) * Math.cos(z * 1.2) * 0.9 - 0.8
            targetPositions[i3] = x
            targetPositions[i3 + 1] = y
            targetPositions[i3 + 2] = z
        }
    }
}

const setVisualMode = (mode) => {
    activeVisualMode.value = mode
    computeModePositions(mode)
    shockwaveIntensity = 1.0
}

const triggerShockwave = () => {
    shockwaveIntensity = 1.15
}

const onHeroMouseMove = (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
}

const initHero3D = () => {
    if (!heroCanvas.value) return
    const width = window.innerWidth
    const height = window.innerHeight

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.set(0, 0, 6.5)

    renderer = new THREE.WebGLRenderer({
        canvas: heroCanvas.value,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    coreGroup = new THREE.Group()
    // Position the 3D geometric core slightly toward the right-center so it frames the profile & text
    coreGroup.position.set(2.2, 0.1, -1.2)
    scene.add(coreGroup)

    // Outer Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.85, 1)
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.22
    })
    icosahedronMesh = new THREE.Mesh(icoGeo, icoMat)
    coreGroup.add(icosahedronMesh)

    // Inner Glowing TorusKnot
    const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.22, 96, 16)
    const knotMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.16
    })
    innerKnotMesh = new THREE.Mesh(knotGeo, knotMat)
    coreGroup.add(innerKnotMesh)

    // 3 Orbital Gyro Rings
    const createOrbitalRing = (radius, color, rx, ry) => {
        const ringGeo = new THREE.TorusGeometry(radius, 0.012, 16, 120)
        const ringMat = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.35
        })
        const mesh = new THREE.Mesh(ringGeo, ringMat)
        mesh.rotation.x = rx
        mesh.rotation.y = ry
        return mesh
    }

    ring1 = createOrbitalRing(2.45, 0x10b981, Math.PI / 2.6, 0.3)
    ring2 = createOrbitalRing(2.85, 0xf59e0b, -Math.PI / 3.2, -0.4)
    ring3 = createOrbitalRing(3.25, 0xa855f7, Math.PI / 5, 0.8)
    coreGroup.add(ring1, ring2, ring3)

    // Particle System
    particlesGeometry = new THREE.BufferGeometry()
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    const palette = [
        new THREE.Color('#10b981'),
        new THREE.Color('#00f2fe'),
        new THREE.Color('#f59e0b'),
        new THREE.Color('#a855f7')
    ]

    computeModePositions('constellation')
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        basePositions[i3] = targetPositions[i3]
        basePositions[i3 + 1] = targetPositions[i3 + 1]
        basePositions[i3 + 2] = targetPositions[i3 + 2]

        const c = palette[i % palette.length]
        colors[i3] = c.r
        colors[i3 + 1] = c.g
        colors[i3 + 2] = c.b
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(basePositions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    particlesMaterial = new THREE.PointsMaterial({
        size: 0.048,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })

    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
}

let clock = new THREE.Clock()

const animateHero3D = () => {
    animId = requestAnimationFrame(animateHero3D)
    const elapsed = clock.getElapsedTime()

    mouse.x += (mouse.targetX - mouse.x) * 0.06
    mouse.y += (mouse.targetY - mouse.y) * 0.06
    shockwaveIntensity *= 0.94

    if (coreGroup) {
        const scaleBoost = 1 + shockwaveIntensity * 0.28
        coreGroup.scale.set(scaleBoost, scaleBoost, scaleBoost)

        icosahedronMesh.rotation.y = elapsed * 0.22 + mouse.x * 0.5
        icosahedronMesh.rotation.x = elapsed * 0.14 - mouse.y * 0.4

        innerKnotMesh.rotation.y = -elapsed * 0.35
        innerKnotMesh.rotation.z = elapsed * 0.25

        ring1.rotation.z = elapsed * 0.3
        ring2.rotation.z = -elapsed * 0.24
        ring3.rotation.y = elapsed * 0.18

        // Responsive positioning on mobile vs desktop
        const targetCoreX = window.innerWidth < 968 ? 0 : 2.2
        coreGroup.position.x += (targetCoreX - coreGroup.position.x) * 0.08
        coreGroup.position.y = Math.sin(elapsed * 0.8) * 0.15 + mouse.y * 0.3
    }

    if (particlesGeometry) {
        const posAttr = particlesGeometry.attributes.position
        const arr = posAttr.array

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3
            let tx = targetPositions[i3]
            let ty = targetPositions[i3 + 1]
            let tz = targetPositions[i3 + 2]

            if (activeVisualMode.value === 'wave') {
                ty = Math.sin(tx * 1.1 + elapsed * 1.6) * Math.cos(tz * 1.1 + elapsed * 1.2) * 0.85 - 0.6
            }

            // Apply shockwave expansion
            const push = 1 + shockwaveIntensity * 0.45
            arr[i3] += (tx * push - arr[i3]) * 0.06
            arr[i3 + 1] += (ty * push - arr[i3 + 1]) * 0.06
            arr[i3 + 2] += (tz * push - arr[i3 + 2]) * 0.06
        }
        posAttr.needsUpdate = true

        particlesMesh.rotation.y = elapsed * 0.05 + mouse.x * 0.25
        particlesMesh.rotation.x = -mouse.y * 0.18
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera)
    }
}

const handleResize = () => {
    if (!camera || !renderer) return
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}

onMounted(() => {
    initHero3D()
    animateHero3D()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', handleResize)
    if (renderer) renderer.dispose()
})
</script>

<style scoped>
.hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 96px 0 60px;
    overflow: hidden;
}

.hero-webgl {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

/* Interactive 3D Mode Switcher Pill */
.webgl-hud {
    position: absolute;
    top: 92px;
    right: 2rem;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.5rem;
    border-radius: 999px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-shadow);
}

.hud-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    padding: 0 0.45rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

.hud-mode-btn {
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.32rem 0.75rem;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: all 0.25s ease;
}

.hud-mode-btn:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.05);
}

.hud-mode-btn.active {
    background: var(--primary-glow);
    color: var(--primary);
    border-color: var(--glass-border-hover);
}

.hero-container {
    width: 100%;
    max-width: 1340px;
    padding: 2rem;
    position: relative;
    z-index: 2;
}

.hero-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 3.5rem;
}

.text-section {
    flex: 1.25;
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
}

.top-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
}

.greeting-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem 1rem;
    background: var(--primary-glow);
    color: var(--primary);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    border: 1px solid var(--glass-border-hover);
}

.live-ping {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 10px var(--primary);
    animation: pulseGlow 1.8s infinite;
}

.location-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-muted);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    border: 1px solid var(--glass-border);
}

/* Self-Reference Persona Switcher */
.persona-lens {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    padding: 0.45rem 0.6rem;
    border-radius: 16px;
    border: 1px solid var(--glass-border);
    width: fit-content;
}

.persona-prompt {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    padding-left: 0.4rem;
}

.persona-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.persona-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.38rem 0.8rem;
    border-radius: 10px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.persona-tab:hover {
    color: var(--text-main);
    background: rgba(255, 255, 255, 0.04);
}

.persona-tab.active {
    background: var(--surface-hover);
    color: var(--primary);
    border-color: var(--glass-border-hover);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.name {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 6vw, 4.6rem);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: var(--text-main);
}

.gradient-name {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 55%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.persona-dynamic-block {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.role {
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2.5vw, 1.85rem);
    font-weight: 600;
    color: var(--text-main);
    opacity: 0.92;
}

.description {
    font-size: 1.06rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 620px;
}

.persona-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.highlight-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    color: var(--text-main);
}

.highlight-chip i {
    color: var(--primary);
    font-size: 0.75rem;
}

.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.4rem;
}

.btn {
    padding: 0.85rem 1.65rem;
    font-size: 0.94rem;
    font-weight: 700;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    text-decoration: none;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary), #059669);
    color: #ffffff;
    border: none;
    box-shadow: 0 10px 28px var(--primary-glow);
}

.btn-primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px var(--primary-glow);
}

.btn-video {
    background: var(--glass-bg-strong);
    color: var(--text-main);
    border: 1px solid var(--glass-border-hover);
    box-shadow: var(--card-shadow);
}

.btn-video:hover {
    transform: translateY(-4px);
    border-color: var(--secondary);
    box-shadow: 0 12px 30px var(--secondary-glow);
}

.play-pulse {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--secondary), var(--purple));
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
}

.btn-outline {
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--glass-border);
}

.btn-outline:hover {
    color: var(--text-main);
    border-color: var(--text-main);
    transform: translateY(-4px);
}

/* Metrics Bar */
.metrics-bar {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    margin-top: 0.75rem;
    padding: 1rem 1.4rem;
    border-radius: 18px;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    width: fit-content;
}

.metric-item {
    display: flex;
    flex-direction: column;
}

.metric-val {
    font-family: var(--font-display);
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 1.1;
    color: var(--text-main);
}

.metric-val .plus {
    color: var(--primary);
}

.metric-lbl {
    font-size: 0.74rem;
    color: var(--text-muted);
    font-weight: 500;
}

.metric-divider {
    width: 1px;
    height: 34px;
    background: var(--glass-border);
}

/* Right Image Section */
.image-section {
    flex: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.holo-card-wrapper {
    position: relative;
    width: clamp(290px, 34vw, 440px);
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease-out;
    transform-style: preserve-3d;
}

.holo-ring {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
}

.ring-outer {
    inset: -16px;
    border: 1px dashed rgba(16, 185, 129, 0.3);
    animation: spinSlow 28s linear infinite;
}

.ring-inner {
    inset: 8px;
    border: 1px solid rgba(0, 242, 254, 0.2);
    animation: spinSlow 18s linear infinite reverse;
}

@keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.image-frame {
    position: relative;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 35%, rgba(16, 185, 129, 0.18), rgba(15, 19, 30, 0.65) 75%);
    border-radius: 36px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 1px solid var(--glass-border-hover);
    box-shadow: var(--card-shadow), 0 0 60px var(--primary-glow);
    overflow: visible;
}

.inner-glow {
    position: absolute;
    inset: 0;
    border-radius: 36px;
    background: linear-gradient(145deg, rgba(0, 242, 254, 0.1), transparent 50%, rgba(245, 158, 11, 0.1));
    pointer-events: none;
}

.profile-pic {
    width: 92%;
    height: 94%;
    object-fit: contain;
    object-position: bottom center;
    z-index: 2;
    filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.45));
    transform: translateZ(30px);
}

.stats-card {
    position: absolute;
    background: var(--glass-bg-strong);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    padding: 0.65rem 0.95rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 0.65rem;
    z-index: 4;
    box-shadow: var(--card-shadow);
    cursor: pointer;
    transform: translateZ(50px);
    transition: all 0.25s ease;
}

.stats-card:hover {
    border-color: var(--primary);
    transform: translateZ(60px) scale(1.05);
}

.stat-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
}

.stat-icon.purple {
    background: rgba(168, 85, 247, 0.2);
    color: #c084fc;
}

.stat-icon.emerald {
    background: rgba(16, 185, 129, 0.2);
    color: #34d399;
}

.stat-icon.gold {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
}

.stat-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.stat-kicker {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
}

.stat-main {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-main);
}

.stats-card.top-right {
    top: 6%;
    right: -8%;
}

.stats-card.bottom-left {
    bottom: 16%;
    left: -10%;
}

.stats-card.bottom-right {
    bottom: -4%;
    right: 6%;
}

/* Scroll Indicator */
.scroll-indicator {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    opacity: 0.75;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.scroll-indicator:hover {
    opacity: 1;
}

.mouse {
    width: 22px;
    height: 36px;
    border: 2px solid var(--text-muted);
    border-radius: 18px;
    position: relative;
}

.wheel {
    width: 4px;
    height: 7px;
    background: var(--primary);
    border-radius: 2px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    animation: scrollWheel 1.8s infinite;
}

.scroll-indicator .text {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
}

@keyframes scrollWheel {
    0% { transform: translate(-50%, 0); opacity: 0; }
    50% { transform: translate(-50%, 12px); opacity: 1; }
    100% { transform: translate(-50%, 20px); opacity: 0; }
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.25s ease;
}
.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

@media (max-width: 1024px) {
    .webgl-hud {
        position: relative;
        top: auto;
        right: auto;
        margin: 0 auto 1rem;
        width: fit-content;
    }
    .hero {
        flex-direction: column;
    }
    .hero-content {
        flex-direction: column;
        text-align: center;
    }
    .text-section {
        align-items: center;
    }
    .top-badges, .persona-tabs, .persona-highlights, .buttons {
        justify-content: center;
    }
    .stats-card.top-right { right: -2%; }
    .stats-card.bottom-left { left: -2%; }
}

@media (max-width: 640px) {
    .metrics-bar {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
    .metric-divider {
        display: none;
    }
    .hud-label {
        display: none;
    }
}
</style>
