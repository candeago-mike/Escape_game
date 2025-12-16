// const nameInput = document.getElementById("nameInput");
// console.log(nameInput);
// const value = nameInput.value;
// console.log(value);



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

// Liens internes de la map
const mapElements = mapModal.querySelectorAll(
  'rect[class*="-map"], path[class*="-map"]'
);

mapElements.forEach((el) => {
  const mapClass = Array.from(el.classList).find((c) => c.endsWith("-map"));
  if (!mapClass) return;

  const baseName = mapClass.replace(/-map$/, "");
  el.style.cursor = "pointer";

  el.addEventListener("click", () => {
    window.location.href = `${baseName}.html`;
  });
});

// Liens internes de la map (01f-map -> 01f.html, etc.)
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
      const targetUrl = `${baseName}.html`;
      window.location.href = targetUrl;
    });
  });
}

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
