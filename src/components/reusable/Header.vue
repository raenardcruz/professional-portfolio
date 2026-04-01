<template>
    <header class="header">
        <div class="header-container">
            <div class="logo">
                <i class="pi pi-user logo-icon"></i>
                <span class="logo-text">PORT<span class="accent">FOLIO</span></span>
            </div>
            <nav class="nav">
                <a href="#" class="nav-link">Home</a>
                <a href="#skills" class="nav-link">Skills</a>
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#contact" class="nav-link contact-btn">Contact Me</a>
            </nav>
            <div class="mobile-menu-btn">
                <i class="pi pi-bars"></i>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        background: var(--glass-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--glass-border);
    }

    .header-container {
        width: 100%;
        max-width: 1200px;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
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
        position: relative;
    }

    .logo-text .accent::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary);
    }

    .nav {
        display: flex;
        align-items: center;
        gap: 2.5rem;
    }

    .nav-link {
        color: var(--text-main);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        position: relative;
        opacity: 0.8;
    }

    .nav-link:hover {
        opacity: 1;
        color: var(--primary);
    }

    .nav-link.contact-btn {
        padding: 0.6rem 1.5rem;
        background: var(--primary);
        border-radius: 50px;
        color: white;
        opacity: 1;
        box-shadow: 0 4px 15px var(--primary-glow);
    }

    .nav-link.contact-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px var(--primary-glow);
        background: #4f46e5; /* Subtly darker indigo */
    }

    .mobile-menu-btn {
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .nav {
            display: none;
        }
        .mobile-menu-btn {
            display: block;
        }
    }
</style>