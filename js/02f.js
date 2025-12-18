gsap.registerPlugin(TextPlugin);

const viseurImg = document.querySelector(".viseur");
const hint = document.querySelector(".text-typing-02f");
const hintText = hint.querySelector(".text-content");
const hintTriangle = hint.querySelector(".triangle");

// état initial
gsap.set(hintTriangle, { opacity: 0 });

// clic sur le viseur => afficher + animer le texte
viseurImg.addEventListener("click", (e) => {
  e.stopPropagation(); // évite que le clic remonte au document

  hint.style.display = "flex";

  gsap.killTweensOf(hintText);
  gsap.killTweensOf(hintTriangle);
  gsap.set(hintTriangle, { opacity: 0, y: 0 });
  hintText.innerHTML = "";

  gsap.to(hintText, {
    duration: 2,
    delay: 0.2,
    text: "Le vidéoprojecteur n'est pas prêt pour demain, il me faudrait le bon <span class='highlight-yellow'>cable</span>.",
    ease: "none",
    onComplete: () => {
      gsap.to(hintTriangle, {
        duration: 0.5,
        opacity: 1,
        y: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
  });
});

// Masquer au clic SUR la bulle
hint.addEventListener("click", (e) => {
  e.stopPropagation();
  hint.style.display = "none";
});

// Masquer à la touche Entrée
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    hint.style.display = "none";
  }
});
