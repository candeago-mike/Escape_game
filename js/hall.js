if (typeof Inventory === "undefined") {
  console.error("❌ Inventory non chargé");
} else {
  console.log(Inventory.listItems());
}

const clickCafetiere = document.getElementById("cafetiereZone");
let messageShown = false;

clickCafetiere.addEventListener("click", () => {
  const inventoryItems = Inventory.listItems();
  if (inventoryItems.includes("thé")) {
    if (messageShown) return; // évite de relancer l'animation
    messageShown = true;
    console.log(hint);
    hint.style.display = "block";
    // reset sécurité
    gsap.killTweensOf(".text-content");
    gsap.killTweensOf(".triangle");
    gsap.set(".triangle", { opacity: 0, y: 0 });

    // Animation du texte
    gsap.to(".text-content", {
      duration: 2,
      delay: 0.5,
      text: "J'ai déjà mon thé, je dois le rapporter a M.Dubois !",
      ease: "none",
      onComplete: () => {
        // Animation du triangle
        gsap.to(".triangle", {
          duration: 0.5,
          opacity: 1,
          y: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    return;
  } else if (!inventoryItems.includes("tasse")) {
    if (messageShown) return; // évite de relancer l'animation
    messageShown = true;
    console.log(hint);
    hint.style.display = "block";
    // reset sécurité
    gsap.killTweensOf(".text-content");
    gsap.killTweensOf(".triangle");
    gsap.set(".triangle", { opacity: 0, y: 0 });

    // Animation du texte
    gsap.to(".text-content", {
      duration: 2,
      delay: 0.5,
      text: "Je ne dois pas faire mon thé maintenant, je dois retrouver mon PC !",
      ease: "none",
      onComplete: () => {
        // Animation du triangle
        gsap.to(".triangle", {
          duration: 0.5,
          opacity: 1,
          y: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    return;
  }
  // reset UI avant de partir (optionnel mais propre)
  messageShown = false;
  gsap.killTweensOf(".triangle");
  gsap.set(".triangle", { opacity: 0 });

  window.location.href = "cafetiere.html";
});
