
let img_src = sessionStorage.getItem("img_src");
let title = sessionStorage.getItem("title");
// let price = JSON.parse(localStorage.getItem('dp'))
// let original_price = JSON.parse(localStorage.getItem('op'))
// let tax = (((+price) / 100) * 18).toFixed(2);
// let total_price = (+price + +tax).toFixed(2);
// let saved_price = (+original_price - +price).toFixed(2);
// let qty = sessionStorage.getItem("qty");

// let price = (total_price-tax).toFixed(2);

let item_details = document.getElementById("item_details");
let right_item_details = document.getElementById("right_item_details");
let right_checkout_price = document.getElementById("right_checkout_price");
let address_subm_btn = document.getElementById("address_subm");
let form = document.getElementById("add_form");
// let address = document.getElementById("userAddress");
let saving = document.getElementById("saving");

let user_address = document.getElementById("userAddress");
// console.log(userDetails)


// setting details on DOM
// item_details.innerHTML = 
// `
//        <img class="product_image"
//               src="${img_src}"
//               alt="">
//        <p class="product_title">${title}</p>
// `;

// right_item_details.innerHTML = 
// `
//       <img src="${img_src}"
//               alt="">
//        <p id="title">${title}</p>
//        <div>
//               <p id="price">$${price}</p>
//               <p>Qty 1</p>
//               <a href="">Remove</a>
//        </div> 
// `;

// right_checkout_price.innerHTML = 
// `
//       <div class="right_checkout_price_box">
//               <p>Item Subtotal</p>
//               <p>$${price}</p>
//        </div>
//        <div class="right_checkout_price_box">
//               <p>Shipping</p>
//               <p>FREE</p>
//        </div>
//        <div class="right_checkout_price_box">
//               <p>Estimated Sales Tax</p>
//               <p>$${tax}</p>
//        </div>
//        <p>You're saving $200 on your order today!</p>
//        <div class="right_checkout_price_box">
//               <h2>Total</h2>
//               <h2>$${total_price}</h2>
//        </div> 
// `





// render products

async function cardItems(id) {
       let category = localStorage.getItem("searchVal");
       // console.log(category)
       let request = await fetch(`http://localhost:8080/product?_id=${id}`);
       let data = await request.json();
       // console.log(data)
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
       items.setAttribute("id", "item_details");

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

       // 4th
       let item_price = document.createElement('div');
       item_price.setAttribute("class", "item_price");
       item_price.innerText = `$${item[0].price}`;
       lsPrice += item[0].price;



       items.append(item_detail, item_price)
       return items;

}
let itemArr = [];
async function renderCards() {
       let render_div = document.getElementById("render_cards");

       await LSid.forEach(id => {
              cardItems(id).then(data => {
                     render_div.append(getAsCard(data))
                     localStorage.setItem("combPrice", lsPrice)
              })
       })

}



// -----------------------------------------------------------------

// calculating price

let combPrice = JSON.parse(localStorage.getItem('combPrice'));
// console.log('combPrice', combPrice)
let tax = (((combPrice) / 100) * 18).toFixed(2);

// originalPriceInput.innerText = `$${(combPrice * 1.5).toFixed(2)}`;
// discountedPriceInput.innerText = `$${combPrice.toFixed(2)}`;
// taxPriceInput.innerText = `$${tax}`
// totalPriceInput.innerText = `$${(+combPrice + +tax).toFixed(2)}`;
// localStorage.setItem("totalPrice", JSON.stringify(totalPriceInput.innerText));

let checkout_price = document.getElementById("checkout_price");
let checkout_tax = document.getElementById("checkout_tax");
let checkout_total = document.getElementById("checkout_total");

checkout_price.innerText = `$${combPrice.toFixed(2)}`;
// console.log(price)
checkout_tax.innerText = `$${tax}`;
checkout_total.innerText = `$${(+combPrice + +tax).toFixed(2)}`;
saving.innerText = `You're saving $${((combPrice * 1.5)-combPrice).toFixed(2)} on your order today!`;



if (JSON.parse(sessionStorage.getItem("user_details"))) {
       form.style.display = "none";
       user_address.style.display = "block";

       let userDetails = JSON.parse(sessionStorage.getItem("user_details"));
       user_address.innerHTML =
              `
              <p id="userName">${userDetails.firstName} ${userDetails.lastName}</p>
              <p id="address">${userDetails.address1}, ${userDetails.address2}</p>
              <p id="city">${userDetails.city}</p>
              <p id="state">${userDetails.state}</p>
              <p id="zip">${userDetails.zip}</p>
              <div><span><a href="#">Edit this address</a></span> | <span><a href="#" id="add_newAddress">Add a new address</a></span></div>
       `
       let new_address = document.getElementById("add_newAddress");

       new_address.addEventListener("click", () => {
              sessionStorage.clear();
              form.style.display = "block";
              user_address.style.display = "none";
       })

}


// adding event listener to address button

address_subm_btn.addEventListener("click", setData);

async function setData(event) {
       event.preventDefault();
       form.style.display = "none";
       user_address.style.display = "block";

       let firstName = document.getElementById("inputFirstName").value;
       let lastName = document.getElementById("inputLastName").value;
       let address1 = document.getElementById("inputAddress").value;
       let address2 = document.getElementById("inputAddress2").value;
       let city = document.getElementById("inputCity").value;
       let state = document.getElementById("inputState").value;
       let zip = document.getElementById("inputZip").value;

       let obj = {
              firstName,
              lastName,
              address1,
              address2,
              city,
              state,
              zip
       }

       sessionStorage.setItem("user_details", JSON.stringify(obj));

       let userDetails = JSON.parse(sessionStorage.getItem("user_details"));
       user_address.innerHTML =
              `
              <p id="userName">${userDetails.firstName} ${userDetails.lastName}</p>
              <p id="address">${userDetails.address1}, ${userDetails.address2}</p>
              <p id="city">${userDetails.city}</p>
              <p id="state">${userDetails.state}</p>
              <p id="zip">${userDetails.zip}</p>
              <div><span><a href="#">Edit this address</a></span> | <span><a href="#">Add a new address</a></span></div>
       `
       window.location.reload();
       let new_address = document.getElementById("add_newAddress");

       new_address.addEventListener("click", () => {

              sessionStorage.clear();
              form.style.display = "block";
              user_address.style.display = "none";
       })


}


