gsap.registerPlugin(TextPlugin);
console.log(Inventory.listItems());
const viseurImg = document.querySelector(".viseur");
const hint = document.querySelector(".text-typing-02f");
const hintText = hint.querySelector(".text-content");
const hintTriangle = hint.querySelector(".triangle");
const cableBtn = document.getElementById("cableBtn");

let dialogStep = 0; // 0 = avant récupération, 1 = câble récupéré

// ==============================
// ÉTAT INITIAL
// ==============================
gsap.set(hintTriangle, { opacity: 0 });
hint.style.display = "none";

// Bouton caché par défaut
if (cableBtn) {
  cableBtn.style.display = "none";
}

// ==============================
// FONCTION D'AFFICHAGE DU DIALOGUE
// ==============================
function playDialogue(text) {
  hint.style.display = "flex";

  gsap.killTweensOf(hintText);
  gsap.killTweensOf(hintTriangle);

  gsap.set(hintTriangle, { opacity: 0, y: 0 });
  hintText.innerHTML = "";

  gsap.to(hintText, {
    duration: 2,
    delay: 0.2,
    text: text,
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
}

// ==============================
// CLIC SUR LE VISEUR
// ==============================
viseurImg.addEventListener("click", (e) => {
  e.stopPropagation();

  // 1er dialogue : problème
  if (dialogStep === 0) {
    playDialogue(
      "Ahhhh il fonctionne, c'est Madame Hayenne qui va être contente !"
    );

    // Ajout du câble endommagé UNE SEULE FOIS
    if (
      typeof Inventory.hasItem === "function"
        ? !Inventory.hasItem("cableP")
        : true
    ) {
      Inventory.addItem("cableP");
    }

    dialogStep = 1;
    return;
  }

  // 2e dialogue : confirmation
  if (dialogStep === 1) {
    playDialogue("Tu as récupéré le câble endommagé.");
  }
});

// ==============================
// MASQUER LE DIALOGUE
// ==============================
hint.addEventListener("click", (e) => {
  e.stopPropagation();
  hint.style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    hint.style.display = "none";
  }
});

// ==============================
// AFFICHAGE DU BOUTON "DONNER LE CÂBLE"
// ==============================

const checkInventaire = Inventory.listItems();
console.log(checkInventaire);

if (checkInventaire.includes("cableR") && cableBtn) {
  cableBtn.style.display = "inline-block";
}

// ==============================
// DONNER LE CÂBLE
// ==============================
if (cableBtn) {
  cableBtn.addEventListener("click", () => {
    const bgNormal = document.getElementById("bg-normal");
    const bgProj = document.getElementById("bg-proj");

    if (!bgNormal || !bgProj) return;

    // Changement de décor
    bgNormal.style.display = "none";
    bgProj.style.display = "block";

    // Optionnel : désactiver le bouton après usage
    cableBtn.style.display = "none";

    console.log("📽️ Vidéoprojecteur réparé !");
  });
}
