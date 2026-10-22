<template>
    <section id="projects" class="projects">
        <div class="projects-container">
            <!-- Section Header -->
            <div class="section-header">
                <span class="section-eyebrow"><i class="pi pi-video"></i> Interactive Video Demo Theater</span>
                <h2 class="title">
                    Production Systems & <span class="accent">Live Video Demos</span>
                </h2>
                <p class="subtitle">
                    Watch real product walkthroughs and explore the system architectures behind my flagship AI, SaaS, and distributed platforms.
                </p>
            </div>

            <!-- Interactive Cinema Stage (Dual-Coding UX Psychology) -->
            <div
                class="theater-stage"
                :style="{ '--stage-accent': featuredProject.accentHex, '--stage-secondary': featuredProject.secondaryHex }"
            >
                <!-- Left: Video Player / Interactive Preview -->
                <div class="theater-screen-box">
                    <div class="browser-chrome">
                        <div class="chrome-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <div class="chrome-url">
                            <i class="pi pi-lock"></i>
                            <span>{{ featuredProject.link.replace('https://', '') }}</span>
                        </div>
                        <div class="chrome-controls">
                            <button
                                v-if="featuredProject.video"
                                class="sound-toggle-btn"
                                @click="toggleAudio"
                            >
                                <i :class="isMuted ? 'pi pi-volume-off' : 'pi pi-volume-up'"></i>
                                <span>{{ isMuted ? 'Unmute Audio' : 'Audio On' }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="media-viewport">
                        <video
                            v-if="featuredProject.video"
                            ref="theaterVideo"
                            :key="featuredProject.slug"
                            :src="featuredProject.video"
                            :poster="featuredProject.image"
                            :muted="isMuted"
                            autoplay
                            loop
                            playsinline
                            controls
                            class="stage-video"
                        ></video>
                        <img
                            v-else
                            :src="featuredProject.image"
                            :alt="featuredProject.title"
                            class="stage-image"
                        />
                    </div>
                </div>

                <!-- Right: Playlist Selector & Deep-Dive Telemetry -->
                <div class="theater-sidebar">
                    <div class="playlist-header">
                        <span class="playlist-kicker">Select Project Demo</span>
                        <span class="playlist-count">{{ projects.length }} Production Apps</span>
                    </div>

                    <div class="playlist-tabs">
                        <button
                            v-for="(proj, idx) in projects"
                            :key="proj.id"
                            class="playlist-item"
                            :class="{ active: selectedIndex === idx }"
                            :style="{ '--item-accent': proj.accentHex }"
                            @click="selectProject(idx)"
                        >
                            <div class="pi-num">0{{ idx + 1 }}</div>
                            <div class="pi-info">
                                <span class="pi-title">{{ proj.title }}</span>
                                <span class="pi-sub">{{ proj.videoLabel || 'Interactive Architecture' }}</span>
                            </div>
                            <span class="pi-badge" v-if="proj.video">
                                <i class="pi pi-play-fill"></i> Video
                            </span>
                            <span class="pi-badge img-badge" v-else>
                                <i class="pi pi-image"></i> Preview
                            </span>
                        </button>
                    </div>

                    <!-- Selected Project Breakdown -->
                    <div class="stage-details">
                        <div class="stage-metrics">
                            <div v-for="m in featuredProject.metrics" :key="m.label" class="stage-metric-box">
                                <span class="sm-val">{{ m.value }}</span>
                                <span class="sm-lbl">{{ m.label }}</span>
                            </div>
                        </div>

                        <p class="stage-arch-summary">
                            <strong>Architecture:</strong> {{ featuredProject.architectureSummary }}
                        </p>

                        <ul class="stage-highlights">
                            <li v-for="item in featuredProject.highlights" :key="item">
                                <i class="pi pi-check-circle"></i>
                                <span>{{ item }}</span>
                            </li>
                        </ul>

                        <div class="stage-cta-row">
                            <a
                                :href="featuredProject.link"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="stage-live-btn"
                            >
                                <span>Launch {{ featuredProject.title }}</span>
                                <i class="pi pi-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filterable Bento Grid of All Projects -->
            <div class="bento-header">
                <h3 class="bento-heading">All Featured Case Studies</h3>
                <div class="filter-pills">
                    <button
                        v-for="cat in filterCategories"
                        :key="cat"
                        class="filter-pill"
                        :class="{ active: activeFilter === cat }"
                        @click="activeFilter = cat"
                    >
                        {{ cat }}
                    </button>
                </div>
            </div>

            <div class="projects-grid">
                <div
                    v-for="(project, index) in filteredProjects"
                    :key="project.id"
                    class="project-card"
                    :style="{ '--card-accent': project.accentHex }"
                    @mousemove="onCardMouseMove($event)"
                    @mouseenter="playHoverVideo(project.id)"
                    @mouseleave="pauseHoverVideo(project.id)"
                >
                    <div class="card-media" @click="focusInTheater(project)">
                        <video
                            v-if="project.video"
                            :ref="(el) => setHoverVideoRef(project.id, el)"
                            :src="project.video"
                            :poster="project.image"
                            muted
                            loop
                            playsinline
                            preload="metadata"
                            class="card-video-preview"
                        ></video>
                        <img v-else :src="project.image" :alt="project.title" />

                        <div class="media-badges">
                            <span class="cat-badge">{{ project.category }}</span>
                            <span v-if="project.video" class="vid-indicator">
                                <i class="pi pi-video"></i> Hover to Preview • Click for Theater
                            </span>
                        </div>

                        <div class="image-overlay">
                            <button class="view-link" @click.stop="focusInTheater(project)">
                                <i :class="project.video ? 'pi pi-play-fill' : 'pi pi-eye'"></i>
                                <span>{{ project.video ? 'Watch in Demo Theater' : 'Inspect Case Study' }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="card-content">
                        <div class="card-title-row">
                            <span class="card-index">0{{ index + 1 }}</span>
                            <h3 class="project-title">{{ project.title }}</h3>
                        </div>
                        <p class="project-subtitle">{{ project.subtitle }}</p>
                        <p class="project-desc">{{ project.description }}</p>

                        <div class="tech-stack">
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="tech-tag"
                            >
                                {{ tech }}
                            </span>
                        </div>

                        <div class="card-footer">
                            <button class="theater-jump-btn" @click="focusInTheater(project)">
                                <i class="pi pi-play-circle"></i>
                                <span>{{ project.video ? 'Watch Video Demo' : 'View Architecture' }}</span>
                            </button>
                            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="footer-link">
                                <span>Live App</span>
                                <i class="pi pi-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects } from '../../data/projects'

const selectedIndex = ref(0)
const isMuted = ref(true)
const theaterVideo = ref(null)
const activeFilter = ref('All')
const hoverVideoRefs = {}

const featuredProject = computed(() => projects[selectedIndex.value] || projects[0])

const filterCategories = ['All', 'AI & LLM', 'Go Backend', 'Vue.js']

const filteredProjects = computed(() => {
    if (activeFilter.value === 'All') return projects
    if (activeFilter.value === 'AI & LLM') {
        return projects.filter(p =>
            p.technologies.some(t => t.toLowerCase().includes('ollama') || t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'))
        )
    }
    if (activeFilter.value === 'Go Backend') {
        return projects.filter(p => p.technologies.some(t => t.toLowerCase().includes('go')))
    }
    if (activeFilter.value === 'Vue.js') {
        return projects.filter(p => p.technologies.some(t => t.toLowerCase().includes('vue')))
    }
    return projects
})

const selectProject = (idx) => {
    selectedIndex.value = idx
}

const toggleAudio = () => {
    isMuted.value = !isMuted.value
    if (theaterVideo.value) {
        theaterVideo.value.muted = isMuted.value
    }
}

const setHoverVideoRef = (id, el) => {
    if (el) hoverVideoRefs[id] = el
}

const playHoverVideo = (id) => {
    const vid = hoverVideoRefs[id]
    if (vid) {
        vid.play().catch(() => {})
    }
}

const pauseHoverVideo = (id) => {
    const vid = hoverVideoRefs[id]
    if (vid) {
        vid.pause()
    }
}

const focusInTheater = (project) => {
    const idx = projects.findIndex(p => p.id === project.id)
    if (idx !== -1) {
        selectedIndex.value = idx
    }
    const stageEl = document.querySelector('.theater-stage')
    if (stageEl) {
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

const onCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}
</script>

<style scoped>
.projects {
    padding: 110px 2rem;
    background: var(--bg);
    position: relative;
}

.projects-container {
    max-width: 1320px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 3.5rem;
}

.title {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4.8vw, 3.4rem);
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 0.75rem;
}

.title .accent {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: var(--text-muted);
    max-width: 640px;
    margin: 0 auto;
    font-size: 1.05rem;
}

/* Interactive Video Demo Theater */
.theater-stage {
    display: grid;
    grid-template-columns: 1.45fr 1fr;
    gap: 1.75rem;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 28px;
    padding: 1.5rem;
    box-shadow: var(--card-shadow), 0 0 60px rgba(0, 0, 0, 0.25);
    margin-bottom: 4.5rem;
    position: relative;
    overflow: hidden;
}

.theater-stage::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -10%;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, var(--stage-accent, #10b981) 0%, transparent 70%);
    opacity: 0.1;
    pointer-events: none;
}

.theater-screen-box {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: #05070c;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}

.browser-chrome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem 1rem;
    background: #0e131f;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    gap: 0.75rem;
}

.chrome-dots {
    display: flex;
    gap: 6px;
}

.chrome-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.chrome-dots span:nth-child(1) { background: #ef4444; }
.chrome-dots span:nth-child(2) { background: #f59e0b; }
.chrome-dots span:nth-child(3) { background: #10b981; }

.chrome-url {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.25rem 0.85rem;
    border-radius: 999px;
}

.chrome-url i {
    color: #10b981;
    font-size: 0.68rem;
}

.sound-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.sound-toggle-btn:hover {
    background: #10b981;
    color: #fff;
}

.media-viewport {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stage-video, .stage-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* Right Sidebar in Theater */
.theater-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
}

.playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.playlist-kicker {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
}

.playlist-count {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--primary);
}

.playlist-tabs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.playlist-item {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    border: 1px solid var(--glass-border);
    background: rgba(255, 255, 255, 0.02);
    color: var(--text-main);
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
}

.playlist-item:hover {
    border-color: var(--item-accent, var(--primary));
    background: rgba(255, 255, 255, 0.05);
}

.playlist-item.active {
    background: var(--surface-hover);
    border-color: var(--item-accent, var(--primary));
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2), inset 3px 0 0 var(--item-accent, var(--primary));
}

.pi-num {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 0.85rem;
    color: var(--item-accent, var(--primary));
}

.pi-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    line-height: 1.25;
}

.pi-title {
    font-weight: 700;
    font-size: 0.9rem;
}

.pi-sub {
    font-size: 0.72rem;
    color: var(--text-muted);
}

.pi-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    font-weight: 700;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.16);
    color: var(--primary);
}

.pi-badge.img-badge {
    background: rgba(148, 163, 184, 0.14);
    color: var(--text-muted);
}

.stage-details {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--glass-border);
}

