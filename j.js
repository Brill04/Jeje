// --- FUNGSI HALAMAN AWAL ---
function startReveal() {
  const surpriseArea = document.getElementById("surprise-area");
  const mainContent = document.getElementById("main-content");
  const bgMusic = document.getElementById("bgMusic");

  surpriseArea.classList.add("zoom-out-effect");
  if (bgMusic) bgMusic.play();

  triggerConfetti(0.5);

  setTimeout(() => {
    surpriseArea.style.display = "none";
    mainContent.classList.remove("content-hidden");
    mainContent.classList.add("content-visible");
    window.scrollTo(0, 0);
    runTypewriter(); // Jalankan ketikan teks
  }, 1100);
}

// --- TYPEWRITER EFFECT ---
const textArray = [
  "Selamat ulang tahun BESTTTIIEEE ✨",
  "BISMILLAH SUKAK YA ",
  "Scroll terus ke bawah ya! 👇",
];
let textIdx = 0;
function runTypewriter() {
  const target = document.getElementById("typewriter-text");
  if (!target) return;
  let charIdx = 0;
  target.innerHTML = "";

  function type() {
    if (charIdx < textArray[textIdx].length) {
      target.innerHTML += textArray[textIdx].charAt(charIdx);
      charIdx++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        if (textIdx < textArray.length - 1) {
          target.innerHTML = "";
          charIdx = 0;
          textIdx++;
          type();
        }
      }, 2000);
    }
  }
  type();
}

// --- TIUP LILIN ---
function blowCandle() {
  const flame = document.getElementById("flame");
  const msg = document.getElementById("cake-msg");
  const reveal = document.getElementById("secret-reveal");

  flame.style.opacity = "0";
  msg.innerHTML = "✨ <b>Wishes granted!</b> ✨";

  setTimeout(() => {
    reveal.classList.add("reveal-active");
    triggerConfetti(0.7);
    initScratchCard(); // Inisialisasi kartu gosok
    reveal.scrollIntoView({ behavior: "smooth" });
  }, 500);
}

// --- KARTU GOSOK ---
function initScratchCard() {
  const canvas = document.getElementById("scratch-canvas");
  const ctx = canvas.getContext("2d");
  const container = canvas.parentElement;

  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  ctx.fillStyle = "#C0C0C0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#666";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Gosok di sini...", canvas.width / 2, canvas.height / 2);

  let mousedown = false;

  function handleScratch(e) {
    if (!mousedown) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    checkPercent(canvas, ctx);
  }

  canvas.addEventListener("mousedown", () => (mousedown = true));
  canvas.addEventListener("mouseup", () => (mousedown = false));
  canvas.addEventListener("mousemove", handleScratch);
  canvas.addEventListener("touchstart", (e) => {
    mousedown = true;
    handleScratch(e);
    e.preventDefault();
  });
  canvas.addEventListener("touchmove", (e) => {
    handleScratch(e);
    e.preventDefault();
  });
  canvas.addEventListener("touchend", () => (mousedown = false));
}

function checkPercent(canvas, ctx) {
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let count = 0;
  for (let i = 0; i < pixels.length; i += 32) {
    if (pixels[i + 3] === 0) count++;
  }
  if (count > (pixels.length / 128) * 0.5) {
    canvas.style.transition = "1s";
    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    setTimeout(revealNextButton, 600);
  }
}

function revealNextButton() {
  const btn = document.getElementById("btn-start-popup");
  if (btn) {
    btn.classList.remove("hidden");
    btn.scrollIntoView({ behavior: "smooth" });
  }
}

// --- CORE POP-UP LOGIC (Satu Room Satu Pop-up) ---
function showPopup(step) {
  const room = document.getElementById("popup-sequence");
  // Update angka 4 menjadi 7 agar semua step terdeteksi
  const allSteps = document.querySelectorAll(".step-card");
  const startBtn = document.getElementById("btn-start-popup");

  room.classList.remove("hidden");

  allSteps.forEach((card) => {
    card.classList.add("hidden");
    card.style.display = "none";
  });

  const currentCard = document.getElementById(`step-${step}`);
  if (currentCard) {
    currentCard.classList.remove("hidden");
    currentCard.style.display = "block";
  }

  if (startBtn) startBtn.classList.add("hidden");
}
function finishStory() {
  document.getElementById("popup-sequence").classList.add("hidden");
  triggerConfetti(0.5);
  alert("Semoga hari kamu menyenangkan, Jee! 🤗🤗");
}

// --- UTILITIES ---
function triggerConfetti(yPos) {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: yPos },
    colors: ["#FFD1DC", "#B76E79", "#D4AF37"],
  });
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const icon = document.getElementById("music-icon");
  if (music.paused) {
    music.play();
    icon.innerText = "🎵";
  } else {
    music.pause();
    icon.innerText = "🔇";
  }
}

// --- BUNGA BERJATUHAN ---
function createFallingPetals() {
  const container = document.getElementById("petals-container");
  const petalEmojis = ["🌸", "💮", "🌺", "✨"];
  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("span");
    petal.classList.add("petal");
    petal.innerText =
      petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = Math.random() * 1.5 + 1 + "rem";
    petal.style.animationDuration = Math.random() * 5 + 7 + "s";
    petal.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(petal);
  }
}
window.addEventListener("DOMContentLoaded", createFallingPetals);
