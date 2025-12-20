gsap.registerPlugin(TextPlugin);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".text-typing-wc");
  const textEl = container.querySelector(".text-content");
  const triangle = container.querySelector(".triangle");

  // =========================
  // OVERLAY NOIR POUR FONDU
  // =========================
  const fadeOverlay = document.createElement("div");
  fadeOverlay.style.position = "fixed";
  fadeOverlay.style.top = 0;
  fadeOverlay.style.left = 0;
  fadeOverlay.style.width = "100vw";
  fadeOverlay.style.height = "100vh";
  fadeOverlay.style.background = "black";
  fadeOverlay.style.opacity = 0;
  fadeOverlay.style.pointerEvents = "none";
  fadeOverlay.style.zIndex = 9999;
  document.body.appendChild(fadeOverlay);

  // =========================
  // ÉTAT INITIAL
  // =========================
  container.style.display = "flex";
  gsap.set(triangle, { opacity: 0, y: 0 });
  textEl.textContent = "";

  // =========================
  // ANIMATION TEXTE
  // =========================
  gsap.to(textEl, {
    duration: 1,
    delay: 0.3,
    text: "Mon PC enfin !",
    ease: "none",
    onComplete: () => {
      gsap.to(triangle, {
        opacity: 1,
        y: 4,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "sine.inOut",
      });
    },
  });

  // =========================
  // FERMETURE + TRANSITION
  // =========================
  function closeDialogue() {
    // Empêche double déclenchement
    document.removeEventListener("click", closeDialogue);
    document.removeEventListener("keydown", handleKey);

    // Stop animations
    gsap.killTweensOf(textEl);
    gsap.killTweensOf(triangle);

    // Fondu au noir
    gsap.to(fadeOverlay, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = "credits.html";
      },
    });
  }

  function handleKey(e) {
    if (e.key === "Enter") {
      closeDialogue();
    }
  }

  // =========================
  // ÉVÉNEMENTS
  // =========================
  container.addEventListener("click", (e) => {
    e.stopPropagation();
    closeDialogue();
  });

  document.addEventListener("keydown", handleKey);
});
