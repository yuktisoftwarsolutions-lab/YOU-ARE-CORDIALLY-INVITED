/* =========================================================================
   TRADITIONAL RED & ANTIQUE GOLD ENGAGEMENT INVITATION - INTERACTIVITY
   Couple: Pratik Ajay Pandey & Vanshika Suresh Dubey
   Date: Saturday, 14 November 2026
   ========================================================================= */

(() => {
  'use strict';

  const TARGET_VOLUME = 0.9; // 90% wedding music volume
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------------
     1. WHITE JASMINE PETALS & SOFT GOLDEN LIGHT MOTES (CANVAS)
     ----------------------------------------------------------------------- */
  function initRoyalCanvas() {
    const canvas = document.getElementById('royal-canvas');
    if (!canvas || prefersReducedMotion) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let petalMode = 'none'; // 'none' | 'entrance' | 'ambient'
    let glowVisible = false;

    const motes = [];
    const petals = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createMote(randomY = true) {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        r: 0.9 + Math.random() * 1.9,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(0.12 + Math.random() * 0.28),
        alpha: 0.18 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.024
      };
    }

    function createFlowerPetal(startTop = false, isBurst = false) {
      const isMarigold = Math.random() < 0.42;
      let tone;
      if (isMarigold) {
        // Royal golden & saffron marigold tones
        const saffronTones = [
          { fill: 'rgba(235, 168, 38, 0.94)', tip: 'rgba(196, 118, 12, 0.88)' },
          { fill: 'rgba(247, 192, 58, 0.92)', tip: 'rgba(215, 134, 18, 0.84)' },
          { fill: 'rgba(225, 142, 28, 0.90)', tip: 'rgba(182, 94, 10, 0.82)' }
        ];
        tone = saffronTones[Math.floor(Math.random() * saffronTones.length)];
      } else {
        // Fragrant white jasmine tones
        const jasmineTones = [
          { fill: 'rgba(255, 252, 245, 0.94)', tip: 'rgba(232, 224, 198, 0.82)' },
          { fill: 'rgba(255, 245, 230, 0.90)', tip: 'rgba(218, 206, 174, 0.75)' },
          { fill: 'rgba(252, 248, 238, 0.86)', tip: 'rgba(225, 212, 180, 0.68)' }
        ];
        tone = jasmineTones[Math.floor(Math.random() * jasmineTones.length)];
      }

      return {
        type: isMarigold ? 'marigold' : 'jasmine',
        isBurst: isBurst,
        x: Math.random() * width,
        y: startTop ? -20 - Math.random() * (isBurst ? 140 : 80) : Math.random() * height,
        size: isMarigold ? (6.5 + Math.random() * 6.5) : (5.5 + Math.random() * 5.5),
        vy: isBurst ? (1.3 + Math.random() * 1.8) : (0.55 + Math.random() * 0.65),
        vx: (Math.random() - 0.5) * (isBurst ? 0.85 : 0.35),
        swayAmp: 0.42 + Math.random() * 0.65,
        swayFreq: 0.012 + Math.random() * 0.016,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.026,
        phase: Math.random() * Math.PI * 2,
        tone
      };
    }

    function populateMotes() {
      motes.length = 0;
      const count = width < 600 ? 20 : 32;
      for (let i = 0; i < count; i += 1) {
        motes.push(createMote(true));
      }
    }

    function syncPetals() {
      // Continuous rich auto flower shower
      const targetCount = petalMode === 'entrance'
        ? (width < 600 ? 20 : 30)
        : petalMode === 'ambient'
          ? (width < 600 ? 18 : 28)
          : 0;

      while (petals.length < targetCount) {
        petals.push(createFlowerPetal(true, false));
      }
    }

    function drawFlowerPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(1, 0.72 + 0.28 * Math.sin(p.phase));
      ctx.shadowColor = 'rgba(42, 0, 0, 0.35)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;

      if (p.type === 'marigold') {
        // Royal golden / saffron marigold curved petal
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.1);
        ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.4, p.size * 0.75, p.size * 0.8, 0, p.size * 0.95);
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.8, -p.size * 0.9, -p.size * 0.4, 0, -p.size * 1.1);
        ctx.fillStyle = p.tone.fill;
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.beginPath();
        ctx.arc(0, p.size * 0.7, p.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = p.tone.tip;
        ctx.fill();
      } else {
        // Teardrop jasmine petal silhouette
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.78, -p.size * 0.35, p.size * 0.68, p.size * 0.72, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.68, p.size * 0.72, -p.size * 0.78, -p.size * 0.35, 0, -p.size);
        ctx.fillStyle = p.tone.fill;
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.beginPath();
        ctx.arc(0, p.size * 0.72, p.size * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = p.tone.tip;
        ctx.fill();
      }
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      if (glowVisible) {
        for (let i = 0; i < motes.length; i += 1) {
          const m = motes[i];
          m.x += m.vx;
          m.y += m.vy;
          m.phase += m.twinkleSpeed;

          if (m.y < -12) {
            m.y = height + 10;
            m.x = Math.random() * width;
          }
          if (m.x < -10) m.x = width + 10;
          if (m.x > width + 10) m.x = -10;

          const glowAlpha = m.alpha * (0.52 + 0.48 * Math.sin(m.phase));
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(247, 228, 173, ${glowAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < petals.length; i += 1) {
        const p = petals[i];
        p.phase += p.swayFreq;
        p.x += p.vx + Math.sin(p.phase) * p.swayAmp;
        p.y += p.vy;
        p.angle += p.spin;

        if (p.y > height + 22) {
          if (p.isBurst) {
            petals.splice(i, 1);
            i -= 1;
            continue;
          } else {
            p.y = -18;
            p.x = Math.random() * width;
          }
        }
        drawFlowerPetal(p);
      }

      rafId = window.requestAnimationFrame(tick);
    }

    function start() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(tick);
    }

    function stop() {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    resize();
    populateMotes();
    start();

    window.addEventListener('resize', () => {
      resize();
      populateMotes();
      syncPetals();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    return {
      setPetalMode(mode) {
        petalMode = mode;
        syncPetals();
      },
      setGlowVisible(visible) {
        glowVisible = visible;
      },
      showerBurst(count = 45) {
        for (let i = 0; i < count; i += 1) {
          petals.push(createFlowerPetal(true, true));
        }
      }
    };
  }

  /* -----------------------------------------------------------------------
     2. BACKGROUND MUSIC (SINGLE INSTANCE AT 90% VOLUME + GESTURE PLAYBACK)
     -----------------------------------------------------------------------
     - Uses the single #bg-music HTML5 Audio element preloaded on page open.
     - Starts playback synchronously when the visitor taps to open the cover,
       with backup gesture listeners in case buffering/policy requires another tap.
     ----------------------------------------------------------------------- */
  function initAutomaticMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio || audio.dataset.musicInit === '1') {
      return { playFromGesture() {} };
    }
    audio.dataset.musicInit = '1';

    const unlockEvents = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'touchend',
      'pointerup',
      'click',
      'keydown'
    ];
    let isUnlocked = false;

    audio.loop = true;
    audio.muted = false;
    audio.volume = TARGET_VOLUME;

    function removeUnlockListeners() {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, onFallbackGesture, { capture: true });
      });
    }

    function markUnlocked() {
      if (isUnlocked) return;
      isUnlocked = true;
      audio.volume = TARGET_VOLUME;
      removeUnlockListeners();
    }

    function handlePlaySuccess() {
      if (audio.paused || audio.muted) return;
      markUnlocked();
    }

    function playFromGesture() {
      if (isUnlocked) return;
      audio.muted = false;
      audio.volume = TARGET_VOLUME;

      if (!audio.paused) {
        markUnlocked();
        return;
      }

      try {
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(handlePlaySuccess).catch(() => {
            // Keep fallback listeners active until playback succeeds
          });
        } else {
          handlePlaySuccess();
        }
      } catch (err) {
        // Ignore synchronous play errors and wait for next valid gesture
      }
    }

    function onFallbackGesture() {
      const cover = document.getElementById('invite-cover');
      if (cover && !cover.hidden && !cover.classList.contains('is-opening')) {
        return;
      }
      playFromGesture();
    }

    // Keep continuous playback even on browsers where ADTS AAC loop hesitates
    audio.addEventListener('ended', () => {
      if (!audio.loop) return;
      try {
        audio.currentTime = 0;
        const replayPromise = audio.play();
        if (replayPromise && typeof replayPromise.catch === 'function') {
          replayPromise.catch(() => {});
        }
      } catch (err) {
        // Ignore replay errors if browser restricts playback
      }
    });

    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, onFallbackGesture, { capture: true, passive: true });
    });

    audio.addEventListener('error', () => {
      removeUnlockListeners();
    }, { once: true });

    return {
      playFromGesture
    };
  }

  /* -----------------------------------------------------------------------
     2B. ROYAL SEAL COVER SCREEN (STARTS MUSIC & ENTRANCE TOGETHER ON TAP)
     ----------------------------------------------------------------------- */
  function initInviteCover(musicCtrl, onOpen) {
    const cover = document.getElementById('invite-cover');
    if (!cover) {
      if (typeof onOpen === 'function') onOpen();
      return;
    }

    let isOpened = false;

    function openInvitation() {
      if (isOpened) return;
      isOpened = true;

      // Start music synchronously inside the click gesture
      if (musicCtrl && typeof musicCtrl.playFromGesture === 'function') {
        musicCtrl.playFromGesture();
      }

      document.body.classList.remove('cover-locked');
      window.scrollTo(0, 0);

      if (prefersReducedMotion) {
        cover.hidden = true;
        cover.style.display = 'none';
        if (typeof onOpen === 'function') onOpen();
        return;
      }

      cover.classList.add('is-opening');
      if (typeof onOpen === 'function') onOpen();

      window.setTimeout(() => {
        cover.hidden = true;
        cover.style.display = 'none';
      }, 680);
    }

    cover.addEventListener('click', openInvitation);
    cover.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openInvitation();
      }
    });
  }

  /* -----------------------------------------------------------------------
     3. 5-STEP CINEMATIC ENTRANCE ON THE REFERENCE RED SILK CANVAS
     ----------------------------------------------------------------------- */
  function initCinematicEntrance(canvasCtrl, autoScrollCtrl) {
    let timers = [];

    function clearTimers() {
      for (let i = 0; i < timers.length; i += 1) {
        window.clearTimeout(timers[i]);
      }
      timers = [];
    }

    function runEntrance() {
      clearTimers();
      if (autoScrollCtrl) autoScrollCtrl.stopAutoScroll();

      document.body.classList.remove(
        'entrance-stage-1',
        'entrance-stage-2',
        'entrance-stage-3',
        'entrance-stage-4'
      );
      document.body.classList.add('entrance-stage-0');

      if (prefersReducedMotion) {
        document.body.classList.add(
          'entrance-stage-1',
          'entrance-stage-2',
          'entrance-stage-3',
          'entrance-stage-4'
        );
        return;
      }

      if (canvasCtrl) {
        canvasCtrl.setPetalMode('none');
        canvasCtrl.setGlowVisible(false);
      }

      // Step 2: Golden ornamental Kolam borders & corner florals fade in
      timers.push(window.setTimeout(() => {
        document.body.classList.add('entrance-stage-1');
      }, 380));

      // Step 3: White jasmine petals gently start falling
      timers.push(window.setTimeout(() => {
        document.body.classList.add('entrance-stage-2');
        if (canvasCtrl) canvasCtrl.setPetalMode('entrance');
      }, 900));

      // Step 4: Soft golden light glow & Divine Ganesha blessings appear
      timers.push(window.setTimeout(() => {
        document.body.classList.add('entrance-stage-3');
        if (canvasCtrl) canvasCtrl.setGlowVisible(true);
      }, 1450));

      // Step 5: Couple names & ceremony summary emerge in the center
      timers.push(window.setTimeout(() => {
        document.body.classList.add('entrance-stage-4');
        if (canvasCtrl && canvasCtrl.showerBurst) {
          canvasCtrl.showerBurst(35); // Automatic celebratory flower shower as couple names appear
        }
      }, 2250));

      // Transition to continuous smooth ambient shower & commence medium-speed auto-scrolling
      timers.push(window.setTimeout(() => {
        if (canvasCtrl) canvasCtrl.setPetalMode('ambient');
        if (autoScrollCtrl) autoScrollCtrl.startAutoScroll();
      }, 3200));
    }

    return {
      runEntrance
    };
  }

  /* -----------------------------------------------------------------------
     4. CEREMONY COUNTDOWN TIMER (SATURDAY, 14 NOVEMBER 2026 AT 7:30 PM)
     ----------------------------------------------------------------------- */
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const statusEl = document.getElementById('countdown-status');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !statusEl) return;

    // Month index is 0-based in JS Date: 10 = November, 19:30 = 7:30 PM
    const EVENT_TIME_START = new Date(2026, 10, 14, 19, 30, 0).getTime();
    const EVENT_DAY_END = new Date(2026, 10, 15, 0, 0, 0).getTime();

    function pad(num) {
      return String(num).padStart(2, '0');
    }

    function update() {
      const now = Date.now();

      if (now < EVENT_TIME_START) {
        const diff = EVENT_TIME_START - now;
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);
        statusEl.textContent = 'Counting down to Saturday, 14 November 2026 at 7:30 PM Onwards.';
        return;
      }

      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';

      if (now < EVENT_DAY_END) {
        statusEl.textContent = 'The Engagement Ceremony Is Underway — Saturday, 14 November 2026 (7:30 PM Onwards).';
      } else {
        statusEl.textContent = 'Celebrating the Engagement of Pratik & Vanshika — 14 November 2026.';
      }
    }

    update();
    window.setInterval(update, 1000);
  }

  /* -----------------------------------------------------------------------
     5. SCROLL REVEAL OBSERVER
     ----------------------------------------------------------------------- */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal-on-scroll');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* -----------------------------------------------------------------------
     6. AUTOMATIC CONTINUOUS MEDIUM-SPEED SMOOTH SCROLLING (25-35 PX/SEC)
     -----------------------------------------------------------------------
     - Smooth continuous scrolling from top to bottom.
     - Natural medium reading speed: 28 px/s (mobile) to 32 px/s (desktop).
     - Brief comfortable reading pauses at important sections.
     - Stops gracefully at the final section; never jumps back to top.
     - Smooth performance on mobile Android and desktop browsers.
     - Zero extra buttons or floating controls.
     ----------------------------------------------------------------------- */
  function initCinematicAutoScroll() {
    if (prefersReducedMotion) {
      return { startAutoScroll() { }, stopAutoScroll() { } };
    }

    const baseSpeed = window.innerWidth < 600 ? 28 : 32; // 28 px/s mobile, 32 px/s desktop
    let currentSpeed = 0;
    let targetSpeed = baseSpeed;
    let accumulatedY = window.scrollY;
    let lastTime = performance.now();
    let isRunning = false;
    let isSectionPaused = false;
    let userInteracting = false;
    let resumeTimeout = null;

    // Important sections with designated reading pauses
    const pauseSections = [
      { id: 'invitation-message', paused: false, duration: 4000 },
      { id: 'event-details', paused: false, duration: 4200 },
      { id: 'venue-location', paused: false, duration: 3800 },
      { id: 'countdown', paused: false, duration: 3800 },
      { id: 'closing', paused: false, duration: 5000 }
    ];

    function stopAutoScroll() {
      isRunning = false;
    }

    function startAutoScroll() {
      if (isRunning) return;
      isRunning = true;
      lastTime = performance.now();
      accumulatedY = window.scrollY;
      targetSpeed = baseSpeed;
      window.requestAnimationFrame(step);
    }

    function step(now) {
      if (!isRunning) return;
      const dt = Math.min((now - lastTime) / 1000, 0.08); // delta in seconds
      lastTime = now;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Reached the final section: stop smoothly, do not jump back
      if (window.scrollY >= maxScroll - 3) {
        isRunning = false;
        return;
      }

      if (!userInteracting && !isSectionPaused) {
        // Smoothly accelerate / decelerate speed (no sudden jerks)
        if (currentSpeed < targetSpeed) {
          currentSpeed = Math.min(targetSpeed, currentSpeed + 40 * dt);
        } else if (currentSpeed > targetSpeed) {
          currentSpeed = Math.max(targetSpeed, currentSpeed - 55 * dt);
        }

        // Subpixel continuous scroll progression
        accumulatedY += currentSpeed * dt;
        window.scrollTo(0, accumulatedY);
        accumulatedY = window.scrollY;

        // Check if an upcoming section's focal point has arrived into the reading view
        for (let i = 0; i < pauseSections.length; i += 1) {
          const pt = pauseSections[i];
          if (pt.paused) continue;
          const el = document.getElementById(pt.id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          // Trigger pause when section header/card is comfortably positioned near top-center
          if (rect.top <= 48 && rect.top >= -25) {
            pt.paused = true;
            isSectionPaused = true;
            currentSpeed = 0;
            targetSpeed = 0;

            window.setTimeout(() => {
              if (isRunning && !userInteracting) {
                isSectionPaused = false;
                targetSpeed = baseSpeed;
                accumulatedY = window.scrollY;
              }
            }, pt.duration);
            break;
          }
        }
      }

      window.requestAnimationFrame(step);
    }

    // Gentle gesture yield: if visitor touches or scrolls manually, auto-scroll pauses
    // and gently resumes from wherever they left off after 4.5 seconds of idle
    function onUserInteraction() {
      userInteracting = true;
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        userInteracting = false;
        accumulatedY = window.scrollY;
      }, 4500);
    }

    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('pointerdown', onUserInteraction, { passive: true });

    return {
      startAutoScroll,
      stopAutoScroll
    };
  }

  /* -----------------------------------------------------------------------
     BOOTSTRAP
     ----------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const musicCtrl = initAutomaticMusic();
    const canvasCtrl = initRoyalCanvas();
    const autoScrollCtrl = initCinematicAutoScroll();
    const entranceCtrl = initCinematicEntrance(canvasCtrl, autoScrollCtrl);
    initCountdown();
    initScrollReveal();

    initInviteCover(musicCtrl, () => {
      if (entranceCtrl && typeof entranceCtrl.runEntrance === 'function') {
        entranceCtrl.runEntrance();
      }
    });
  });
})();
