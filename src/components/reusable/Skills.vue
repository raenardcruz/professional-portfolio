<template>
    <section id="skills" class="skills">
        <div class="skills-container">
            <div class="section-header">
                <span class="section-eyebrow"><i class="pi pi-sitemap"></i> 3D Technical Ecosystem</span>
                <h2 class="title">Polyglot Architecture & <span class="accent">AI Stack</span></h2>
                <p class="subtitle">
                    Click any technology node below to inspect production experience, connected live platforms, and deep-dive engineering guides.
                </p>
            </div>

            <!-- Top Interactive 3D Neural Globe + Active Skill Telemetry Inspector -->
            <div class="ecosystem-showcase">
                <!-- Left: Three.js 3D Interactive Node Network -->
                <div class="globe-card" @mousemove="onGlobeMouseMove">
                    <canvas ref="skillsCanvas" class="skills-webgl"></canvas>
                    <div class="globe-hud-top">
                        <span class="globe-tag">
                            <span class="dot" :style="{ background: activeSkill.accent }"></span>
                            3D SYNAPTIC TECH GRAPH
                        </span>
                        <span class="globe-hint">Move cursor to orbit</span>
                    </div>
                    <div class="globe-hud-bottom">
                        <button
                            v-for="cat in skillCategories"
                            :key="cat.id"
                            class="domain-chip"
                            :class="{ active: activeCategoryId === cat.id }"
                            :style="{ '--dom-color': cat.accent }"
                            @click="selectCategory(cat)"
                        >
                            {{ cat.shortTitle }}
                        </button>
                    </div>
                </div>

                <!-- Right: Interactive Skill Telemetry Inspector (Associative Priming) -->
                <div class="inspector-card" :style="{ '--ins-accent': activeSkill.accent }">
                    <div class="inspector-header">
                        <span class="inspector-eyebrow">Selected Technology Telemetry</span>
                        <span class="inspector-years" v-if="activeSkill.years">{{ activeSkill.years }} Exp</span>
                    </div>

                    <h3 class="inspector-title">{{ activeSkill.name }}</h3>
                    <p class="inspector-cat">{{ activeSkill.categoryTitle }}</p>
                    <p class="inspector-desc">{{ activeSkill.categoryDesc }}</p>

                    <!-- Proficiency Bar -->
                    <div class="proficiency-block">
                        <div class="prof-labels">
                            <span>Production Mastery & Depth</span>
                            <span class="prof-val">{{ activeSkill.level || 90 }}%</span>
                        </div>
                        <div class="prof-track">
                            <div
                                class="prof-fill"
                                :style="{ width: (activeSkill.level || 90) + '%', background: activeSkill.accent }"
                            ></div>
                        </div>
                    </div>

                    <!-- Connected Production Projects -->
                    <div class="connected-block" v-if="activeSkill.projects && activeSkill.projects.length">
                        <span class="conn-label">Used in Production Platforms:</span>
                        <div class="conn-chips">
                            <a
                                v-for="projName in activeSkill.projects"
                                :key="projName"
                                href="#projects"
                                class="conn-chip"
                            >
                                <i class="pi pi-bolt"></i> {{ projName }}
                            </a>
                        </div>
                    </div>

                    <!-- Direct Link to Knowledge Base Article if available -->
                    <div class="kb-cta-box" v-if="activeSkill.kbLink">
                        <a :href="activeSkill.kbLink" class="kb-deep-link">
                            <i class="pi pi-book"></i>
                            <div class="kb-link-txt">
                                <span class="kb-main">Read My Engineering Guide on {{ activeSkill.name }}</span>
                                <span class="kb-sub">Open in Portfolio Knowledge Base</span>
                            </div>
                            <i class="pi pi-arrow-right"></i>
                        </a>
                    </div>
                    <div class="kb-cta-box" v-else>
                        <a href="#knowledge-base" class="kb-deep-link secondary">
                            <i class="pi pi-compass"></i>
                            <div class="kb-link-txt">
                                <span class="kb-main">Explore 35+ Architecture & System Design Guides</span>
                                <span class="kb-sub">Go, Kafka, RabbitMQ, NGINX, C#, Vue & React</span>
                            </div>
                            <i class="pi pi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Categorized Interactive Skill Cards -->
            <div class="skills-grid">
                <div
                    v-for="category in skillCategories"
                    :key="category.id"
                    class="skill-card"
                    :class="{ 'card-focused': activeCategoryId === category.id }"
                    :style="{ '--cat-accent': category.accent }"
                    @mouseenter="highlight3DColor(category.accent)"
                >
                    <div class="card-header">
                        <div class="icon-box">
                            <i :class="getIcon(category.title)"></i>
                        </div>
                        <div class="header-text">
                            <h3 class="category-title">{{ category.title }}</h3>
                            <span class="category-count">{{ category.skills.length }} Technologies</span>
                        </div>
                    </div>

                    <p class="category-desc">{{ category.description }}</p>

                    <div class="skills-list">
                        <button
                            v-for="skill in category.skills"
                            :key="skill.name"
                            class="skill-tag"
                            :class="{
                                active: activeSkill.name === skill.name,
                                featured: skill.featured
                            }"
                            @click="inspectSkill(skill, category)"
                        >
                            <span class="skill-dot" v-if="skill.featured"></span>
                            <span>{{ skill.name }}</span>
                            <span v-if="skill.years" class="skill-yr">{{ skill.years }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { skillCategories } from '../../data/skills'

const skillsCanvas = ref(null)
const activeCategoryId = ref(skillCategories[0].id)

const defaultCat = skillCategories[0]
const defaultSkill = defaultCat.skills[0]

const activeSkill = ref({
    ...defaultSkill,
    categoryTitle: defaultCat.title,
    categoryDesc: defaultCat.description,
    accent: defaultCat.accent
})

const inspectSkill = (skill, category) => {
    activeCategoryId.value = category.id
    activeSkill.value = {
        ...skill,
        categoryTitle: category.title,
        categoryDesc: category.description,
        accent: category.accent
    }
    highlight3DColor(category.accent)
}

const selectCategory = (category) => {
    activeCategoryId.value = category.id
    if (category.skills.length > 0) {
        inspectSkill(category.skills[0], category)
    }
}

const getIcon = (title) => {
    if (title.includes('Programming')) return 'pi pi-code'
    if (title.includes('Front-End')) return 'pi pi-desktop'
    if (title.includes('Cloud')) return 'pi pi-cloud'
    if (title.includes('AI')) return 'pi pi-microchip-ai'
    if (title.includes('Integration')) return 'pi pi-share-alt'
    return 'pi pi-check-circle'
}

// Three.js 3D Synaptic Tech Network
let scene, camera, renderer, animId
let networkGroup, coreWireMesh, nodesMeshList = [], linesMesh
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
let pulseBoost = 0

const highlight3DColor = (hexStr) => {
    pulseBoost = 1.0
    const col = new THREE.Color(hexStr)
    if (coreWireMesh) {
        coreWireMesh.material.color.copy(col)
    }
    if (linesMesh) {
        linesMesh.material.color.copy(col)
    }
}

const onGlobeMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

const initSkills3D = () => {
    if (!skillsCanvas.value) return
    const parent = skillsCanvas.value.parentElement
    const width = parent.clientWidth || 500
    const height = parent.clientHeight || 360

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 5.2)

    renderer = new THREE.WebGLRenderer({
        canvas: skillsCanvas.value,
        antialias: true,
        alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    networkGroup = new THREE.Group()
    scene.add(networkGroup)

    // Geodesic wireframe core
    const dodecaGeo = new THREE.DodecahedronGeometry(1.45, 1)
    const dodecaMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    })
    coreWireMesh = new THREE.Mesh(dodecaGeo, dodecaMat)
    networkGroup.add(coreWireMesh)

    // Create 34 Orbital Skill Nodes on a Fibonacci Sphere
    const totalNodes = 34
    const nodePositions = []
    const colors = [0x00f2fe, 0xa855f7, 0xf59e0b, 0x10b981, 0xec4899]
    const nodeGeo = new THREE.OctahedronGeometry(0.085, 0)

    for (let i = 0; i < totalNodes; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / totalNodes)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const r = 1.95

        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta)
        const z = r * Math.cos(phi)

        nodePositions.push(new THREE.Vector3(x, y, z))

        const nodeMat = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length]
        })
        const mesh = new THREE.Mesh(nodeGeo, nodeMat)
        mesh.position.set(x, y, z)
        networkGroup.add(mesh)
        nodesMeshList.push(mesh)
    }

    // Connect nearby nodes with synaptic lines
    const linePoints = []
    for (let i = 0; i < totalNodes; i++) {
        for (let j = i + 1; j < totalNodes; j++) {
            if (nodePositions[i].distanceTo(nodePositions[j]) < 1.25) {
                linePoints.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
                linePoints.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z)
            }
        }
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3))
    const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.28
    })
    linesMesh = new THREE.LineSegments(lineGeo, lineMat)
    networkGroup.add(linesMesh)
}

