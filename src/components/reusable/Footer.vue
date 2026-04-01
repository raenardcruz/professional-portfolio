<template>
    <footer id="contact" class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-info">
                    <div class="logo">
                        <i class="pi pi-user logo-icon"></i>
                        <span class="logo-text">PORT<span class="accent">FOLIO</span></span>
                    </div>
                    <p class="description">
                        A developer who loves exploring new technologies and solving complex problems, constantly making efforts to make life easier through the innovative use of technology.
                    </p>
                    <div class="social-links">
                        <a href="https://github.com/raenardcruz" target="_blank" class="social-btn" aria-label="GitHub">
                            <i class="pi pi-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/raenardcruz" target="_blank" class="social-btn" aria-label="LinkedIn">
                            <i class="pi pi-linkedin"></i>
                        </a>
                        <a href="mailto:raenardcruz@gmail.com" class="social-btn" aria-label="Email">
                            <i class="pi pi-envelope"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-nav">
                    <h4 class="footer-title">Navigation</h4>
                    <ul class="footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-contact">
                    <h4 class="footer-title">Contact</h4>
                    <ul class="footer-links">
                        <li><i class="pi pi-map-marker"></i> Muntinlupa, Philippines</li>
                        <li><i class="pi pi-phone"></i> +63 915 517 9745</li>
                        <li><i class="pi pi-envelope"></i> raenard.cruz@gmail.com</li>
                        <li><i class="pi pi-calendar"></i> Mon - Fri, 9am - 6pm</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ new Date().getFullYear() }} Raenard Cruz. All Rights Reserved.</p>
                <p>Built with <span class="accent">Vue.js</span> & <span class="accent">Vite</span></p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    padding: 80px 2rem 40px;
    background: #080a10;
    border-top: 1px solid var(--glass-border);
    position: relative;
    z-index: 10;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
}

.footer-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo-icon {
    font-size: 1.5rem;
    color: var(--primary);
}

.logo-text {
    font-weight: 800;
    letter-spacing: 2px;
    font-size: 1.25rem;
    color: var(--text-main);
}

.logo-text .accent {
    color: var(--primary);
}

.description {
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 400px;
    font-size: 0.95rem;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-main);
    text-decoration: none;
    border: 1px solid var(--glass-border);
    transition: all 0.3s ease;
}

.social-btn:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px var(--primary-glow);
    border-color: var(--primary);
}

.footer-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.75rem;
}

.footer-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--primary);
}

.footer-links {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.footer-links li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-muted);
    font-size: 0.95rem;
}

.footer-links li a {
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.3s ease;
}

.footer-links li a:hover {
    color: var(--primary);
    padding-left: 5px;
}

.footer-links li i {
    color: var(--primary);
    font-size: 0.9rem;
}

.footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--glass-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-muted);
    font-size: 0.85rem;
}

.accent {
    color: var(--primary);
    font-weight: 600;
}

@media (max-width: 968px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }
    .footer-info {
        grid-column: span 2;
    }
}

@media (max-width: 480px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .footer-info {
        grid-column: span 1;
    }
    .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>
