gsap.registerPlugin(TextPlugin);

// 1) Animation initiale
gsap.set(".text-typing-03f .triangle", { opacity: 0 });

gsap.to(".text-typing-03f .text-content", {
  duration: 2,
  delay: 0.5,
  text: "Si M. Dubois pouvait verrouiller cette porte plus souvent, on aurait moins de cours de réseaux !",
  ease: "none",
  onComplete: function () {
    gsap.to(".text-typing-03f .triangle", {
      duration: 0.5,
      opacity: 1,
      y: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },
});

const hint = document.querySelector(".text-typing-03f");
const hintText = hint.querySelector(".text-content");
// Masquer au clic sur la bulle uniquement
hint.addEventListener("click", () => {
  hint.style.display = "none";
});

// Masquer à la touche Entrée
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    hint.style.display = "none";
  }
});

const correctCode = "31830";
let input = "";

const overlay = document.getElementById("digicode-overlay");
const resultEl = document.getElementById("result");
const codeInput = document.getElementById("codeInput");
const digitBoxes = document.querySelectorAll(".digit-box");
const nextBtn = document.getElementById("Btn"); // <- bouton suite

// message initial
resultEl.textContent = "PORTE VERROUILLÉE";
resultEl.classList.add("locked");

// focus auto sur l’input pour capter le clavier
codeInput.focus();

// met à jour les 5 cases
function renderBoxes() {
  digitBoxes.forEach((box, i) => {
    box.textContent = input[i] || "";
  });
}

function shakeOverlay() {
  overlay.classList.add("shake");
  setTimeout(() => {
    overlay.classList.remove("shake");
  }, 400); // même durée que l'animation
}

// logique de validation
function checkCode() {
  if (input.length === correctCode.length) {
    if (input === correctCode) {
      resultEl.textContent = "CODE CORRECT";
      resultEl.classList.remove("locked");
      resultEl.classList.add("unlocked");
      //afficher le bouton suite
      nextBtn.classList.add("visible");
    } else {
      resultEl.textContent = "PORTE VERROUILLÉE";
      resultEl.classList.add("locked");
      resultEl.classList.remove("unlocked");
      shakeOverlay();
      input = "";
      codeInput.value = "";
      renderBoxes();
      // cacher le bouton au cas où
      nextBtn.classList.remove("visible");
    }
  }
}

// clic sur les boutons 0–9
document.querySelectorAll("#buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (input.length < correctCode.length) {
      input += btn.textContent;
      codeInput.value = input;
      renderBoxes();
      checkCode();
    }
  });
});

// saisie clavier numérique (chiffres)
codeInput.addEventListener("input", () => {
  // on ne garde que les chiffres, max longueur du code
  input = codeInput.value.replace(/\D/g, "").slice(0, correctCode.length);
  codeInput.value = input;
  renderBoxes();
  checkCode();
});

// gestion spécifique de Backspace / Delete
codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    e.preventDefault(); // on contrôle nous‑mêmes la suppression

    if (input.length > 0) {
      input = input.slice(0, -1); // enlève le dernier chiffre
      codeInput.value = input;
      renderBoxes();

      // on revient à l'état verrouillé visuel si on avait affiché "CODE CORRECT"
      resultEl.textContent = "PORTE VERROUILLÉE";
      resultEl.classList.add("locked");
      resultEl.classList.remove("unlocked");
    }
  }
});

const porte03f = document.querySelector(".imgporte");

// pour être sûr que le focus reste sur l’input
overlay.addEventListener("click", () => codeInput.focus());

nextBtn.addEventListener("click", () => {
  // cacher la porte
  if (porte03f) {
    porte03f.style.display = "none";
  }

  // cacher l'overlay du digicode
  overlay.style.display = "none";

  // cacher le bouton lui-même
  nextBtn.style.display = "none";

  // réafficher la bulle (au cas où elle a été cachée)
  hint.style.display = "flex";

  // kill anciennes anims sur ce texte et triangle
  gsap.killTweensOf(hintText);
  gsap.killTweensOf(".text-typing-03f .triangle");
  gsap.set(".text-typing-03f .triangle", { opacity: 0, y: 0 });

  // nouveau texte "coupure de courant"
  hintText.innerHTML = "";
  gsap.to(hintText, {
    duration: 1,
    text: 'On dirait qu\'il y a une <span class="highlight-yellow">coupure de courant</span>...',
    ease: "none",
    onComplete: () => {
      gsap.to(".text-typing-03f .triangle", {
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
