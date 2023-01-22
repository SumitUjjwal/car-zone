

let url = `https://vast-rose-jellyfish-wrap.cyclic.app`;
let item = document.getElementById("items");
let price;
let price_summary = document.getElementById("price_summary");
let carousel_card = document.querySelector(".card");
let originalPriceInput = document.querySelector('#original_price');
let discountedPriceInput = document.querySelector('#discounted_price');
let totalPriceInput = document.querySelector('#total_price_num');
let taxPriceInput = document.getElementById("tax_price");
let checkout_btn = document.getElementById("checkout");


let check_item = JSON.parse(localStorage.getItem("cartItem")) || null;
let cart_container = document.getElementById("cart_main_container");
let empty_container = document.getElementById("empty_main_container");

async function cardItems(id) {
       let category = localStorage.getItem("searchVal");
       let request = await fetch(`${url}/product?_id=${id}`);
       let data = await request.json();
       return data;
       
}


let LSid = JSON.parse(localStorage.getItem('cartItem')) || [];

renderCards()
let lsPrice = 0;
function getAsCard(item) {
       console.log(item)
       console.log(item[0].img_src)

       let obj = {};


       let items = document.createElement('div');
       items.setAttribute("class", "items");

       // 1st
       let item_detail = document.createElement('div');
       item_detail.setAttribute("class", "item_detail");

       let item_detail_image = document.createElement('img');
       item_detail_image.setAttribute("class", "item_detail_image");
       item_detail_image.src = item[0].img_src;

       let item_detail_title = document.createElement('p');
       item_detail_title.setAttribute("class", "item_detail_title");
       item_detail_title.innerText = item[0].title;

       item_detail.append(item_detail_image, item_detail_title);

       // 3rd
       let item_action = document.createElement('div');
       item_action.setAttribute("class", "item_action");

       let item_action_quantity = document.createElement('select');
       item_action_quantity.setAttribute("class", "item_action_quantity");

       let option1 = document.createElement('option');
       option1.setAttribute("value", "1");
       option1.innerText = "1";

       let option2 = document.createElement('option');
       option2.setAttribute("value", "2");
       option2.innerText = "2";

       let option3 = document.createElement('option');
       option3.setAttribute("value", "3");
       option3.innerText = "3";

       let option4 = document.createElement('option');
       option4.setAttribute("value", "4");
       option4.innerText = "4";

       let option5 = document.createElement('option');
       option5.setAttribute("value", "5");
       option5.innerText = "5";

       item_action_quantity.append(option1, option2, option3, option4, option5);

       item_action_remove = document.createElement('button');
       item_action_remove.setAttribute("class", "item_action_remove");
       item_action_remove.innerText = "Remove";

       item_action.append(item_action_quantity, item_action_remove);

       // 4th
       let item_price = document.createElement('div');
       item_price.setAttribute("class", "item_price");
       item_price.innerText = `$${item[0].price}`;
       lsPrice += item[0].price;



       items.append(item_detail, item_action, item_price)
       return items;

}
let originalPrice = 0;
let itemArr = [];
let discountPrice = 0;
let op = 0;
async function renderCards() {
       let render_div = document.getElementById("render_cards");

       await LSid.forEach(id => {
              cardItems(id).then(data => {
                     originalPrice += +data.previous_price;
                     discountPrice += +data.price;
                     render_div.append(getAsCard(data))
                     localStorage.setItem("combPrice", lsPrice)
                     updateOrderSummary()
              })
       })

}

function updateOrderSummary(originalPrice, discountPrice) {
       let combPrice = JSON.parse(localStorage.getItem('combPrice'));
       console.log('combPrice', combPrice)
       let tax = (((combPrice) / 100) * 18).toFixed(2);

       originalPriceInput.innerText = `$${(combPrice*1.5).toFixed(2)}`;
       discountedPriceInput.innerText = `$${combPrice.toFixed(2)}`;
       taxPriceInput.innerText = `$${tax}`
       totalPriceInput.innerText = `$${(+combPrice + +tax).toFixed(2)}`;
       localStorage.setItem("totalPrice", JSON.stringify(totalPriceInput.innerText));
}


checkout_btn.addEventListener("click", async () => {
       if(uname){
              window.location.href = "./checkout.html";
       }
       else{
              alert("Please Sign In");
              window.location.href = "./signin.html";
       }
})

// ------------------------------------------------------------------------------------------------
// top-bottom carousel
//-------- Bottom carousel ----------
let leftBtn = document.querySelector('.bottom_carousel_prev_button');
let rightBtn = document.querySelector('.bottom_carousel_next_button');
let track = document.querySelector('.bottom_carousel_cards_track')
let card = document.querySelector('.bottom_carousel_card')
let cardWidth = card.getBoundingClientRect().width;
let slideIndexNext = 1;
let slideIndexPrev = 1;
function moveForward() {

       let moveVal = cardWidth * slideIndexNext;
       if (slideIndexNext >= 4) {
              moveVal = 0;
              slideIndexNext = 1;
       }
       track.style.transform = `translateX(-${moveVal}px)`
       slideIndexNext++;
}

rightBtn.addEventListener('click', (e) => {
       moveForward()
})

function moveBackward() {
       let moveVal = cardWidth * slideIndexPrev;
       if (slideIndexNext <= slideIndexPrev) {
              moveVal = 0;
       }
       track.style.transform = `translateX(${moveVal}px)`
       slideIndexPrev++;
}

leftBtn.addEventListener('click', (e) => {
       moveBackward()
})

// ----------------------------------------------------------------------------------------
// search functionality

let search = document.getElementById('searchBar');
let searchTerm = "";
search.addEventListener('keypress', (event) => {
       if (event.key === "Enter") {
              event.preventDefault();
              localStorage.setItem('searchVal', searchTerm);
              console.log(searchTerm);
              window.location.href = "./products.list.html";
       }
       else {
              searchTerm += event.key;
       }

})