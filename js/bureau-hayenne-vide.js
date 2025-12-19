gsap.registerPlugin(TextPlugin);

const hayenneWowImg = document.querySelector(".hayenne-wow");
const hayenneWowBubble = document.querySelector(".text-typing-hayenne-wow");
const hayWowTextSpan = hayenneWowBubble.querySelector(".text-content");
const trousseau = document.querySelector(".trousseau");
const moiBubble = document.querySelector(".text-typing-cle");
const moiTextSpan = moiBubble.querySelector(".text-content-moi");
// au départ, tu peux cacher la bulle en CSS (.text-typing-hayenne-wow { display:none; })

trousseau.addEventListener("click", () => {
  Inventory.addItem("trousseau");
  console.log("🔑 Trousseau ajouté à l'inventaire :", Inventory.listItems());
  moiBubble.style.display = "flex";

  gsap.killTweensOf(moiTextSpan);
  moiTextSpan.innerHTML = "";

  gsap.to(moiTextSpan, {
    duration: 2,
    text: "J'ai récuperé les clés, je peux aller en 04F maintenant !",
    ease: "none",
    onComplete: () => {
      gsap.to(".text-typing-hayenne-wow .triangle", {
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

// 1) Au chargement, afficher la bulle + animer le texte
window.addEventListener("load", () => {
  hayenneWowBubble.style.display = "flex";

  gsap.killTweensOf(hayWowTextSpan);
  hayWowTextSpan.innerHTML = "";

  gsap.to(hayWowTextSpan, {
    duration: 2,
    text: "Ah oui ! Karabatic est en direct ! Je ne peux pas louper ça ! Je te confie mon bureau.",
    ease: "none",
    onComplete: () => {
      gsap.to(".text-typing-hayenne-wow .triangle", {
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

// 2) Fonction pour tout fermer (bulle + image)
function closeHayenneWow() {
  hayenneWowBubble.style.display = "none";
  hayWowTextSpan.innerHTML = "";
  hayenneWowImg.style.display = "none";
}

// clic sur la bulle => fermer
hayenneWowBubble.addEventListener("click", () => {
  closeHayenneWow();
});

// 3) Touche Enter => fermer aussi
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    closeHayenneWow();
  }
});
