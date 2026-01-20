// JS Logic for Animations and Contact Form Interactions

document.addEventListener('DOMContentLoaded', () => {

    // TYPING EFFECT
    const textElement = document.getElementById('typing-text');
    const roles = ["Robotics Engineer", "RL Researcher"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!textElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();


    // SCROLL REVEAL (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- FUN & INTERACTIVE FEATURES ---

    // 1. 3D TILT EFFECT FOR CARDS
    const tiltElements = document.querySelectorAll('.project-card, .achievement-card, .certificate-card, .timeline-content, .gallery-item');
    let currentTiltedElement = null; // Track currently active element for scroll reset

    tiltElements.forEach(card => {
        card.addEventListener('mouseenter', () => {
            currentTiltedElement = card;
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            if (currentTiltedElement === card) currentTiltedElement = null;
        });
    });

    // 2. CUSTOM ROBOTIC CURSOR - CIRCULAR LASER
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // CURSOR VISIBILITY LOGIC (Fix for Iframes)
    // When mouse enters an iframe (like YouTube), the document sees a 'mouseout'.
    // We use display: none for instant hiding to prevent "frozen" ghost artifacts.

    const hideCursor = () => {
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    };

    const showCursor = () => {
        cursorDot.style.display = 'block';
        cursorRing.style.display = 'block';
    };

    document.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) {
            hideCursor();
        }
    });

    document.addEventListener('mouseover', (e) => {
        showCursor();
    });

    // Also hide if window loses focus (e.g. clicking iframe)
    window.addEventListener('blur', hideCursor);
    window.addEventListener('focus', showCursor);

    // Listen for custom events from other scripts (e.g. gallery.js)
    document.addEventListener('cursor-hide', hideCursor);
    document.addEventListener('cursor-show', showCursor);

    document.addEventListener('mousemove', (e) => {
        // SAFETY CHECK: If over a video container, force hide
        if (e.target.closest('.video-playing')) {
            hideCursor();
            return;
        }

        // Only show if invisible and NOT over video
        if (cursorDot.style.display === 'none') {
            showCursor();
        }

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly using transform (better performance)
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
        // Smooth lag for the ring
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;

        ringX += dx * 0.15;
        ringY += dy * 0.15;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for cursor
    const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, details, summary, [onclick]:not(.lightbox):not(.lightbox-content), [role="button"], .project-card, .tech-icon, .hover-target, .clickable, .lightbox-close';
    const interactiveElements = document.querySelectorAll(INTERACTIVE_SELECTOR);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('active');
        });
    });

    // Fix: Check hover state on scroll to prevent stuck "active" state
    const checkHoverState = () => {
        const hoveredEl = document.elementFromPoint(mouseX, mouseY);

        // Safety: If hovering the lightbox background or content wrapper, FORCE reset
        // This overrides any underlying element (like gallery items) that might be "seen" by elementFromPoint
        if (hoveredEl && (hoveredEl.classList.contains('lightbox') || hoveredEl.classList.contains('lightbox-content'))) {
            cursorRing.classList.remove('active');
            return;
        }

        // 1. Update Cursor Ring
        if (hoveredEl && hoveredEl.closest(INTERACTIVE_SELECTOR)) {
            cursorRing.classList.add('active');
        } else {
            cursorRing.classList.remove('active');
        }

        // 2. Reset Tilt Effect if scrolled away
        if (currentTiltedElement && hoveredEl) {
            // If the element under cursor is NOT the tilted element (or a child of it)
            if (!currentTiltedElement.contains(hoveredEl) && currentTiltedElement !== hoveredEl) {
                // Force reset styling
                currentTiltedElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                currentTiltedElement = null;
            }
        }
    };

    // Check on scroll (throttling can be added if needed, but simple boolean toggle is usually fine)
    window.addEventListener('scroll', checkHoverState, { passive: true });

    // Listen for manual cursor update requests (e.g., when lightbox opens/closes)
    document.addEventListener('cursor-update', checkHoverState);


    // CV Zoom Logic (if on CV page or section)
    let currentZoom = 1;
    const cvContent = document.getElementById('cv-content');
    const zoomLevel = document.getElementById('zoom-level');

    if (cvContent) {
        window.zoomIn = function () {
            if (currentZoom < 1.5) {
                currentZoom += 0.1;
                updateZoom();
            }
        };

        window.zoomOut = function () {
            if (currentZoom > 0.6) {
                currentZoom -= 0.1;
                updateZoom();
            }
        };

        window.resetZoom = function () {
            currentZoom = 1;
            updateZoom();
        };

        function updateZoom() {
            cvContent.style.transform = `scale(${currentZoom})`;
            if (zoomLevel) zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
        }
    }

    // 3. INTERACTIVE LOGO FACTS
    const logoArea = document.querySelector('.logo');
    const logoLink = document.querySelector('.logo a');

    // Fix: Keep cursor visible when clicking logo
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            showCursor();
            setTimeout(showCursor, 50);
            setTimeout(showCursor, 100);
            // Ensure no blur handling hides it
            cursorDot.style.display = 'block';
            cursorRing.style.display = 'block';
        });
    }

    const factText = document.getElementById('logo-fact-text');
    const robotFacts = [
        "Robots don’t make mistakes — engineers do.",
        "A robot works perfectly… until someone watches it.",
        "Robots hate cable management as much as humans do.",
        "Debugging a robot often involves staring at it silently.",
        "Robots follow instructions too literally.",
        "If a robot moves, it’s a control problem; if it doesn’t, it’s a power problem.",
        "Robots don’t “fail” — they demonstrate edge cases.",
        "A robot standing still is still consuming CPU.",
        "Adding AI doesn’t fix bad mechanics.",
        "Robots love smooth floors and hate real life.",
        "Robots can do calculus faster than you, but can’t open a door reliably.",
        "Teaching a robot to walk is harder than sending one to Mars.",
        "Robots don’t understand “almost.”",
        "A robot arm has no idea it’s expensive.",
        "Robots are confident — even when they’re wrong.",
        "The real boss of robotics is latency.",
        "Robots don’t panic, but their logs do.",
        "Simulation works great… until reality loads.",
        "Robots are deterministic until noise arrives.",
        "Robots don’t need sleep, but engineers do."
    ];

    let factTimeout;
    let isTypingFact = false;

    function typeFact(text) {
        if (!isTypingFact) {
            logoArea.classList.remove('typing');
            return;
        }

        // Create a ghost element to "measure" height and predict line breaks
        const ghost = document.createElement('div');
        ghost.style.cssText = `
            position: absolute;
            visibility: hidden;
            width: ${factText.parentElement.clientWidth - 40}px;
            font-size: ${getComputedStyle(factText).fontSize};
            font-family: ${getComputedStyle(factText).fontFamily};
            line-height: ${getComputedStyle(factText).lineHeight};
            white-space: normal;
            word-wrap: break-word;
        `;
        document.body.appendChild(ghost);

        const words = text.split(' ');
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let ghostContent = '';

        function typeNext() {
            if (!isTypingFact) {
                document.body.removeChild(ghost);
                return;
            }

            if (currentWordIndex < words.length) {
                const word = words[currentWordIndex];

                // If we're at the start of a word, check if adding it causes a wrap
                if (currentCharIndex === 0) {
                    const beforeHeight = ghost.offsetHeight;
                    ghost.textContent = ghostContent + (ghostContent ? ' ' : '') + word;
                    const afterHeight = ghost.offsetHeight;

                    if (afterHeight > beforeHeight && ghostContent !== '') {
                        factText.innerHTML += '<br>';
                        ghostContent += '\n'; // Keep ghost in sync with forced break
                    }
                    if (ghostContent && !ghostContent.endsWith('\n')) {
                        factText.innerHTML += ' ';
                        ghostContent += ' ';
                    }
                }

                if (currentCharIndex < word.length) {
                    factText.innerHTML += word.charAt(currentCharIndex);
                    currentCharIndex++;
                    factTimeout = setTimeout(typeNext, 40);
                } else {
                    ghostContent += word;
                    currentWordIndex++;
                    currentCharIndex = 0;
                    factTimeout = setTimeout(typeNext, 80); // Short pause between words
                }
            } else {
                logoArea.classList.remove('typing');
                document.body.removeChild(ghost);
            }
        }

        typeNext();
    }

    if (logoArea && factText) {
        logoArea.addEventListener('mouseenter', () => {
            clearTimeout(factTimeout);
            factText.innerHTML = '';
            isTypingFact = true;
            logoArea.classList.add('typing');
            let randomFact = robotFacts[Math.floor(Math.random() * robotFacts.length)];
            // Clean up any trailing punctuation before adding the ellipsis
            randomFact = randomFact.replace(/[.!?]+$/, '');
            typeFact(randomFact + '...');
        });

        logoArea.addEventListener('mouseleave', () => {
            isTypingFact = false;
            logoArea.classList.remove('typing');
            clearTimeout(factTimeout);
        });
        logoArea.addEventListener('mouseleave', () => {
            isTypingFact = false;
            logoArea.classList.remove('typing');
            clearTimeout(factTimeout);
        });
    }

    // 4. MASCOT AUTO-SHOW
    setTimeout(() => {
        const tooltip = document.getElementById('mascot-tooltip');
        if (tooltip) tooltip.classList.add('show');
    }, 1500); // Show after 1.5s
});

// GLOBAL FUNCTIONS FOR MASCOT INTERACTION (Needs to be outside DOMContentLoaded to be accessible by onclick in HTML)
window.toggleMascot = function (event) {
    const tooltip = document.getElementById('mascot-tooltip');
    if (!tooltip) return;

    // If clicking INSIDE the tooltip content (e.g. selecting text), do nothing
    if (event.target.closest('.mascot-tooltip') && !event.target.classList.contains('mascot-close')) {
        return;
    }

    // If clicking the image/container, toggle.
    // NOTE: The close button has stopPropagation, so it won't trigger this if clicked.
    tooltip.classList.toggle('show');
};

window.closeMascot = function (event) {
    const tooltip = document.getElementById('mascot-tooltip');
    if (tooltip) tooltip.classList.remove('show');
    if (event) event.stopPropagation(); // Stop it from bubbling up to toggleMascot
};
