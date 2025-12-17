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

const clickZone = document.querySelector(".click-zone");
const cadena = document.querySelector(".Cadena");
clickZone.addEventListener("mouseenter", () => {
  cadena.classList.add("glow");
});

clickZone.addEventListener("mouseleave", () => {
  cadena.classList.remove("glow");
});

clickZone.addEventListener("click", () => {
  window.location.href = "porte.html";
});
