# 🎂 Happy Birthday Divya — Romantic Birthday Website 💕

A handcrafted, deeply romantic, mobile-friendly birthday website built with HTML, CSS, and modern JavaScript for **Divya**. Packed with glowing animations, floating hearts, interactive candles, music, video memories, a love letter, and surprise confetti reveals!

---

## ✨ Features Included

1. 🌸 **Romantic Welcome Screen:**
   - Deep purple & blush pink dreamy aesthetic with twinkling star dust.
   - Interactive "Open My Birthday Surprise" unlock button that smoothly transitions to the wonderland.
   - Audio-policy friendly (bypasses browser autoplay blocks on click).

2. 💖 **Floating Hearts, Glowing Text & Smooth Animations:**
   - 60 FPS HTML5 canvas background rendering floating hearts, stars, and rose petals.
   - Interactive touch/click fountain: tapping anywhere on the screen bursts glowing mini-hearts and sparkles.
   - Neon glow headings, glassmorphic cards, and silky smooth transitions.

3. 💌 **Personalized Birthday Letter for Divya:**
   - 3D-styled romantic envelope with an interactive wax seal (`D & S`).
   - Tapping breaks the seal and smoothly unfolds an emotional, heartfelt love letter written specifically for Divya.
   - Includes "Copy Love Note" and "Fold Letter Back" buttons.

4. 📸 **Cherished Photo Memory Gallery:**
   - Polaroid-style cards with playful tilt angles, washi tape styling, and captions.
   - Interactive heart like counters on every photo (increments with heart animations).
   - Fullscreen **Lightbox modal** to view memories up close.
   - **Auto-detection**: Pre-loaded with custom romantic SVG illustrations, and will automatically load your personal photos (`photo1.jpg` – `photo6.jpg`) as soon as you place them in `assets/images/`!

5. 🎶 **Floating Background Music Player:**
   - Floating vinyl record player that rotates when playing.
   - Play/Pause toggle, track info, and pulsing sound visualizer bars.
   - Pre-configured for `assets/music/romantic-song.mp3`.
   - **Built-in Web Audio API Synthesizer**: If no custom song is added yet, a soothing romantic music box melody plays automatically so there is never silence!

6. ⏳ **Working Birthday Countdown Timer:**
   - Real-time countdown displaying **Days, Hours, Minutes, Seconds** in glowing glass cards.
   - Automatically detects when her birthday arrives and enters **Grand Celebration Mode**!
   - Includes an interactive **"Celebrate Now Mode 🎉"** preview button so you can test the celebration anytime.

7. 🎂 **Interactive Birthday Cake & Make-a-Wish:**
   - 3-tier CSS illustrated birthday cake with realistic glowing, flickering candle flames.
   - Divya can tap individual candles to blow them out (with realistic smoke puffs and sound effects) or tap **"Blow All Candles 🌬️"**.
   - Automatically opens the **"Divya's Secret Birthday Wish"** modal: she types her wish and sends it into the stars, saving it to `localStorage`!

8. 🎥 **Video Memories Section:**
   - Cinema-styled memory reel with purple neon glow and filmstrip accents.
   - Plays your couple's video montage from `assets/videos/memory-video.mp4` with custom poster.

9. 🎁 **Surprise Gift Box Reveal & Confetti Shower:**
   - 3D gift box with sparkling ribbon and bow that gently bounces.
   - Tapping shakes the box, un-ties the ribbon, and flies the lid off with a **massive multi-color confetti explosion**!
   - Reveals **6 VIP Golden Love Coupons** (e.g. Candlelight Dinner, Unlimited Cuddles, Win Any Argument Pass, Queen For a Day).
   - Interactive "Redeem" and "Claim All to Divya's Wallet" buttons!

10. 🌸 **Divya's Jar of Love Reasons:**
    - Interactive love jar with 20 heartfelt, deeply touching reasons why she is loved.
    - Click to draw another sweet reason with smooth card flips.

11. 📱 **100% Mobile-Friendly & Responsive:**
    - Fully optimized for iPhone, Android, tablets, laptops, and 4K displays.
    - Large touch-friendly tap targets and smooth scroll navigation.

---

## 📁 Project Structure

