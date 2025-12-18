gsap.set(".triangle", {
  opacity: 0,
});
// Animation du texte
gsap.to(".text-content", {
  duration: 2,
  delay: 1,
  text: "Le vidéoprojecteur n'est pas près pour demain, je ne dois pas avoir le bon <span class='highlight-yellow'>cable</span>.",
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


const hint = document.querySelector(".text-typing-02f");

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