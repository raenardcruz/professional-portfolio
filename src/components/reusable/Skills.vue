<template>
    <section id="skills" class="skills">
        <div class="skills-container">
            <div class="section-header fade-in-up">
                <span class="sub-title">Expertise</span>
                <h2 class="title">Technical <span class="accent">Stack</span></h2>
                <div class="header-line"></div>
            </div>

            <div class="skills-grid">
                <div v-for="(category, index) in skillCategories" :key="category.title" 
                     class="skill-card fade-in-up"
                     :style="{ animationDelay: (0.1 * (index + 1)) + 's' }">
                    
                    <div class="card-header">
                        <div class="icon-box">
                            <i :class="getIcon(category.title)"></i>
                        </div>
                        <h3 class="category-title">{{ category.title }}</h3>
                    </div>

                    <div class="skills-list">
                        <span v-for="skill in category.skills" :key="skill.name" 
                              class="skill-tag"
                              v-tooltip.top="skill.name">
                            {{ skill.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { skillCategories } from '../../data/skills'

const getIcon = (title) => {
    if (title.includes('Programming')) return 'pi pi-code';
    if (title.includes('Front-End')) return 'pi pi-desktop';
    if (title.includes('Cloud')) return 'pi pi-cloud';
    if (title.includes('AI')) return 'pi pi-bolt';
    if (title.includes('Integration')) return 'pi pi-share-alt';
    return 'pi pi-check-circle';
}
</script>

<style scoped>
.skills {
    padding: 100px 2rem;
    background: var(--bg);
    position: relative;
    overflow: hidden;
}

/* Subtle background glow */
.skills::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
}

.skills-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
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

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.skill-card {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.skill-card:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.icon-box {
    width: 48px;
    height: 48px;
    background: rgba(99, 102, 241, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.5rem;
    transition: all 0.3s ease;
}

.skill-card:hover .icon-box {
    background: var(--primary);
    color: white;
    transform: rotate(10deg);
}

.category-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0;
    line-height: 1.3;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.skill-tag {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    border-radius: 12px;
    border: 1px solid var(--glass-border);
    transition: all 0.3s ease;
    cursor: default;
}

.skill-tag:hover {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    border-color: var(--primary);
    transform: translateY(-2px);
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

@media (max-width: 768px) {
    .skills {
        padding: 60px 1.5rem;
    }
    
    .skills-grid {
        grid-template-columns: 1fr;
    }
}
</style>
