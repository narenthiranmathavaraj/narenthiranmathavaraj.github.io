/**
 * Premium Background Logic: Glowing Embers & Parallax Mesh
 */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const meshOrbs = document.querySelectorAll('.mesh-orb');

let particles = [];
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Mouse tracking with smoothing
window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
});

class Ember {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 1) * 0.6; // Floats upwards slowly
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulse = Math.random() * 0.02;
        this.pulseDir = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse opacity
        this.opacity += this.pulse * this.pulseDir;
        if (this.opacity > 0.6 || this.opacity < 0.1) this.pulseDir *= -1;

        // Wrap around
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;

        // Mouse displacement
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            this.x -= dx * 0.02;
            this.y -= dy * 0.02;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add a subtle glow to larger particles
        if (this.size > 2) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

function init() {
    particles = [];
    const count = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < count; i++) {
        particles.push(new Ember());
    }
}

function animate() {
    // Smoothen mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Parallax Mesh Orbs
    const moveX = (mouse.x - window.innerWidth / 2) * 0.02;
    const moveY = (mouse.y - window.innerHeight / 2) * 0.02;

    meshOrbs.forEach((orb, index) => {
        const factor = (index + 1) * 0.5;
        orb.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });

    requestAnimationFrame(animate);
}

init();
animate();