const animateSkills3D = () => {
    animId = requestAnimationFrame(animateSkills3D)
    mouse.x += (mouse.targetX - mouse.x) * 0.08
    mouse.y += (mouse.targetY - mouse.y) * 0.08
    pulseBoost *= 0.92

    if (networkGroup) {
        networkGroup.rotation.y += 0.004 + mouse.x * 0.015
        networkGroup.rotation.x += (mouse.y * 0.4 - networkGroup.rotation.x) * 0.05
        const s = 1 + pulseBoost * 0.12
        networkGroup.scale.set(s, s, s)
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera)
    }
}

const handleResize = () => {
    if (!skillsCanvas.value || !renderer || !camera) return
    const parent = skillsCanvas.value.parentElement
    const width = parent.clientWidth || 500
    const height = parent.clientHeight || 360
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}

onMounted(() => {
    initSkills3D()
    animateSkills3D()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', handleResize)
    if (renderer) renderer.dispose()
})
</script>

<style scoped>
.skills {
    padding: 110px 2rem;
    background: var(--bg-elevated);
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--glass-border);
}

.skills-container {
    max-width: 1320px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.section-header {
    text-align: center;
    margin-bottom: 3.5rem;
}

.title {
    font-family: var(--font-display);
    font-size: clamp(2.1rem, 4.5vw, 3.3rem);
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 0.75rem;
}

.title .accent {
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: var(--text-muted);
    max-width: 640px;
    margin: 0 auto;
    font-size: 1.02rem;
}

/* Top 3D Globe + Inspector Grid */
.ecosystem-showcase {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 1.75rem;
    margin-bottom: 2.5rem;
}

.globe-card {
    position: relative;
    min-height: 370px;
    background: #060911;
    border: 1px solid var(--glass-border);
    border-radius: 26px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.skills-webgl {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.globe-hud-top {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.15rem 1.4rem;
    pointer-events: none;
}

.globe-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    color: #cbd5e1;
    background: rgba(15, 23, 42, 0.75);
    padding: 0.32rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.globe-tag .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.globe-hint {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: #64748b;
}

.globe-hud-bottom {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 1rem 1.4rem;
    background: linear-gradient(to top, rgba(6, 9, 17, 0.95), transparent);
}

.domain-chip {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(15, 23, 42, 0.75);
    color: #94a3b8;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.domain-chip:hover,
.domain-chip.active {
    color: #ffffff;
    border-color: var(--dom-color, var(--primary));
    background: rgba(255, 255, 255, 0.1);
}

/* Right Inspector Card */
.inspector-card {
    background: var(--glass-bg);
    backdrop-filter: blur(18px);
    border: 1px solid var(--glass-border);
    border-top: 3px solid var(--ins-accent, var(--primary));
    border-radius: 26px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    box-shadow: var(--card-shadow);
}

.inspector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.inspector-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
}

.inspector-years {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    background: var(--primary-glow);
    color: var(--primary);
}

.inspector-title {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-main);
    line-height: 1.1;
}

.inspector-cat {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--ins-accent, var(--primary));
    margin-top: -0.4rem;
}

.inspector-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
}

