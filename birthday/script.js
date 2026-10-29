/**
 * ROMANTIC BIRTHDAY EXPERIENCE FOR DIVYA
 * Full Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // CONFIGURATION (Easily customize date, names, and messages here)
  // =========================================================================
  const CONFIG = {
    girlfriendName: "Divya",
    // Set Divya's birthday here: YYYY-MM-DD or MM/DD/YYYY
    // Default sets it to next occurrence or current year
    targetDate: getNextBirthdayDate(11, 15), // Example default: Nov 15. You can change month (1-12) and day (1-31)
    musicTitle: "Our Romantic Song",
    musicArtist: "For Divya 💕"
  };

  /**
   * Helper to get target birthday date (month is 1-indexed: 1 = Jan, 11 = Nov)
   */
  function getNextBirthdayDate(month, day) {
    const now = new Date();
    let year = now.getFullYear();
    let bday = new Date(year, month - 1, day, 0, 0, 0);
    // If birthday has already passed this year, point to next year
    if (now > bday && (now.getDate() !== day || now.getMonth() !== month - 1)) {
      bday = new Date(year + 1, month - 1, day, 0, 0, 0);
    }
    return bday;
  }

  // =========================================================================
  // 1. SOUND EFFECTS & ROMANTIC SYNTHESIZER (Web Audio API)
  // No external audio files required for interactive SFX & fallback melody!
  // =========================================================================
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.isSynthPlaying = false;
      this.synthInterval = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Gentle Sparkle Chime (for buttons, hearts, modal reveals)
    playChime() {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + index * 0.08);
        osc.stop(this.ctx.currentTime + index * 0.08 + 0.5);
      });
    }

    // Candle blow-out puff sound
    playPuff() {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();
    }

    // Grand Celebration Fanfare (for gift unlock & wish sent)
    playFanfare() {
      this.init();
      if (!this.ctx) return;
      const chord = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + idx * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.05 + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 1);
      });
    }

    // Built-in romantic acoustic lullaby generator (plays when no MP3 is placed yet!)
    startRomanticSynth() {
      this.init();
      if (!this.ctx || this.isSynthPlaying) return;
      this.isSynthPlaying = true;

      // Soft romantic pentatonic arpeggio sequence
      const melody = [
        329.63, 392.00, 493.88, 587.33, 493.88, 392.00,
        349.23, 440.00, 523.25, 659.25, 523.25, 440.00,
        293.66, 369.99, 440.00, 587.33, 440.00, 369.99,
        261.63, 329.63, 392.00, 523.25, 392.00, 329.63
      ];
      let step = 0;

      this.synthInterval = setInterval(() => {
        if (!this.isSynthPlaying || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const freq = melody[step % melody.length];
        step++;

        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      }, 450);
    }

    stopRomanticSynth() {
      this.isSynthPlaying = false;
      if (this.synthInterval) {
        clearInterval(this.synthInterval);
        this.synthInterval = null;
      }
    }
  }

  const sound = new SoundManager();

  // =========================================================================
  // 2. BACKGROUND CANVAS (FLOATING HEARTS, STARS & PETALS)
  // =========================================================================
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class FloatingParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 30;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.type = Math.random() > 0.4 ? 'heart' : (Math.random() > 0.5 ? 'star' : 'petal');
      // Romantic color palette
      const colors = ['#ff4d88', '#ff758c', '#ffd1dc', '#a855f7', '#ffd700', '#ffffff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.5;
      this.rotation += this.rotationSpeed;

      if (this.y < -40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.type === 'heart') {
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, s / 4);
        ctx.bezierCurveTo(s / 2, -s / 2, s, s / 3, 0, s);
        ctx.bezierCurveTo(-s, s / 3, -s / 2, -s / 2, 0, s / 4);
        ctx.fill();
      } else if (this.type === 'star') {
        const s = this.size * 0.5;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * s, -Math.sin((18 + i * 72) * Math.PI / 180) * s);
          ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (s * 0.4), -Math.sin((54 + i * 72) * Math.PI / 180) * (s * 0.4));
        }
        ctx.closePath();
        ctx.fill();
      } else {
        // Soft rose petal
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Create initial pool of particles
  const particleCount = window.innerWidth < 768 ? 35 : 65;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new FloatingParticle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // =========================================================================
  // 3. INTERACTIVE TAP / CLICK BURST OF HEARTS
  // =========================================================================
  function createTapHearts(x, y) {
    const emojis = ['💖', '💕', '✨', '🌸', '🎂', '🥰', '⭐'];
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.position = 'fixed';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = `${Math.random() * 16 + 18}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '99999';
      heart.style.transform = `translate(-50%, -50%)`;
      heart.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(heart);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 40;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance - 40;

      requestAnimationFrame(() => {
        heart.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 1000);
    }
  }

  window.addEventListener('click', (e) => {
    // Avoid triggering on modal buttons if user clicks close
    createTapHearts(e.clientX, e.clientY);
  });

  // =========================================================================
  // 4. MUSIC CONTROLS (MP3 + SYNTHESIZER FALLBACK)
  // =========================================================================
  const bgAudio = document.getElementById('bgAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const vinylDisc = document.getElementById('vinylDisc');
  const musicStatus = document.getElementById('musicStatus');
  const soundWaves = document.getElementById('soundWaves');
  let isPlaying = false;
  let useSynthFallback = false;

  // Attempt to test if the MP3 file is available
  bgAudio.addEventListener('error', () => {
    console.log('Local MP3 file not found in assets/music/romantic-song.mp3. Using built-in romantic melody synthesizer fallback!');
    useSynthFallback = true;
  });

  function toggleMusic() {
    sound.init();
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function playMusic() {
    isPlaying = true;
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    if (vinylDisc) vinylDisc.classList.add('spinning');
    if (soundWaves) soundWaves.classList.add('playing');
    if (musicStatus) musicStatus.textContent = "Playing For Divya 💕";

    if (useSynthFallback) {
      sound.startRomanticSynth();
    } else {
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play restricted or file missing. Starting synthesizer fallback.', err);
          useSynthFallback = true;
          sound.startRomanticSynth();
        });
      }
    }
  }

  function pauseMusic() {
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    if (vinylDisc) vinylDisc.classList.remove('spinning');
    if (soundWaves) soundWaves.classList.remove('playing');
    if (musicStatus) musicStatus.textContent = "Paused";

    if (useSynthFallback) {
      sound.stopRomanticSynth();
    } else {
      bgAudio.pause();
    }
  }

  if (playPauseBtn) playPauseBtn.addEventListener('click', toggleMusic);
  if (vinylDisc) vinylDisc.addEventListener('click', toggleMusic);

  // =========================================================================
  // 5. WELCOME SCREEN / CURTAIN UNLOCK
  // =========================================================================
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const enterBtn = document.getElementById('enterBtn');

  if (enterBtn && welcomeOverlay) {
    enterBtn.addEventListener('click', () => {
      sound.playChime();
      sound.playFanfare();
      playMusic(); // Starts background music upon user click
      triggerConfettiBurst();

      welcomeOverlay.classList.add('hidden');
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 1000);
    });
  }

  // Navbar scroll background change
  const topNav = document.getElementById('topNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  });

  // =========================================================================
  // 6. BIRTHDAY COUNTDOWN TIMER
  // =========================================================================
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const celebrationBanner = document.getElementById('celebrationBanner');
  const countdownGrid = document.getElementById('countdownGrid');
  const countdownStatus = document.getElementById('countdownStatus');
  const previewCelebrationBtn = document.getElementById('previewCelebrationBtn');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.targetDate.getTime() - now;

    if (distance <= 0) {
      // It's Birthday Time!
      triggerBirthdayCelebration();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  function triggerBirthdayCelebration() {
    if (celebrationBanner) celebrationBanner.classList.add('active');
    if (countdownStatus) countdownStatus.textContent = "🎉 It's your special day, Divya! Let's party! 💖";
    if (daysEl) daysEl.textContent = "00";
    if (hoursEl) hoursEl.textContent = "00";
    if (minutesEl) minutesEl.textContent = "00";
    if (secondsEl) secondsEl.textContent = "00";
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Test celebration button so user can experience the celebration mode anytime
  if (previewCelebrationBtn) {
    previewCelebrationBtn.addEventListener('click', () => {
      sound.playFanfare();
      triggerConfettiBurst();
      triggerBirthdayCelebration();
    });
  }

  // =========================================================================
  // 7. PERSONALIZED BIRTHDAY LETTER FOR DIVYA
  // =========================================================================
  const openLetterBtn = document.getElementById('openLetterBtn');
  const letterPaper = document.getElementById('letterPaper');
  const envelopeCard = document.getElementById('envelopeCard');
  const foldLetterBtn = document.getElementById('foldLetterBtn');
  const copyLetterBtn = document.getElementById('copyLetterBtn');

  if (openLetterBtn && letterPaper) {
    openLetterBtn.addEventListener('click', () => {
      sound.playChime();
      letterPaper.classList.add('open');
      openLetterBtn.style.display = 'none';
      letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (foldLetterBtn && letterPaper && openLetterBtn) {
    foldLetterBtn.addEventListener('click', () => {
      sound.playChime();
      letterPaper.classList.remove('open');
      openLetterBtn.style.display = 'inline-block';
      envelopeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (copyLetterBtn) {
    copyLetterBtn.addEventListener('click', () => {
      const letterText = document.querySelector('.letter-body').innerText;
      navigator.clipboard.writeText(letterText).then(() => {
        sound.playChime();
        const originalText = copyLetterBtn.innerHTML;
        copyLetterBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied with Love!';
        setTimeout(() => {
          copyLetterBtn.innerHTML = originalText;
        }, 2500);
      });
    });
  }

  // =========================================================================
  // 8. INTERACTIVE BIRTHDAY CAKE & MAKE A WISH
  // =========================================================================
  const candles = document.querySelectorAll('.candle');
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const relightCandlesBtn = document.getElementById('relightCandlesBtn');
  const wishModal = document.getElementById('wishModal');
  const closeWishModal = document.getElementById('closeWishModal');
  const sendWishBtn = document.getElementById('sendWishBtn');
  const wishInput = document.getElementById('wishInput');
  const wishFeedback = document.getElementById('wishFeedback');
  let blownCount = 0;

  candles.forEach((candle) => {
    candle.addEventListener('click', () => {
      blowSingleCandle(candle);
    });
  });

  function blowSingleCandle(candle) {
    const flame = candle.querySelector('.flame');
    const smoke = candle.querySelector('.smoke');
    if (flame && !flame.classList.contains('extinguished')) {
      flame.classList.add('extinguished');
      if (smoke) smoke.classList.add('active');
      sound.playPuff();
      blownCount++;

      if (blownCount >= candles.length) {
        setTimeout(celebrateWish, 600);
      }
    }
  }

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      candles.forEach((c) => {
        const flame = c.querySelector('.flame');
        const smoke = c.querySelector('.smoke');
        if (flame) flame.classList.add('extinguished');
        if (smoke) smoke.classList.add('active');
      });
      sound.playPuff();
      blownCount = candles.length;
      setTimeout(celebrateWish, 500);
    });
  }

  function celebrateWish() {
    sound.playFanfare();
    triggerConfettiBurst();
    if (wishModal) {
      wishModal.classList.add('active');
    }
  }

  if (relightCandlesBtn) {
    relightCandlesBtn.addEventListener('click', () => {
      sound.playChime();
      blownCount = 0;
      candles.forEach((c) => {
        const flame = c.querySelector('.flame');
        const smoke = c.querySelector('.smoke');
        if (flame) flame.classList.remove('extinguished');
        if (smoke) smoke.classList.remove('active');
      });
    });
  }

  if (closeWishModal && wishModal) {
    closeWishModal.addEventListener('click', () => {
      wishModal.classList.remove('active');
    });
  }

  if (sendWishBtn && wishInput && wishFeedback) {
    sendWishBtn.addEventListener('click', () => {
      const wish = wishInput.value.trim();
      if (!wish) {
        wishInput.focus();
        return;
      }
      sound.playFanfare();
      triggerConfettiBurst();
      // Save wish in localStorage
      localStorage.setItem('divya_birthday_wish', wish);

      wishFeedback.style.display = 'block';
      sendWishBtn.style.display = 'none';
      wishInput.disabled = true;

      setTimeout(() => {
        wishModal.classList.remove('active');
        // Reset after modal closes
        setTimeout(() => {
          wishFeedback.style.display = 'none';
          sendWishBtn.style.display = 'inline-flex';
          wishInput.disabled = false;
          wishInput.value = '';
        }, 600);
      }, 3500);
    });
  }

  // =========================================================================
  // 9. PHOTO GALLERY LIGHTBOX & HEART LIKES
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightbox = document.getElementById('closeLightbox');
  const polaroidCards = document.querySelectorAll('.polaroid-card');

  // Auto-detect if user dropped personal photos (photo1.jpg, photo2.jpg...) into assets/images/
  polaroidCards.forEach((card) => {
    const img = card.querySelector('.polaroid-img');
    const userPhoto = img ? img.getAttribute('data-user-photo') : null;
    if (userPhoto) {
      const probe = new Image();
      probe.onload = () => {
        img.src = userPhoto;
      };
      probe.src = userPhoto;
    }
  });

  polaroidCards.forEach((card) => {
    const img = card.querySelector('.polaroid-img');
    const title = card.querySelector('.polaroid-title');
    const date = card.querySelector('.polaroid-date');
    const likeBtn = card.querySelector('.like-btn');
    const likeCount = card.querySelector('.like-count');

    // Click on photo or view button opens lightbox
    const triggerElements = card.querySelectorAll('.polaroid-img-wrapper, .view-btn, .polaroid-title');
    triggerElements.forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playChime();
        if (lightboxImg && img) lightboxImg.src = img.src;
        if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;
        if (lightboxDesc && date) lightboxDesc.textContent = `${date.textContent} - A moment etched in my heart forever.`;
        if (lightboxModal) lightboxModal.classList.add('active');
      });
    });

    // Heart like counter
    if (likeBtn && likeCount) {
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playChime();
        likeBtn.classList.toggle('liked');
        let count = parseInt(likeCount.textContent, 10) || 0;
        likeCount.textContent = count + 1;
        createTapHearts(e.clientX, e.clientY);
      });
    }
  });

  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 10. SURPRISE GIFT REVEAL & CONFETTI EXPLOSION
  // =========================================================================
  const giftBox = document.getElementById('giftBox');
  const revealedSurprise = document.getElementById('revealedSurprise');
  const giftInstruction = document.getElementById('giftInstruction');
  const claimAllCouponsBtn = document.getElementById('claimAllCouponsBtn');

  if (giftBox && revealedSurprise) {
    giftBox.addEventListener('click', () => {
      if (!giftBox.classList.contains('opened')) {
        sound.playFanfare();
        triggerConfettiBurst(true); // Massive confetti
        giftBox.classList.add('opened');
        if (giftInstruction) giftInstruction.textContent = "🎉 SURPRISE UNLOCKED! Here are your Golden Love Coupons! 💖";
        revealedSurprise.classList.add('active');
        revealedSurprise.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Love coupons individual redeem
  const redeemBtns = document.querySelectorAll('.coupon-redeem-btn');
  redeemBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playChime();
      btn.classList.add('redeemed');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Redeemed with Love 💕';
      btn.disabled = true;
      createTapHearts(e.clientX, e.clientY);
    });
  });

  if (claimAllCouponsBtn) {
    claimAllCouponsBtn.addEventListener('click', () => {
      sound.playFanfare();
      triggerConfettiBurst();
      redeemBtns.forEach(btn => {
        btn.classList.add('redeemed');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Claimed & Saved in Divya\'s Wallet 💖';
        btn.disabled = true;
      });
      claimAllCouponsBtn.innerHTML = '<i class="fa-solid fa-heart"></i> All Coupons Claimed! Forever Promised!';
    });
  }

  // =========================================================================
  // 11. REASONS WHY I LOVE YOU (JAR OF LOVE)
  // =========================================================================
  const loveReasons = [
    "The way your eyes sparkle when you laugh genuinely at my silly jokes. ✨",
    "How you make the hardest days instantly feel gentle and peaceful. 🌸",
    "Your kindness towards everyone around you—you have the purest golden heart. 💛",
    "How cute you look when you get passionately excited about the little things. 🥰",
    "The warmth of your hugs that feel like coming home after a long journey. 🫂",
    "Your beautiful, radiant smile that could light up the entire night sky. 🌟",
    "How you understand me even when I don't say a single word out loud. 💭",
    "The sound of your voice—it is my absolute favorite song in the universe. 🎶",
    "How you believe in my dreams and make me want to be the best version of myself. 🚀",
    "All our spontaneous late-night conversations about everything and nothing. 🌙",
    "The silly faces you make that never fail to melt my heart into a puddle. 😋",
    "How you hold my hand like you never want to let it go. 🤝",
    "Your brilliant mind and how thoughtful you are in every single thing you do. 💡",
    "How beautiful you look effortlessly, every single second of every single day. 👑",
    "The way you scrunch your nose when you're thinking hard. 👃💕",
    "How safe and complete I feel whenever I am with you. 🏡",
    "The cute way you say my name that gives me butterflies every single time. 🦋",
    "How you turn ordinary everyday grocery runs or coffee dates into unforgettable adventures. ☕",
    "Your resilience, strength, and grace in everything you take on. 💎",
    "Simply because you are YOU—my soulmate, my best friend, and my whole heart. Forever. ❤️"
  ];

  let currentReasonIndex = 0;
  const reasonCard = document.getElementById('loveReasonCard');
  const nextReasonBtn = document.getElementById('nextReasonBtn');

  if (nextReasonBtn && reasonCard) {
    nextReasonBtn.addEventListener('click', () => {
      sound.playChime();
      currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
      reasonCard.style.opacity = '0';
      reasonCard.style.transform = 'scale(0.95)';

      setTimeout(() => {
        reasonCard.textContent = `"${loveReasons[currentReasonIndex]}"`;
        reasonCard.style.opacity = '1';
        reasonCard.style.transform = 'scale(1)';
      }, 250);
    });
  }

  // =========================================================================
  // 12. LOVE SHOWER (SEND HEARTS RAIN)
  // =========================================================================
  const sendLoveRainBtn = document.getElementById('sendLoveRainBtn');
  if (sendLoveRainBtn) {
    sendLoveRainBtn.addEventListener('click', () => {
      sound.playFanfare();
      triggerConfettiBurst(true);
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createTapHearts(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 0.7));
        }, i * 80);
      }
    });
  }

  // =========================================================================
  // 13. CONFETTI ENGINE (Supports Canvas Confetti CDN + Native Fallback)
  // =========================================================================
  function triggerConfettiBurst(isMassive = false) {
    if (typeof confetti === 'function') {
      const count = isMassive ? 200 : 90;
      confetti({
        particleCount: count,
        spread: isMassive ? 140 : 80,
        origin: { y: 0.6 },
        colors: ['#ff4d88', '#ff758c', '#ffd1dc', '#a855f7', '#ffd700', '#ffffff']
      });
      if (isMassive) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#ff4d88', '#ffd700', '#a855f7']
          });
          confetti({
            particleCount: 100,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#ff758c', '#ffd700', '#ff4d88']
          });
        }, 300);
      }
    } else {
      // Fallback native confetti animation
      createNativeConfetti(isMassive ? 120 : 50);
    }
  }

  function createNativeConfetti(count) {
    const colors = ['#ff4d88', '#ff758c', '#ffd1dc', '#ffd700', '#a855f7', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.left = `${Math.random() * 100}vw`;
      conf.style.top = '-20px';
      conf.style.width = `${Math.random() * 8 + 6}px`;
      conf.style.height = `${Math.random() * 12 + 8}px`;
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.borderRadius = '3px';
      conf.style.zIndex = '999999';
      conf.style.pointerEvents = 'none';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `top ${Math.random() * 2 + 1.5}s linear, transform 2s ease, opacity 2s ease`;
      document.body.appendChild(conf);

      requestAnimationFrame(() => {
        conf.style.top = '110vh';
        conf.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
        conf.style.opacity = '0';
      });

      setTimeout(() => conf.remove(), 3500);
    }
  }

  // Keyboard navigation helpers (ESC closes modals)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal) lightboxModal.classList.remove('active');
      if (wishModal) wishModal.classList.remove('active');
    }
  });

  console.log("Romantic Birthday Experience for Divya loaded with all love and magic! 💕");
});
