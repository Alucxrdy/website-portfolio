// script.js - Danny.aep Portfolio Interactions

const translations = {
    pt: {
        nav_about: "Sobre Mim",
        nav_projects: "Projetos",
        nav_contact: "Let's Talk",
        hero_badge: "Disponível para Projetos",
        hero_title1: "Corte seco",
        hero_title2: "não mora aqui",
        hero_sub: "imagem, ritmo e intenção — o resto vem.",
        hero_cta_portfolio: "Ver Portefólio",
        hero_cta_hire: "Contratar-me",
        about_title1: "Sobre Mim.",
        about_title2: "A Mente Criativa.",
        about_text: "Olá, meu nome é Daniel e meus amigos me chamam de Danny, comecei a editar por gosto e curiosidade e hoje é o que eu faço todos os dias. Gosto de edições que respiram,<br>que têm ritmo e não parecem forçados.<br>no fim, é simples:<br>se prende, funciona.",
        projects_title: "Projetos Selecionados",
        projects_sub: "Explora as minhas áreas de especialidade em edição de vídeo e motion design.",
        reels_sub: "Conteúdo dinâmico de alta retenção para plataformas verticais.",
        ads_title: "Comerciais & Ads",
        ads_sub: "Edição focada na conversão com ritmo cinematográfico.",
        saas_sub: "Animações de UI, product demos e visuais explainer para software.",
        contact_title: "Pronto para elevar o seu projeto?",
        contact_sub: "Vamos criar algo extraordinário juntos. O foco é qualidade e retenção em cada segundo do seu vídeo.",
        contact_name_ph: "O teu Nome",
        contact_email_ph: "O teu Email",
        contact_message_ph: "Conta-me sobre o projeto...",
        contact_submit: "Enviar Mensagem",
        footer_copy: "&copy; 2026 Danny.aep. Todos os direitos reservados."
    },
    en: {
        nav_about: "About Me",
        nav_projects: "Projects",
        nav_contact: "Let's Talk",
        hero_badge: "Available for Projects",
        hero_title1: "Hard cuts",
        hero_title2: "don't belong here",
        hero_sub: "visuals, rhythm, and intent — the rest follows.",
        hero_cta_portfolio: "View Work",
        hero_cta_hire: "Hire Me",
        about_title1: "About Me.",
        about_title2: "The Creative Mind.",
        about_text: "Hello, my name is Daniel and my friends call me Danny. I started editing out of passion and curiosity, and today it's what I do every day. I like edits that breathe, that have rhythm and don't feel forced. In the end, it's simple: if it captures you, it works.",
        projects_title: "Selected Projects",
        projects_sub: "Explore my areas of expertise in video editing and motion design.",
        reels_sub: "High-retention dynamic content for vertical platforms.",
        ads_title: "Commercials & Ads",
        ads_sub: "Conversion-focused editing with cinematic pacing.",
        saas_sub: "UI animations, product demos, and explainer visuals for software.",
        contact_title: "Ready to elevate your project?",
        contact_sub: "Let's create something extraordinary together. Focus on quality and retention in every second of your video.",
        contact_name_ph: "Your Name",
        contact_email_ph: "Your Email",
        contact_message_ph: "Tell me about your project...",
        contact_submit: "Send Message",
        footer_copy: "&copy; 2026 Danny.aep. All rights reserved."
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Theme & Language Toggle Logic ---
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const langToggleBtn = document.getElementById('langToggle');

    let currentTheme = localStorage.getItem('theme') || 'dark';
    let currentLang = localStorage.getItem('lang') || 'pt';

    const updateThemeUI = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        if(theme === 'dark') {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    };

    const updateLangUI = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        langToggleBtn.innerText = lang === 'pt' ? 'EN' : 'PT';
    };

    // Load initial states
    updateThemeUI(currentTheme);
    updateLangUI(currentLang);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        updateThemeUI(currentTheme);
    });

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        localStorage.setItem('lang', currentLang);
        updateLangUI(currentLang);
    });
    
    // --- 1. Custom Glow Cursor Tracker (Fluid Lerp) ---
    const glowCursor = document.getElementById('glowCursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const renderGlow = () => {
        // Interpolação Linear (Lerp) para tornar a movimentação fluida e orgânica
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        
        if (window.innerWidth > 768 && glowCursor) {
            glowCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        requestAnimationFrame(renderGlow);
    };
    
    // Inicia o motor de rendering do glow
    if (window.innerWidth > 768) {
        requestAnimationFrame(renderGlow);
    }

    // O efeito Parallax do Hero Visual foi removido

    // --- 3. Custom 3D Tilt Effect for Cards ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limit the tilt angle using 15 max angle
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        });
    });

    // --- 3.5. Magnetic Buttons ---
    const magneticButtons = document.querySelectorAll('.btn, .nav-links a');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move subtlemente em direção ao cursor
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = 'transform 0.1s ease-out';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        });
    });

    // --- 4. Scroll Reveal Animations via IntersectionObserver ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slighly before bottom
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 6. Custom Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Exclusive accordion logic (closes others)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle clicked item
            item.classList.toggle('active');
        });
    });

    // --- 7. Video Modal Logic (Native HTML5 Video) ---
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const videoTriggers = document.querySelectorAll('.video-trigger');

    const openVideo = (videoSrc, aspect = 'vertical') => {
        if (!videoSrc) return;
        
        // Ajustar aspeto do contentor
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.className = 'iframe-container ' + aspect;
        
        // Configurar e reproduzir vídeo local
        videoPlayer.src = videoSrc;
        
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Tentar dar play automático
        videoPlayer.play().catch(e => console.log("Auto-play bloqueado pelo browser."));
    };

    const handleCloseVideo = () => {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.src = ''; 
        document.body.style.overflow = '';
    };

    // --- 8. Interaction System ---
    videoTriggers.forEach(trigger => {
        const videoId = trigger.getAttribute('data-video-src');
        const aspect = trigger.getAttribute('data-aspect') || 'vertical';

        trigger.addEventListener('click', () => {
            if (videoId) openVideo(videoId, aspect);
        });
    });

    if (closeModal) closeModal.addEventListener('click', handleCloseVideo);
    if (modalOverlay) modalOverlay.addEventListener('click', handleCloseVideo);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            handleCloseVideo();
        }
    });

    // --- 9. AJAX Form Submission (Formspree) ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // Feedback visual imediato
            submitBtn.disabled = true;
            submitBtn.innerText = currentLang === 'pt' ? 'A enviar...' : 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = `<p style="color: #10b981; margin-top: 1rem;">${currentLang === 'pt' ? 'Obrigado! A tua mensagem foi enviada.' : 'Thank you! Your message has been sent.'}</p>`;
                    contactForm.reset();
                    submitBtn.innerText = currentLang === 'pt' ? 'Enviado!' : 'Sent!';
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formStatus.innerHTML = `<p style="color: #ef4444; margin-top: 1rem;">${data.errors.map(error => error.message).join(", ")}</p>`;
                    } else {
                        formStatus.innerHTML = `<p style="color: #ef4444; margin-top: 1rem;">Ocorreu um erro ao enviar a mensagem.</p>`;
                    }
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            } catch (error) {
                formStatus.innerHTML = `<p style="color: #ef4444; margin-top: 1rem;">Ocorreu um erro de rede.</p>`;
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});