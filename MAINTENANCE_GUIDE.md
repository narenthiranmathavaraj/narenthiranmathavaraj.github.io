# Portfolio Maintenance Guide 🛠️

This guide explains how to update your portfolio, add new content, and manage media files.


---

## 📜 License & Attribution (MIT)
This template is open-source under the **MIT License**.

### Your Only Obligation
1.  **Keep the License**: You must include the [`LICENSE`](LICENSE) file in your repository.
2.  **Attribution**: Please keep the footer link pointing to the original template:
    > Feel free to build your homepage upon my [template](https://github.com/narenthiranmathavaraj/narenthiranmathavaraj.github.io) ^_-

### Star the Repo! ⭐️
If you enjoy using this template, please give the repository a star on GitHub. It helps me out a lot!

---

## 📂 Backup & Safety
All backups are consolidated in the **`backups/`** folder, which contains:
- `snapshot_old/` - Full backup snapshot from earlier version
- `complete_portfolio_sync_v1/` - Complete portfolio sync backup
- `index_backup_gallery_v1.html` - Gallery version backup
- `original_portfolio.html` - Original portfolio backup

**Tip:** Before making major changes, create a backup of your current `index.html` file!

---

## 🛠️ Utility Scripts
The **`scripts/`** folder contains utility scripts for portfolio maintenance:
- `remove_bg_simple.py` - Python script to remove white backgrounds from images

---

## ➕ Adding New Content
To make adding content easy, I've created **Templates** in the `templates/` folder.

### 1. Adding a New Experience / Internship
1.  Open `templates/new_timeline_item.html` using Notepad or a code editor.
2.  Copy the code.
3.  Open `index.html`.
4.  Search for: `<!-- === ➕ PASTE NEW EXPERIENCE/RESEARCH HERE === -->` (Line ~123).
5.  Paste the code **below** that line.
6.  Update the text inside `[BRACKETS]` with your details.

### 2. Adding a New Project
1.  Open `templates/new_project_card.html`.
2.  Copy the code.
3.  Open `index.html`.
4.  Search for: `<!-- === ➕ PASTE NEW PROJECT HERE === -->` (Line ~187).
5.  Paste the code.
6.  **Create the Project Page**:
    *   Duplicate an existing project page (e.g., copy `projects/autonomous-robot.html` and rename it to `projects/your-new-project.html`).
    *   Open the new file and update the title, text, and images.

### 3. Adding a New Achievement
1.  Open `templates/new_achievement_card.html`.
2.  Copy, Open `index.html`, Find `<!-- === ➕ PASTE NEW ACHIEVEMENT HERE === -->`, and Paste.

### 4. Adding a New Certificate
1.  **Prepare Your Certificate Image**: Save your certificate image to `assets/images/certificates/` folder.
2.  **Use Template**:
    *   Open `templates/new_certificate_card.html`.
    *   Copy the code.
    *   Open `index.html` and find the `<!-- CERTIFICATES -->` section (around Line ~333).
    *   Paste within the `<div class="certificates-grid">`.
    *   Update all fields in `[BRACKETS]`:
        - `[YOUR_CERTIFICATE]` - Your certificate filename
        - `[CERTIFICATE_TITLE]` - Certificate name
        - `[ISSUER_NAME]` - Organization that issued it
        - `[CERTIFICATE_DESCRIPTION]` - Brief description
        - `[MONTH YEAR]` - Date issued
        - `[VERIFICATION_URL]` - Link to verify certificate

### 5. Adding a Gallery Item
1.  **Prepare Your Image**: Save to `assets/images/gallery/` folder.
2.  **Use Template**:
    *   Open `templates/new_gallery_item.html`.
    *   Copy the code.
    *   Open `index.html` and find `<!-- GALLERY -->` (around Line ~440).
    *   Paste within the `<div class="gallery-grid">`.
    *   Update all fields in `[BRACKETS]`:
        - `[YOUR_IMAGE_NAME]` - Your image filename
        - `[IMAGE_DESCRIPTION]` - Alt text
        - `[DETAILED_DESCRIPTION]` - Full description for lightbox
        - `[TITLE]` - Gallery item title
        - `[SHORT_DESCRIPTION]` - Brief description

### 6. Adding Skills
1.  **Locate Skills Section**: Open `index.html` and find `<!-- SKILLS -->` (around Line ~405).
2.  **Add to Existing Category**:
    *   Find the appropriate `<div class="skill-category">` (Programming, Robotics, AI & Vision).
    *   Add a new `<span class="skill-item">Your Skill</span>` inside the `<div class="skills-list">`.
3.  **Create New Category**:
    *   Copy an entire `<div class="skill-category reveal">` block.
    *   Paste it within `<div class="skills-container">`.
    *   Update the `<h3>` category name and add your skill items.

### 7. Updating "Beyond the Lab" Section
1.  **Locate Section**: Open `index.html` and find the `<!-- BEYOND THE LAB SECTION -->` (Line ~620).
2.  **Edit Leadership**: Update list items in the first `.beyond-card`.
3.  **Edit Hobbies**: Update list items in the second `.beyond-card`.
4.  **Chess Link**: The Chess link interacts with `<span>` tags. Use this format:
    ```html
    <li><i class="fas fa-chess"></i> <span>Chess (<a href="..." ...>your text</a>)</span></li>
    ```

---

## 🖼️ Managing Images & Videos
All media files are now organized in the `assets/images/` folder with the following structure:

```
assets/
├── images/
│   ├── hero/           → Profile pictures and hero section images
│   ├── projects/       → Project screenshots and videos
│   ├── gallery/        → Gallery section images
│   ├── research/       → Research-related images
│   ├── certificates/   → Certificate images
│   ├── mascot/         → Wall-E mascot image
│   └── ui/             → UI elements (cursor, etc.)
├── gifs/               → Animated GIFs and MP4 Videos (Project Thumbnails)
├── pdfs/               → PDF documents (CV, etc.)
├── videos/             → Larger Video files
```

### Changing Project Images (Bento Grid)
For the new "Bento Grid" layout on project pages:

1.  **Main Hero Media (Video/Image)**:
    *   Locate the `<div class="project-media-hero">` section in your project HTML file.
    *   **To use an Image**:
        ```html
        <img src="../assets/images/projects/your-image.jpg" alt="Description" style="width:100%; height:100%; object-fit:cover;">
        ```
    *   **To use a Video (Recommended):**
        ```html
        <video autoplay muted loop playsinline loading="lazy" style="width:100%; height:100%; object-fit:cover;">
            <source src="../assets/gifs/your-video.mp4" type="video/mp4">
        </video>
        ```

2.  **Grid Media Cards**:
    *   Look for `<div class="bento-card media-card-bento">`.
    *   Replace the placeholder `<img>` `src` with your file path: `../assets/images/projects/filename.jpg`.

**Image Organization Tips:**
*   `assets/images/hero/` → Profile pictures and hero section images
*   `assets/images/projects/` → Project screenshots/videos
*   `assets/images/certificates/` → Certificate images
*   `assets/images/gallery/` → Gallery section images
*   `assets/images/mascot/` → Mascot images (Wall-E)

### Project Media Lightbox (Clickable Blocks)
You can make any block in a project page (usually the "Media" card) clickable so it opens a popup lightbox.

#### 1. Setup (Already done for current pages)
Ensure the page includes the gallery script at the bottom:
```html
<script src="../js/gallery.js"></script>
```

#### 2. Making a Block Clickable
Add the class `clickable-media` and the attribute `onclick="openMediaLightbox(this)"` to the block.

**Option A: Image Popup**
Use this for static images or placeholders.
```html
<div class="bento-card media-card-bento clickable-media"
     onclick="openMediaLightbox(this)"
     data-title="My Image Title"
     data-desc="Description of the image found inside this block.">
     
     <!-- The image displayed on the card -->
     <img src="../assets/images/projects/my-screenshot.png" alt="Preview">
</div>
```

**Option B: YouTube Video Popup**
Use this to open a YouTube video in the lightbox.
```html
<div class="bento-card media-card-bento clickable-media"
     onclick="openMediaLightbox(this)"
     data-type="video"
     data-video-src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
     data-title="Video Title"
     data-desc="Description of the video.">
     
    <div class="media-placeholder">
        ▶️ Play Video
    </div>
</div>
```
*   **Important**: Use the **embed** link (e.g., `https://www.youtube.com/embed/dQw4w9WgXcQ`), NOT the watch link.


### Gallery Section
The gallery uses a **lightbox** feature for full-screen image viewing.

#### Adding Gallery Items
1.  **Locate Gallery Section**: Open `index.html` and find `<!-- GALLERY -->` (around Line ~440).
2.  **Add Image Item**:
    ```html
    <div class="gallery-item reveal" onclick="openLightbox(this)">
        <img src="assets/images/gallery/your-photo.jpg" alt="Description" 
             data-desc="Detailed description of this moment.">
        <div class="gallery-overlay">
            <h4>Title</h4>
            <p>Short description</p>
        </div>
    </div>
    ```
3.  **Add Emoji/Placeholder Item**:
    ```html
    <div class="gallery-item reveal" onclick="openLightbox(this)">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--bg-card); font-size: 4rem;"
             data-emoji="🚀" data-title="Your Title" data-desc="Your description.">
            🚀</div>
        <div class="gallery-overlay">
            <h4>Your Title</h4>
            <p>Your description</p>
        </div>
    </div>
    ```

#### Lightbox Functionality
- **JavaScript**: Controlled by `js/gallery.js`
- **How it works**: Clicking any gallery item opens a full-screen overlay with the image/emoji and description
- **To customize**: Edit `gallery.js` to change animation speed, overlay color, or behavior

---

## 📧 Contact Form (Google Forms)
The contact form is integrated with **Google Forms** to provide a secure and API-key-free way to receive messages.

### How it Works
The form submits data directly to a Google Form using its entry IDs. You will receive responses in your Google Form dashboard (and via email if enabled).

### Configuration
If you need to change the destination form:
1.  **Create a new Google Form** with fields for:
    *   Name / Organization
    *   Email Address
    *   Message
2.  **Get Entry IDs**:
    *   Click "Get pre-filled link" (three dots menu).
    *   Fill dummy data and click "Get Link".
    *   Copy the link and extract the `entry.XXXXXX` IDs for each field.
3.  **Update `js/contact.js`**:
    *   Replace `GOOGLE_FORM_URL` with your form's `formResponse` URL.
    *   Update the `entry.XXXXXX` IDs in the `formData` construction.

### Enable Notifications
To get an email when someone contacts you:
1.  Go to your Google Form.
2.  Click **Responses** tab.
3.  Click the **three dots** and select **"Get email notifications for new responses"**.

---

## 🎨 Background System & Visual Effects

### Premium Background Components
The portfolio uses a multi-layered "Deep Space Nebula" background system with several interactive elements:

#### 1. Dynamic Mesh Gradient (`styles.css` Lines ~100-138)
- **What it does**: Creates animated, blurred orbs that float across the background
- **How to customize**:
  - Adjust orb colors: Modify the `radial-gradient` values in `.mesh-orb-1`, `.mesh-orb-2`, `.mesh-orb-3`
  - Change animation speed: Edit `animation-duration` (currently 20s, 25s, 30s)
  - Modify blur intensity: Change `filter: blur(80px)` value

#### 2. Noise Texture Overlay (`styles.css` Lines ~85-98)
- **What it does**: Adds a subtle film grain effect for a premium tech feel
- **SVG Filter**: Located in the `<svg>` tag with `id="noise-filter"` in `index.html`
- **To adjust**: Change `baseFrequency` (currently 0.65) for finer/coarser grain

#### 3. Particle System (`js/particles.js`)
- **Glowing Embers**: Refactored to show pulsing, floating particles instead of connecting lines
- **Key settings**:
  - Particle count: `particlesArray.length` (currently ~80-100 based on screen size)
  - Glow color: `ctx.fillStyle` and `ctx.shadowColor` (cyan: `rgba(0, 217, 255, ...)`)
  - Pulse speed: `Math.sin(this.pulsePhase)` controls the breathing effect
- **Parallax**: Mouse movement creates depth via `mouseMoveParallax()` function

#### 4. Hero Grid Lattice (`styles.css` Lines ~425-439)
- **What it does**: Subtle cyan grid lines in the hero section for a technical look
- **Current settings**:
  ```css
  background-image:
      linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  ```
- **To customize**:
  - Grid spacing: Change `background-size` (currently 50px × 50px)
  - Line color/opacity: Adjust `rgba(0, 217, 255, 0.03)` - increase last value for brighter lines
  - Line thickness: Change `1px` values

### Logo Animation (`styles.css` Lines ~312-343)
The `^_-` logo performs a periodic "nodding" animation with synchronized cyan glow:

- **Animation cycle**: 3 seconds (80% idle, 20% nodding)
- **Home Link**: The logo is now a clickable link that scrolls to the top (`#home`).
- **Glow Intensity**:
  - The CSS (`styles.css` around Line 320) now includes **Presets** (Subtle, Medium, Intense).
  - To change intensity, simply copy the values from the comment block into the `@keyframes logoNod` rule.

---

## 💻 JavaScript Functionality

### Navigation & Mobile Menu (`js/navigation.js`)
- **Mobile Menu Toggle**: Hamburger menu for responsive navigation
- **Smooth Scrolling**: Clicking nav links smoothly scrolls to sections
- **Active Link Highlighting**: Current section is highlighted in the navigation
- **To customize**: Edit `navigation.js` to change scroll speed or offset

### Typing Effects (`js/main.js`)
The portfolio features two typing animations:

#### 1. Hero Subtitle Typing
- **Location**: Hero section subtitle (`#typing-text`)
- **Phrases**: Cycles through multiple role descriptions
- **To customize**:
  - Edit the `phrases` array in `main.js` (around Line ~10-20)
  - Adjust `typingSpeed` and `deletingSpeed` variables
  - Change pause duration between phrases

#### 2. Logo Fact Bubble (`js/main.js`)
- **What it does**: Shows random fun facts when hovering over the logo
- **Smart Typing**: Words don't break mid-line to prevent layout jumps
- **To customize**:
  - Add/edit facts in the `logoFacts` array in `main.js`
  - Adjust typing speed in the `typeLogoFact()` function
  - Modify bubble styling in `styles.css` (`.logo-fact-bubble`)

### Scroll Animations (`js/main.js`)
- **Reveal on Scroll**: Elements with class `.reveal` fade in as you scroll
- **How it works**: Uses Intersection Observer API to detect when elements enter viewport
- **To customize**: Adjust `threshold` value in `main.js` for earlier/later reveals

### Custom Cursor (`styles.css` + `js/main.js`)
- **Dot + Ring**: Custom cursor with trailing ring effect
- **Hover States**: Ring expands when hovering over interactive elements
- **To customize**:
  - Colors: Edit `.cursor-dot` and `.cursor-ring` in `styles.css`
  - Size: Modify `width` and `height` values
  - Disable: Remove cursor-related code from `main.js`

---

## 🤖 Mascot & Cursor
*   **Mascot**: The Wall-E image is at `assets/images/mascot/walle.png`.
*   **Tooltip Message**: The message is now **Static HTML** inside `index.html` (Lines ~677).
    - To change the text, edit the `div` inside `.mascot-tooltip`.
    - The visual "ring expansion" guide is built with inline CSS `<span>` elements.
*   **Cursor**: Controlled by `css/styles.css` (Look for `.cursor-dot` and `.cursor-ring`).

---

## 🚀 Easy "Copy-Paste" Workflow
1.  **Select** a template.
2.  **Copy** the block.
3.  **Find** the "➕ PASTE HERE" comment in `index.html`.
4.  **Paste & Edit**.

Happy Coding! 🦾
