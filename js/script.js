// const nameInput = document.getElementById("nameInput");
// console.log(nameInput);
// const value = nameInput.value;
// console.log(value);

const mapBtn = document.getElementById("mapBtn");
const imgMap = document.getElementById("map");
const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("startTimerBtn");
// MAP
mapBtn.addEventListener("click", () => {
  if (imgMap.classList.contains("show")) {
    imgMap.classList.remove("show");

    // attendre la fin de l'animation avant de cacher
    setTimeout(() => {
      imgMap.style.display = "none";
    }, 400);
  } else {
    imgMap.style.display = "block";

    // petit délai pour déclencher la transition
    setTimeout(() => {
      imgMap.classList.add("show");
    }, 10);
  }
});

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
