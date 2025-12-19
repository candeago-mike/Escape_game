const inventorycheck = Inventory.listItems();

if (inventorycheck.includes("journal")) {
  console.log("Le journal est déjà dans l'inventaire.");
  gsap.set(".triangle", {
    opacity: 0,
  });
  // Animation du texte
  gsap.to(".text-content", {
    duration: 2,
    delay: 1,
    text: "Le journal de M.Audemars disait qu'il avait vu mon PC ici",
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
} else {
  gsap.set(".triangle", {
    opacity: 0,
  });
  // Animation du texte
  gsap.to(".text-content", {
    duration: 2,
    delay: 1,
    text: "J'en ai passé du temps ici après la pizza du marathon du web... Bref, aucune chance que mon <span class='highlight-yellow'>PC</span> soit ici.",
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
}

const hint = document.querySelector(".text-typing-wc");

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
