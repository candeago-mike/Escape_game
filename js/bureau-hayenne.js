gsap.registerPlugin(TextPlugin);

const trousseau = document.querySelector(".trousseau");
const hayenneImg = document.querySelector(".hayenne");
const moiBubble = document.querySelector(".text-typing-moi");
const hayenneBubble = document.querySelector(".text-typing-hayenne");
const moiTextSpan = moiBubble.querySelector(".text-content");
const hayTextSpan = hayenneBubble.querySelector(".text-content");

let isTypingMoi = false;
let isTypingHay = false;

gsap.set(".triangle", {
  opacity: 0,
});

trousseau.addEventListener("click", () => {
  // afficher la bulle
  moiBubble.style.display = "flex";

  // reset du texte
  gsap.killTweensOf(".text-typing-moi .text-content");
  document.querySelector(".text-typing-moi .text-content").innerHTML = "";

  gsap.to(".text-typing-moi .text-content", {
    duration: 2,
    text: "Oh ! Son <span class='highlight-yellow'>trousseau</span> de passe partout pourrait m'aider. Mais je ne peux pas le prendre si elle est là.",
    ease: "none",
    onComplete: () => {
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
});

// clic sur la bulle “moi” => la fermer
moiBubble.addEventListener("click", () => {
  moiBubble.style.display = "none";
  document.querySelector(".text-typing-moi .text-content").innerHTML = "";
});

hayenneImg.addEventListener("click", () => {
  hayenneBubble.style.display = "flex";

  gsap.killTweensOf(".text-typing-hayenne .text-content");
  document.querySelector(".text-typing-hayenne .text-content").innerHTML = "";

  gsap.to(".text-typing-hayenne .text-content", {
    duration: 2,
    text: "Tu voulais me parler de quelque chose ?",
    ease: "none",
    onComplete: () => {
      showFillInOverlay();
    },
  });
});
// ====== OVERLAY ======
function showFillInOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "hayenne-overlay";
  overlay.innerHTML = `
    <div class="hayenne-overlay-inner">
      <p>
        Allez en 
        <input type="text" id="answer1" placeholder="_ _ _" maxlength="3" />
        sur la chaîne 
        <input type="text" id="answer2" placeholder="_ _ _" maxlength="3" />,
        ça pourrait vous intéresser.
      </p>
      <button id="validateHayenne">Valider</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const validateBtn = document.getElementById("validateHayenne");
  const answer1 = document.getElementById("answer1");
  const answer2 = document.getElementById("answer2");
  const inner = overlay.querySelector(".hayenne-overlay-inner");

  // bouton Valider
  validateBtn.addEventListener("click", () => {
    const val1 = answer1.value.trim().toUpperCase();
    const val2 = answer2.value.trim().toUpperCase();

    if (val1 === "02F" && val2 === "VH2") {
      document.body.removeChild(overlay);
      hayenneBubble.style.display = "none";
      hayTextSpan.textContent = "";
      window.location.href = "bureau-hayenne-vide.html";
    } else {
      overlay.classList.add("shake");
      setTimeout(() => overlay.classList.remove("shake"), 400);
    }
  });

  // clic en dehors de la box => fermer overlay + bulle Hayenne
  overlay.addEventListener("click", (e) => {
    if (!inner.contains(e.target)) {
      document.body.removeChild(overlay); // <- il manquait ça
      hayenneBubble.style.display = "none";
      document.querySelector(".text-typing-hayenne .text-content").innerHTML =
        "";
    }
  });
}