.stage-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.55rem;
}

.stage-metric-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 0.5rem 0.65rem;
    display: flex;
    flex-direction: column;
}

.sm-val {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.88rem;
    color: var(--text-main);
}

.sm-lbl {
    font-size: 0.65rem;
    color: var(--text-muted);
}

.stage-arch-summary {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.55;
}

.stage-arch-summary strong {
    color: var(--text-main);
}

.stage-highlights {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.38rem;
}

.stage-highlights li {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    font-size: 0.78rem;
    color: var(--text-muted);
}

.stage-highlights li i {
    color: var(--stage-accent, var(--primary));
    margin-top: 0.18rem;
    font-size: 0.75rem;
}

.stage-live-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    width: 100%;
    padding: 0.75rem 1.2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--stage-accent, var(--primary)), var(--stage-secondary, #059669));
    color: #ffffff;
    font-weight: 700;
    font-size: 0.88rem;
    text-decoration: none;
    transition: all 0.25s ease;
}

.stage-live-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
}

/* Bento Grid Header & Filters */
.bento-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
}

.bento-heading {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
}

.filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
}

.filter-pill {
    padding: 0.42rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-pill:hover {
    color: var(--text-main);
    border-color: var(--primary);
}

.filter-pill.active {
    background: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
}

/* Bento Grid Cards */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.project-card {
    position: relative;
    background: var(--glass-bg);
    backdrop-filter: blur(14px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    box-shadow: var(--card-shadow);
}

.project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
        500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(16, 185, 129, 0.09),
        transparent 40%
    );
    pointer-events: none;
    z-index: 1;
}

