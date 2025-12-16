// inventory.js
const INVENTORY_KEY = "inventory";

const defaultInventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

function loadInventory() {
  // sessionStorage au lieu de localStorage
  return JSON.parse(sessionStorage.getItem(INVENTORY_KEY)) || defaultInventory;
}

function saveInventory(inventory) {
  // sessionStorage au lieu de localStorage
  sessionStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
}

console.log(defaultInventory);
