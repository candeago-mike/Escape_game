// const nameInput = document.getElementById("nameInput");
// console.log(nameInput);
// const value = nameInput.value;
// console.log(value);
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
