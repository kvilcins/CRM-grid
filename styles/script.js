'use strict';

const itemName = document.getElementById("name").value;
const itemAmount = document.getElementById("amount").value;
const itemCategory = document.getElementById("category").value;
const itemPrice = document.getElementById("price").value;
console.log(itemName)
console.log((itemAmount * itemPrice) + ' ' + 'руб.')