.proficiency-block {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.prof-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-main);
}

.prof-val {
    font-family: var(--font-mono);
    color: var(--ins-accent, var(--primary));
}

.prof-track {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 999px;
    overflow: hidden;
}

.prof-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.connected-block {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.conn-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
}

.conn-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
}

.conn-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.32rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--glass-border);
    color: var(--text-main);
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
}

.conn-chip i {
    color: var(--ins-accent, var(--primary));
    font-size: 0.72rem;
}

.conn-chip:hover {
    border-color: var(--ins-accent, var(--primary));
    transform: translateY(-2px);
}

.kb-deep-link {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.85rem 1rem;
    border-radius: 16px;
    background: var(--primary-glow);
    border: 1px solid var(--glass-border-hover);
    color: var(--text-main);
    text-decoration: none;
    transition: all 0.25s ease;
}

.kb-deep-link.secondary {
    background: rgba(255, 255, 255, 0.03);
    border-color: var(--glass-border);
}

.kb-deep-link:hover {
    transform: translateX(4px);
    border-color: var(--primary);
}

.kb-link-txt {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.kb-main {
    font-size: 0.84rem;
    font-weight: 700;
}

.kb-sub {
    font-size: 0.7rem;
    color: var(--text-muted);
}

/* Categorized Skill Cards Grid */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1.5rem;
}

.skill-card {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 22px;
    padding: 1.75rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: var(--card-shadow);
}

.skill-card:hover,
.skill-card.card-focused {
    border-color: var(--cat-accent, var(--primary));
    transform: translateY(-4px);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
}

.icon-box {
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cat-accent, var(--primary));
    font-size: 1.25rem;
}

.header-text {
    display: flex;
    flex-direction: column;
}

.category-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
}

.category-count {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
}

.category-desc {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.5;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.45rem 0.85rem;
    background: rgba(255, 255, 255, 0.025);
    color: var(--text-main);
    border-radius: 10px;
    border: 1px solid var(--glass-border);
    cursor: pointer;
    transition: all 0.2s ease;
}

.skill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cat-accent, var(--primary));
}

.skill-yr {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
}

.skill-tag:hover,
.skill-tag.active {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--cat-accent, var(--primary));
    transform: translateY(-2px);
}

@media (max-width: 968px) {
    .ecosystem-showcase {
        grid-template-columns: 1fr;
    }
    .skills-grid {
        grid-template-columns: 1fr;
    }
}
</style>
