/* ============================
   SETUP ELEMENTS
============================ */

const container = document.querySelector(".text-typing-the-flop .text-content");
const bubble = document.querySelector(".text-typing-the-flop");
const replayBtn = document.getElementById("replayBtn");
const triangle = document.querySelector(".triangle");

let currentIndex = 0;
let isTyping = false;
let finishedAll = false;
let cupAdded = false;
let dialoguesEnabled = true;

/* ============================
   MESSAGES
============================ */

const messages = [
  "Oh non ! Mon thé est renversé ! Je n'ai pas le temps d'en refaire un, tu pourrais t'en charger ?",
  'Je veux bien un thé de quantité <span class="highlight-yellow">normale</span>, avec <span class="highlight-yellow">1 sucre</span> et tu peux rajouter <span class="highlight-yellow">2 doses de lait</span>.',
  'Quoique, je vais prendre un <span class="highlight-yellow">grand</span> thé avec le <span class="highlight-yellow">double de sucre</span> mais par contre avec <span class="highlight-yellow">une dose de lait en moins</span>.',
  'Tu sais quoi, un <span class="highlight-yellow">petit</span> thé conviendra, avec <span class="highlight-yellow">un sucre en plus</span> mais le <span class="highlight-yellow">double de lait</span> cette fois.',
  'Finalement, je pense que le thé parfait serait la <span class="highlight-yellow">taille au dessus</span>, tu peux <span class="highlight-yellow">ajouter 2 sucres en plus</span> et <span class="highlight-yellow">remettre le lait comme au début</span>.',
  "Tu as récupéré la tasse de M. Dubois !",
];

/* ============================
   TYPING EFFECT
============================ */

function typeHtml(html, onComplete) {
  container.innerHTML = "";
  isTyping = true;

  let i = 0;
  const speed = 10;

  function step() {
    i++;
    container.innerHTML = html.slice(0, i);

    if (i < html.length) {
      setTimeout(step, speed);
    } else {
      isTyping = false;
      if (onComplete) onComplete();
    }
  }

  step();
}

/* ============================
   SHOW MESSAGE
============================ */

function showMessage(index) {
  const html = messages[index];

  if (index === 0) {
    typeHtml(html, () => {
      gsap.to(triangle, {
        duration: 0.5,
        opacity: 1,
        y: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  } else {
    typeHtml(html);
  }
}

/* ============================
   NEXT MESSAGE
============================ */

function goNext() {
  if (!dialoguesEnabled) return;
  if (isTyping) return;

  if (currentIndex < messages.length - 1) {
    currentIndex++;
    showMessage(currentIndex);
    return;
  }

  if (!finishedAll) {
    finishedAll = true;

    if (!cupAdded && !Inventory.listItems().includes("tasse")) {
      Inventory.addItem("tasse");
      cupAdded = true;
      console.log("☕ Tasse ajoutée à l'inventaire");
    }

    bubble.style.display = "none";
    replayBtn.style.display = "inline-block";

    gsap.fromTo(
      replayBtn,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }
}

/* ============================
   EVENTS
============================ */

bubble.addEventListener("click", goNext);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") goNext();
});

/* ============================
   REPLAY (TOUJOURS AUTORISÉ)
============================ */

replayBtn.addEventListener("click", () => {
  dialoguesEnabled = true;
  replayBtn.style.display = "none";
  bubble.style.display = "flex";

  currentIndex = 0;
  finishedAll = false;

  showMessage(0);
});

/* ============================
   INITIAL LOAD LOGIC
============================ */

gsap.set(triangle, { opacity: 0 });

const hasCup = Inventory.listItems().includes("tasse");
const hasThe = Inventory.listItems().includes("thé");
const DonnerTheBtn = document.getElementById("DonnerThe");
const bubbleMerci = document.querySelector(".text-typing-merci");
if (hasThe) {
  dialoguesEnabled = false;
  replayBtn.style.display = "none";
  DonnerTheBtn.style.display = "inline-block";
  bubble.style.display = "none";
  console.log("🍵 Thé déjà dans l'inventaire → dialogues désactivés");
} else if (hasCup) {
  dialoguesEnabled = false;
  DonnerTheBtn.style.display = "none";
  replayBtn.style.display = "inline-block";
  bubble.style.display = "none";
  console.log("☕ Tasse déjà dans l'inventaire → dialogues désactivés");
} else {
  showMessage(0);
}

DonnerTheBtn.addEventListener("click", () => {
  // Désactive le bouton après clic
  DonnerTheBtn.style.display = "none";

  // Active la div de dialogue merci
  bubbleMerci.style.display = "flex";

  // Vide le contenu avant d'écrire
  const merciContent = bubbleMerci.querySelector(".text-content");
  merciContent.innerHTML = "";

  // Animation du texte avec GSAP
  gsap.to(merciContent, {
    duration: 2,
    text: "M3RC1 83AUC0UP",
    ease: "none",
    onComplete: () => {
      // Triangle clignotant si tu veux (optionnel)
      const triangleMerci = bubbleMerci.querySelector(".triangle");
      gsap.to(triangleMerci, {
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