.project-card:hover {
    transform: translateY(-8px);
    border-color: var(--card-accent, var(--primary));
}

.card-media {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #05070c;
    cursor: pointer;
}

.card-media img,
.card-video-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.project-card:hover .card-media img,
.project-card:hover .card-video-preview {
    transform: scale(1.04);
}

.media-badges {
    position: absolute;
    top: 0.85rem;
    left: 0.85rem;
    right: 0.85rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    pointer-events: none;
}

.cat-badge {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.28rem 0.65rem;
    border-radius: 999px;
    background: rgba(10, 14, 23, 0.82);
    backdrop-filter: blur(8px);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.14);
}

.vid-indicator {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.88);
    color: #ffffff;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(8, 11, 18, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(3px);
    z-index: 3;
}

.project-card:hover .image-overlay {
    opacity: 1;
}

.view-link {
    color: #ffffff;
    font-weight: 700;
    font-size: 0.86rem;
    padding: 0.7rem 1.35rem;
    border: 1px solid var(--card-accent, var(--primary));
    border-radius: 999px;
    background: rgba(12, 16, 26, 0.9);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.25s ease;
}

.view-link:hover {
    background: var(--card-accent, var(--primary));
}

.card-content {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    z-index: 2;
}

.card-title-row {
    display: flex;
    align-items: baseline;
    gap: 0.65rem;
    margin-bottom: 0.25rem;
}

.card-index {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 800;
    color: var(--card-accent, var(--primary));
}

.project-title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-main);
}

.project-subtitle {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 0.75rem;
}

.project-desc {
    font-size: 0.92rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 1.25rem;
    flex-grow: 1;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.42rem;
    margin-bottom: 1.35rem;
}

.tech-tag {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    border-radius: 999px;
    border: 1px solid var(--glass-border);
}

.card-footer {
    padding-top: 1.15rem;
    border-top: 1px solid var(--glass-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.theater-jump-btn {
    background: transparent;
    border: none;
    color: var(--text-main);
    font-weight: 700;
    font-size: 0.84rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transition: color 0.2s ease;
}

.theater-jump-btn i {
    color: var(--card-accent, var(--primary));
}

.theater-jump-btn:hover {
    color: var(--card-accent, var(--primary));
}

.footer-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.86rem;
    transition: gap 0.25s ease;
}

.footer-link:hover {
    gap: 0.65rem;
}

@media (max-width: 1024px) {
    .theater-stage {
        grid-template-columns: 1fr;
    }
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>