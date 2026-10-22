<template>
    <footer id="contact" class="footer">
        <div class="footer-container">
            <!-- Peak-End Rule: Knowledge Base Spotlight & Frictionless Contact CTA -->
            <div class="cta-showcase-grid">
                <!-- Left: Knowledge Base Teaser Card -->
                <div class="kb-spotlight-card">
                    <span class="section-eyebrow"><i class="pi pi-book"></i> Engineering Knowledge Base</span>
                    <h3 class="spotlight-title">
                        Explore 35+ Deep-Dive <span class="accent">System Design & Code Guides</span>
                    </h3>
                    <p class="spotlight-desc">
                        Dive into my personal technical library covering production Go patterns, Kafka event sourcing, distributed caching, NGINX hardening, and scalable frontend architectures.
                    </p>
                    <div class="kb-topic-pills">
                        <a href="#knowledge-base/learning-materials/go/concurrency-and-best-practices.md" class="kb-pill">
                            <i class="pi pi-code"></i> Go Concurrency
                        </a>
                        <a href="#knowledge-base/learning-materials/devops/kafka-pattern-event-sourcing.md" class="kb-pill">
                            <i class="pi pi-server"></i> Kafka Event Sourcing
                        </a>
                        <a href="#knowledge-base/learning-materials/system-design/microservices.md" class="kb-pill">
                            <i class="pi pi-sitemap"></i> Microservices
                        </a>
                        <a href="#knowledge-base/learning-materials/devops/nginx-reverse-proxy.md" class="kb-pill">
                            <i class="pi pi-shield"></i> NGINX Reverse Proxy
                        </a>
                        <a href="#knowledge-base/vue/best-practice-scalable-folder-structure.md" class="kb-pill">
                            <i class="pi pi-desktop"></i> Scalable Vue 3
                        </a>
                    </div>
                    <a href="#knowledge-base" class="kb-explore-btn">
                        <span>Open Full Knowledge Base</span>
                        <i class="pi pi-arrow-right"></i>
                    </a>
                </div>

                <!-- Right: Frictionless Contact Card (Fogg Behavior Model) -->
                <div class="contact-cta-card">
                    <div class="availability-banner">
                        <span class="avail-dot"></span>
                        <span>Available for Senior Full-Stack, AI & Architecture Roles</span>
                    </div>
                    <h3 class="contact-heading">Let's Build Something <span class="accent">Extraordinary</span></h3>
                    <p class="contact-sub">
                        Have a complex system to architect, an AI product to launch, or a senior engineering role to fill? Reach out directly—no forms required.
                    </p>

                    <div class="quick-contact-actions">
                        <button class="copy-email-btn" @click="copyEmail">
                            <i :class="copied ? 'pi pi-check' : 'pi pi-copy'"></i>
                            <div class="email-txt">
                                <span class="email-lbl">{{ copied ? 'Copied to Clipboard!' : 'Click to Copy Email' }}</span>
                                <span class="email-addr">raenard.cruz@gmail.com</span>
                            </div>
                        </button>

                        <a href="mailto:raenard.cruz@gmail.com" class="send-mail-btn">
                            <i class="pi pi-send"></i>
                            <span>Compose Email</span>
                        </a>
                    </div>

                    <div class="direct-meta">
                        <span><i class="pi pi-map-marker"></i> Muntinlupa, Philippines (UTC+8)</span>
                        <span><i class="pi pi-phone"></i> +63 915 517 9745</span>
                    </div>
                </div>
            </div>

            <!-- Main Footer Columns -->
            <div class="footer-grid">
                <div class="footer-info">
                    <div class="logo">
                        <div class="logo-orb">RC</div>
                        <span class="logo-text">RAENARD<span class="accent">.CRUZ</span></span>
                    </div>
                    <p class="description">
                        Senior Full-Stack Developer & AI Systems Architect with 13+ years of experience turning complex distributed problems into fast, human-centric digital products.
                    </p>
                    <div class="social-links">
                        <a href="https://github.com/raenardcruz" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="GitHub">
                            <i class="pi pi-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/raenardcruz" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn">
                            <i class="pi pi-linkedin"></i>
                        </a>
                        <a href="mailto:raenard.cruz@gmail.com" class="social-btn" aria-label="Email">
                            <i class="pi pi-envelope"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-nav">
                    <h4 class="footer-title">Navigation</h4>
                    <ul class="footer-links">
                        <li><a href="#">Overview & Persona Lens</a></li>
                        <li><a href="#projects">Projects & Video Demos</a></li>
                        <li><a href="#skills">3D Technical Stack</a></li>
                        <li><a href="#knowledge-base">Knowledge Base</a></li>
                    </ul>
                </div>

                <div class="footer-nav">
                    <h4 class="footer-title">Live Platforms</h4>
                    <ul class="footer-links">
                        <li><a href="https://clarifai.raenardcruz.com" target="_blank" rel="noopener noreferrer">ClarifAI Audio Intelligence</a></li>
                        <li><a href="https://devotion.raenardcruz.com/#/" target="_blank" rel="noopener noreferrer">Devotion Liturgical AI</a></li>
                        <li><a href="https://oasi.raenardcruz.com/#/" target="_blank" rel="noopener noreferrer">Oasi Di Gioia Foundation</a></li>
                        <li><a href="https://floowsynk.raenardcruz.com" target="_blank" rel="noopener noreferrer">Floowsynk Orchestrator</a></li>
                    </ul>
                </div>

                <div class="footer-contact">
                    <h4 class="footer-title">Direct Contact</h4>
                    <ul class="footer-links">
                        <li><i class="pi pi-map-marker"></i> Muntinlupa, Philippines</li>
                        <li><i class="pi pi-phone"></i> +63 915 517 9745</li>
                        <li><i class="pi pi-envelope"></i> raenard.cruz@gmail.com</li>
                        <li><i class="pi pi-clock"></i> Mon – Fri, Flexible Global Overlap</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ new Date().getFullYear() }} Raenard Cruz. All Rights Reserved.</p>
                <p>Engineered with <span class="accent">Vue 3</span>, <span class="accent">Three.js WebGL</span> &amp; <span class="accent">Vite</span></p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref(false)

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText('raenard.cruz@gmail.com')
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2500)
    } catch (e) {
        window.location.href = 'mailto:raenard.cruz@gmail.com'
    }
}
</script>

