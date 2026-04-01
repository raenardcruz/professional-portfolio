<template>
    <section id="projects" class="projects">
        <div class="projects-container">
            <div class="section-header fade-in-up">
                <span class="sub-title">My Portfolio</span>
                <h2 class="title">Featured <span class="accent">Projects</span></h2>
                <div class="header-line"></div>
            </div>

            <div class="projects-grid">
                <div v-for="(project, index) in projects" :key="project.id" 
                     class="project-card fade-in-up" 
                     :style="{ animationDelay: (0.2 * (index + 1)) + 's' }">
                    
                    <div class="card-image">
                        <img :src="project.image" :alt="project.title">
                        <div class="image-overlay">
                            <a :href="project.link" target="_blank" class="view-link">
                                View Project <i class="pi pi-external-link"></i>
                            </a>
                        </div>
                    </div>

                    <div class="card-content">
                        <div class="tech-stack">
                            <span v-for="tech in project.technologies" :key="tech" 
                                  class="tech-tag" 
                                  v-tooltip.top="tech">
                                {{ tech }}
                            </span>
                        </div>
                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-desc" 
                           v-tooltip.bottom="project.description.length > 160 ? project.description : ''">
                            {{ truncate(project.description, 160) }}
                        </p>
                        <div class="card-footer">
                            <a :href="project.link" target="_blank" class="footer-link">
                                Explore <i class="pi pi-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { projects } from '../../data/projects'

const truncate = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}
</script>

<style scoped>
.projects {
    padding: 100px 2rem;
    background: var(--bg);
    position: relative;
}

.projects-container {
    max-width: 1200px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.sub-title {
    color: var(--primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.85rem;
    display: block;
    margin-bottom: 0.5rem;
}

.title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    color: var(--text-main);
    margin: 0;
}

.title .accent {
    color: var(--primary);
}

.header-line {
    width: 60px;
    height: 4px;
    background: var(--primary);
    margin: 1.5rem auto 0;
    border-radius: 2px;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
}

.project-card {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    box-shadow: var(--card-shadow);
}

.project-card:hover {
    transform: translateY(-10px);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.1);
}

.card-image {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.project-card:hover .card-image img {
    transform: scale(1.1);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 12, 18, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(4px);
}

.project-card:hover .image-overlay {
    opacity: 1;
}

.view-link {
    color: white;
    text-decoration: none;
    font-weight: 700;
    padding: 0.8rem 1.5rem;
    border: 2px solid var(--primary);
    border-radius: 50px;
    background: transparent;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.view-link:hover {
    background: var(--primary);
}

.card-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech-tag {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-muted);
    border-radius: 50px;
    border: 1px solid var(--glass-border);
}

.tech-tag.more {
    color: var(--primary);
}

.project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0 0 1rem 0;
}

.project-desc {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.card-footer {
    padding-top: 1.5rem;
    border-top: 1px solid var(--glass-border);
}

.footer-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: gap 0.3s ease;
}

.footer-link:hover {
    gap: 0.8rem;
}

/* Animations */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@media (max-width: 480px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>