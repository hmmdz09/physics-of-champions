// ==========================================================================
// KUBUS SOAL 3D & LEADERBOARD PESERTA CONTROLLER
// GSAP FLIP Animations • Human Face Avatars • Single Plus Button • Smooth 3D
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const cube = document.getElementById("cube-3d");
  const stageViewport = document.getElementById("stage-viewport");
  const btnFullscreen = document.getElementById("btn-corner-fullscreen");
  
  // Leaderboard Elements
  const lbPanel = document.getElementById("leaderboard-panel");
  const lbList = document.getElementById("lb-list");
  const lbToggleBtn = document.getElementById("lb-toggle-btn");
  const lbOpenTab = document.getElementById("lb-open-tab");

  // Register GSAP Flip plugin if available
  if (window.gsap && window.Flip) {
    gsap.registerPlugin(Flip);
  }

  // -------------------------------------------------------------
  // AUDIO SYNTHESIZER FOR LIVE CORRECT ANSWER CHIME
  // -------------------------------------------------------------
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playCorrectChime() {
    initAudio();
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      // High harmonious 2-tone uplifting chime (E5 -> G#5 -> B5)
      [659.25, 830.61, 987.77].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch (e) {}
  }

  // -------------------------------------------------------------
  // FITUR FULLSCREEN DI POJOK KIRI
  // -------------------------------------------------------------
  if (btnFullscreen) {
    btnFullscreen.addEventListener("click", () => {
      initAudio();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    });

    document.addEventListener("fullscreenchange", () => {
      const isFs = !!document.fullscreenElement;
      if (isFs) {
        // Pas layar penuh, tombol keluar penuh dihapus/disembunyikan
        btnFullscreen.style.display = "none";
      } else {
        // Tampilkan kembali tombol Layar Penuh saat keluar dari mode fullscreen (misal tombol Esc)
        btnFullscreen.style.display = "flex";
      }
    });
  }

  // -------------------------------------------------------------
  // RENDER 20 SOAL KE 4 SISI VERTIKAL (5 SOAL PER SISI)
  // -------------------------------------------------------------
  const faceContainers = {
    front: document.getElementById("face-front"),
    right: document.getElementById("face-right"),
    back: document.getElementById("face-back"),
    left: document.getElementById("face-left"),
    top: document.getElementById("face-top"),
    bottom: document.getElementById("face-bottom")
  };

  physicsQuestions.forEach(q => {
    const item = document.createElement("div");
    item.className = "question-item";
    item.innerHTML = `
      <div class="q-number">Soal ${String(q.id).padStart(2, '0')}</div>
      <div class="q-text">${q.question}</div>
    `;

    if (faceContainers[q.face]) {
      faceContainers[q.face].appendChild(item);
    }
  });

  // Render Logo di Sisi Atas (Top Face)
  if (faceContainers.top) {
    faceContainers.top.innerHTML = `
      <div class="logo-face-container">
        <div class="logo-orbit-wrapper">
          <div class="logo-orbit-ring ring-outer"></div>
          <div class="logo-orbit-ring ring-inner"></div>
          <img src="logo.png" alt="Physics of Champions" class="cube-logo-img">
        </div>
        <div class="logo-title-box">
          <span class="logo-badge">PHYSICS OF CHAMPIONS</span>
        </div>
      </div>
    `;
  }

  // Render Logo di Sisi Bawah (Bottom Face)
  if (faceContainers.bottom) {
    faceContainers.bottom.innerHTML = `
      <div class="logo-face-container">
        <div class="logo-orbit-wrapper">
          <div class="logo-orbit-ring ring-outer"></div>
          <div class="logo-orbit-ring ring-inner"></div>
          <img src="logo.png" alt="Physics of Champions" class="cube-logo-img">
        </div>
        <div class="logo-title-box">
          <span class="logo-badge">PHYSICS OF CHAMPIONS</span>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // DATA 17 PESERTA DENGAN AVATAR KARAKTER RESMI (BOY & GIRL)
  // -------------------------------------------------------------
  const participantsData = [
    { id: 1, name: "Agnia Rahman", score: 4, avatar: "avatar_girl_full.jpg" },
    { id: 2, name: "Andi Alda", score: 3, avatar: "avatar_boy_full.jpg" },
    { id: 3, name: "Abdurrahman", score: 2, avatar: "avatar_boy_full.jpg" },
    { id: 4, name: "Putri Siti Nurhayati", score: 1, avatar: "avatar_girl_full.jpg" },
    { id: 5, name: "Ryan Prasetya", score: 0, avatar: "avatar_boy_full.jpg" },
    { id: 6, name: "Wilda Fathani Salsabila", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 7, name: "Alifia Novi Earlydani", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 8, name: "Hilmi Aminuddin", score: 0, avatar: "avatar_boy_full.jpg" },
    { id: 9, name: "Salsabila", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 10, name: "Fitri Ramadhani", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 11, name: "Erika Haryanto", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 12, name: "Irsad", score: 0, avatar: "avatar_boy_full.jpg" },
    { id: 13, name: "Putri Alika", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 14, name: "Salma Okta", score: 0, avatar: "avatar_girl_full.jpg" },
    { id: 15, name: "Agung", score: 0, avatar: "avatar_boy_full.jpg" },
    { id: 16, name: "Arven", score: 0, avatar: "avatar_boy_full.jpg" },
    { id: 17, name: "Rivan", score: 0, avatar: "avatar_boy_full.jpg" }
  ];

  // Fallback netral tanpa inisial huruf
  function getFallbackAvatar() {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%231e293b"/><circle cx="32" cy="24" r="12" fill="%2394a3b8"/><path d="M14 54 C14 42, 22 38, 32 38 C42 38, 50 42, 50 54 Z" fill="%2394a3b8"/></svg>`;
  }

  // -------------------------------------------------------------
  // GSAP FLIP LEADERBOARD RENDER & REORDER ANIMATION (2 DETIK)
  // -------------------------------------------------------------
  function renderLeaderboard(animatedParticipantId = null) {
    // 1. Tangkap posisi elemen sebelum pengurutan via GSAP Flip
    let flipState = null;
    let oldPositions = new Map();

    if (window.Flip) {
      flipState = Flip.getState(".lb-item");
    } else {
      document.querySelectorAll(".lb-item").forEach(el => {
        oldPositions.set(el.dataset.id, el.getBoundingClientRect().top);
      });
    }

    // 2. Urutkan peserta berdasarkan skor tertinggi lalu ID
    participantsData.sort((a, b) => b.score - a.score || a.id - b.id);
    lbList.innerHTML = "";

    // 3. Render ulang list peserta
    participantsData.forEach((p, index) => {
      const rank = index + 1;
      let rankClass = "";
      let rankDisplay = `#${rank}`;

      if (rank === 1) { rankClass = "rank-1"; rankDisplay = "🥇 1"; }
      else if (rank === 2) { rankClass = "rank-2"; rankDisplay = "🥈 2"; }
      else if (rank === 3) { rankClass = "rank-3"; rankDisplay = "🥉 3"; }
      else if (rank === 4) { rankClass = "rank-4"; rankDisplay = "⭐ 4"; }

      const item = document.createElement("div");
      item.className = `lb-item ${rankClass}`;
      item.dataset.id = p.id;
      item.innerHTML = `
        <div class="lb-left">
          <span class="lb-rank">${rankDisplay}</span>
          <div class="lb-avatar-wrap">
            <img class="lb-avatar-img" src="${p.avatar}" alt="" onerror="this.src='${getFallbackAvatar()}';">
          </div>
          <span class="lb-name" id="name-${p.id}" title="${p.name}">${p.name}</span>
        </div>
        <div class="lb-right">
          <span class="lb-score-chip" id="score-${p.id}">${p.score} Pts</span>
          <button class="btn-score-add" data-id="${p.id}" title="Tambah 1 Poin">+ 1</button>
        </div>
      `;

      // Event listener tombol +
      const btnAdd = item.querySelector(".btn-score-add");
      btnAdd.addEventListener("click", (e) => {
        e.stopPropagation();
        handleScoreAdd(p.id, item);
      });

      lbList.appendChild(item);
    });

    // 4. Animasi pergeseran posisi ranking tepat 2 DETIK (duration: 2.0)
    if (window.Flip && flipState) {
      Flip.from(flipState, {
        duration: 2.0,
        ease: "power2.out",
        stagger: 0.015
      });
    } else if (oldPositions.size > 0 && window.gsap) {
      document.querySelectorAll(".lb-item").forEach(el => {
        const id = el.dataset.id;
        const oldTop = oldPositions.get(id);
        if (oldTop !== undefined) {
          const newTop = el.getBoundingClientRect().top;
          const deltaY = oldTop - newTop;
          if (deltaY !== 0) {
            gsap.fromTo(el, { y: deltaY }, { y: 0, duration: 2.0, ease: "power2.out" });
          }
        }
      });
    }

    // 5. Animasi sorotan baris pemenang selama kenaikan 2 detik
    if (animatedParticipantId) {
      const targetItem = document.querySelector(`.lb-item[data-id="${animatedParticipantId}"]`);
      if (targetItem) {
        // Tampilkan baris pemenang di layer teratas selama meluncur naik
        targetItem.style.zIndex = "40";

        // Sorotan hijau emerald
        targetItem.classList.add("correct-pulse");
        const nameEl = targetItem.querySelector(".lb-name");
        if (nameEl) nameEl.classList.add("name-green");

        const scoreChip = targetItem.querySelector(".lb-score-chip");
        if (scoreChip && window.gsap) {
          gsap.fromTo(scoreChip, 
            { scale: 1.5, backgroundColor: "rgba(16, 185, 129, 0.45)", borderColor: "#10b981", color: "#10b981" },
            { scale: 1, backgroundColor: "", borderColor: "", color: "", duration: 0.8, ease: "back.out(1.8)" }
          );
        }

        // Efek lift kartu pemenang selama 2 detik
        if (window.gsap) {
          gsap.fromTo(targetItem,
            { scale: 1.05 },
            { scale: 1, duration: 2.0, ease: "power2.out" }
          );
        }

        // Partikel melayang "+1" mengapung anggun selama 1.8 detik
        const badge = document.createElement("div");
        badge.className = "score-float-badge";
        badge.textContent = "✨ +1";
        targetItem.querySelector(".lb-left").appendChild(badge);

        if (window.gsap) {
          gsap.fromTo(badge, 
            { y: 0, opacity: 1, scale: 0.8 }, 
            { y: -42, opacity: 0, scale: 1.5, duration: 1.8, ease: "power2.out", onComplete: () => badge.remove() }
          );
        } else {
          setTimeout(() => badge.remove(), 1800);
        }

        // Kembalikan ke tampilan default setelah animasi 2 detik tuntas
        setTimeout(() => {
          targetItem.style.zIndex = "";
          targetItem.classList.remove("correct-pulse");
          if (nameEl) nameEl.classList.remove("name-green");
        }, 2100);
      }
    }
  }

  function handleScoreAdd(participantId, clickedElement) {
    playCorrectChime();
    const p = participantsData.find(item => item.id === participantId);
    if (!p) return;

    p.score += 1;
    renderLeaderboard(participantId);
  }

  renderLeaderboard();

  // Toggle Collapse / Expand Leaderboard
  lbToggleBtn.addEventListener("click", () => {
    initAudio();
    lbPanel.classList.add("collapsed");
    lbOpenTab.classList.add("visible");
    stageViewport.classList.add("expanded");
  });

  lbOpenTab.addEventListener("click", () => {
    initAudio();
    lbPanel.classList.remove("collapsed");
    lbOpenTab.classList.remove("visible");
    stageViewport.classList.remove("expanded");
  });

  // -------------------------------------------------------------
  // MULTI-AXIS BUTTERY SMOOTH 3D ROTATION & INERTIA
  // -------------------------------------------------------------
  let rotY = 25;
  let rotX = -55;
  let isAutoRotating = true;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let velX = 0;
  let velY = 0;

  function updateTransform() {
    cube.style.transform = `rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg)`;
  }
  updateTransform();

  // Mouse & Touch Dragging
  stageViewport.addEventListener("pointerdown", (e) => {
    initAudio();
    isDragging = true;
    cube.classList.remove("smooth-transition");
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    velX = 0;
    velY = 0;
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    velX = dx * 0.35;
    velY = -dy * 0.35;

    rotY += velX;
    rotX += velY;

    // Batasi sudut vertikal saat drag manual
    rotX = Math.max(-85, Math.min(85, rotX));
    updateTransform();
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
  });

  window.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      isAutoRotating = !isAutoRotating;
    }
  });

  stageViewport.addEventListener("dblclick", () => {
    isAutoRotating = !isAutoRotating;
  });

  // Main High-Precision Smooth Animation Loop
  let lastTime = performance.now();
  function loop(currentTime) {
    const rawDelta = (currentTime - lastTime) / 1000;
    const delta = Math.min(rawDelta, 0.05);
    lastTime = currentTime;

    if (!isDragging) {
      if (isAutoRotating) {
        // Rotasi horizontal diperlambat jadi 0.7x (dari 11.8 ke 8.25 deg/s) agar sangat anggun & mudah dibaca
        const speedY = 8.25;
        rotY += delta * speedY;

        // Ayunan elevasi vertikal harmonik diperhalus (0.7x kecepatan sebelumnya)
        // Puncak negatif -62° -> SISI ATAS (Top Logo) MENGHADAP JELAS
        // Puncak positif +26° -> SISI BAWAH (Bottom Logo) TERLIHAT
        const cycle = currentTime * 0.000455;
        const targetPitch = -18 + Math.sin(cycle) * 44;

        // Interpolasi eksponensial independen frame rate (zero stutter)
        const lerpFactor = 1 - Math.exp(-2.0 * delta);
        rotX += (targetPitch - rotX) * lerpFactor;

        updateTransform();
      } else {
        // Redaman inersia lembut saat di-pause/lepas drag
        if (Math.abs(velX) > 0.01 || Math.abs(velY) > 0.01) {
          rotY += velX;
          rotX += velY;
          rotX = Math.max(-85, Math.min(85, rotX));
          velX *= 0.95;
          velY *= 0.95;
          updateTransform();
        }
      }
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
