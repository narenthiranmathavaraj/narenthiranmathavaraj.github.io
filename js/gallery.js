// --- DYNAMIC LIGHTBOX INJECTION ---
// Checks if the lightbox HTML exists; if not, injects it.
// This allows project sub-pages (which don't have the lightbox markup) to use it automatically.
(function injectLightbox() {
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
        <div id="lightbox" class="lightbox" onclick="closeLightbox(event)">
            <span class="lightbox-close" onclick="closeLightbox(event)"><i class="fas fa-times"></i></span>
            <div class="lightbox-content" onclick="event.stopPropagation()">
                <div id="lightbox-img-container" style="display: none;">
                    <img id="lightbox-img" src="" alt="Gallery Image">
                </div>
                <!-- Video Container Added -->
                <div id="lightbox-video-container" style="display: none; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px;">
                    <iframe id="lightbox-video" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div id="lightbox-emoji-container" style="display: none; text-align: center;">
                    <div id="lightbox-emoji" style="font-size: 8rem;"></div>
                </div>
                <div class="lightbox-caption">
                    <h3 id="lightbox-title"></h3>
                    <p id="lightbox-desc"></p>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
})();

// --- MEDIA LIGHTBOX LOGIC ---

// Unified function for handling Media Blocks (Image or Video)
function openMediaLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxVideoContainer = document.getElementById('lightbox-video-container');
    const lightboxEmojiContainer = document.getElementById('lightbox-emoji-container');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    // Reset all containers
    lightboxImgContainer.style.display = 'none';
    lightboxVideoContainer.style.display = 'none';
    if (lightboxEmojiContainer) lightboxEmojiContainer.style.display = 'none';

    // Data Extraction
    const videoSrc = element.getAttribute('data-video-src');
    const imgSrc = element.querySelector('img') ? element.querySelector('img').src : null;
    const title = element.querySelector('h3') ? element.querySelector('h3').innerText :
        (element.getAttribute('data-title') || 'Media Detail');
    const desc = element.querySelector('.media-caption-overlay') ? element.querySelector('.media-caption-overlay').innerText :
        (element.getAttribute('data-desc') || '');

    // 1. VIDEO MODE
    if (videoSrc) {
        lightboxVideo.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1'; // Auto-play on open
        lightboxVideoContainer.style.display = 'block';
    }
    // 2. IMAGE MODE
    else if (imgSrc) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
        lightboxImgContainer.style.display = 'flex';
    }

    // Set Text
    if (lightboxTitle) lightboxTitle.innerText = title;
    if (lightboxDesc) lightboxDesc.innerText = desc;

    // Show Lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Force cursor update to prevent stuck expanded state
    setTimeout(() => document.dispatchEvent(new Event('cursor-update')), 100);
}

function openLightbox(element) {
    // Existing function for Gallery Items (Delegates to new logic if compatible, or keeps old behavior)
    // For now, let's keep the old behavior for gallery-items to avoid breaking existing styles, 
    // but ensure we can handle the dynamically injected elements.

    // (Existing logic from previous file usually handles '.gallery-item')
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxEmoji = document.getElementById('lightbox-emoji');
    const lightboxEmojiContainer = document.getElementById('lightbox-emoji-container');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    const img = element.querySelector('img');
    const emojiDiv = element.querySelector('[data-emoji]');
    const title = element.querySelector('h4') ? element.querySelector('h4').innerText : 'Gallery Item';

    // Reset
    lightboxImgContainer.style.display = 'none';
    if (lightboxEmojiContainer) lightboxEmojiContainer.style.display = 'none';
    if (document.getElementById('lightbox-video-container')) document.getElementById('lightbox-video-container').style.display = 'none';

    if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxDesc.innerText = img.getAttribute('data-desc') || '';
        lightboxImgContainer.style.display = 'flex';
    } else if (emojiDiv && lightboxEmoji) {
        lightboxEmoji.innerText = emojiDiv.getAttribute('data-emoji');
        lightboxDesc.innerText = emojiDiv.getAttribute('data-desc') || '';
        lightboxEmojiContainer.style.display = 'block';
    }

    lightboxTitle.innerText = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Force cursor update
    setTimeout(() => document.dispatchEvent(new Event('cursor-update')), 100);
}

function openAchievementCert(btn) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    // Reset - ensuring video is hidden
    lightboxImgContainer.style.display = 'none';
    if (document.getElementById('lightbox-emoji-container')) document.getElementById('lightbox-emoji-container').style.display = 'none';
    if (document.getElementById('lightbox-video-container')) document.getElementById('lightbox-video-container').style.display = 'none';

    const certSrc = btn.getAttribute('data-cert-src');
    const title = btn.getAttribute('data-cert-title');
    const desc = btn.getAttribute('data-cert-desc');

    if (certSrc) {
        lightboxImg.src = certSrc;
        lightboxImg.alt = title;
        lightboxDesc.innerText = desc || '';
        lightboxImgContainer.style.display = 'flex';
    }

    lightboxTitle.innerText = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event) event.stopPropagation();

    const isCloseButton = event.target.closest('.lightbox-close');
    const isBackground = event.target.id === 'lightbox';

    if (isCloseButton || isBackground) {
        const lightbox = document.getElementById('lightbox');
        const lightboxVideo = document.getElementById('lightbox-video');

        // Stop Video when closing
        if (lightboxVideo) lightboxVideo.src = "";

        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        const lightboxVideo = document.getElementById('lightbox-video');
        if (lightbox && lightbox.classList.contains('active')) {
            if (lightboxVideo) lightboxVideo.src = ""; // Stop Video
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// --- INLINE VIDEO LOGIC ---
// Plays a video directly inside the container (e.g., Hero section) instead of a lightbox.
function playInlineVideo(container) {
    const videoSrc = container.getAttribute('data-video-src');
    if (!videoSrc) return;

    // Dispatch event to hide custom cursor immediately
    const event = new Event('cursor-hide');
    document.dispatchEvent(event);

    // Add playing class for styling (e.g., hide placeholder overlay)
    container.classList.add('video-playing');

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // Replace container content
    container.innerHTML = '';
    container.appendChild(iframe);
}

// Automatically fetch and set background thumbnails for inline videos
document.addEventListener('DOMContentLoaded', () => {
    const heroVideos = document.querySelectorAll('.project-media-hero, .media-card-bento');
    heroVideos.forEach(hero => {
        const videoSrc = hero.getAttribute('data-video-src');
        if (videoSrc) {
            // Extract Video ID (works for embed/ links)
            const parts = videoSrc.split('/');
            const videoId = parts[parts.length - 1].split('?')[0]; // Handle potential ? query params

            if (videoId) {
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                const placeholder = hero.querySelector('.video-placeholder');
                if (placeholder) {
                    placeholder.style.setProperty('--bg-image', `url(${thumbnailUrl})`);
                }
            }
        }
    });
});
