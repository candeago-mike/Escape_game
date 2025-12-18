// const nameInput = document.getElementById("nameInput");
// console.log(nameInput);
// const value = nameInput.value;
// console.log(value);

// salles qui ne doivent mener nulle part
const deadRooms = new Set(["01f", "amphi-mmi"]);
gsap.registerPlugin(TextPlugin);

function showMapHint(message) {
  // s'il existe déjà, on le réutilise
  let hint = document.querySelector(".map-text-typing");
  let hintText;

  if (!hint) {
    hint = document.createElement("div");
    hint.className = "text-typing map-text-typing";
    hint.innerHTML = `
      <span class="text-content"></span>
      <svg width="20" height="20" viewBox="0 0 10 10" class="triangle-icon">
        <polygon points="0,0 10,0 5,10" fill="white" class="triangle" />
      </svg>
    `;
    document.body.appendChild(hint);
  }

  hintText = hint.querySelector(".text-content");

  // position de base (à adapter à ton layout)
  hint.style.display = "flex";
  hint.style.position = "fixed";
  hint.style.bottom = "40px";
  hint.style.left = "50%";
  hint.style.transform = "translateX(-50%)";
  hint.style.zIndex = "9999";

  // reset animations + texte
  gsap.killTweensOf(hintText);
  gsap.killTweensOf(".map-text-typing .triangle");
  gsap.set(".map-text-typing .triangle", { opacity: 0, y: 0 });
  hintText.innerHTML = "";

  gsap.to(hintText, {
    duration: 1,
    text: message,
    ease: "none",
    onComplete: () => {
      gsap.to(".map-text-typing .triangle", {
        duration: 0.5,
        opacity: 1,
        y: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
  });

  // fermer au clic ou Enter
  hint.onclick = () => (hint.style.display = "none");
  document.addEventListener(
    "keydown",
    function onKey(e) {
      if (e.key === "Enter") {
        hint.style.display = "none";
        document.removeEventListener("keydown", onKey);
      }
    },
    { once: true }
  );
}

const value = localStorage.getItem("userInput");

const mapBtn = document.getElementById("mapBtn");
const mapModal = document.getElementById("mapModal");

mapBtn.addEventListener("click", () => {
  if (mapModal.classList.contains("show")) {
    mapModal.classList.remove("show");
  } else {
    mapModal.classList.add("show");
  }
});

mapModal.addEventListener("click", (e) => {
  if (e.target === mapModal) mapModal.classList.remove("show");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") mapModal.classList.remove("show");
});

function initMapLinks() {
  const mapElements = mapModal.querySelectorAll(
    'rect[class*="-map"], path[class*="-map"]'
  );

  mapElements.forEach((el) => {
    const mapClass = Array.from(el.classList).find((c) => c.endsWith("-map"));
    if (!mapClass) return;

    const baseName = mapClass.replace(/-map$/, ""); // "01f-map" -> "01f"
    el.style.cursor = "pointer";

    el.addEventListener("click", () => {
      if (deadRooms.has(baseName)) {
        showMapHint("Je ne dois pas perdre mon temps là-bas.");
      } else {
        window.location.href = `${baseName}.html`;
      }
    });
  });
}

// à appeler une fois, quand la map est dans le DOM
initMapLinks();
const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("startTimerBtn");

// TIMER (30 minutes countdown)
let timeLeft = 30 * 60; // 30 minutes en secondes
let timerInterval = null;

function updateTimer() {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${mins}:${secs}`;
}

startTimerBtn.addEventListener("click", () => {
  if (timerInterval !== null) return;

  updateTimer(); // affiche 30:00 au démarrage

  timerInterval = setInterval(() => {
    timeLeft--;

    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.textContent = "00:00";
      alert("⏰ Temps écoulé !");
    }
  }, 1000);
});

function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

const inventoryBar = document.getElementById("inventory-bar");

function renderInventory() {
  inventoryBar.innerHTML = "";

  inventory.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("inventory-item");

    if (item.quantity === 0) {
      div.classList.add("empty");
    }

    div.textContent = item.name;

    const qty = document.createElement("div");
    qty.classList.add("inventory-quantity");
    qty.textContent = item.quantity;

    div.appendChild(qty);
    inventoryBar.appendChild(div);
  });
}

let inventory = loadInventory();

renderInventory();
saveInventory(inventory);

const addButton = document.getElementById("ajoutbanane");
addButton.addEventListener("click", () => {
  const banana = inventory.find((i) => i.name === "bananas");
  if (banana) {
    banana.quantity++;
    saveInventory(inventory);
    renderInventory();
  }
});
