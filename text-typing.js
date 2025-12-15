document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(TextPlugin);

  const root = document.querySelector("#encounter-root");
  const dialog = document.querySelector(".text-typing-container");
  const textEl = document.querySelector("#text-typing");
  const pokemonLink = document.querySelector(".pokemon-link");
  if (!root || !dialog || !textEl || !pokemonLink) return;

  let currentTween = null;

  function playText(message, onComplete) {
    if (currentTween) currentTween.kill();
    textEl.textContent = ""; // <- reset avant animation

    currentTween = gsap.to(textEl, {
      text: { value: message },
      duration: 1.2,
      ease: "none",
      onComplete,
    });
  }

  function hideDialog() {
    gsap.to(dialog, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        dialog.style.pointerEvents = "none";
        textEl.textContent = "";
      },
    });
  }

  // --- 1. Premier affichage depuis Blade ---
  const initialName = root.dataset.pokemonName || "";
  if (initialName) {
    gsap.from(dialog, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        dialog.style.pointerEvents = "auto";
        playText(`${initialName} est apparu...`, () => {
          dialog.addEventListener("click", hideDialog, {
            once: true,
          });
        });
      },
    });
  }

  // --- 2. Nouveau Pokémon (event Livewire) ---
  window.addEventListener("pokemon-updated", (event) => {
    const payload = Array.isArray(event.detail)
      ? event.detail[0]
      : event.detail;
    const name = payload?.name;

    if (!name) return;

    root.dataset.pokemonName = name;

    gsap.from(dialog, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        dialog.style.pointerEvents = "auto";
        playText(`${name} est apparu...`, () => {
          dialog.addEventListener("click", hideDialog, {
            once: true,
          });
        });
      },
    });
  });

  // Afficher le message de résultat (vient de $message dans Blade)
  window.addEventListener("encounter-show-message", (event) => {
    const payload = Array.isArray(event.detail)
      ? event.detail[0]
      : event.detail;
    const msg = payload?.message || "";

    if (!msg) return;

    // on remplace le texte d'apparition par le $message
    dialog.style.pointerEvents = "auto";
    playText(msg, () => {
      dialog.addEventListener(
        "click",
        () => {
          hideDialog();
          Livewire.dispatch("animation-finished");
        },
        { once: true }
      );
    });
  });

  // --- 4. Clic sur le Pokémon : empêcher juste la nav ---
  pokemonLink.addEventListener("click", (e) => {
    e.preventDefault(); // Livewire gère wire:click="capture"
  });
});
