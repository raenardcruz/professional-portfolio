<template>
    <section class="hero">
        <div class="mesh-bg"></div>
        <div class="hero-container">
            <div class="hero-content">
                <div class="text-section">
                    <span class="greeting-badge fade-in-up" style="animation-delay: 0.1s;">
                        <i class="pi pi-sparkles"></i> Available for New Projects
                    </span>
                    <h1 class="name fade-in-up" style="animation-delay: 0.2s;">
                        Hi, I'm <span class="accent">Raenard Cruz</span>
                    </h1>
                    <h2 class="role fade-in-up" style="animation-delay: 0.3s;">
                        Senior Full-Stack Developer
                    </h2>
                    <p class="description fade-in-up" style="animation-delay: 0.4s;">
                        I am a developer who loves exploring new technologies and finding solutions for complex problems. I am constantly making efforts to make life easier through the innovative use of technology.
                    </p>
                    <div class="buttons fade-in-up" style="animation-delay: 0.5s;">
                        <button class="btn btn-primary" @click="scroll('projects')">
                            View My Work <i class="pi pi-arrow-right"></i>
                        </button>
                        <a class="btn btn-outline" href="https://docs.google.com/document/d/1-xNGMsBZrgRewXn3EBTWfmN6-g_aEkfT/edit?usp=sharing&ouid=114428223977798358412&rtpof=true&sd=true" target="_blank">
                            Download My CV <i class="pi pi-file-pdf"></i>
                        </a>
                    </div>
                </div>
                <div class="image-section fade-in">
                    <div class="image-frame">
                        <div class="inner-glow"></div>
                        <img :src="ProfilePicture" alt="Raenard Cruz" class="profile-pic">
                        <div class="stats-card top">
                            <i class="pi pi-check-circle"></i> Quality meets speed
                        </div>
                        <div class="stats-card bottom">
                            <i class="pi pi-star-fill"></i> 13 Years Exp.
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll-indicator fade-in" style="animation-delay: 1.2s;">
                <span class="mouse">
                    <span class="wheel"></span>
                </span>
                <span class="text">Scroll Down</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import ProfilePicture from '../../assets/profilepicture.png'

const scroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>

<style scoped>
.hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 70px;
    overflow: hidden;
}

.hero-container {
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
    position: relative;
}

.hero-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
}

.text-section {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
    z-index: 2;
}

.greeting-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--primary-glow);
    color: var(--primary);
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid var(--glass-border);
    width: fit-content;
}

.name {
    font-size: clamp(3rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--text-main);
    margin: 0;
}

.name .accent {
    color: var(--primary);
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.role {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 500;
    color: var(--text-muted);
    margin: 0;
}

.description {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 580px;
}

.buttons {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
}

.btn {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-transform: none;
}

.btn-primary {
    background: var(--primary);
    color: white;
    border: none;
    box-shadow: 0 10px 25px var(--primary-glow);
}

.btn-primary:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px var(--primary-glow);
    background: var(--secondary);
}

.btn-outline {
    background: transparent;
    color: var(--text-main);
    border: 2px solid var(--glass-border);
}

.btn-outline:hover {
    background: rgba(44, 42, 39, 0.05);
    border-color: var(--text-main);
    transform: translateY(-5px);
}

.image-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-frame {
    position: relative;
    width: clamp(280px, 40vw, 520px);
    aspect-ratio: 1;
    background: linear-gradient(135deg, rgba(62, 92, 77, 0.1) 0%, rgba(184, 93, 67, 0.1) 100%);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation: morph 8s ease-in-out infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--glass-border);
    transition: all 0.5s ease;
}

.image-frame:hover {
    border-color: var(--primary);
    box-shadow: 0 10px 30px var(--primary-glow);
}

.inner-glow {
    position: absolute;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
    opacity: 0.3;
    z-index: 1;
}

.profile-pic {
    width: 90%;
    height: 90%;
    object-fit: contain;
    z-index: 2;
    filter: drop-shadow(0 20px 30px rgba(44, 42, 39, 0.15));
}

.stats-card {
    position: absolute;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 3;
    box-shadow: var(--card-shadow);
}

.stats-card.top {
    top: 10%;
    right: -5%;
    color: var(--secondary);
}

.stats-card.bottom {
    bottom: 15%;
    left: -5%;
    color: var(--accent);
}

.scroll-indicator {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.6;
}

.mouse {
    width: 24px;
    height: 40px;
    border: 2px solid var(--text-muted);
    border-radius: 20px;
    position: relative;
}

.wheel {
    width: 4px;
    height: 8px;
    background: var(--primary);
    border-radius: 2px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    animation: scrollWheel 2s infinite;
}

.scroll-indicator .text {
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
}

/* Animations */
@keyframes morph {
    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
    50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
    75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

@keyframes scrollWheel {
    0% { transform: translate(-50%, 0); opacity: 0; }
    50% { transform: translate(-50%, 15px); opacity: 1; }
    100% { transform: translate(-50%, 25px); opacity: 0; }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.fade-in {
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
}

/* Responsive */
@media (max-width: 968px) {
    .hero-content {
        flex-direction: column;
        text-align: center;
        gap: 3rem;
    }

    .text-section {
        align-items: center;
    }

    .hero {
        padding-bottom: 15vh; /* Responsive vertical padding */
    }

    .description {
        margin: 0 auto;
    }

    .buttons {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
    }

    .stats-card {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
    }

    .stats-card.right { right: 0; }
    .stats-card.left { left: 0; }

    .scroll-indicator {
        position: relative;
        bottom: auto;
        margin-top: 4rem;
        transform: none;
        left: auto;
    }
}
</style>
