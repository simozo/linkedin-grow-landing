const translations = {
    en: {
        nav_wishlist: "Join Wishlist",
        hero_badge: "Early Access",
        hero_title_part1: "Networking,",
        hero_title_part2: "Evolved.",
        hero_subtext: "We're building a more thoughtful way to connect. Join the wishlist for a seat in the most exclusive professional growth circle.",
        wishlist_placeholder: "Your business email",
        wishlist_button: "Reserve my spot",
        success_title: "Added to the circle.",
        success_body: "You'll be the first to know when we open the doors.",
        phil1_title: "Quality over Noise",
        phil1_body: "AI that understands context, not just keywords. Build real rapport, not automated spam.",
        phil2_title: "Network Intelligence",
        phil2_body: "Visualize connections you didn't know you had. Optimize your reach with data-driven intent.",
        phil3_title: "Time Integrity",
        phil3_body: "Spend less time scrolling and more time closing. The tools you need, right where you work.",
        footer_copy: "&copy; 2024 LG Grow. Designed for human connection.",
        footer_privacy: "Privacy"
    },
    it: {
        nav_wishlist: "Unisciti alla Wishlist",
        hero_badge: "Accesso Anticipato",
        hero_title_part1: "Networking,",
        hero_title_part2: "Evoluto.",
        hero_subtext: "Stiamo costruendo un modo più ponderato per connettersi. Unisciti alla wishlist per un posto nell'esclusiva cerchia di crescita professionale.",
        wishlist_placeholder: "La tua email aziendale",
        wishlist_button: "Riserva il mio posto",
        success_title: "Aggiunto alla cerchia.",
        success_body: "Sarai il primo a sapere quando apriremo le porte.",
        phil1_title: "Qualità oltre il Rumore",
        phil1_body: "IA che comprende il contesto, non solo le parole chiave. Costruisci rapporti reali, non spam automatizzato.",
        phil2_title: "Intelligenza di Rete",
        phil2_body: "Visualizza connessioni che non sapevi di avere. Ottimizza la tua portata con intenti basati sui dati.",
        phil3_title: "Integrità del Tempo",
        phil3_body: "Passa meno tempo a scorrere e più tempo a concludere. Gli strumenti necessari, proprio dove lavori.",
        footer_copy: "&copy; 2024 LG Grow. Progettato per la connessione umana.",
        footer_privacy: "Privacy"
    }
};

function localize() {
    const lang = navigator.language.startsWith('it') ? 'it' : 'en';
    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });
}

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        // Interaction with mouse
        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x += dx * force * 0.05;
                this.y += dy * force * 0.05;
            }
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(37, 99, 235, 0.4)';
        this.ctx.fill();
    }
}

class NetworkGraph {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.connectionDist = 180;

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        const quantity = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < quantity; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.connectionDist) {
                    const opacity = 1 - (dist / this.connectionDist);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.15})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.update(this.mouse);
            p.draw();
        });
        this.drawConnections();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Localize content
    localize();

    // Start Network
    new NetworkGraph();

    // Form Logic
    const waitlistForm = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('successMessage');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulation
            const wrapper = waitlistForm.querySelector('.input-wrapper');
            wrapper.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(10px)';

            setTimeout(() => {
                waitlistForm.classList.add('hidden');
                successMessage.classList.remove('hidden');

                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(10px)';

                requestAnimationFrame(() => {
                    successMessage.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                });
            }, 600);
        });
    }
});