```text
birthday/
│
├── index.html                   # Main webpage structure
├── style.css                    # Romantic pink & purple styling, animations, responsive design
├── script.js                    # Interactive logic, canvas particles, audio, countdown, confetti
├── README.md                    # Setup, customization & publishing guide
│
└── assets/                      # Media directory
    ├── images/
    │   ├── photo1.svg           # Illustrated fallback 1 (The day we met)
    │   ├── photo2.svg           # Illustrated fallback 2 (Her smile)
    │   ├── photo3.svg           # Illustrated fallback 3 (Coffee date)
    │   ├── photo4.svg           # Illustrated fallback 4 (Stargazing)
    │   ├── photo5.svg           # Illustrated fallback 5 (Silly laughter)
    │   ├── photo6.svg           # Illustrated fallback 6 (Forever & always)
    │   ├── video-poster.svg     # Video player poster thumbnail
    │   └── photo-instructions.txt
    │
    ├── music/
    │   ├── romantic-song.mp3    # Romantic audio track (looping chime melody included)
    │   └── music-instructions.txt
    │
    └── videos/
        └── video-instructions.txt
```

---

## 🎨 How to Personalize for Divya

### 1. Set Her Birthday Date
Open [`script.js`](file:///c:/Users/sidda/Downloads/birthday/script.js) and look at the top `CONFIG` section:
```javascript
const CONFIG = {
  girlfriendName: "Divya",
  // Change month (1-12) and day (1-31): e.g. November 15
  targetDate: getNextBirthdayDate(11, 15),
  musicTitle: "Our Romantic Song",
  musicArtist: "For Divya 💕"
};
```
Change `11, 15` to her exact birth month and day!

### 2. Add Your Real Photos
Place 6 of your favorite photos into [`assets/images/`](file:///c:/Users/sidda/Downloads/birthday/assets/images/) with these names:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`
- `photo6.jpg`

> The website has automatic detection: as soon as you drop in `.jpg` files, it swaps them into the Polaroid cards automatically! If you don't add them yet, it displays the romantic illustrated SVGs gracefully.

### 3. Add Your Favorite Song
1. Grab her favorite romantic song (e.g. Ed Sheeran - *Perfect*, Taylor Swift - *Lover*, or any love song).
2. Save or convert it to MP3 format.
3. Rename it to `romantic-song.mp3` and place it in [`assets/music/`](file:///c:/Users/sidda/Downloads/birthday/assets/music/).

### 4. Add Your Video Memories
1. Export a cute reel or video compilation of your moments together.
2. Rename it to `memory-video.mp4` and place it in [`assets/videos/`](file:///c:/Users/sidda/Downloads/birthday/assets/videos/).

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Simplest)
1. Navigate to the `birthday` folder on your computer.
2. Double-click [`index.html`](file:///c:/Users/sidda/Downloads/birthday/index.html).
3. It will open instantly in your default web browser (Chrome, Edge, Safari, Firefox)!

### Option 2: Using VS Code Live Server
1. Open the `birthday` folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click [`index.html`](file:///c:/Users/sidda/Downloads/birthday/index.html) and click **"Open with Live Server"**.
4. The site will launch at `http://127.0.0.1:5500`.

### Option 3: Using Node.js
If you have Node installed, open PowerShell or Terminal in this folder and run:
```bash
npx serve
```
Then open the local URL shown in your browser.

---

## 🌐 How to Publish Online for FREE (To Send to Divya)

Here are the easiest, free ways to get a live link you can send to Divya on WhatsApp, Instagram, or iMessage:

### 🌟 Method 1: Netlify Drop (Easiest — 30 Seconds!)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the whole `birthday` folder into the Netlify box on the screen.
3. Within 10 seconds, Netlify will generate a free live link (e.g., `https://divya-birthday-magic.netlify.app`)!
4. You can customize the URL name for free in *Site Settings* -> *Change site name*.

### 🐙 Method 2: GitHub Pages (Permanent & Clean)
1. Create a free account on [GitHub.com](https://github.com).
2. Create a new repository named `happy-birthday-divya` (Make it **Public**).
3. Upload all the files (`index.html`, `style.css`, `script.js`, and `assets/` folder).
4. Go to **Settings** -> **Pages**.
5. Under *Build and deployment*, set the Branch to `main` (or `master`) and folder to `/ (root)`.
6. Click **Save**. Within 1–2 minutes, your live website will be live at:
   `https://<your-username>.github.io/happy-birthday-divya/`

### ▲ Method 3: Vercel (Instant)
1. Go to [https://vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** -> Import your GitHub repository or use Vercel CLI (`npx vercel`).
3. Click **Deploy**. Your custom link will be active immediately.

---

## 💖 Extra Romantic Tips for Siddarth
- **Midnight Surprise**: Send her the link at exactly 12:00 AM on her birthday with a cute message like: *"Open this with your earphones on... Happy Birthday my love 💕"*.
- **Screen Share / Cast**: If you're celebrating together in person, connect your laptop to your TV or projector and open the website full screen (Press `F11`)!
- **Sound Check**: The site includes tactile sound effects (candle puff, chimes, fanfares, music player) synthesized in real-time, making it feel like a high-end interactive app.

*Made with all love for Divya.* 🎂✨
