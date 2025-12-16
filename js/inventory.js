// Charger inventaire depuis sessionStorage ou utiliser par défaut
let Inventory = JSON.parse(sessionStorage.getItem("Inventory")) || {
  items: ["sword", "shield", "potion"],
};

// Ré-attacher les méthodes à l'objet Inventory
Inventory.addItem = function (item) {
  this.items.push(item);
  sessionStorage.setItem("Inventory", JSON.stringify(this));
};

Inventory.removeItem = function (item) {
  const index = this.items.indexOf(item);
  if (index > -1) {
    this.items.splice(index, 1);
    sessionStorage.setItem("Inventory", JSON.stringify(this));
  }
};

Inventory.listItems = function () {
  return this.items;
};

// Récupérer les éléments du DOM
const barInventory = document.getElementById("inventory-bar");
const button = document.getElementById("add-item-button");

// Afficher l'inventaire
barInventory.textContent = Inventory.listItems().join(", ");

// Ajouter un objet
button.addEventListener("click", () => {
  const newItem = "Banane";
  Inventory.addItem(newItem);
  barInventory.textContent = Inventory.listItems().join(", ");
});
