// let add_to_cart_btn = document.getElementsByClassName('play')
// let main_container = document.getElementsByTagName('tbody')[0]
// let quantity_fields =  document.getElementsByClassName('num')
// let removeBtn = document.getElementsByClassName('remove-button') 

// //   // Load existing data from local storage on page load
// //  let savedData = JSON.parse(localStorage.getItem('tableData')) || [];
// //   savedData.forEach(data => {
// //     addToCart(data);
// //   });


// for(let i = 0; i < add_to_cart_btn.length; i++){
//   add_to_cart_btn[i].addEventListener('click', addToCart)
// }

// function addToCart(event){

//   let btn = event.target
//   let btn_parent = btn.parentElement
//   // let btn_grandparent = btn.parentElement.parentElement
//   let itemName = btn_parent.children[1].innerText
//   let itemPrice = btn_parent.children[2].innerText
//   let itemImage =btn_parent.children[0].src

//   let itemContainer = document.createElement('tr')
//   itemContainer.innerHTML = `
//   <td><img class="product-image" src="${itemImage}"></td>
//   <td>${itemName}</td>
//   <td class="item-price"><h3>${itemPrice}</h3></td>
//   <td><input type="number" class="num" value="1">
//   <td class="total-price"><h3>${itemPrice}</h3></td>
//   <td><button class="remove-button">Remove</button></td>`

//   main_container.append(itemContainer)


//   for(let i = 0; i < quantity_fields.length; i++){
//     quantity_fields[i].addEventListener('click', updateToTotal)
//   }

//   for(let i = 0; i < removeBtn.length; i++){
//     removeBtn[i].addEventListener('click', removeItem)
//   }
  
//   grandTotal()

// }

// function updateToTotal(event){
//   num_of_items = event.target
//   num_of_items_parent = num_of_items.parentElement.parentElement
//   price_field = num_of_items_parent.getElementsByClassName('item-price')[0]
//   total_field = num_of_items_parent.getElementsByClassName('total-price')[0]
//   price_field_content = price_field.innerText.replace('₦', '')
//   total_field.children[0].innerText = '₦' + num_of_items.value * price_field_content

//   if (isNaN(num_of_items.value) || num_of_items.value <= 0){
//     null.value = 1
//   }

// }

// function  grandTotal(){
//   let total = 0
//   let grand_total = document.getElementsByClassName('grand-total')
//   let total_price = document.getElementsByClassName('total-price')
//   for(let i = 0; i <total_price.length; i++){
//     total_price_content = Number(total_price[i].innerText.replace('₦', ''))
//     total += total_price_content
//   }
//   grand_total[0].innerText = '₦' + total
//   grand_total[0].style.fontWeight = 'bold'
// }

// function removeItem(event){
//   remove_btn = event.target
//   remove_btn_grandparent = remove_btn.parentElement.parentElement
//   remove_btn_grandparent.remove()
//   grandTotal()

// }




//with add to cart

let add_to_cart_btn = document.getElementsByClassName('play');
let main_container = document.getElementsByTagName('tbody');
let quantity_fields = document.getElementsByClassName('num');
let removeBtn = document.getElementsByClassName('remove-button');
document.addEventListener("DOMContentLoaded", showItemToCart);
let cartCount = 0;


for (let i = 0; i < add_to_cart_btn.length; i++) {
  add_to_cart_btn[i].addEventListener('click', addToCart);
}

function addToCart(event) {
  let btn = event.target;
  let btn_parent = btn.parentElement;
  let itemName = btn_parent.children[1].innerText;
  let itemPrice = btn_parent.children[2].innerText;
  let itemImage = btn_parent.children[0].src;
  cartCount++;


  const itemData = {
    name: itemName,
    price: itemPrice,
    image: itemImage,
    quantity: 1, // Default quantity
  };
  updateCartIndicator(cartCount);

  addItemToCart(itemData);
}


function addItemToCart(itemData){
  let cart = JSON.parse(localStorage.getItem("cart")) 
  if(localStorage.getItem("cart") === null){
    cart = []
  }
  // To prevent item duplicate 
  const exist = cart.find(item => item.name === itemData.name)
  if (exist) {
    alert('Item already added to cart!!!!');
  }else{
    cart.push(itemData)
    localStorage.setItem("cart", JSON.stringify(cart))
  }

}



function showItemToCart() {

let cart;
if(localStorage.getItem("cart") === null){
  cart = []
}else{
  cart = JSON.parse(localStorage.getItem("cart"))

 let viewTable = "";
 cart.forEach(item =>{
  viewTable += "<tr>"
  viewTable += ` <td><img class="product-image" src="${item.image}"></td>
    <td>${item.name}</td>
   <td class="item-price"><h3>${item.price}</h3></td>
    <td><input type="number" class="num" value="${item.quantity}">
    <td class="total-price"><h3>${item.price}</h3></td>
   <td><button class="remove-button">Remove</button></td>
  `
  viewTable += "</tr>"
 })

document.querySelector(".tby").innerHTML = viewTable;

  for (let i = 0; i < quantity_fields.length; i++) {
    quantity_fields[i].addEventListener('input', updateToTotal);
  }

  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', removeItem);
  }
grandTotal();
}
}
// window.load= showItemToCart()

function updateToTotal(event) {
  num_of_items = event.target;
  num_of_items_parent = num_of_items.parentElement.parentElement;
  price_field = num_of_items_parent.getElementsByClassName('item-price')[0];
  total_field = num_of_items_parent.getElementsByClassName('total-price')[0];
  price_field_content = price_field.innerText.replace('₦', '');
  total_field.children[0].innerText = '₦' + num_of_items.value * price_field_content;

  if (isNaN(num_of_items.value) || num_of_items.value <= 0) {
    num_of_items.value = 1;
  }  

  updateCartItemQuantity(num_of_items_parent, num_of_items.value);
  grandTotal();
}

function updateCartItemQuantity(itemElement, quantity) {
  const itemName = itemElement.children[1].innerText;
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const cart = cartData.map(item => {
    if (item.name === itemName) {
      item.quantity = parseInt(quantity);
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart))
  grandTotal()
}

function grandTotal() {
  let total = 0;
  let grand_total = document.getElementsByClassName('grand-total');
  let total_price = document.getElementsByClassName('total-price');
  for (let i = 0; i < total_price.length; i++) {
    total_price_content = Number(total_price[i].innerText.replace('₦', ''));
    total += total_price_content;
  }
  grand_total[0].innerText = '₦' + total;
  grand_total[0].style.fontWeight = 'bold';

}
// to delete item
function removeItem(event) {
  remove_btn = event.target;
  remove_btn_grandparent = remove_btn.parentElement.parentElement;
  remove_btn_grandparent.remove();

  const itemName = remove_btn_grandparent.children[1].innerText;
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const cart = cartData.filter(item => item.name !== itemName);
  localStorage.setItem("cart", JSON.stringify(cart))

  grandTotal(); 
}


function updateCartIndicator() {
  const data = JSON.parse(localStorage.getItem('cart'))
 const dataLength= data?.length;
  const cartIndicator = document.getElementById('cart-indicator');
  cartIndicator.textContent = dataLength + 1 ;
}