<style scoped>
.footer {
    padding: 90px 2rem 40px;
    background: var(--bg);
    border-top: 1px solid var(--glass-border);
    position: relative;
    z-index: 10;
}

.footer-container {
    max-width: 1320px;
    margin: 0 auto;
}

/* Peak-End CTA Grid */
.cta-showcase-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 1.75rem;
    margin-bottom: 4.5rem;
}

.kb-spotlight-card,
.contact-cta-card {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 26px;
    padding: 2.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.2rem;
    box-shadow: var(--card-shadow);
}

.kb-spotlight-card {
    border-top: 2px solid var(--secondary);
}

.contact-cta-card {
    border-top: 2px solid var(--primary);
}

.spotlight-title,
.contact-heading {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 800;
    color: var(--text-main);
    line-height: 1.2;
}

.spotlight-desc,
.contact-sub {
    font-size: 0.94rem;
    color: var(--text-muted);
    line-height: 1.65;
}

.kb-topic-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.kb-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    color: var(--text-main);
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
}

.kb-pill i {
    color: var(--secondary);
    font-size: 0.75rem;
}

.kb-pill:hover {
    border-color: var(--secondary);
    transform: translateY(-2px);
}

.kb-explore-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    width: fit-content;
    padding: 0.75rem 1.4rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--glass-border);
    color: var(--text-main);
    font-weight: 700;
    font-size: 0.88rem;
    text-decoration: none;
    transition: all 0.25s ease;
}

.kb-explore-btn:hover {
    background: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
}

.availability-banner {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.38rem 0.9rem;
    border-radius: 999px;
    background: var(--primary-glow);
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    width: fit-content;
}

.avail-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 8px var(--primary);
}

.quick-contact-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
}

.copy-email-btn {
    flex: 1.3;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.1rem;
    border-radius: 14px;
    border: 1px solid var(--glass-border-hover);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-main);
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
}

.copy-email-btn:hover {
    border-color: var(--primary);
    background: var(--primary-glow);
}

.copy-email-btn i {
    font-size: 1.1rem;
    color: var(--primary);
}

.email-txt {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
}

.email-lbl {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
}

.email-addr {
    font-weight: 700;
    font-size: 0.86rem;
}

.send-mail-btn {
    flex: 0.8;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.2rem;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--primary), #059669);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.88rem;
    text-decoration: none;
    transition: all 0.25s ease;
}

.send-mail-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px var(--primary-glow);
}

.direct-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.direct-meta span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.direct-meta i {
    color: var(--primary);
}

/* Footer Columns */
.footer-grid {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
    gap: 3rem;
    margin-bottom: 3rem;
    padding-top: 3rem;
    border-top: 1px solid var(--glass-border);
}

.footer-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.logo-orb {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--primary-glow);
    border: 1px solid var(--glass-border-hover);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.85rem;
}

.logo-text {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: 1.5px;
    font-size: 1.15rem;
    color: var(--text-main);
}

.description {
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 380px;
    font-size: 0.9rem;
}

.social-links {
    display: flex;
    gap: 0.75rem;
}

.social-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-main);
    text-decoration: none;
    border: 1px solid var(--glass-border);
    transition: all 0.25s ease;
}

.social-btn:hover {
    background: var(--primary);
    color: #ffffff;
    transform: translateY(-3px);
    border-color: var(--primary);
}

.footer-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 1.2rem;
}

.footer-links {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}

.footer-links li {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    color: var(--text-muted);
    font-size: 0.88rem;
}

.footer-links li a {
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.2s ease;
}

.footer-links li a:hover {
    color: var(--primary);
    transform: translateX(4px);
}

.footer-links li i {
    color: var(--primary);
    font-size: 0.85rem;
}

.footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--glass-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-muted);
    font-size: 0.82rem;
}

.accent {
    color: var(--primary);
    font-weight: 700;
}

@media (max-width: 1024px) {
    .cta-showcase-grid {
        grid-template-columns: 1fr;
    }
    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 600px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .footer-bottom {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
    }
}
</style>
