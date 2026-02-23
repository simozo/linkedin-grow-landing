const translations = {
    en: {
        nav_wishlist: "Join Wishlist",
        hero_badge: "Early Access",
        hero_title_part1: "Turn every comment into",
        hero_title_part2: "an Opportunity.",
        hero_subtext: "Scale your reach on LinkedIn and 4x your conversions with strategic engagement. Building a more thoughtful way to connect.",
        wishlist_placeholder: "Your business email",
        wishlist_button: "Reserve my spot",
        success_title: "Welcome to the Inner Circle.",
        success_body: "You'll be the first to know when we launch the strategic growth engine.",
        phil1_title: "Exponential Reach",
        phil1_body: "Reach beyond your 1st degree. Comments grow your network by 12% organically through the golden hour.",
        phil2_title: "Qualified Pipeline",
        phil2_body: "Generated leads with 3-5x higher conversion rates. Start natural conversations that warm up your outreach.",
        phil3_title: "Authority & Expertise",
        phil3_body: "Position yourself as an industry expert. Thoughtful comments generate 2-3 connection requests for every 10 posts.",
        impact_title: "Strategic Impact by the Numbers",
        impact_stat1_label: "Conversion Rate",
        impact_stat1_value: "3-5x Higher",
        impact_stat2_label: "Organic Reach",
        impact_stat2_value: "+12%",
        impact_stat3_label: "Lead Pipeline",
        impact_stat3_value: "23%",
        footer_copy: "&copy; 2026 Linkedin Grow. Strategic engagement for professionals.",
        footer_privacy: "Privacy"
    },
    it: {
        nav_wishlist: "Unisciti alla Wishlist",
        hero_badge: "Accesso Anticipato",
        hero_title_part1: "Trasforma ogni commento in",
        hero_title_part2: "un'Opportunità.",
        hero_subtext: "Scala la tua portata su LinkedIn e quadruplica le conversioni con l'engagement strategico. Un modo più intelligente di connettersi.",
        wishlist_placeholder: "La tua email aziendale",
        wishlist_button: "Riserva il mio posto",
        success_title: "Benvenuto nella Cerchia Stretta.",
        success_body: "Sarai il primo a scoprire l'impatto del growth engine strategico.",
        phil1_title: "Reach Esponenziale",
        phil1_body: "Vai oltre il primo grado. I commenti aumentano la tua rete del 12% organicamente sfruttando la golden hour.",
        phil2_title: "Pipeline Qualificata",
        phil2_body: "Genera lead con tassi di conversione 3-5x superiori. Avvia conversazioni naturali che scaldano l'outreach.",
        phil3_title: "Autorità e Expertise",
        phil3_body: "Posizionati come esperto del settore. Commenti di valore generano 2-3 richieste di connessione ogni 10 interazioni.",
        impact_title: "Impatto Strategico in Numeri",
        impact_stat1_label: "Tasso di Conversione",
        impact_stat1_value: "3-5x Superiore",
        impact_stat2_label: "Reach Organica",
        impact_stat2_value: "+12%",
        impact_stat3_label: "Pipeline di Lead",
        impact_stat3_value: "23%",
        footer_copy: "&copy; 2026 Linkedin Grow. Engagement strategico per professionisti.",
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
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email-input');
            const email = emailInput.value;

            try {
                const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email })
                });

                if (res.ok || res.status === 204) {
                    // Success UI transition
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
                } else {
                    const errorData = await res.json();
                    console.error('Brevo API Error:', errorData);
                    alert('Something went wrong, please try again.');
                }
            } catch (error) {
                console.error('Network Error:', error);
                alert('Network error, please try again.');
            }
        });
    }

    // Impact Numbers Animation
    const impactValues = document.querySelectorAll('.impact-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.innerText;
                const numericValue = parseFloat(finalValue.replace(/[^\d.-]/g, ''));
                const isPercent = finalValue.includes('%');
                const isMultiplier = finalValue.includes('x');

                animateValue(target, 0, numericValue, 2000, isPercent, isMultiplier);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    impactValues.forEach(val => observer.observe(val));

    function animateValue(obj, start, end, duration, isPercent, isMultiplier) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let current = Math.floor(progress * (end - start) + start);

            let displayValue = current;
            if (isPercent) displayValue = (end > 0 ? '+' : '') + current + '%';
            if (isMultiplier) displayValue = (current === end ? end : current) + '-5x Higher'; // Simplified for the 3-5x case

            // Special handling for the specific strings
            if (end === 12 && isPercent) displayValue = '+' + current + '%';
            if (end === 23 && isPercent) displayValue = current + '%';
            if (end === 3 && isMultiplier) displayValue = current + '-5x Higher';

            obj.innerText = displayValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure final value is exact
                obj.innerText = finalValueFromData(end, isPercent, isMultiplier);
            }
        };
        window.requestAnimationFrame(step);
    }

    function finalValueFromData(val, isPercent, isMultiplier) {
        if (val === 12 && isPercent) return "+12%";
        if (val === 23 && !isMultiplier) return "23%";
        if (val === 3 && isMultiplier) return "3-5x Higher";
        return val;
    }
});
