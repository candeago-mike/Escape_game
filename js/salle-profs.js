const container = document.querySelector(".text-typing-the-flop .text-content");
const bubble = document.querySelector(".text-typing-the-flop");
const replayBtn = document.getElementById("replayBtn");
const triangle = document.querySelector(".triangle");

let currentIndex = 0;
let isTyping = false;
let finishedAll = false;

const messages = [
  "Oh non ! Mon thé est renversé ! Je n'ai pas le temps d'en refaire un, tu pourrais t'en charger ?",
  'Je veux bien un thé de quantité <span class="highlight-yellow">normale</span>, avec <span class="highlight-yellow">1 sucre</span> et tu peux rajouter <span class="highlight-yellow">2 doses de lait</span>.',
  'Quoique, je vais prendre un <span class="highlight-yellow">grand</span> thé avec le <span class="highlight-yellow">double de sucre</span> mais par contre avec <span class="highlight-yellow">une dose de lait en moins</span>.',
  'Tu sais quoi, un <span class="highlight-yellow">petit</span> thé conviendra, avec <span class="highlight-yellow">un sucre en plus</span> mais le <span class="highlight-yellow">double de lait</span> cette fois.',
  'Finalement, je pense que le thé parfait serait la <span class="highlight-yellow">taille au dessus</span>, tu peux <span class="highlight-yellow">ajouter 2 sucres en plus</span> et <span class="highlight-yellow">remettre le lait comme au début</span>.',
];

// tape le HTML lentement
function typeHtml(html, onComplete) {
  container.innerHTML = "";
  isTyping = true;

  let i = 0;
  const total = html.length;
  const speed = 10; // ms par caractère

  function step() {
    i++;
    container.innerHTML = html.slice(0, i);
    if (i < total) {
      setTimeout(step, speed);
    } else {
      isTyping = false;
      if (onComplete) onComplete();
    }
  }

  step();
}

// affichage d’un message
function showMessage(index) {
  const html = messages[index];

  if (index === 0) {
    // intro + triangle
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

// avancée dans le scénario au clic / Enter
function goNext() {
  if (isTyping) return;

  // encore des messages à afficher
  if (currentIndex < messages.length - 1) {
    currentIndex++;
    showMessage(currentIndex);
    return;
  }

  // on est déjà sur la dernière consigne
  if (!finishedAll) {
    // premier clic/Enter sur la dernière → marquer comme fini + montrer le bouton
    finishedAll = true;
    replayBtn.style.display = "inline-block";
    gsap.fromTo(
      replayBtn,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  } else {
    // deuxième clic/Enter sur la dernière → tu peux fermer la bulle ou autre
    bubble.style.display = "none";
    // ou lancer une redirection ici si tu veux :
    // window.location.href = "index.html";
  }
}

// interactions
bubble.addEventListener("click", goNext);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") goNext();
});

// replay
replayBtn.addEventListener("click", () => {
  replayBtn.style.display = "none";
  bubble.style.display = "block";
  gsap.set(triangle, { opacity: 0, y: 0 });
  currentIndex = 0;
  finishedAll = false;
  showMessage(currentIndex);
});

// lancement initial
gsap.set(triangle, { opacity: 0 });
showMessage(0);
