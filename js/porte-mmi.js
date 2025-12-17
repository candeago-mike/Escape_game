gsap.registerPlugin(ScrollTrigger);
gsap.set(".triangle", {
  opacity: 0,
});
// Animation du texte
gsap.to(".text-content", {
  duration: 2,
  delay: 0.5,
  text: "Tiens, j'avais jamais vu ce système de sécurité avant...",
  ease: "none",
  onComplete: function () {
    // Une fois le texte fini, animer le triangle
    gsap.to(".triangle", {
      duration: 0.5,
      opacity: 1,
      y: 5,
      repeat: -1, // répète en boucle
      yoyo: true, // va-et-vient
      ease: "sine.inOut",
    });
  },
});

const hint = document.querySelector(".text-typing");

// Masquer au clic
document.addEventListener("click", function () {
  hint.style.display = "none";
});

// Masquer à la touche Entrée
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // ou event.code === "Enter"
    hint.style.display = "none";
  }
});

const lock = document.querySelector(".lock");

/* ===== Canvas setup ===== */
const canvasGrad = document.getElementById("graduation");
const ctxGrad = canvasGrad.getContext("2d");
const canvasInd = document.getElementById("indicator");
const ctxInd = canvasInd.getContext("2d");

function resize() {
  [canvasGrad, canvasInd].forEach((c) => {
    c.width = lock.offsetWidth;
    c.height = lock.offsetHeight;
  });
}
resize();
window.addEventListener("resize", resize);

const C = { x: canvasGrad.width / 2, y: canvasGrad.height / 2 };
const R = canvasGrad.width / 2 - 6;

/* ===== Traits du cercle ===== */
const TICK_COUNT = 60;
const ticksContainer = document.getElementById("ticks");
for (let i = 0; i < TICK_COUNT; i++) {
  const t = document.createElement("span");
  t.style.transform = `rotate(${(360 / TICK_COUNT) * i}deg) translateY(0)`;
  ticksContainer.appendChild(t);
}

/* ===== Affichage central ===== */
const display = document.getElementById("display");
const SYMBOLS = "123456789#$%&@*+-=?";
let lastStep = -1;

const revealSteps = [
  { p: 0.12, char: "M" },
  { p: 0.26, char: "O" },
  { p: 0.38, char: "O" },
  { p: 0.5, char: "D" },
  { p: 0.72, char: "E" },
  { p: 0.8, char: "U" },
  { p: 0.95, char: "L" },
];

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

/* ===== Graduation (cercle de coffre) ===== */
function drawGraduation(angle) {
  ctxGrad.clearRect(0, 0, canvasGrad.width, canvasGrad.height);
  ctxGrad.save();
  ctxGrad.translate(C.x, C.y);
  ctxGrad.rotate(-angle); // rotation opposée pour l’effet coffre
  for (let i = 0; i < TICK_COUNT; i++) {
    ctxGrad.beginPath();
    ctxGrad.moveTo(0, -R);
    ctxGrad.lineTo(0, -R + 12);
    ctxGrad.strokeStyle = "rgba(255,255,255,0.35)";
    ctxGrad.lineWidth = 2;
    ctxGrad.stroke();
    ctxGrad.rotate((Math.PI * 2) / TICK_COUNT);
  }
  ctxGrad.restore();
}

/* ===== Boule indicatrice ===== */
function drawIndicator(angle) {
  ctxInd.clearRect(0, 0, canvasInd.width, canvasInd.height);
  ctxInd.save();
  ctxInd.translate(C.x, C.y);
  ctxInd.rotate(angle); // tourne dans le sens chronologique
  ctxInd.beginPath();
  ctxInd.arc(0, -R + 6, 6, 0, Math.PI * 2);
  ctxInd.fillStyle = "white";
  ctxInd.fill();
  ctxInd.restore();
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".lock-wrapper",
    start: "top top",
    end: "+=2400",
    scrub: true,
    pin: true,
  },
});

tl.to(
  {},
  {
    duration: 1,
    onUpdate: () => {
      const p = tl.progress();

      // graduation tourne dans le sens inverse
      drawGraduation(p * Math.PI * 2);

      // boule tourne dans le sens normal
      drawIndicator(p * Math.PI * 2);

      // symbole central
      if (Math.floor(p * 120) !== lastStep) {
        lastStep = Math.floor(p * 120);
        display.textContent = randomSymbol();
      }

      revealSteps.forEach((s) => {
        if (Math.abs(p - s.p) < 0.015) {
          display.textContent = s.char;
        }
      });
    },
  }
);

/* Input utilisateur */
const input = document.getElementById("codeInput");
const result = document.getElementById("result");
const enter = document.querySelector(".enter");
result.textContent = "PORTE VÉROUILLÉE";
result.classList.add("locked");

input.addEventListener("input", () => {
  if (input.value.toUpperCase() === "MOODEUL") {
    result.textContent = "PORTE OUVERTE";
    result.classList.remove("locked");
    result.classList.add("unlocked");
    enter.classList.add("visible");
  }
});

const clickZone = document.querySelector(".click-zone");
const cadena = document.querySelector(".Cadena");
clickZone.addEventListener("mouseenter", () => {
  cadena.classList.add("glow");
});

clickZone.addEventListener("mouseleave", () => {
  cadena.classList.remove("glow");
});
